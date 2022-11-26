/*!
* blogger.section 0.1.0
* https://github.com/Karasu-themes/bloggerSection
*
* Copyright © 2022 MarceloTLD
* 
* Released under the MIT License
*-----------------------------------------------*/
(function(d,f){typeof exports=="object"&&typeof module<"u"?module.exports=f():typeof define=="function"&&define.amd?define(f):(d=typeof globalThis<"u"?globalThis:d||self,d.bloggerSection=f())})(this,function(){"use strict";function d(e,t){const r=(s,l)=>{e(s,l)};return new IntersectionObserver(r,t||{threshold:.3})}function f(e){const t={},r=/[\$\w+\{.+\}\,\:\/\.\-]{1,}/g;return e.match(r).forEach(n=>{const s=n.match(/\$\w+/g)[0].replace(/\$/g,""),l=n.match(/\{[a-z-A-Z-0-9-\.-\:-\,]{1,}/g)[0].replace(/\}|\{/g,""),i={};i[s]=l,Object.assign(t,{...i})}),t}function g(e,t){function r(s,l){if(!Array.isArray(l))return s;const i=/{for(\.\w+)\s+(.+)\s+\/for}/g;let a="";if(i.test(s)){const c=s.match(i)[0].replace(/{for(\.\w+)|\/for}/g,"").trim();l.forEach(o=>{a+=c.replace(/labelName/g,o)})}return s.replace(i,a).trim()}const n=t.replace(/\{\w+\}/g,s=>{let l=s.replace(/{|}/g,"");return e[l]});return r(n,e.label)}function b(e,t){function r(c){return c.match(/post-\d{1,}/g)[0].replace("post-","")}function n(c){let o=c,u="";for(var m=0;m<o.length;m++)o[m].rel=="alternate"&&(u=o[m].href);return u}function s(c){return c.replace(/<[^>]*>?/g,"")}function l(c){const o=s(c);return o.length>t.summaryLength?o.substr(0,t.summaryLength)+"...":o}function i(c){let o=document.createElement("div");o.innerHTML=c;let u=o.querySelector("img");return console.log(u),u?u.getAttribute("src"):t.dftImg||"#noImageFounded"}const a=e.content?e.content.$t:e.summary.$t;return{id:r(e.id.$t),title:e.title?e.title.$t:"No title",thumbnail:e.media$thumbnail?e.media$thumbnail.url.replace(/s\B\d{2,4}(-?w\d{2,4})?-c/,t.resimg?t.resimg:"s200"):i(a),label:e.category?e.category.map(c=>c.term):"",link:n(e.link),url:n(e.link),content:a,summary:l(a),datePost:new Date(e.published.$t).toLocaleDateString(),postUpdate:new Date(e.updated.$t).toLocaleDateString(),datePostIso8601:e.published.$t,authorName:e.name?e.name.$t:"Unknown",authorUri:e.uri?e.uri.$t:"#noProfileUrl"}}function y(e,t,r,n){let s=document.createElement("script"),l=`${e}/feeds/posts/${t?"default/-/"+t:"default"}?alt=json-in-script&max-results=${n}&callback=${r}`;return s.src=l,s}function x(e,t,r,n){return new Promise(s=>{const l=y(e,t,r,n);document.body.appendChild(l),window[r]=a=>{s(a.feed.entry||!1)}})}class w{constructor(t,r){this.config=t||{},this.template="",this.custom=r||{},this.mode={},this.init()}#e(){return'<div class="default-card text-left"><picture class="mb-2 block"><a href="{url}" class="block"><img src="{thumbnail}" class="rounded w-full h-36 object-cover"></a></picture><h2 class="text-lg font-bold text-slate-700">{title}</h2><div class="mb-2"><a class="text-xs font-semibold opacity-75" href="{authorUri}">{authorName}</a> - <time class="text-xs font-semibold opacity-75" datetime="{datePostIso8601}">{datePost}</ti></div><p class="text-slate-500 text-sm mb-2">{summary}</p> <div class="flex items-center flex-wrap gap-2 mt-2">{for.label <a href="/search/label/labelName" class="px-2 py-1 bg-slate-100 font-bold text-slate-800 rounded text-xs">labelName</a> /for}</div> <a href="{url}" class="bg-indigo-500 text-white hover:bg-indigo-700 text-xs uppercase duration-150 py-2 px-2 font-semibold rounded inline-block mt-2">More details</a></div>'}setTemplate(t){this.template=t}#t(){return this.template||this.#e()}getMode(t,r){for(var n=0,s=t.length;n<s;n++)if(t[n].b==r)return t[n]}init(){const t=document.querySelectorAll(".bs-wrapper");if(t.length==0){console.warn("Warning: The node elements is not founded, please check if the node element passing as parameter exist en your HTML document");return}let r=d((n,s)=>{n.forEach(l=>{let i=l.target;if(l.isIntersecting){const a=i.querySelector(".bs-container"),{bsCfg:c}=i.dataset,o=f(c),u=window.location.protocol+"//"+window.location.hostname;x(o.homeUrl||u,o.label,"bsFn"+(i.index+1),o.results||6).then(m=>{a.innerHTML="",o.mode?this.custom.modes.find(h=>h.name==o.mode).doAction.call(this,i,a,m):(m.forEach(p=>{const h=b(p,this.config);a.innerHTML+=this.custom.customItem?this.custom.customItem.call(this,h,o.style):g(h,this.#t())}),i.removeAttribute("data-bs-cfg"),this.custom.customWrapper&&this.custom.customWrapper.call(this,i,a,o.style))}),r.unobserve(i)}})});t.forEach((n,s)=>{n.index=s,r.observe(n)})}}return w});
