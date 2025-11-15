import '@astrojs/internal-helpers/path';
import '@astrojs/internal-helpers/remote';
import { p as NOOP_MIDDLEWARE_HEADER, q as decodeKey } from './chunks/astro/server_DJRz2P6b.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
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
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
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
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/michaelduren/Code/my-apps/done/portfolio/","cacheDir":"file:///Users/michaelduren/Code/my-apps/done/portfolio/node_modules/.astro/","outDir":"file:///Users/michaelduren/Code/my-apps/done/portfolio/dist/","srcDir":"file:///Users/michaelduren/Code/my-apps/done/portfolio/src/","publicDir":"file:///Users/michaelduren/Code/my-apps/done/portfolio/public/","buildClientDir":"file:///Users/michaelduren/Code/my-apps/done/portfolio/dist/","buildServerDir":"file:///Users/michaelduren/Code/my-apps/done/portfolio/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"work/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/work","isIndex":false,"type":"page","pattern":"^\\/work\\/?$","segments":[[{"content":"work","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/work.astro","pathname":"/work","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/michaelduren/Code/my-apps/done/portfolio/src/components/Header.astro",{"propagation":"in-tree","containsHead":false}],["/Users/michaelduren/Code/my-apps/done/portfolio/src/layouts/MainLayout.astro",{"propagation":"in-tree","containsHead":false}],["/Users/michaelduren/Code/my-apps/done/portfolio/src/pages/about.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/about@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/michaelduren/Code/my-apps/done/portfolio/src/pages/index.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/michaelduren/Code/my-apps/done/portfolio/src/pages/work.astro",{"propagation":"in-tree","containsHead":true}],["\u0000@astro-page:src/pages/work@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/work@_@astro":"pages/work.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_9s-vaspR.mjs","/Users/michaelduren/Code/my-apps/done/portfolio/node_modules/unstorage/drivers/netlify-blobs.mjs":"chunks/netlify-blobs_DM36vZAS.mjs","/Users/michaelduren/Code/my-apps/done/portfolio/src/pages/about.astro?astro&type=script&index=0&lang.ts":"_astro/about.astro_astro_type_script_index_0_lang.CZA48DeU.js","/Users/michaelduren/Code/my-apps/done/portfolio/src/pages/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.BtdERXoh.js","/Users/michaelduren/Code/my-apps/done/portfolio/src/layouts/MainLayout.astro?astro&type=script&index=0&lang.ts":"_astro/MainLayout.astro_astro_type_script_index_0_lang.ByqpqNIE.js","/Users/michaelduren/Code/my-apps/done/portfolio/src/layouts/MainLayout.astro?astro&type=script&index=1&lang.ts":"_astro/MainLayout.astro_astro_type_script_index_1_lang.BW6zJMmC.js","/Users/michaelduren/Code/my-apps/done/portfolio/src/components/AnimatedBackground.astro?astro&type=script&index=0&lang.ts":"_astro/AnimatedBackground.astro_astro_type_script_index_0_lang.DVrBdJms.js","/Users/michaelduren/Code/my-apps/done/portfolio/src/components/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.DGoaX4-a.js","/Users/michaelduren/Code/my-apps/done/portfolio/src/components/Nav.astro?astro&type=script&index=0&lang.ts":"_astro/Nav.astro_astro_type_script_index_0_lang.C_6oMWe5.js","/Users/michaelduren/Code/my-apps/done/portfolio/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.QW52Ox2j.js","/Users/michaelduren/Code/my-apps/done/portfolio/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts":"_astro/ThemeToggle.astro_astro_type_script_index_0_lang.ClTUW62f.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/michaelduren/Code/my-apps/done/portfolio/src/components/AnimatedBackground.astro?astro&type=script&index=0&lang.ts","const r=[\"</>\",\"{}\",\"[]\",\"()\",\"<>\",\"=>\",\"//\",\"fn\",\"🦆\",\"💻\",\"λ\",\"#\",\"func\"];window.codeRainState||(window.codeRainState={symbols:[]});const n=window.codeRainState;function c(){const e=document.getElementById(\"code-rain\");if(!e)return;if(n.symbols.length>0){n.symbols.forEach(a=>{e.appendChild(a.element)});return}const o=12;for(let a=0;a<o;a++){const t=document.createElement(\"span\");t.className=\"code-symbol\",t.textContent=r[a%r.length]??null;const s=a/o*100+Math.random()*5,l=Math.random()*-100,i=.1+Math.random()*.5,d=Math.random()*360,m=(Math.random()-.5)*2;t.style.left=`${s}%`,t.style.top=`${l}vh`,t.style.transform=`rotate(${d}deg)`,t.style.opacity=\"0.3\",e.appendChild(t),n.symbols.push({element:t,x:s,y:l,speed:i,rotation:d,rotationSpeed:m,symbol:t.textContent})}}function y(){n.symbols.forEach(e=>{e.y+=e.speed,e.rotation+=e.rotationSpeed,e.y>110&&(e.y=-10,e.x=Math.random()*95,e.element.style.left=`${e.x}%`),e.element.style.top=`${e.y}vh`,e.element.style.transform=`rotate(${e.rotation}deg)`,e.y<0?e.element.style.opacity=\"0\":e.y<10?e.element.style.opacity=`${.3*(e.y/10)}`:e.y>90?e.element.style.opacity=`${.3*((110-e.y)/20)}`:e.element.style.opacity=\"0.3\"}),requestAnimationFrame(y)}n.animating||document.addEventListener(\"DOMContentLoaded\",()=>{c(),y(),n.animating=!0});document.addEventListener(\"astro:page-load\",()=>{c()});document.addEventListener(\"astro:before-preparation\",()=>{document.getElementById(\"code-rain\")&&n.symbols.length>0&&n.symbols.forEach(o=>{o.element.parentNode&&o.element.parentNode.removeChild(o.element)})});"]],"assets":["/_astro/duck.D20Di3fi.png","/_astro/duck-blue.C5BmD-tF.png","/_astro/pen.O85TXmXr.svg","/_astro/Avatar.Cd8Z4CV2.png","/_astro/about.BajI-qN2.png","/_astro/home.CP7cXYv9.png","/_astro/work.B-mB7d2D.png","/_astro/atmosphere-running.Dhvldf4O.png","/_astro/atmosphere.BxVh4Szg.png","/_astro/avatar_temp.BwxUm7KT.jpeg","/_astro/about.F23JxZTI.css","/_astro/about.CNCnfGfA.css","/_astro/index.DatK-VdU.css","/favicon.svg","/og.png","/sw.js","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.QW52Ox2j.js","/_astro/Header.astro_astro_type_script_index_0_lang.DGoaX4-a.js","/_astro/MainLayout.astro_astro_type_script_index_0_lang.ByqpqNIE.js","/_astro/MainLayout.astro_astro_type_script_index_1_lang.BW6zJMmC.js","/_astro/Nav.astro_astro_type_script_index_0_lang.C_6oMWe5.js","/_astro/ThemeToggle.astro_astro_type_script_index_0_lang.ClTUW62f.js","/_astro/about.astro_astro_type_script_index_0_lang.CZA48DeU.js","/_astro/index.astro_astro_type_script_index_0_lang.BtdERXoh.js","/_astro/sleep.De6Px9kG.js","/_astro/store.CC99tI9R.js","/_astro/theme.DEv0PVNE.js","/audio/K1.mp3","/audio/K10.mp3","/audio/K2.mp3","/audio/K3.mp3","/audio/K4.mp3","/audio/K5.mp3","/audio/K6.mp3","/audio/K7.mp3","/audio/K8.mp3","/audio/K9.mp3","/audio/bell.mp3","/audio/blip.mp3","/audio/pluck.mp3","/audio/squeek-high.mp3","/audio/squeek-low.mp3","/about/index.html","/work/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"OqrJxygJ6paBg0XtQpbZQ2ClltF25knWbZel5DpLZ6w=","sessionConfig":{"driver":"netlify-blobs","options":{"name":"astro-sessions","consistency":"strong"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/netlify-blobs_DM36vZAS.mjs');

export { manifest };
