/*
 * Wallaby.js - v1.0.1328
 * https://wallabyjs.com
 * Copyright (c) 2014-2022 Wallaby.js - All Rights Reserved.
 *
 * This source code file is a part of Wallaby.js and is a proprietary (closed source) software.

 * IMPORTANT:
 * Wallaby.js is a tool made by software developers for software developers with passion and love for what we do.
 * Pirating the tool is not only illegal and just morally wrong,
 * it is also unfair to other fellow programmers who are using it legally,
 * and very harmful for the tool and its future.
 */
function ignored(e){return!~ignore.indexOf(e)}function highlight(e){return e.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\/\/(.*)/gm,'<span class="comment">//$1</span>').replace(/('.*?')/gm,'<span class="string">$1</span>').replace(/(\d+\.\d+)/gm,'<span class="number">$1</span>').replace(/(\d+)/gm,'<span class="number">$1</span>').replace(/\bnew[ \t]+(\w+)/gm,'<span class="keyword">new</span> <span class="init">$1</span>').replace(/\b(function|new|throw|return|var|if|else)\b/gm,'<span class="keyword">$1</span>')}var fs=require("fs"),path=require("path"),basename=path.basename,exists=fs.existsSync||path.existsSync,glob=require("glob"),join=path.join,debug=require("debug")("mocha:watch"),ignore=["node_modules",".git"];exports.escape=function(e){return String(e).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/</g,"&lt;").replace(/>/g,"&gt;")},exports.forEach=function(e,t,i){for(var r=0,n=e.length;r<n;r++)t.call(i,e[r],r)},exports.map=function(e,t,i){for(var r=[],n=0,s=e.length;n<s;n++)r.push(t.call(i,e[n],n));return r},exports.indexOf=function(e,t,i){for(var r=i||0,n=e.length;r<n;r++)if(e[r]===t)return r;return-1},exports.reduce=function(e,t,i){for(var r=i,n=0,s=e.length;n<s;n++)r=t(r,e[n],n,e);return r},exports.filter=function(e,t){for(var i=[],r=0,n=e.length;r<n;r++){var s=e[r];t(s,r,e)&&i.push(s)}return i},exports.keys=Object.keys||function(e){var t=[],i=Object.prototype.hasOwnProperty;for(var r in e)i.call(e,r)&&t.push(r);return t},exports.watch=function(e,t){var i={interval:100};e.forEach(function(e){debug("file %s",e),fs.watchFile(e,i,function(i,r){r.mtime<i.mtime&&t(e)})})},exports.files=function(e,t,i){i=i||[],t=t||["js"];var r=new RegExp("\\.("+t.join("|")+")$");return fs.readdirSync(e).filter(ignored).forEach(function(n){n=join(e,n),fs.statSync(n).isDirectory()?exports.files(n,t,i):n.match(r)&&i.push(n)}),i},exports.slug=function(e){return e.toLowerCase().replace(/ +/g,"-").replace(/[^-\w]/g,"")},exports.clean=function(e){e=e.replace(/\r\n?|[\n\u2028\u2029]/g,"\n").replace(/^\uFEFF/,"").replace(/^function *\(.*\) *{|\(.*\) *=> *{?/,"").replace(/\s+\}$/,"");var t=e.match(/^\n?( *)/)[1].length,i=e.match(/^\n?(\t*)/)[1].length,r=new RegExp("^\n?"+(i?"\t":" ")+"{"+(i?i:t)+"}","gm");return e=e.replace(r,""),exports.trim(e)},exports.trim=function(e){return e.replace(/^\s+|\s+$/g,"")},exports.parseQuery=function(e){return exports.reduce(e.replace("?","").split("&"),function(e,t){var i=t.indexOf("="),r=t.slice(0,i),n=t.slice(++i);return e[r]=decodeURIComponent(n),e},{})},exports.highlightTags=function(e){for(var t=document.getElementById("mocha").getElementsByTagName(e),i=0,r=t.length;i<r;++i)t[i].innerHTML=highlight(t[i].innerHTML)};var emptyRepresentation=function(e,t){switch(t=t||exports.type(e)){case"function":return"[Function]";case"object":return"{}";case"array":return"[]";default:return e.toString()}};exports.type=function(e){return"undefined"!=typeof Buffer&&Buffer.isBuffer(e)?"buffer":Object.prototype.toString.call(e).replace(/^\[.+\s(.+?)\]$/,"$1").toLowerCase()},exports.stringify=function(e){var t,i=exports.type(e);if("null"===i||"undefined"===i)return"["+i+"]";if("date"===i)return"[Date: "+e.toISOString()+"]";if(!~exports.indexOf(["object","array","function"],i))return e.toString();for(t in e)if(e.hasOwnProperty(t))return JSON.stringify(exports.canonicalize(e),null,2).replace(/,(\n|$)/g,"$1");return emptyRepresentation(e,i)},exports.isBuffer=function(e){return"undefined"!=typeof Buffer&&Buffer.isBuffer(e)},exports.canonicalize=function(e,t){var i,r,n=exports.type(e),s=function(e,i){t.push(e),i(),t.pop()};if(t=t||[],exports.indexOf(t,e)!==-1)return"[Circular]";switch(n){case"undefined":i="[undefined]";break;case"buffer":case"null":i=e;break;case"array":s(e,function(){i=exports.map(e,function(e){return exports.canonicalize(e,t)})});break;case"date":i="[Date: "+e.toISOString()+"]";break;case"function":for(r in e){i={};break}if(!i){i=emptyRepresentation(e,n);break}case"object":i=i||{},s(e,function(){exports.forEach(exports.keys(e).sort(),function(r){i[r]=exports.canonicalize(e[r],t)})});break;case"number":case"boolean":i=e;break;default:i=e.toString()}return i},exports.lookupFiles=function e(t,i,r){var n=[],s=new RegExp("\\.("+i.join("|")+")$");if(!exists(t)){if(!exists(t+".js")){if(n=glob.sync(t),!n.length)throw new Error("cannot resolve path (or pattern) '"+t+"'");return n}t+=".js"}try{var o=fs.statSync(t);if(o.isFile())return t}catch(a){return}return fs.readdirSync(t).forEach(function(o){o=join(t,o);try{var a=fs.statSync(o);if(a.isDirectory())return void(r&&(n=n.concat(e(o,i,r))))}catch(l){return}a.isFile()&&s.test(o)&&"."!==basename(o)[0]&&n.push(o)}),n},exports.undefinedError=function(){return new Error("Caught undefined error, did you throw without specifying what?")},exports.getError=function(e){return e||exports.undefinedError()};