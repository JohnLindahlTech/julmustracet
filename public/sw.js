if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let a=Promise.resolve();return c[e]||(a=new Promise(async a=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=a}else importScripts(e),a()})),a.then(()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]})},a=(a,c)=>{Promise.all(a.map(e)).then(e=>c(1===e.length?e[0]:e))},c={require:Promise.resolve(a)};self.define=(a,s,t)=>{c[a]||(c[a]=Promise.resolve().then(()=>{let c={};const n={uri:location.origin+a.slice(1)};return Promise.all(s.map(a=>{switch(a){case"exports":return c;case"module":return n;default:return e(a)}})).then(e=>{const a=t(...e);return c.default||(c.default=a),c})}))}}define("./sw.js",["./workbox-c2b5e142"],(function(e){"use strict";importScripts(),e.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/NiPXmLgzJtAF9ru375Fbp/_buildManifest.js",revision:"9705906430c1b2d8e8d3a826844e634b"},{url:"/_next/static/NiPXmLgzJtAF9ru375Fbp/_ssgManifest.js",revision:"abee47769bf307639ace4945f9cfd4ff"},{url:"/_next/static/chunks/1490af714b375856223bde1dcdf54d7f8796fdaa.22d842770344f6b2b615.js",revision:"de4e479e109a271ad3b892373bc03494"},{url:"/_next/static/chunks/545d2f42.ecca18e71561b07283a1.js",revision:"4b1ac9b4f803a007e2a2da2a2bde1c3e"},{url:"/_next/static/chunks/741f6e15698ea2288eef960452468239cc935f92.a6809806a30bca8e8ee8.js",revision:"eb89cd2615bb3951479e0ba46eafddb5"},{url:"/_next/static/chunks/885ce3424f02a6ae8c789174b25bec7d91a9e372.7b022b7e64d4597f7b97.js",revision:"b95fed4c40c12988c92fc34bcee34be8"},{url:"/_next/static/chunks/8b1105592eadf26dae0eeb9065048638a9101564.2fb4526c24b5e5dd6a08.js",revision:"bc84b51d1fb1bea659b47e8777d32bb1"},{url:"/_next/static/chunks/8b98b88000182334ece941bcebc1b6f54ae26d07.5b627a2dc12720d76745.js",revision:"5dd654c3c4a02d6d4025e06c21a82a5f"},{url:"/_next/static/chunks/8e092424ed769238f899677b7e4437a8acd97341.31aa7602429b563638a5.js",revision:"c9e9c717a088a705ec010d5f0cb5ae16"},{url:"/_next/static/chunks/9657ccf0f00844052d9010a6caf36d1edfb8b7f5.e7a8ba1a106a60cca10c.js",revision:"583b1f6f3e8606d34df46640aa211581"},{url:"/_next/static/chunks/a5050c87ce3ce6837584e69b21972e4a39b63bf8.192cb278e644412a7d4f.js",revision:"5a9f20e23fa20d0c30bb1e88d729b32f"},{url:"/_next/static/chunks/c3cee6395776e9ce7157f6b08b08673d11304f66.a886f88a453a1ef5a5c4.js",revision:"5d30abbbacfa29e5595d0ee293d04dd6"},{url:"/_next/static/chunks/c9777d7a2a9969b78a41123277b6018db3f1a70c.1fe1ee55866eea33c123.js",revision:"a772374a9c995ecd5a15845719529d37"},{url:"/_next/static/chunks/db839fc869a625b6b72883203046e08956778acb.9559d9a831dd913e77b7.js",revision:"0243e35fd1c38acff8adeee566b3a98e"},{url:"/_next/static/chunks/de5d2f5c284df47eb878682d2db7b47bfad5706c.c51fe15080f56dcd475d.js",revision:"326667527c9545ac4bfa6ffbce135bf6"},{url:"/_next/static/chunks/decc16ea76941aa7e8d35fe94f61e509944c1374.6ab296ed46d01f9779a6.js",revision:"24ec62acd146101b14d362a28b09bddd"},{url:"/_next/static/chunks/fd366483e05e7da0b3ede45f6caeba29c8c3befc.08070763e8d53498909c.js",revision:"dcead72d715a12623c2d4df493426718"},{url:"/_next/static/chunks/framework.a3ab6d70963b928e4674.js",revision:"4753007ca4e23221aa4e23dfab9bc39c"},{url:"/_next/static/chunks/main-f0244287ca3d9481192d.js",revision:"c3fdde600c48b83639a6ceb95023e380"},{url:"/_next/static/chunks/pages/_app-27b471219be202261cc9.js",revision:"7369c7ecc0642de7792869b7e69276ec"},{url:"/_next/static/chunks/pages/_error-3c032f857e4fa8059a40.js",revision:"585bed3bbc93eb84404aef8829a12db4"},{url:"/_next/static/chunks/pages/add-dee0306bd605e39e5ff3.js",revision:"1ea309a181865f247a9b2aacda4c1dbd"},{url:"/_next/static/chunks/pages/brands-4b4e8d7624e43ac7d723.js",revision:"590c84cf94cad22d4ae52f81a3ac5f4b"},{url:"/_next/static/chunks/pages/brands/%5Bbrand%5D-adff7fcbd20e2e4e0782.js",revision:"6c0978c78234114eb6c1f02c9da5cdbe"},{url:"/_next/static/chunks/pages/index-68dd1ec4f4968182dd14.js",revision:"f48e7fcd62531593c6516e48ad0a1323"},{url:"/_next/static/chunks/pages/login-94cc2177b0d30e30e1b3.js",revision:"c5527a309f25062d822151100964bd3d"},{url:"/_next/static/chunks/pages/logout-b6eeea018922d33b607f.js",revision:"2015e50772e2145d0be0c857a7589c65"},{url:"/_next/static/chunks/pages/rules-98b6b641d605064fe9e6.js",revision:"dee216ebd89d443240d028ab834ebab1"},{url:"/_next/static/chunks/pages/users-e543c74946c13df17bea.js",revision:"2bfd8b8a66fcb4acca8875dd9e338eb5"},{url:"/_next/static/chunks/pages/users/%5Buser%5D-d3dbd389f168322a208a.js",revision:"183960714ad1664654594872b7216ce3"},{url:"/_next/static/chunks/pages/users/edit-3613cbe7c1171fbc74bd.js",revision:"ef6184f4b78d87fe47ee410bdb00cb82"},{url:"/_next/static/chunks/pages/verify-email-9ccf8bea6cdb11549365.js",revision:"6e5b663ef064ef9bbc618efe4e0ac8a8"},{url:"/_next/static/chunks/polyfills-764aefe5669e6dc02ad1.js",revision:"46e01f1330568f9bca372f2b380455fc"},{url:"/_next/static/chunks/webpack-e067438c4cf4ef2ef178.js",revision:"8c19f623e8389f11131a054a7e17ff95"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
