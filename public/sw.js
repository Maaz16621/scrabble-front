if(!self.define){let e,s={};const i=(i,a)=>(i=new URL(i+".js",a).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,c)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let o={};const n=e=>i(e,r),f={module:{uri:r},exports:o,require:n};s[r]=Promise.all(a.map((e=>f[e]||n(e)))).then((e=>(c(...e),o)))}}define(["./workbox-4754cb34"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"df37b5f1bc2082ac01a7e51e572140f8"},{url:"/_next/static/OgvAy3oZUf1iHqRnF7oGp/_buildManifest.js",revision:"f7e5c20a4c018442ceb63f73427a22b5"},{url:"/_next/static/OgvAy3oZUf1iHqRnF7oGp/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/2-bdb29a50c72cd4d5.js",revision:"OgvAy3oZUf1iHqRnF7oGp"},{url:"/_next/static/chunks/203.2b4c1ee4fbe3a7cf.js",revision:"2b4c1ee4fbe3a7cf"},{url:"/_next/static/chunks/218.3358343a3649120f.js",revision:"3358343a3649120f"},{url:"/_next/static/chunks/4bd1b696-3850ea0a7d51de84.js",revision:"OgvAy3oZUf1iHqRnF7oGp"},{url:"/_next/static/chunks/517-2b50eee9811fd967.js",revision:"OgvAy3oZUf1iHqRnF7oGp"},{url:"/_next/static/chunks/651-9bc0f78ae375d5ff.js",revision:"OgvAy3oZUf1iHqRnF7oGp"},{url:"/_next/static/chunks/735-fe05e98a70e91dec.js",revision:"OgvAy3oZUf1iHqRnF7oGp"},{url:"/_next/static/chunks/app/%5Bslug%5D/page-5e2c2e8e82206001.js",revision:"OgvAy3oZUf1iHqRnF7oGp"},{url:"/_next/static/chunks/app/_not-found/page-7e2fd005c895748b.js",revision:"OgvAy3oZUf1iHqRnF7oGp"},{url:"/_next/static/chunks/app/blog/%5Bslug%5D/page-2e85a157287e905e.js",revision:"OgvAy3oZUf1iHqRnF7oGp"},{url:"/_next/static/chunks/app/layout-c047c5e18ac34030.js",revision:"OgvAy3oZUf1iHqRnF7oGp"},{url:"/_next/static/chunks/app/page-fd2f88bf8fd766c4.js",revision:"OgvAy3oZUf1iHqRnF7oGp"},{url:"/_next/static/chunks/app/results/page-ee8aa3e25b90c17e.js",revision:"OgvAy3oZUf1iHqRnF7oGp"},{url:"/_next/static/chunks/app/wordle-results/page-872863d0c98dd7d9.js",revision:"OgvAy3oZUf1iHqRnF7oGp"},{url:"/_next/static/chunks/framework-df828e81b6c0e2a3.js",revision:"OgvAy3oZUf1iHqRnF7oGp"},{url:"/_next/static/chunks/main-7f202a5f8e6579f4.js",revision:"OgvAy3oZUf1iHqRnF7oGp"},{url:"/_next/static/chunks/main-app-32650b5c9f67c89c.js",revision:"OgvAy3oZUf1iHqRnF7oGp"},{url:"/_next/static/chunks/pages/_app-430fec730128923e.js",revision:"OgvAy3oZUf1iHqRnF7oGp"},{url:"/_next/static/chunks/pages/_error-4ebd2b7e0b4d27d8.js",revision:"OgvAy3oZUf1iHqRnF7oGp"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-7232fcef9a69be75.js",revision:"OgvAy3oZUf1iHqRnF7oGp"},{url:"/_next/static/css/014dfbd8f7502d55.css",revision:"014dfbd8f7502d55"},{url:"/_next/static/css/27d280f261760968.css",revision:"27d280f261760968"},{url:"/_next/static/css/52d1ed7ab39457af.css",revision:"52d1ed7ab39457af"},{url:"/_next/static/css/747fafd1c0e87624.css",revision:"747fafd1c0e87624"},{url:"/_next/static/media/569ce4b8f30dc480-s.p.woff2",revision:"ef6cefb32024deac234e82f932a95cbd"},{url:"/_next/static/media/747892c23ea88013-s.woff2",revision:"a0761690ccf4441ace5cec893b82d4ab"},{url:"/_next/static/media/93f479601ee12b01-s.p.woff2",revision:"da83d5f06d825c5ae65b7cca706cb312"},{url:"/_next/static/media/ba015fad6dcf6784-s.woff2",revision:"8ea4f719af3312a055caf09f34c89a77"},{url:"/_next/static/media/fa-brands-400.86ee2658.woff2",revision:"86ee2658"},{url:"/_next/static/media/fa-brands-400.8eaf0c88.ttf",revision:"8eaf0c88"},{url:"/_next/static/media/fa-regular-400.849b82e2.woff2",revision:"849b82e2"},{url:"/_next/static/media/fa-regular-400.bd1cf947.ttf",revision:"bd1cf947"},{url:"/_next/static/media/fa-solid-900.7a5aa5ab.ttf",revision:"7a5aa5ab"},{url:"/_next/static/media/fa-solid-900.ee698398.woff2",revision:"ee698398"},{url:"/_next/static/media/fa-v4compatibility.59487ca3.woff2",revision:"59487ca3"},{url:"/_next/static/media/fa-v4compatibility.c63df8a6.ttf",revision:"c63df8a6"},{url:"/file.svg",revision:"d09f95206c3fa0bb9bd9fefabfd0ea71"},{url:"/globe.svg",revision:"2aaafa6a49b6563925fe440891e32717"},{url:"/img/android-chrome-512x512.png",revision:"d3b3e171448d7b16584d3ce006b8c81f"},{url:"/img/hero.jpg",revision:"07d1a91d6159664d1725faa54f29253c"},{url:"/img/icon-192x192.png",revision:"39ff95e4f7dafceaa7ad207ef4a5bdc7"},{url:"/img/icon-512x512.png",revision:"1ffe45e6ba20711dcf6d0ae9f29cb06a"},{url:"/img/logo.png",revision:"2e3f478e7b8721fbf4aa57d3ce0006cb"},{url:"/img/logo.webp",revision:"30e81f4429182b75a0d50b8f9cdc0bc4"},{url:"/img/logo_qnbieg_c_scale,w_1186.webp",revision:"76b8c2bcb0741beb6f7f08040edc4009"},{url:"/img/logo_qnbieg_c_scale,w_1400.webp",revision:"bc39f24e803e1c07398b65b3ba04ed51"},{url:"/img/logo_qnbieg_c_scale,w_200.webp",revision:"2e2a599c93c1f2546c0dd7640f1fdef1"},{url:"/img/logo_qnbieg_c_scale,w_792.webp",revision:"7dbcef7766c6f446da96a542a8a67edc"},{url:"/next.svg",revision:"8e061864f388b47f33a1c3780831193e"},{url:"/sources/american-words.10",revision:"491e5ef58014a1ff04e345cf8abd9b75"},{url:"/sources/american-words.20",revision:"965b3b161abd9c709e89d96e4c36828f"},{url:"/sources/american-words.35",revision:"c1312122662f064394ffcc09438ac5ba"},{url:"/sources/american-words.40",revision:"2225645c30176353b82d117fac205ad0"},{url:"/sources/american-words.50",revision:"be751d0a905d4234331cdc8f47a43f2a"},{url:"/sources/american-words.55",revision:"03e5abd4761b72e9264e91d763d7f40f"},{url:"/sources/american-words.60",revision:"8270262fa1e9f82e0dce1e198c2b3846"},{url:"/sources/american-words.70",revision:"444083bc35efd05c82d4cee04883e3be"},{url:"/sources/australian-words.10",revision:"173f97d6b6c9365f420d077c45ddbbf8"},{url:"/sources/australian-words.20",revision:"0e0c67e92fba47dceb052460dcdb1de1"},{url:"/sources/australian-words.35",revision:"2426bb00f98f58ef31ec67fbeb6d2f61"},{url:"/sources/australian-words.40",revision:"8a36b27353282cf871e668b361a717f0"},{url:"/sources/australian-words.50",revision:"34b88474eecb4c37c2a7b6f74295a3f7"},{url:"/sources/australian-words.55",revision:"5083bbf3793a8e5d65527b579c1126ab"},{url:"/sources/australian-words.60",revision:"d9091a9a8e27d1ac40ad88d863b60de3"},{url:"/sources/australian-words.70",revision:"ab2b2e1f0d412e2c3fdee2dd70934c80"},{url:"/sources/british-words.10",revision:"868bf091d5b983e8e0ab3afad0ac70de"},{url:"/sources/british-words.20",revision:"82412c09938a589bfc6280f84166420c"},{url:"/sources/british-words.35",revision:"03b4931159ccebc21a97efc87e1ace09"},{url:"/sources/british-words.40",revision:"8a36b27353282cf871e668b361a717f0"},{url:"/sources/british-words.50",revision:"e0bbc5671079eeec40733b10f803dd40"},{url:"/sources/british-words.55",revision:"5083bbf3793a8e5d65527b579c1126ab"},{url:"/sources/british-words.60",revision:"d9091a9a8e27d1ac40ad88d863b60de3"},{url:"/sources/british-words.70",revision:"e679f9087f562708b3f7a759ade61320"},{url:"/sources/canadian-words.10",revision:"69b6c0ac3b7260c5ee1d71fc47f91fe5"},{url:"/sources/canadian-words.20",revision:"a5f8a5eb7ff987c737294c4857cae685"},{url:"/sources/canadian-words.35",revision:"f913cd1c847afba2ca829bb1c121169f"},{url:"/sources/canadian-words.40",revision:"3e739c5e9ee0cdd658f4cc723c8498f8"},{url:"/sources/canadian-words.50",revision:"07e4da141e924e01574a919ae5b3eaf2"},{url:"/sources/canadian-words.55",revision:"7a01ba4961d72e0f6ffbc094b86bbe38"},{url:"/sources/canadian-words.60",revision:"fac16de183802f2e22126b78f49bf5d1"},{url:"/sources/canadian-words.70",revision:"0d22ba817fe3e61f62efb2fdf1b4a8b1"},{url:"/sources/english-words.10",revision:"5428d2c7a6fbf22b15a5e4a3ef132fa5"},{url:"/sources/english-words.20",revision:"d4641e521556ad4aa160008e15e0e8e6"},{url:"/sources/english-words.35",revision:"069e2520215ebf352a8cd1efa46146f1"},{url:"/sources/english-words.40",revision:"a5b0c3099f98c2037d636916fb354fcd"},{url:"/sources/english-words.50",revision:"bf7de16a8d82301798c0c9d8cfdc6bfa"},{url:"/sources/english-words.55",revision:"c696903bb5ef07c8fedd276a35418fe9"},{url:"/sources/english-words.60",revision:"91de6595d2ccad708595f8330c68e7b8"},{url:"/sources/english-words.70",revision:"a7f63ac2290c8a6dc54a02606523b1f3"},{url:"/sources/letterBox.txt",revision:"b6f136f13c4f3b455ff48efc0fdeec66"},{url:"/sources/main_dic_uk.txt",revision:"4f4c95d853fddcee093c593c6015f1d0"},{url:"/sources/main_dic_us.txt",revision:"db809a9588d9b375a7e3b96444e0d93c"},{url:"/sources/main_dic_wwf.txt",revision:"e5bec71c5cf69551bf85d721033d2f78"},{url:"/sources/new_dic.txt",revision:"679ca312f6c7f380eff58921c55efe94"},{url:"/sources/wordle-La-old.txt",revision:"44a432e2857f632df811dca836916c74"},{url:"/sources/wordle-La.txt",revision:"76c2477c2d77769b058fea24a37e5d1e"},{url:"/sources/wordle-Ta.txt",revision:"0cc216a4391776000671f0b7cf4a4213"},{url:"/sources/wwf_new.txt",revision:"33f2b09e2d9dfb732fa16b5f05a5a8d1"},{url:"/tool-icons/Anagram Solver.svg",revision:"201b3dd87272a1f9e078ed5ee884a1c1"},{url:"/tool-icons/Jumble Solver.svg",revision:"19002a4ced0901a141748256e64cffa1"},{url:"/tool-icons/Scrabble GO.svg",revision:"152c85f3a66fc917bc2bb6afb71e82cf"},{url:"/tool-icons/Scrabble Word Finder.svg",revision:"085df4d4725511087b8289b656a02c2a"},{url:"/tool-icons/Text Twist Solver.svg",revision:"e00b1e8aa504c7b30294241c455e1187"},{url:"/tool-icons/Word Chum Cheats.svg",revision:"efbdb3822b68cb9ce419b203a3a78f33"},{url:"/tool-icons/Word Cookies Answer.svg",revision:"b02146fb7145a9ae6174c1305d691c61"},{url:"/tool-icons/Word Finder.svg",revision:"850adfae5b532950e1e0823db4463f62"},{url:"/tool-icons/Word Scramble.svg",revision:"cb92a673708478b233d435c0835c9839"},{url:"/tool-icons/Word Unscrambler.svg",revision:"11f49b0cf028d8ce01a6dde93c81a12f"},{url:"/tool-icons/Wordfeud Helper.svg",revision:"fe1bd0aa73be58549a85e30cc688f8cd"},{url:"/tool-icons/Words With Friends.svg",revision:"2c1088e0dcf1cab677ededceb68a95fd"},{url:"/tool-icons/Words of Wonders.svg",revision:"079d519c34054059b6aa9c891263dd03"},{url:"/tool-icons/Wordscapes Solver.svg",revision:"1c04509314b795dd8da367b4b286e2a6"},{url:"/vercel.svg",revision:"c0af2f507b369b085b35ef4bbe3bcf1e"},{url:"/window.svg",revision:"a2760511c65806022ad20adf74370ff3"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:i,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
