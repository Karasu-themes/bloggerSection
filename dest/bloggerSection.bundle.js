/*!
* blogger.section 0.1.0
* https://github.com/Karasu-themes/bloggerSection
*
* Copyright © 2022 MarceloTLD
* 
* Released under the MIT License
*-----------------------------------------------*/
var bloggerSection=function(){"use strict";return class{constructor(e){this.config=e||{},this.template="",this.mode={},this.init()}#e(){return'<div class="default-card text-left"><picture class="mb-2 block"><a href="{url}" class="block"><img src="{thumbnail}" class="rounded w-full h-36 object-cover"></a></picture><h2 class="text-lg font-bold text-slate-700">{title}</h2><div class="mb-2"><a class="text-xs font-semibold opacity-75" href="{authorUri}">{authorName}</a> - <time class="text-xs font-semibold opacity-75" datetime="{datePostIso8601}">{datePost}</ti></div><p class="text-slate-500 text-sm mb-2">{summary}</p> <div class="flex items-center flex-wrap gap-2 mt-2">{for.label <a href="/search/label/labelName" class="px-2 py-1 bg-slate-100 font-bold text-slate-800 rounded text-xs">labelName</a> /for}</div> <a href="{url}" class="bg-indigo-500 text-white hover:bg-indigo-700 text-xs uppercase duration-150 py-2 px-2 font-semibold rounded inline-block mt-2">More details</a></div>'}setTemplate(e){this.template=e}#t(){return this.template||this.#e()}scriptHTML(e,t,r,a){let s=document.createElement("script"),o=`${e}/feeds/posts/${t?"default/-/"+t:"default"}?alt=json-in-script&max-results=${a}&callback=${r}`;return s.src=o,s}#r(e){const t={};return e.match(/[\$\w+\{.+\}\,\:\/\.\-]{1,}/g).forEach((e=>{const r=e.match(/\$\w+/g)[0].replace(/\$/g,""),a=e.match(/\{[a-z-A-Z-0-9-\.-\:-\,]{1,}/g)[0].replace(/\}|\{/g,""),s={};s[r]=a,Object.assign(t,{...s})})),t}getDataPosts(e,t,r,a){return new Promise((s=>{const o=this.scriptHTML(e,t,r,a);document.body.appendChild(o),window[r]=e=>{s(e.feed.entry||!1)}}))}parserData(e,t){function r(e){let t=e,r="";for(var a=0;a<t.length;a++)"alternate"==t[a].rel&&(r=t[a].href);return r}const a=e.content?e.content.$t:e.summary.$t;return{id:(s=e.id.$t,s.match(/post-\d{1,}/g)[0].replace("post-","")),title:e.title?e.title.$t:"No title",thumbnail:e.media$thumbnail?e.media$thumbnail.url.replace(/s\B\d{2,4}(-?w\d{2,4})?-c/,t.resimg?t.resimg:"s200"):function(e){let r=document.createElement("div");r.innerHTML=e;let a=r.querySelector("img");return console.log(a),a?a.getAttribute("src"):t.dftImg||"#noImageFounded"}(a),label:e.category?e.category.map((e=>e.term)):"",link:r(e.link),url:r(e.link),content:a,summary:function(e){const r=e.replace(/<[^>]*>?/g,"");return r.length>t.summaryLength?r.substr(0,t.summaryLength)+"...":r}(a),datePost:new Date(e.published.$t).toLocaleDateString(),postUpdate:new Date(e.updated.$t).toLocaleDateString(),datePostIso8601:e.published.$t,authorName:e.name?e.name.$t:"Unknown",authorUri:e.uri?e.uri.$t:"#noProfileUrl"};var s}renderHTML(e,t){return function(e,t){if(!Array.isArray(t))return e;const r=/{for(\.\w+)\s+(.+)\s+\/for}/g;let a="";if(r.test(e)){const s=e.match(r)[0].replace(/{for(\.\w+)|\/for}/g,"").trim();t.forEach((e=>{a+=s.replace(/labelName/g,e)}))}return e.replace(r,a).trim()}(t.replace(/\{\w+\}/g,(t=>{let r=t.replace(/{|}/g,"");return e[r]})),e.label)}init(){const e=document.querySelectorAll(".bs-wrapper");0!=e.length?[...e].forEach(((e,t)=>{const r=e.querySelector(".bs-container"),{bsCfg:a}=e.dataset,s=this.#r(a),o=window.location.protocol+"//"+window.location.hostname;this.getDataPosts(s.homeUrl||o,s.label,"bsFn"+(t+1),s.results||6).then((t=>{r.innerHTML="",this.config.modes&&"function"==typeof this.config.modes[s.mode]?this.config.modes[s.mode].call(this,e,r,t,{config:s,parserData:this.parserData,renderHTML:this.renderHTML}):(t.forEach((e=>{const t=this.parserData(e,this.config);r.innerHTML+=this.renderHTML(t,this.#t())})),this.config.wrapperHook&&"function"==typeof this.config.wrapperHook&&this.config.wrapperHook(r))})),e.removeAttribute("data-bs-cfg")})):console.warn("Warning: The node elements is not founded, please check if the node element passing as parameter exist en your HTML document")}}}();
