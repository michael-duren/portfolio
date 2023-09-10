import 'cookie';
import 'kleur/colors';
import 'string-width';
import '@astrojs/internal-helpers/path';
import './chunks/astro_91e07efc.mjs';
import 'clsx';
import 'mime';
import { compile } from 'path-to-regexp';
import 'html-escaper';

if (typeof process !== "undefined") {
  let proc = process;
  if ("argv" in proc && Array.isArray(proc.argv)) {
    if (proc.argv.includes("--verbose")) ; else if (proc.argv.includes("--silent")) ; else ;
  }
}

new TextEncoder();

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  return {
    ...serializedManifest,
    assets,
    componentMetadata,
    clientDirectives,
    routes
  };
}

const manifest = deserializeManifest({"adapterName":"@astrojs/netlify/functions","routes":[{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"_meta":{"trailingSlash":"ignore"}}},{"file":"work/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/work","type":"page","pattern":"^\\/work\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work.astro","pathname":"/work","prerender":true,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/image-endpoint.js","pathname":"/_image","prerender":false,"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.74ce480b.js"}],"styles":[{"type":"external","src":"/_astro/about.e14ebe73.css"}],"routeData":{"route":"/contact","type":"page","pattern":"^\\/contact\\/?$","segments":[[{"content":"contact","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contact.astro","pathname":"/contact","prerender":false,"_meta":{"trailingSlash":"ignore"}}}],"base":"/","compressHTML":true,"componentMetadata":[["/Users/michaelduren/myApps/portfolio/portfolio/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/michaelduren/myApps/portfolio/portfolio/src/pages/contact.astro",{"propagation":"none","containsHead":true}],["/Users/michaelduren/myApps/portfolio/portfolio/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/michaelduren/myApps/portfolio/portfolio/src/pages/work.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var i=t=>{let e=async()=>{await(await t())()};\"requestIdleCallback\"in window?window.requestIdleCallback(e):setTimeout(e,200)};(self.Astro||(self.Astro={})).idle=i;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var r=(i,c,n)=>{let s=async()=>{await(await i())()},t=new IntersectionObserver(e=>{for(let o of e)if(o.isIntersecting){t.disconnect(),s();break}});for(let e of n.children)t.observe(e)};(self.Astro||(self.Astro={})).visible=r;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000empty-middleware":"_empty-middleware.mjs","/node_modules/astro/dist/assets/image-endpoint.js":"chunks/pages/image-endpoint_0297a86c.mjs","\u0000@astrojs-manifest":"manifest_fd7c314a.mjs","\u0000@astro-page:node_modules/astro/dist/assets/image-endpoint@_@js":"chunks/image-endpoint_78aa1f2d.mjs","\u0000@astro-page:src/pages/index@_@astro":"chunks/index_7620b846.mjs","\u0000@astro-page:src/pages/contact@_@astro":"chunks/contact_73de25f9.mjs","\u0000@astro-page:src/pages/about@_@astro":"chunks/about_450392d7.mjs","\u0000@astro-page:src/pages/work@_@astro":"chunks/work_1ac37909.mjs","/Users/michaelduren/myApps/portfolio/portfolio/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_92a07d28.mjs","/astro/hoisted.js?q=1":"_astro/hoisted.11a5123e.js","/astro/hoisted.js?q=2":"_astro/hoisted.234c9421.js","/astro/hoisted.js?q=3":"_astro/hoisted.74ce480b.js","/astro/hoisted.js?q=0":"_astro/hoisted.7ec93282.js","astro:scripts/before-hydration.js":""},"assets":["/_astro/duck.1aaa5fb2.png","/_astro/duck-blue.aa5e210a.png","/_astro/envelope.0c893e47.svg","/_astro/mobile.d01be702.svg","/_astro/typescript.fd8dd586.png","/_astro/javascript.1ac2b91e.png","/_astro/csharp.f953908f.png","/_astro/react.815a1fc8.png","/_astro/postgres.382963cf.png","/_astro/sql-server.2b2caf24.png","/_astro/dotnet.ff8b864f.png","/_astro/css.64efa7ca.png","/_astro/home.1ef5ccb6.png","/_astro/about.a922d420.png","/_astro/lightmode.c632af3f.png","/_astro/lightmode-closeup.404a4997.png","/_astro/work.98322b49.png","/_astro/atmosphere.08454c64.png","/_astro/atmosphere-running.6c1f3817.png","/_astro/team.5f68cfcd.png","/_astro/darkmode-closeup.c6484618.png","/_astro/news.f2f1caf0.png","/_astro/home.c1a27bc6.png","/_astro/cart.52eb0a1d.png","/_astro/darkmode.f8fb5345.png","/_astro/avatar_temp.5af24319.jpeg","/_astro/Avatar.e45ae172.png","/_astro/home.7d8918d5.png","/_astro/items.0f609ecd.png","/_astro/about.e14ebe73.css","/favicon.svg","/sw.js","/_astro/audio.utils.0bcde9ed.js","/_astro/hoisted.11a5123e.js","/_astro/hoisted.234c9421.js","/_astro/hoisted.74ce480b.js","/_astro/hoisted.7ec93282.js","/audio/K1.mp3","/audio/K10.mp3","/audio/K2.mp3","/audio/K3.mp3","/audio/K4.mp3","/audio/K5.mp3","/audio/K6.mp3","/audio/K7.mp3","/audio/K8.mp3","/audio/K9.mp3","/audio/bell.mp3","/audio/blip.mp3","/audio/pluck.mp3","/audio/squeek-high.mp3","/audio/squeek-low.mp3","/index.html","/about/index.html","/work/index.html"]});

export { manifest };
