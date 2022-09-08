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
function JSONCov(e,t){var i=this,t=1==arguments.length||t;Base.call(this,e);var r=[],n=[],s=[];e.on("test end",function(e){r.push(e)}),e.on("pass",function(e){s.push(e)}),e.on("fail",function(e){n.push(e)}),e.on("end",function(){var e=global._$jscoverage||{},o=i.cov=map(e);o.stats=i.stats,o.tests=r.map(clean),o.failures=n.map(clean),o.passes=s.map(clean),t&&process.stdout.write(JSON.stringify(o,null,2))})}function map(e){var t={instrumentation:"node-jscoverage",sloc:0,hits:0,misses:0,coverage:0,files:[]};for(var i in e){var r=coverage(i,e[i]);t.files.push(r),t.hits+=r.hits,t.misses+=r.misses,t.sloc+=r.sloc}return t.files.sort(function(e,t){return e.filename.localeCompare(t.filename)}),t.sloc>0&&(t.coverage=t.hits/t.sloc*100),t}function coverage(e,t){var i={filename:e,coverage:0,hits:0,misses:0,sloc:0,source:{}};return t.source.forEach(function(e,r){r++,0===t[r]?(i.misses++,i.sloc++):void 0!==t[r]&&(i.hits++,i.sloc++),i.source[r]={source:e,coverage:void 0===t[r]?"":t[r]}}),i.coverage=i.hits/i.sloc*100,i}function clean(e){return{title:e.title,fullTitle:e.fullTitle(),duration:e.duration}}var Base=require("./base");exports=module.exports=JSONCov;