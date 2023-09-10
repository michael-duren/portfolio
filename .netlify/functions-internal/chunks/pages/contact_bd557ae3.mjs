import { joinPaths, isRemotePath } from '@astrojs/internal-helpers/path';
/* empty css                           */import { A as AstroError, E as ExpectedImage, L as LocalImageUsedWrongly, M as MissingImageDimension, U as UnsupportedImageFormat, I as InvalidImageService, a as ExpectedImageOptions, c as createAstro, b as createComponent, d as ImageMissingAlt, r as renderTemplate, m as maybeRenderHead, e as addAttribute, s as spreadAttributes, f as renderComponent, u as unescapeHTML, F as Fragment, g as renderHead, h as renderSlot } from '../astro_91e07efc.mjs';
import 'clsx';
import { optimize } from 'svgo';
import nodemailer from 'nodemailer';

const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg"
];

function isLocalService(service) {
  if (!service) {
    return false;
  }
  return "transform" in service;
}
function parseQuality(quality) {
  let result = parseInt(quality);
  if (Number.isNaN(result)) {
    return quality;
  }
  return result;
}
const baseService = {
  validateOptions(options) {
    if (!options.src || typeof options.src !== "string" && typeof options.src !== "object") {
      throw new AstroError({
        ...ExpectedImage,
        message: ExpectedImage.message(JSON.stringify(options.src))
      });
    }
    if (!isESMImportedImage(options.src)) {
      if (options.src.startsWith("/@fs/")) {
        throw new AstroError({
          ...LocalImageUsedWrongly,
          message: LocalImageUsedWrongly.message(options.src)
        });
      }
      let missingDimension;
      if (!options.width && !options.height) {
        missingDimension = "both";
      } else if (!options.width && options.height) {
        missingDimension = "width";
      } else if (options.width && !options.height) {
        missingDimension = "height";
      }
      if (missingDimension) {
        throw new AstroError({
          ...MissingImageDimension,
          message: MissingImageDimension.message(missingDimension, options.src)
        });
      }
    } else {
      if (!VALID_SUPPORTED_FORMATS.includes(options.src.format)) {
        throw new AstroError({
          ...UnsupportedImageFormat,
          message: UnsupportedImageFormat.message(
            options.src.format,
            options.src.src,
            VALID_SUPPORTED_FORMATS
          )
        });
      }
      if (options.src.format === "svg") {
        options.format = "svg";
      }
    }
    if (!options.format) {
      options.format = "webp";
    }
    return options;
  },
  getHTMLAttributes(options) {
    let targetWidth = options.width;
    let targetHeight = options.height;
    if (isESMImportedImage(options.src)) {
      const aspectRatio = options.src.width / options.src.height;
      if (targetHeight && !targetWidth) {
        targetWidth = Math.round(targetHeight * aspectRatio);
      } else if (targetWidth && !targetHeight) {
        targetHeight = Math.round(targetWidth / aspectRatio);
      } else if (!targetWidth && !targetHeight) {
        targetWidth = options.src.width;
        targetHeight = options.src.height;
      }
    }
    const { src, width, height, format, quality, ...attributes } = options;
    return {
      ...attributes,
      width: targetWidth,
      height: targetHeight,
      loading: attributes.loading ?? "lazy",
      decoding: attributes.decoding ?? "async"
    };
  },
  getURL(options, imageConfig) {
    const searchParams = new URLSearchParams();
    if (isESMImportedImage(options.src)) {
      searchParams.append("href", options.src.src);
    } else if (isRemoteAllowed(options.src, imageConfig)) {
      searchParams.append("href", options.src);
    } else {
      return options.src;
    }
    const params = {
      w: "width",
      h: "height",
      q: "quality",
      f: "format"
    };
    Object.entries(params).forEach(([param, key]) => {
      options[key] && searchParams.append(param, options[key].toString());
    });
    const imageEndpoint = joinPaths("/", "/_image");
    return `${imageEndpoint}?${searchParams}`;
  },
  parseURL(url) {
    const params = url.searchParams;
    if (!params.has("href")) {
      return void 0;
    }
    const transform = {
      src: params.get("href"),
      width: params.has("w") ? parseInt(params.get("w")) : void 0,
      height: params.has("h") ? parseInt(params.get("h")) : void 0,
      format: params.get("f"),
      quality: params.get("q")
    };
    return transform;
  }
};

function matchPattern(url, remotePattern) {
  return matchProtocol(url, remotePattern.protocol) && matchHostname(url, remotePattern.hostname, true) && matchPort(url, remotePattern.port) && matchPathname(url, remotePattern.pathname, true);
}
function matchPort(url, port) {
  return !port || port === url.port;
}
function matchProtocol(url, protocol) {
  return !protocol || protocol === url.protocol.slice(0, -1);
}
function matchHostname(url, hostname, allowWildcard) {
  if (!hostname) {
    return true;
  } else if (!allowWildcard || !hostname.startsWith("*")) {
    return hostname === url.hostname;
  } else if (hostname.startsWith("**.")) {
    const slicedHostname = hostname.slice(2);
    return slicedHostname !== url.hostname && url.hostname.endsWith(slicedHostname);
  } else if (hostname.startsWith("*.")) {
    const slicedHostname = hostname.slice(1);
    const additionalSubdomains = url.hostname.replace(slicedHostname, "").split(".").filter(Boolean);
    return additionalSubdomains.length === 1;
  }
  return false;
}
function matchPathname(url, pathname, allowWildcard) {
  if (!pathname) {
    return true;
  } else if (!allowWildcard || !pathname.endsWith("*")) {
    return pathname === url.pathname;
  } else if (pathname.endsWith("/**")) {
    const slicedPathname = pathname.slice(0, -2);
    return slicedPathname !== url.pathname && url.pathname.startsWith(slicedPathname);
  } else if (pathname.endsWith("/*")) {
    const slicedPathname = pathname.slice(0, -1);
    const additionalPathChunks = url.pathname.replace(slicedPathname, "").split("/").filter(Boolean);
    return additionalPathChunks.length === 1;
  }
  return false;
}

function isESMImportedImage(src) {
  return typeof src === "object";
}
function isRemoteImage(src) {
  return typeof src === "string";
}
function isRemoteAllowed(src, {
  domains = [],
  remotePatterns = []
}) {
  if (!isRemotePath(src))
    return false;
  const url = new URL(src);
  return domains.some((domain) => matchHostname(url, domain)) || remotePatterns.some((remotePattern) => matchPattern(url, remotePattern));
}
async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      '../sharp_92a07d28.mjs'
    ).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset)
      globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: typeof options.src === "object" && "then" in options.src ? (await options.src).default : options.src
  };
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && // If `getURL` returned the same URL as the user provided, it means the service doesn't need to do anything
  !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    imageURL = globalThis.astroAsset.addStaticImage(validatedOptions);
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    attributes: service.getHTMLAttributes !== void 0 ? service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$c = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(image.attributes)}>`;
}, "/Users/michaelduren/myApps/portfolio/portfolio/node_modules/astro/components/Image.astro", void 0);

const imageConfig = {"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[]};
					const getImage = async (options) => await getImage$1(options, imageConfig);

const $$Astro$b = createAstro();
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/Users/michaelduren/myApps/portfolio/portfolio/node_modules/astro/components/ViewTransitions.astro", void 0);

const avatar = {"src":"/_astro/avatar_temp.5af24319.jpeg","width":400,"height":400,"format":"jpg"};

const $$Astro$a = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Header;
  const { animated } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<header class="flex mx-auto min-w-[10vw] mb-auto h-full flex-col"><div class="w-full flex mb-4 sm:mb-8 md:mb-16 items-center justify-center gap-4 sm:gap-0 sm:justify-between"><div class="avatar flex-1"><div class="w-24 shadow-lg shadow-blue-500 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">${renderComponent($$result, "Image", $$Image, { "class": "rounded-full h-36 w-36", "src": avatar, "alt": "A avatar of Michael Duren" })}</div></div><div class="flex-1 sm:flex-grow-0 sm:flex-shrink-0">${!animated ? renderTemplate`<h1 class=" text-3xl sm:text-4xl md:text-5xl font-rock  drop-shadow-md">
Michael Duren
</h1>` : renderTemplate`<h1 id="title" class=" text-3xl sm:text-4xl md:text-5xl font-rock  drop-shadow-md"></h1>`}</div></div></header>`;
}, "/Users/michaelduren/myApps/portfolio/portfolio/src/components/Header.astro", void 0);

const $$Astro$9 = createAstro();
const $$Nav = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Nav;
  return renderTemplate`${maybeRenderHead()}<ul class="flex max-h-screen md:flex-col md:justify-start justify-center gap-4"><li class="nav-link text-xs sm:text-sm md:text-base" id="home-button"><a class="font-rock" href="/">Home</a></li><li class="nav-link text-xs sm:text-sm md:text-base"><a class="font-rock" href="/about">About</a></li><li class="nav-link text-xs sm:text-sm md:text-base"><a class="font-rock" href="/work">Work</a></li><li class="nav-link text-xs sm:text-sm md:text-base"><a class="font-rock" href="/contact">Contact</a></li></ul>`;
}, "/Users/michaelduren/myApps/portfolio/portfolio/src/components/Nav.astro", void 0);

const SPRITESHEET_NAMESPACE = `astroicon`;

const baseURL = "https://api.astroicon.dev/v1/";
const requests = /* @__PURE__ */ new Map();
const fetchCache = /* @__PURE__ */ new Map();
async function get(pack, name) {
  const url = new URL(`./${pack}/${name}`, baseURL).toString();
  if (requests.has(url)) {
    return await requests.get(url);
  }
  if (fetchCache.has(url)) {
    return fetchCache.get(url);
  }
  let request = async () => {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(await res.text());
    }
    const contentType = res.headers.get("Content-Type");
    if (!contentType.includes("svg")) {
      throw new Error(`[astro-icon] Unable to load "${name}" because it did not resolve to an SVG!

Recieved the following "Content-Type":
${contentType}`);
    }
    const svg = await res.text();
    fetchCache.set(url, svg);
    requests.delete(url);
    return svg;
  };
  let promise = request();
  requests.set(url, promise);
  return await promise;
}

const splitAttrsTokenizer = /([a-z0-9_\:\-]*)\s*?=\s*?(['"]?)(.*?)\2\s+/gim;
const domParserTokenizer = /(?:<(\/?)([a-zA-Z][a-zA-Z0-9\:]*)(?:\s([^>]*?))?((?:\s*\/)?)>|(<\!\-\-)([\s\S]*?)(\-\->)|(<\!\[CDATA\[)([\s\S]*?)(\]\]>))/gm;
const splitAttrs = (str) => {
  let res = {};
  let token;
  if (str) {
    splitAttrsTokenizer.lastIndex = 0;
    str = " " + (str || "") + " ";
    while (token = splitAttrsTokenizer.exec(str)) {
      res[token[1]] = token[3];
    }
  }
  return res;
};
function optimizeSvg(contents, name, options) {
  return optimize(contents, {
    plugins: [
      "removeDoctype",
      "removeXMLProcInst",
      "removeComments",
      "removeMetadata",
      "removeXMLNS",
      "removeEditorsNSData",
      "cleanupAttrs",
      "minifyStyles",
      "convertStyleToAttrs",
      {
        name: "cleanupIDs",
        params: { prefix: `${SPRITESHEET_NAMESPACE}:${name}` }
      },
      "removeRasterImages",
      "removeUselessDefs",
      "cleanupNumericValues",
      "cleanupListOfValues",
      "convertColors",
      "removeUnknownsAndDefaults",
      "removeNonInheritableGroupAttrs",
      "removeUselessStrokeAndFill",
      "removeViewBox",
      "cleanupEnableBackground",
      "removeHiddenElems",
      "removeEmptyText",
      "convertShapeToPath",
      "moveElemsAttrsToGroup",
      "moveGroupAttrsToElems",
      "collapseGroups",
      "convertPathData",
      "convertTransform",
      "removeEmptyAttrs",
      "removeEmptyContainers",
      "mergePaths",
      "removeUnusedNS",
      "sortAttrs",
      "removeTitle",
      "removeDesc",
      "removeDimensions",
      "removeStyleElement",
      "removeScriptElement"
    ]
  }).data;
}
const preprocessCache = /* @__PURE__ */ new Map();
function preprocess(contents, name, { optimize }) {
  if (preprocessCache.has(contents)) {
    return preprocessCache.get(contents);
  }
  if (optimize) {
    contents = optimizeSvg(contents, name);
  }
  domParserTokenizer.lastIndex = 0;
  let result = contents;
  let token;
  if (contents) {
    while (token = domParserTokenizer.exec(contents)) {
      const tag = token[2];
      if (tag === "svg") {
        const attrs = splitAttrs(token[3]);
        result = contents.slice(domParserTokenizer.lastIndex).replace(/<\/svg>/gim, "").trim();
        const value = { innerHTML: result, defaultProps: attrs };
        preprocessCache.set(contents, value);
        return value;
      }
    }
  }
}
function normalizeProps(inputProps) {
  const size = inputProps.size;
  delete inputProps.size;
  const w = inputProps.width ?? size;
  const h = inputProps.height ?? size;
  const width = w ? toAttributeSize(w) : void 0;
  const height = h ? toAttributeSize(h) : void 0;
  return { ...inputProps, width, height };
}
const toAttributeSize = (size) => String(size).replace(/(?<=[0-9])x$/, "em");
async function load(name, inputProps, optimize) {
  const key = name;
  if (!name) {
    throw new Error("<Icon> requires a name!");
  }
  let svg = "";
  let filepath = "";
  if (name.includes(":")) {
    const [pack, ..._name] = name.split(":");
    name = _name.join(":");
    filepath = `/src/icons/${pack}`;
    let get$1;
    try {
      const files = /* #__PURE__ */ Object.assign({

});
      const keys = Object.fromEntries(
        Object.keys(files).map((key2) => [key2.replace(/\.[cm]?[jt]s$/, ""), key2])
      );
      if (!(filepath in keys)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const mod = files[keys[filepath]];
      if (typeof mod.default !== "function") {
        throw new Error(
          `[astro-icon] "${filepath}" did not export a default function!`
        );
      }
      get$1 = mod.default;
    } catch (e) {
    }
    if (typeof get$1 === "undefined") {
      get$1 = get.bind(null, pack);
    }
    const contents = await get$1(name, inputProps);
    if (!contents) {
      throw new Error(
        `<Icon pack="${pack}" name="${name}" /> did not return an icon!`
      );
    }
    if (!/<svg/gim.test(contents)) {
      throw new Error(
        `Unable to process "<Icon pack="${pack}" name="${name}" />" because an SVG string was not returned!

Recieved the following content:
${contents}`
      );
    }
    svg = contents;
  } else {
    filepath = `/src/icons/${name}.svg`;
    try {
      const files = /* #__PURE__ */ Object.assign({});
      if (!(filepath in files)) {
        throw new Error(`Could not find the file "${filepath}"`);
      }
      const contents = files[filepath];
      if (!/<svg/gim.test(contents)) {
        throw new Error(
          `Unable to process "${filepath}" because it is not an SVG!

Recieved the following content:
${contents}`
        );
      }
      svg = contents;
    } catch (e) {
      throw new Error(
        `[astro-icon] Unable to load "${filepath}". Does the file exist?`
      );
    }
  }
  const { innerHTML, defaultProps } = preprocess(svg, key, { optimize });
  if (!innerHTML.trim()) {
    throw new Error(`Unable to parse "${filepath}"!`);
  }
  return {
    innerHTML,
    props: { ...defaultProps, ...normalizeProps(inputProps) }
  };
}

const $$Astro$8 = createAstro();
const $$Icon = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Icon;
  let { name, pack, title, optimize = true, class: className, ...inputProps } = Astro2.props;
  let props = {};
  if (pack) {
    name = `${pack}:${name}`;
  }
  let innerHTML = "";
  try {
    const svg = await load(name, { ...inputProps, class: className }, optimize);
    innerHTML = svg.innerHTML;
    props = svg.props;
  } catch (e) {
    {
      throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
    }
  }
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(name, "astro-icon")}>${unescapeHTML((title ? `<title>${title}</title>` : "") + innerHTML)}</svg>`;
}, "/Users/michaelduren/myApps/portfolio/portfolio/node_modules/astro-icon/lib/Icon.astro", void 0);

const sprites = /* @__PURE__ */ new WeakMap();
function trackSprite(request, name) {
  let currentSet = sprites.get(request);
  if (!currentSet) {
    currentSet = /* @__PURE__ */ new Set([name]);
  } else {
    currentSet.add(name);
  }
  sprites.set(request, currentSet);
}
const warned = /* @__PURE__ */ new Set();
async function getUsedSprites(request) {
  const currentSet = sprites.get(request);
  if (currentSet) {
    return Array.from(currentSet);
  }
  if (!warned.has(request)) {
    const { pathname } = new URL(request.url);
    console.log(`[astro-icon] No sprites found while rendering "${pathname}"`);
    warned.add(request);
  }
  return [];
}

const $$Astro$7 = createAstro();
const $$Spritesheet = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Spritesheet;
  const { optimize = true, style, ...props } = Astro2.props;
  const names = await getUsedSprites(Astro2.request);
  const icons = await Promise.all(names.map((name) => {
    return load(name, {}, optimize).then((res) => ({ ...res, name })).catch((e) => {
      {
        throw new Error(`[astro-icon] Unable to load icon "${name}"!
${e}`);
      }
    });
  }));
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(`position: absolute; width: 0; height: 0; overflow: hidden; ${style ?? ""}`.trim(), "style")}${spreadAttributes({ "aria-hidden": true, ...props })} astro-icon-spritesheet>${icons.map((icon) => renderTemplate`<symbol${spreadAttributes(icon.props)}${addAttribute(`${SPRITESHEET_NAMESPACE}:${icon.name}`, "id")}>${unescapeHTML(icon.innerHTML)}</symbol>`)}</svg>`;
}, "/Users/michaelduren/myApps/portfolio/portfolio/node_modules/astro-icon/lib/Spritesheet.astro", void 0);

const $$Astro$6 = createAstro();
const $$SpriteProvider = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$SpriteProvider;
  const content = await Astro2.slots.render("default");
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(content)}` })}${renderComponent($$result, "Spritesheet", $$Spritesheet, {})}`;
}, "/Users/michaelduren/myApps/portfolio/portfolio/node_modules/astro-icon/lib/SpriteProvider.astro", void 0);

const $$Astro$5 = createAstro();
const $$Sprite = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Sprite;
  let { name, pack, title, class: className, x, y, ...inputProps } = Astro2.props;
  const props = normalizeProps(inputProps);
  if (pack) {
    name = `${pack}:${name}`;
  }
  const href = `#${SPRITESHEET_NAMESPACE}:${name}`;
  trackSprite(Astro2.request, name);
  return renderTemplate`${maybeRenderHead()}<svg${spreadAttributes(props)}${addAttribute(className, "class")}${addAttribute(name, "astro-icon")}>${title ? renderTemplate`<title>${title}</title>` : ""}<use${spreadAttributes({ "xlink:href": href, width: props.width, height: props.height, x, y })}></use></svg>`;
}, "/Users/michaelduren/myApps/portfolio/portfolio/node_modules/astro-icon/lib/Sprite.astro", void 0);

Object.assign($$Sprite, { Provider: $$SpriteProvider });

const $$Astro$4 = createAstro();
const $$Social = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Social;
  return renderTemplate`${maybeRenderHead()}<div class="flex justify-around"><a href="https://github.com/michael-duren" rel="noopener noreferrer" target="_blank" aria-label="Michael Duren Github Profile">${renderComponent($$result, "Icon", $$Icon, { "class": "w-6 h-6", "name": "mdi:github", "alt": "Github Icon" })}</a><a href="https://www.linkedin.com/in/michael-duren/" rel="noopener noreferrer" target="_blank" aria-label="Michael Duren Linkedin Profile">${renderComponent($$result, "Icon", $$Icon, { "class": "w-6 h-6", "name": "mdi:linkedin", "alt": "Linkedin Icon" })}</a><a href="https://twitter.com/duren_dev" rel="noopener noreferrer" target="_blank" aria-label="Michael Duren Twitter Profile">${renderComponent($$result, "Icon", $$Icon, { "class": "w-6 h-6", "name": "mdi:twitter", "alt": "Twitter Icon" })}</a></div>`;
}, "/Users/michaelduren/myApps/portfolio/portfolio/src/components/Social.astro", void 0);

const $$Astro$3 = createAstro();
const $$MainLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const { title, animated } = Astro2.props;
  return renderTemplate`<html lang="en"><head>${renderComponent($$result, "ViewTransitions", $$ViewTransitions, {})}<meta charset="utf-8"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="viewport" content="width=device-width"><meta name="generator"${addAttribute(Astro2.generator, "content")}><meta name="description" content="Michael Duren portfolio incues types, software engineering, skills, computer science, Web Developer JavaScript, Typescript, C#, .NET. "><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url" content="https://michaelduren.com/"><meta property="og:title" content="Michael Duren"><meta property="og:description" content="Michael Duren is a software engineer and developer."><meta property="og:image" content="https://michaelduren.com/images/work/portfolio/about.png"><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url" content="https://metatags.io/"><meta property="twitter:title" content="Michael Duren"><meta property="twitter:description" content="Michael Duren is a software engineer and developer."><meta property="twitter:image" content="https://metatags.io/images/meta-tags.png"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Rock+Salt&display=swap" rel="stylesheet"><title>${title}</title>${renderHead()}</head><body class="min-h-screen flex flex-col p-4 gap-2"><div class="px-2 py-2 rounded-lg w-full">${renderComponent($$result, "Header", $$Header, { "animated": animated })}</div><!-- Take the remaining height --><div class="flex h-full flex-1 px-2 py-2 rounded-lg gap-8 flex-col md:flex-row"><aside class="flex flex-col justify-between md:sticky top-[5%] max-h-[70vh]"><div class="bg-yellow-300 px-8 py-2 rounded-lg shadow-md">${renderComponent($$result, "Nav", $$Nav, {})}</div><div class="bg-yellow-300 px-8 py-2 rounded-lg shadow-md md:block hidden">${renderComponent($$result, "Social", $$Social, {})}</div></aside><main class="flex-1 flex flex-col items-center">${renderSlot($$result, $$slots["default"])}</main></div><footer><div class="bg-yellow-300 px-8 py-2 rounded-lg shadow-md block md:hidden mt-8">${renderComponent($$result, "Social", $$Social, {})}</div></footer><audio preload="auto" id="bell" src="/audio/bell.mp3"></audio><audio preload="auto" id="blip" src="/audio/blip.mp3"></audio></body></html>`;
}, "/Users/michaelduren/myApps/portfolio/portfolio/src/layouts/MainLayout.astro", void 0);

const Envelope = {"src":"/_astro/envelope.0c893e47.svg","width":159,"height":106,"format":"svg"};

const Mobile = {"src":"/_astro/mobile.d01be702.svg","width":161,"height":161,"format":"svg"};

const $$Astro$2 = createAstro();
const $$Input = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Input;
  const { name, label, required, type } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"${addAttribute(name, "for")}>${label}</label><input${addAttribute(name, "id")} class="appearance-none text-xs sm:text-sm md:text-base block w-full bg-gray-200 text-gray-700 border rounded-xl py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"${addAttribute(name, "name")}${addAttribute(required, "required")}${addAttribute(type, "type")}>`;
}, "/Users/michaelduren/myApps/portfolio/portfolio/src/components/Input.astro", void 0);

const $$Astro$1 = createAstro();
const $$TextArea = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$TextArea;
  const { name, label, required } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"${addAttribute(name, "for")}>${label}</label><textarea${addAttribute(name, "id")} class="w-full text-xs sm:text-sm md:text-base focus:bg-white rounded-xl bg-gray-200 p-2 text-gray-900 border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"${addAttribute(required, "required")}${addAttribute(name, "name")} rows="8"></textarea>`;
}, "/Users/michaelduren/myApps/portfolio/portfolio/src/components/TextArea.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Contact;
  let sentSuccessfully = false;
  if (Astro2.request.method === "POST") {
    try {
      const data = await Astro2.request.formData();
      const name = data.get("name");
      const email = data.get("email");
      const message = data.get("message");
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "michaeld@michaelduren.com",
          pass: "rvbohjnppuifkfhx"
        }
      });
      if (!name || !email || !message) {
        return new Response(
          JSON.stringify({
            message: "Missing required fields"
          }),
          { status: 400 }
        );
      }
      const responseSent = await transporter.sendMail({
        from: "info@michaelduren.com",
        to: "michaeld@michaelduren.com",
        subject: `WEBSITE: MESSAGE FROM ${name}`,
        html: `
		<h1>${name}: ${email}</h1>
		<h2>Message:</h2>
		<p>${message}</p>
		`
      });
      if (responseSent.accepted.length > 0) {
        sentSuccessfully = true;
      } else {
        return new Response({
          message: JSON.stringify("Error sending message")
        }), { status: 500 };
      }
    } catch (error) {
      console.error(error);
    }
  }
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Michael Duren - Contact" }, { "default": ($$result2) => renderTemplate`${maybeRenderHead()}<div class="flex gap-2 md:gap-3 lg:gap-4 flex-col w-full"><div class=""><h2 class="font-bold text-2xl md:text-4xl">Contact</h2></div><div class="flex flex-col md:flex-row gap-8"><div${addAttribute([
    "flex flex-1 flex-col justify-between order-2 md:order-1",
    { hidden: !sentSuccessfully }
  ], "class:list")}><div class="flex flex-col gap-8"><h2 class="text-2xl text-blue-700 font-semibold">Successfuly sent! 🎉</h2><p class="font-semibold text-gray-600 md:text-lg text-base">
Thanks for contacting me.</p><p class="font-semibold text-gray-600 md:text-lg text-base">
I'll get back to you within 24 hours. I look forward to hearing more
            about your project or business. Thanks!
</p></div><a class="w-full flex" data-astro-reload href="/contact"><button class="btn flex-1 btn-neutral mt-8"> Send Another</button></a></div><form${addAttribute([
    "flex flex-1 flex-col justify-between order-2 md:order-1",
    { hidden: sentSuccessfully }
  ], "class:list")} method="post"><div>${renderComponent($$result2, "Input", $$Input, { "name": "name", "type": "text", "required": true, "label": "Name" })}${renderComponent($$result2, "Input", $$Input, { "name": "email", "type": "email", "required": true, "label": "Email" })}${renderComponent($$result2, "TextArea", $$TextArea, { "name": "message", "required": true, "label": "Message" })}</div><button class="btn btn-neutral mt-8">Submit</button></form><div class="flex w-full items-center flex-col flex-1 order-1 md:order-2"><div class="w-full flex flex-col gap-4"><h2 class="text-lg md:mb-8 sm:text-xl md:text-2xl lg:text-3xl text-purple-700 font-bold">I'd love to hear from you</h2><p class="font-semibold text-gray-600 md:text-base text-sm">Let me know how I can contribute to your organization</p><p class="font-semibold text-gray-600 md:text-base text-sm">
I help business find <span class="text-purple-700 font-bold">solutions</span></p><p class="font-semibold text-gray-600 md:text-base text-sm">
Specializing in JavaScript, Typescript, C#, and .NET, I'm an avid
            debugger and problem-solver with excellent communication skills and
            a knack for collaboration.
</p></div><div class="flex mt-8 md:mt-16 h-24 gap-x-20 md:gap-x-0 justify-center md:justify-around items-center w-full">${renderComponent($$result2, "Image", $$Image, { "class": "h-16 w-24 md:w-32 md:h-32 aspect-square", "src": Envelope, "alt": "Envelope" })}${renderComponent($$result2, "Image", $$Image, { "class": "h-28 w-28 aspect-square md:h-32 md:w-32", "src": Mobile, "alt": "Mobile" })}</div></div></div></div>` })}`;
}, "/Users/michaelduren/myApps/portfolio/portfolio/src/pages/contact.astro", void 0);

const $$file = "/Users/michaelduren/myApps/portfolio/portfolio/src/pages/contact.astro";
const $$url = "/contact";

const contact = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Image as $, isRemoteAllowed as a, $$Icon as b, $$MainLayout as c, baseService as d, contact as e, getConfiguredImageService as g, imageConfig as i, parseQuality as p };
