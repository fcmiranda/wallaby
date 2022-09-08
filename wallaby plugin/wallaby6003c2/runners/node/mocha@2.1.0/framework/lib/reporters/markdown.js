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
function Markdown(e){function t(e){return Array(s).join("#")+" "+e}function i(e,t){var r=t,n=SUITE_PREFIX+e.title;return t=t[n]=t[n]||{suite:e},e.suites.forEach(function(e){i(e,t)}),r}function r(e,t){++t;var i,n="";for(var s in e)"suite"!=s&&(s!==SUITE_PREFIX&&(i=" - ["+s.substring(1)+"]",i+="(#"+utils.slug(e[s].suite.fullTitle())+")\n",n+=Array(t).join("  ")+i),n+=r(e[s],t));return n}function n(e){var t=i(e,{});return r(t,0)}Base.call(this,e);var s=(this.stats,0),o="";n(e.suite),e.on("suite",function(e){++s;var i=utils.slug(e.fullTitle());o+='<a name="'+i+'"></a>\n',o+=t(e.title)+"\n"}),e.on("suite end",function(e){--s}),e.on("pass",function(e){var t=utils.clean(e.fn.toString());o+=e.title+".\n",o+="\n```js\n",o+=t+"\n",o+="```\n\n"}),e.on("end",function(){process.stdout.write("# TOC\n"),process.stdout.write(n(e.suite)),process.stdout.write(o)})}var Base=require("./base"),utils=require("../utils"),SUITE_PREFIX="$";exports=module.exports=Markdown;