/*!
* blogger.section 1.0.0
* https://github.com/Karasu-themes/bloggerSection
*
* Copyright © 2022 MarceloTLD
* 
* Released under the MIT License
*-----------------------------------------------*/
var BloggerSection=function(d){"use strict";function y(e,t){const r=(o,c)=>{e(o,c)};return new IntersectionObserver(r,t||{threshold:.3,rootMargin:"200px"})}function w(e,t,r,n){let o=document.createElement("script"),c=`${e}/feeds/posts/${t?"default/-/"+t:"default"}?alt=json-in-script&max-results=${n}&callback=${r}`;return o.src=c,o}function E(e,t,r,n){return new Promise(o=>{const c=w(e,t,r,n);document.body.appendChild(c),window[r]=a=>{o(a.feed.entry||[])},c.remove()})}function g(e,t){var r;for(r in t)t.hasOwnProperty(r)&&(e[r]=t[r]);return e}function v(e){let t={};const r=/data-[\w-]+=[\"']+[^\"']+[\"']+/g,n=e.match(r);return!n||n.length==0?{}:(n.forEach(o=>{const c=o.match(/[\"'].+[\"']/)[0].replace(/\"|\'/g,""),s=o.match(/data-.+=/g)[0].replace(/data-|=/g,"").replace(/-\w+/g,function(a){const u=a.replace("-","");return u[0].toUpperCase()+u.slice(1)});t[s]=c}),t)}function I(e){return e.replace(/<[^>]*>?/g,"")}function T(e){const t=e.id.$t.match(/post-\d{1,}/g);return t?t[0].replace("post-",""):""}function $(e){const t=e.id.$t.match(/blog-\d{1,}/g);return t?t[0].replace("blog-",""):""}function D(e){return e.title?e.title.$t:"No title"}function h(e){return e.content?e.content.$t:e.summary?e.summary.$t:""}function _(e){let t="";return e.link.forEach(r=>{r.rel=="alternate"&&(t=r.href)}),t}function A(e,t){const r=I(e);return r.length>t?r.substr(0,t)+"...":r}function L(e,t){let r=document.createElement("div");r.innerHTML=e;let n=r.querySelector("img");return n?n.src:t}function S(e,t){return e.media$thumbnail?e.media$thumbnail.url:t}function k(e){return{authorName:e.name?e.name.$t:"Unknown",authorUri:e.uri?e.uri.$t:"#noProfileUrl"}}function M(e){return{datePost:e.published?new Date(e.published.$t).toLocaleDateString():"",postUpdate:e.updated?new Date(e.updated.$t).toLocaleDateString():"",datePostIso8601:e.updated.$t??e.published.$t}}function P(e){return e.category?e.category.map(t=>t.term):[]}function x(e,t){const r=h(e),n=L(r,t.defaultImage||"#noImageFounded");return{title:D(e),url:_(e),postID:T(e),blogID:$(e),image:n,thumbnail:S(e,n),body:h(e),summary:A(r,t.summary||96),labels:P(e),...k(e),...M(e),...v(r)}}function N(e,t){return e.replace(/\{(\w+)\}/g,function(r){const n=r.replace(/\{|\}/g,"");return t[n]||""})}function U(e,t){return e.replace(/{if(\.\w+\s)[^]*?\/}/g,function(r){const n=r.match(/if.\w+/)[0].replace("if.","");return t[n]?r.replace(/{if.\w+|\/\}/g,""):""})}function F(e,t){return e.replace(/{else(\.\w+\s)[^]*?\/}/g,function(r){const n=r.match(/else.\w+/)[0].replace("else.","");return t[n]?"":r.replace(/{else.\w+|\/\}/g,"")})}function O(e,t){return e.replace(/\{image(.+)\}/g,function(r){const n=r.replace(/\{image|\(|\)|\}/g,"");return t.thumbnail?t.thumbnail.replace(/s\B\d{2,4}(-?w\d{2,4})?-c/,n):""})}function R(e,t){function r(o,c){return c.some(s=>o.includes(s))}function n(o){const c=o.replace(/\[(.+)\]/g,""),s=o.replace(/include|exclude|remove|\[|\]/g,"").split(",").map(a=>a.trim());return{action:c.trim(),params:s}}return e.replace(/{loop\.(.+\s)[^]*?\/}/g,function(o){let c="";const{action:s,params:a}=/\((.+)\)/.test(o)?n(o.match(/\((.+)\)/)[1]):{},u=o.match(/loop.\w+/)[0].replace("loop.",""),p=o.replace(/{loop\.(.+\s)|\/}/g,"");if(t[u]){const f=t[u];return s=="remove"?f.filter(l=>!a.includes(l)).forEach((l,i)=>{c+=p.replace(/@value/g,l).replace(/@index/g,i+1)}):s=="include"?f.filter(l=>r(l,a)).forEach((l,i)=>{c+=p.replace(/@value/g,l).replace(/@index/g,i+1)}):s=="exclude"?f.filter(l=>!r(l,a)).forEach((l,i)=>{c+=p.replace(/@value/g,l).replace(/@index/g,i+1)}):f.forEach((l,i)=>{c+=p.replace(/@value/g,l).replace(/@index/g,i+1)}),c}else return""})}function q(e,t){let r=N(e,t);return[U,F,R,O].forEach(o=>{r=o(r,t)}),r}function C(e,t){const r=document.querySelectorAll(".bs-wrapper");if(r.length==0){console.warn("Warning: The node elements is not founded, please check if the node element passing as parameter exist en your HTML document");return}const n={summary:96,results:6,empty:"Empty"};let o=y((c,s)=>{c.forEach(a=>{let u=a.target;const p=u.querySelector(".bs-container");if(!p)return;const f=p.querySelector(".bs-render"),l=f.innerHTML.replace(/data-/g,"");if(a.isIntersecting){const i=g({...n,...e,...t??{}},u.dataset??{}),H=window.location.protocol+"//"+window.location.hostname;E(i.homeUrl||H,i.label,"bsFn"+(u.index+1),i.results).then(b=>{let m="";u.querySelector(".bs-loader")&&(u.querySelector(".bs-loader").innerHTML=""),b.length>0?b.forEach(G=>{const B=x(G,g(n,i));m+=q(l,B)}):m+=`<p class="bs-empty">${i.empty||n.empty}</p>`,p.innerHTML=m,i.modes&&i.modes[i.mode]&&typeof i.modes[i.mode]=="function"&&i.modes[i.mode].call(this,u,p,i)}),o.unobserve(u)}})});r.forEach((c,s)=>{c.index=s,o.observe(c)})}return d.init=C,d}({});
