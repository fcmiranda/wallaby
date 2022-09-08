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
!function(e){function t(){var e,t;b.autorun=!0,b.previousModule&&p("moduleDone",{name:b.previousModule.name,tests:b.previousModule.tests,failed:b.moduleStats.bad,passed:b.moduleStats.all-b.moduleStats.bad,total:b.moduleStats.all,runtime:x()-b.moduleStats.started}),delete b.previousModule,e=x()-b.started,t=b.stats.all-b.stats.bad,p("done",{failed:b.stats.bad,passed:t,total:b.stats.all,runtime:e})}function i(e,t){t=void 0===t?4:t;var i,r,n;if(e.stacktrace)return e.stacktrace.split("\n")[t+3];if(e.stack){if(i=e.stack.split("\n"),/^error$/i.test(i[0])&&i.shift(),S){for(r=[],n=t;n<i.length&&i[n].indexOf(S)===-1;n++)r.push(i[n]);if(r.length)return r.join("\n")}return i[t]}if(e.sourceURL){if(/qunit.js$/.test(e.sourceURL))return;return e.sourceURL+":"+e.line}}function r(e){var t=new Error;if(!t.stack)try{throw t}catch(r){t=r}return i(t,e)}function n(e,t){if("array"!==_.objectType(e))b.queue.push(e),b.autorun&&!b.blocking&&s(t);else for(;e.length;)n(e.shift())}function s(e){function i(){s(e)}var r=x();for(b.depth=b.depth?b.depth+1:1;b.queue.length&&!b.blocking;){if(!(!I.setTimeout||b.updateRate<=0||x()-r<b.updateRate)){E(i,13);break}b.current&&(b.current.usedAsync=!1),b.queue.shift()()}b.depth--,!e||b.blocking||b.queue.length||0!==b.depth||t()}function o(){var e,t,i=[];if(!b.started){for(b.started=x(),f(),""===b.modules[0].name&&0===b.modules[0].tests.length&&b.modules.shift(),e=0,t=b.modules.length;e<t;e++)i.push({name:b.modules[e].name,tests:b.modules[e].tests});p("begin",{totalTests:v.count,modules:i})}b.blocking=!1,s(!0)}function a(){F=!0,I.setTimeout?E(function(){b.current&&b.current.semaphore>0||(b.timeout&&R(b.timeout),o())},13):o()}function l(){b.blocking=!0,b.testTimeout&&I.setTimeout&&(R(b.timeout),b.timeout=E(function(){if(!b.current)throw new Error("Test timed out");b.current.semaphore=0,_.pushFailure("Test timed out",r(2)),a()},b.testTimeout))}function c(){if(b.pollution=[],b.noglobals)for(var t in e)if(L.call(e,t)){if(/^qunit-test-output/.test(t))continue;b.pollution.push(t)}}function u(){var e,t,i=b.pollution;c(),e=h(b.pollution,i),e.length>0&&_.pushFailure("Introduced global variable(s): "+e.join(", ")),t=h(i,b.pollution),t.length>0&&_.pushFailure("Deleted global variable(s): "+t.join(", "))}function h(e,t){var i,r,n=e.slice();for(i=0;i<n.length;i++)for(r=0;r<t.length;r++)if(n[i]===t[r]){n.splice(i,1),i--;break}return n}function d(t,i,r){for(var n in i)L.call(i,n)&&("constructor"===n&&t===e||(void 0===i[n]?delete t[n]:r&&"undefined"!=typeof t[n]||(t[n]=i[n])));return t}function p(e,t){var i,r,n;for(n=b.callbacks[e],i=0,r=n.length;i<r;i++)n[i](t)}function f(){var t,i;for(t in T)_[t]!==T[t]&&(i=_[t],_[t]=T[t],_[t](i),e.console&&e.console.warn&&e.console.warn("QUnit."+t+" was replaced with a new value.\nPlease, check out the documentation on how to apply logging callbacks.\nReference: http://api.qunitjs.com/category/callbacks/"))}function g(e,t){if(t.indexOf)return t.indexOf(e);for(var i=0,r=t.length;i<r;i++)if(t[i]===e)return i;return-1}function v(e){var t,i;for(++v.count,d(this,e),this.assertions=[],this.semaphore=0,this.usedAsync=!1,this.module=b.currentModule,this.stack=r(3),t=0,i=this.module.tests;t<i.length;t++)this.module.tests[t].name===this.testName&&(this.testName+=" ");this.testId=m(this.module.name,this.testName),this.module.tests.push({name:this.testName,testId:this.testId}),e.skip?(this.callback=function(){},this.async=!1,this.expected=0):this.assert=new y(this)}function m(e,t){for(var i,r=0,n=0,s=e+""+t,o=s.length;r<o;r++)n=(n<<5)-n+s.charCodeAt(r),n|=0;return i=(4294967296+n).toString(16),i.length<8&&(i="0000000"+i),i.slice(-8)}function y(e){this.test=e}var _,b,k,T={},S=(r(0)||"").replace(/(:\d+)+\)?/,"").replace(/.+\//,""),C=Object.prototype.toString,L=Object.prototype.hasOwnProperty,w=e.Date,x=w.now||function(){return(new w).getTime()},j=!1,F=!1,E=e.setTimeout,R=e.clearTimeout,I={document:void 0!==e.document,setTimeout:void 0!==e.setTimeout,sessionStorage:function(){var e="qunit-test-string";try{return sessionStorage.setItem(e,e),sessionStorage.removeItem(e),!0}catch(t){return!1}}()},M=function(e){var t,i,r=e.toString();return"[object"===r.substring(0,7)?(t=e.name?e.name.toString():"Error",i=e.message?e.message.toString():"",t&&i?t+": "+i:t?t:i?i:"Error"):r},P=function(e){var t,i,r=_.is("array",e)?[]:{};for(t in e)L.call(e,t)&&(i=e[t],r[t]=i===Object(i)?P(i):i);return r};_={},b={queue:[],blocking:!0,hidepassed:!1,reorder:!0,altertitle:!0,scrolltop:!0,requireExpects:!1,urlConfig:[{id:"hidepassed",label:"Hide passed tests",tooltip:"Only show tests and assertions that fail. Stored as query-strings."},{id:"noglobals",label:"Check for Globals",tooltip:"Enabling this will test if any test introduces new properties on the `window` object. Stored as query-strings."},{id:"notrycatch",label:"No try-catch",tooltip:"Enabling this will run tests outside of a try-catch block. Makes debugging exceptions in IE reasonable. Stored as query-strings."}],modules:[],currentModule:{name:"",tests:[]},callbacks:{}},b.modules.push(b.currentModule),function(){var t,i,r=e.location||{search:"",protocol:"file:"},n=r.search.slice(1).split("&"),s=n.length,o={};if(n[0])for(t=0;t<s;t++)i=n[t].split("="),i[0]=decodeURIComponent(i[0]),i[1]=!i[1]||decodeURIComponent(i[1]),o[i[0]]?o[i[0]]=[].concat(o[i[0]],i[1]):o[i[0]]=i[1];if(_.urlParams=o,b.filter=o.filter,b.testId=[],o.testId)for(o.testId=[].concat(o.testId),t=0;t<o.testId.length;t++)b.testId.push(o.testId[t]);_.isLocal="file:"===r.protocol}(),d(_,{module:function(e,t){var i={name:e,testEnvironment:t,tests:[]};t&&t.setup&&(t.beforeEach=t.setup,delete t.setup),t&&t.teardown&&(t.afterEach=t.teardown,delete t.teardown),b.modules.push(i),b.currentModule=i},asyncTest:function(e,t,i){2===arguments.length&&(i=t,t=null),_.test(e,t,i,!0)},test:function(e,t,i,r){var n;2===arguments.length&&(i=t,t=null),n=new v({testName:e,expected:t,async:r,callback:i}),n.queue()},skip:function(e){var t=new v({testName:e,skip:!0});t.queue()},start:function(e){var t=j;if(b.current){if(b.current.semaphore-=e||1,b.current.semaphore>0)return;if(b.current.semaphore<0)return b.current.semaphore=0,void _.pushFailure("Called start() while already started (test's semaphore was 0 already)",r(2))}else{if(j=!0,F)throw new Error("Called start() outside of a test context while already started");if(t||e>1)throw new Error("Called start() outside of a test context too many times");if(b.autostart)throw new Error("Called start() outside of a test context when QUnit.config.autostart was true");if(!b.pageLoaded)return void(b.autostart=!0)}a()},stop:function(e){if(!b.current)throw new Error("Called stop() outside of a test context");b.current.semaphore+=e||1,l()},config:b,is:function(e,t){return _.objectType(t)===e},objectType:function(e){if("undefined"==typeof e)return"undefined";if(null===e)return"null";var t=C.call(e).match(/^\[object\s(.*)\]$/),i=t&&t[1]||"";switch(i){case"Number":return isNaN(e)?"nan":"number";case"String":case"Boolean":case"Array":case"Date":case"RegExp":case"Function":return i.toLowerCase()}return"object"==typeof e?"object":void 0},url:function(e){e=d(d({},_.urlParams),e);var t,i="?";for(t in e)L.call(e,t)&&(i+=encodeURIComponent(t),e[t]!==!0&&(i+="="+encodeURIComponent(e[t])),i+="&");return location.protocol+"//"+location.host+location.pathname+i.slice(0,-1)},extend:d,load:function(){b.pageLoaded=!0,d(b,{stats:{all:0,bad:0},moduleStats:{all:0,bad:0},started:0,updateRate:1e3,autostart:!0,filter:""},!0),b.blocking=!1,b.autostart&&a()}}),function(){function e(e){var t=function(t){if("function"!==_.objectType(t))throw new Error("QUnit logging methods require a callback function as their first parameters.");b.callbacks[e].push(t)};return T[e]=t,t}var t,i,r,n=["begin","done","log","testStart","testDone","moduleStart","moduleDone"];for(t=0,i=n.length;t<i;t++)r=n[t],"undefined"===_.objectType(b.callbacks[r])&&(b.callbacks[r]=[]),_[r]=e(r)}(),k=e.onerror,e.onerror=function(e,t,i){var r=!1;if(k&&(r=k(e,t,i)),r!==!0){if(_.config.current){if(_.config.current.ignoreGlobalErrors)return!0;_.pushFailure(e,t+":"+i)}else _.test("global failure",d(function(){_.pushFailure(e,t+":"+i)},{validTest:!0}));return!1}return r},v.count=0,v.prototype={before:function(){this.module===b.previousModule&&L.call(b,"previousModule")||(L.call(b,"previousModule")&&p("moduleDone",{name:b.previousModule.name,tests:b.previousModule.tests,failed:b.moduleStats.bad,passed:b.moduleStats.all-b.moduleStats.bad,total:b.moduleStats.all,runtime:x()-b.moduleStats.started}),b.previousModule=this.module,b.moduleStats={all:0,bad:0,started:x()},p("moduleStart",{name:this.module.name,tests:this.module.tests})),b.current=this,this.testEnvironment=d({},this.module.testEnvironment),delete this.testEnvironment.beforeEach,delete this.testEnvironment.afterEach,this.started=x(),p("testStart",{name:this.testName,module:this.module.name,testId:this.testId}),b.pollution||c()},run:function(){var e;if(b.current=this,this.async&&_.stop(),this.callbackStarted=x(),b.notrycatch)return e=this.callback.call(this.testEnvironment,this.assert),void this.resolvePromise(e);try{e=this.callback.call(this.testEnvironment,this.assert),this.resolvePromise(e)}catch(t){this.pushFailure("Died on test #"+(this.assertions.length+1)+" "+this.stack+": "+(t.message||t),i(t,0)),c(),b.blocking&&_.start()}},after:function(){u()},queueHook:function(e,t){var r,n=this;return function(){if(b.current=n,b.notrycatch)return r=e.call(n.testEnvironment,n.assert),void n.resolvePromise(r,t);try{r=e.call(n.testEnvironment,n.assert),n.resolvePromise(r,t)}catch(s){n.pushFailure(t+" failed on "+n.testName+": "+(s.message||s),i(s,0))}}},hooks:function(e){var t=[];return this.skip?t:(this.module.testEnvironment&&"function"===_.objectType(this.module.testEnvironment[e])&&t.push(this.queueHook(this.module.testEnvironment[e],e)),t)},finish:function(){b.current=this,b.requireExpects&&null===this.expected?this.pushFailure("Expected number of assertions to be defined, but expect() was not called.",this.stack):null!==this.expected&&this.expected!==this.assertions.length?this.pushFailure("Expected "+this.expected+" assertions, but "+this.assertions.length+" were run",this.stack):null!==this.expected||this.assertions.length||this.pushFailure("Expected at least one assertion, but none were run - call expect(0) to accept zero assertions.",this.stack);var e,t=0;for(this.runtime=x()-this.started,b.stats.all+=this.assertions.length,b.moduleStats.all+=this.assertions.length,e=0;e<this.assertions.length;e++)this.assertions[e].result||(t++,b.stats.bad++,b.moduleStats.bad++);p("testDone",{name:this.testName,module:this.module.name,skipped:!!this.skip,failed:t,passed:this.assertions.length-t,total:this.assertions.length,runtime:this.runtime,assertions:this.assertions,testId:this.testId,duration:this.runtime}),_.reset(),b.current=void 0},queue:function(){function e(){n([function(){i.before()},i.hooks("beforeEach"),function(){i.run()},i.hooks("afterEach").reverse(),function(){i.after()},function(){i.finish()}])}var t,i=this;this.valid()&&(t=_.config.reorder&&I.sessionStorage&&+sessionStorage.getItem("qunit-test-"+this.module.name+"-"+this.testName),t?e():n(e,!0))},push:function(e,t,i,n){var s,o={module:this.module.name,name:this.testName,result:e,message:n,actual:t,expected:i,testId:this.testId,runtime:x()-this.started};e||(s=r(),s&&(o.source=s)),p("log",o),this.assertions.push({result:!!e,message:n})},pushFailure:function(e,t,i){if(!this instanceof v)throw new Error("pushFailure() assertion outside test context, was "+r(2));var n={module:this.module.name,name:this.testName,result:!1,message:e||"error",actual:i||null,testId:this.testId,runtime:x()-this.started};t&&(n.source=t),p("log",n),this.assertions.push({result:!1,message:e})},resolvePromise:function(e,t){var r,n,s=this;null!=e&&(r=e.then,"function"===_.objectType(r)&&(_.stop(),r.call(e,_.start,function(e){n="Promise rejected "+(t?t.replace(/Each$/,""):"during")+" "+s.testName+": "+(e.message||e),s.pushFailure(n,i(e,0)),c(),_.start()})))},valid:function(){var e,t=b.filter&&b.filter.toLowerCase(),i=_.urlParams.module&&_.urlParams.module.toLowerCase(),r=(this.module.name+": "+this.testName).toLowerCase();return!(!this.callback||!this.callback.validTest)||!(b.testId.length>0&&g(this.testId,b.testId)<0)&&(!(i&&(!this.module.name||this.module.name.toLowerCase()!==i))&&(!t||(e="!"!==t.charAt(0),e||(t=t.slice(1)),r.indexOf(t)!==-1?e:!e)))}},_.reset=function(){if("undefined"!=typeof e){var t=I.document&&document.getElementById&&document.getElementById("qunit-fixture");t&&(t.innerHTML=b.fixture)}},_.pushFailure=function(){if(!_.config.current)throw new Error("pushFailure() assertion outside test context, in "+r(2));var e=_.config.current;return e.pushFailure.apply(e,arguments)},_.assert=y.prototype={expect:function(e){return 1!==arguments.length?this.test.expected:void(this.test.expected=e)},async:function(){var e=this.test,t=!1;return e.semaphore+=1,e.usedAsync=!0,l(),function(){t?e.pushFailure("Called the callback returned from `assert.async` more than once",r(2)):(e.semaphore-=1,t=!0,a())}},push:function(){var e=this,t=e instanceof y&&e.test||_.config.current;if(!t)throw new Error("assertion outside test context, in "+r(2));return t.usedAsync===!0&&0===t.semaphore&&t.pushFailure("Assertion after the final `assert.async` was resolved",r(2)),e instanceof y||(e=t.assert),e.test.push.apply(e.test,arguments)},ok:function(e,t){t=t||(e?"okay":"failed, expected argument to be truthy, was: "+_.dump.parse(e)),this.push(!!e,e,!0,t)},equal:function(e,t,i){this.push(t==e,e,t,i)},notEqual:function(e,t,i){this.push(t!=e,e,t,i)},propEqual:function(e,t,i){e=P(e),t=P(t),this.push(_.equiv(e,t),e,t,i)},notPropEqual:function(e,t,i){e=P(e),t=P(t),this.push(!_.equiv(e,t),e,t,i)},deepEqual:function(e,t,i){this.push(_.equiv(e,t),e,t,i)},notDeepEqual:function(e,t,i){this.push(!_.equiv(e,t),e,t,i)},strictEqual:function(e,t,i){this.push(t===e,e,t,i)},notStrictEqual:function(e,t,i){this.push(t!==e,e,t,i)},"throws":function(e,t,i){var r,n,s=t,o=!1;null==i&&"string"==typeof t&&(i=t,t=null),this.test.ignoreGlobalErrors=!0;try{e.call(this.test.testEnvironment)}catch(a){r=a}this.test.ignoreGlobalErrors=!1,r?(n=_.objectType(t),t?"regexp"===n?o=t.test(M(r)):"string"===n?o=t===M(r):"function"===n&&r instanceof t?o=!0:"object"===n?o=r instanceof t.constructor&&r.name===t.name&&r.message===t.message:"function"===n&&t.call({},r)===!0&&(s=null,o=!0):(o=!0,s=null),this.push(o,r,s,i)):this.test.pushFailure(i,null,"No exception was thrown.")}},function(){y.prototype.raises=y.prototype["throws"]}(),_.equiv=function(){function e(e,t,i){var r=_.objectType(e);if(r)return"function"===_.objectType(t[r])?t[r].apply(t,i):t[r]}var t,i=[],r=[],n=[],s=Object.getPrototypeOf||function(e){return e.__proto__},o=function(){function e(e,t){return e instanceof t.constructor||t instanceof e.constructor?t==e:t===e}return{string:e,"boolean":e,number:e,"null":e,undefined:e,nan:function(e){return isNaN(e)},date:function(e,t){return"date"===_.objectType(e)&&t.valueOf()===e.valueOf()},regexp:function(e,t){return"regexp"===_.objectType(e)&&t.source===e.source&&t.global===e.global&&t.ignoreCase===e.ignoreCase&&t.multiline===e.multiline&&t.sticky===e.sticky},"function":function(){var e=i[i.length-1];return e!==Object&&"undefined"!=typeof e},array:function(e,i){var s,o,a,l,c,u;if("array"!==_.objectType(e))return!1;if(a=i.length,a!==e.length)return!1;for(r.push(i),n.push(e),s=0;s<a;s++){for(l=!1,o=0;o<r.length;o++)if(c=r[o]===i[s],u=n[o]===e[s],c||u){if(!(i[s]===e[s]||c&&u))return r.pop(),n.pop(),!1;l=!0}if(!l&&!t(i[s],e[s]))return r.pop(),n.pop(),!1}return r.pop(),n.pop(),!0},object:function(e,o){var a,l,c,u,h,d=!0,p=[],f=[];if(o.constructor!==e.constructor&&!(null===s(o)&&s(e)===Object.prototype||null===s(e)&&s(o)===Object.prototype))return!1;i.push(o.constructor),r.push(o),n.push(e);for(a in o){for(c=!1,l=0;l<r.length;l++)if(u=r[l]===o[a],h=n[l]===e[a],u||h){if(!(o[a]===e[a]||u&&h)){d=!1;break}c=!0}if(p.push(a),!c&&!t(o[a],e[a])){d=!1;break}}r.pop(),n.pop(),i.pop();for(a in e)f.push(a);return d&&t(p.sort(),f.sort())}}}();return t=function(){var i=[].slice.apply(arguments);return i.length<2||function(t,i){return t===i||null!==t&&null!==i&&"undefined"!=typeof t&&"undefined"!=typeof i&&_.objectType(t)===_.objectType(i)&&e(t,o,[i,t])}(i[0],i[1])&&t.apply(this,i.splice(1,i.length-1))}}(),_.dump=function(){function e(e){return'"'+e.toString().replace(/"/g,'\\"')+'"'}function t(e){return e+""}function i(e,t,i){var r=s.separator(),n=s.indent(),o=s.indent(1);return t.join&&(t=t.join(","+r+o)),t?[e,o+t,n+i].join(r):e+i}function r(e,t){var r=e.length,n=new Array(r);if(s.maxDepth&&s.depth>s.maxDepth)return"[object Array]";for(this.up();r--;)n[r]=this.parse(e[r],void 0,t);return this.down(),i("[",n,"]")}var n=/^function (\w+)/,s={parse:function(e,t,i){i=i||[];var r,n,s,o=g(e,i);return o!==-1?"recursion("+(o-i.length)+")":(t=t||this.typeOf(e),n=this.parsers[t],s=typeof n,"function"===s?(i.push(e),r=n.call(this,e,i),i.pop(),r):"string"===s?n:this.parsers.error)},typeOf:function(e){var t;return t=null===e?"null":"undefined"==typeof e?"undefined":_.is("regexp",e)?"regexp":_.is("date",e)?"date":_.is("function",e)?"function":void 0!==e.setInterval&&void 0!==e.document&&void 0===e.nodeType?"window":9===e.nodeType?"document":e.nodeType?"node":"[object Array]"===C.call(e)||"number"==typeof e.length&&void 0!==e.item&&(e.length?e.item(0)===e[0]:null===e.item(0)&&void 0===e[0])?"array":e.constructor===Error.prototype.constructor?"error":typeof e},separator:function(){return this.multiline?this.HTML?"<br />":"\n":this.HTML?"&#160;":" "},indent:function(e){if(!this.multiline)return"";var t=this.indentChar;return this.HTML&&(t=t.replace(/\t/g,"   ").replace(/ /g,"&#160;")),new Array(this.depth+(e||0)).join(t)},up:function(e){this.depth+=e||1},down:function(e){this.depth-=e||1},setParser:function(e,t){this.parsers[e]=t},quote:e,literal:t,join:i,depth:1,maxDepth:5,parsers:{window:"[Window]",document:"[Document]",error:function(e){return'Error("'+e.message+'")'},unknown:"[Unknown]","null":"null",undefined:"undefined","function":function(e){var t="function",r="name"in e?e.name:(n.exec(e)||[])[1];return r&&(t+=" "+r),t+="( ",t=[t,s.parse(e,"functionArgs"),"){"].join(""),i(t,s.parse(e,"functionCode"),"}")},array:r,nodelist:r,arguments:r,object:function(e,t){var r,n,o,a,l,c=[];if(s.maxDepth&&s.depth>s.maxDepth)return"[object Object]";s.up(),r=[];for(n in e)r.push(n);l=["message","name"];for(a in l)n=l[a],n in e&&!(n in r)&&r.push(n);for(r.sort(),a=0;a<r.length;a++)n=r[a],o=e[n],c.push(s.parse(n,"key")+": "+s.parse(o,void 0,t));return s.down(),i("{",c,"}")},node:function(e){var t,i,r,n=s.HTML?"&lt;":"<",o=s.HTML?"&gt;":">",a=e.nodeName.toLowerCase(),l=n+a,c=e.attributes;if(c)for(i=0,t=c.length;i<t;i++)r=c[i].nodeValue,r&&"inherit"!==r&&(l+=" "+c[i].nodeName+"="+s.parse(r,"attribute"));return l+=o,3!==e.nodeType&&4!==e.nodeType||(l+=e.nodeValue),l+n+"/"+a+o},functionArgs:function(e){var t,i=e.length;if(!i)return"";for(t=new Array(i);i--;)t[i]=String.fromCharCode(97+i);return" "+t.join(", ")+" "},key:e,functionCode:"[code]",attribute:e,string:e,date:e,regexp:t,number:t,"boolean":t},HTML:!1,indentChar:"  ",multiline:!0};return s}(),_.jsDump=_.dump,"undefined"!=typeof e&&(!function(){function e(e){return function(){var t=new y(_.config.current);e.apply(t,arguments)}}var t,i=y.prototype;for(t in i)_[t]=e(i[t])}(),function(){var t,i,r=["test","module","expect","asyncTest","start","stop","ok","equal","notEqual","propEqual","notPropEqual","deepEqual","notDeepEqual","strictEqual","notStrictEqual","throws"];for(t=0,i=r.length;t<i;t++)e[r[t]]=_[r[t]]}(),e.QUnit=_),"undefined"!=typeof module&&module.exports&&(module.exports=_),"undefined"!=typeof exports&&(exports.QUnit=_)}(function(){return this}()),QUnit.diff=function(){function e(e,i){var r,n={},s={};for(r=0;r<i.length;r++)t.call(n,i[r])||(n[i[r]]={rows:[],o:null}),n[i[r]].rows.push(r);for(r=0;r<e.length;r++)t.call(s,e[r])||(s[e[r]]={rows:[],n:null}),s[e[r]].rows.push(r);for(r in n)t.call(n,r)&&1===n[r].rows.length&&t.call(s,r)&&1===s[r].rows.length&&(i[n[r].rows[0]]={text:i[n[r].rows[0]],row:s[r].rows[0]},e[s[r].rows[0]]={text:e[s[r].rows[0]],row:n[r].rows[0]});for(r=0;r<i.length-1;r++)null!=i[r].text&&null==i[r+1].text&&i[r].row+1<e.length&&null==e[i[r].row+1].text&&i[r+1]==e[i[r].row+1]&&(i[r+1]={text:i[r+1],row:i[r].row+1},e[i[r].row+1]={text:e[i[r].row+1],row:r+1});for(r=i.length-1;r>0;r--)null!=i[r].text&&null==i[r-1].text&&i[r].row>0&&null==e[i[r].row-1].text&&i[r-1]==e[i[r].row-1]&&(i[r-1]={text:i[r-1],row:i[r].row-1},e[i[r].row-1]={text:e[i[r].row-1],row:r-1});return{o:e,n:i}}var t=Object.prototype.hasOwnProperty;return function(t,i){t=t.replace(/\s+$/,""),i=i.replace(/\s+$/,"");var r,n,s="",o=e(""===t?[]:t.split(/\s+/),""===i?[]:i.split(/\s+/)),a=t.match(/\s+/g),l=i.match(/\s+/g);if(null==a?a=[" "]:a.push(" "),null==l?l=[" "]:l.push(" "),0===o.n.length)for(r=0;r<o.o.length;r++)s+="<del>"+o.o[r]+a[r]+"</del>";else{if(null==o.n[0].text)for(i=0;i<o.o.length&&null==o.o[i].text;i++)s+="<del>"+o.o[i]+a[i]+"</del>";for(r=0;r<o.n.length;r++)if(null==o.n[r].text)s+="<ins>"+o.n[r]+l[r]+"</ins>";else{for(n="",i=o.n[r].row+1;i<o.o.length&&null==o.o[i].text;i++)n+="<del>"+o.o[i]+a[i]+"</del>";s+=" "+o.n[r].text+l[r]+n}}return s}}(),function(){function e(e){return e?(e+="",e.replace(/['"<>&]/g,function(e){switch(e){case"'":return"&#039;";case'"':return"&quot;";case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;"}})):""}function t(e,t,i){e.addEventListener?e.addEventListener(t,i,!1):e.attachEvent&&e.attachEvent("on"+t,i)}function i(e,i,r){for(var n=e.length;n--;)t(e[n],i,r)}function r(e,t){return(" "+e.className+" ").indexOf(" "+t+" ")>=0}function n(e,t){r(e,t)||(e.className+=(e.className?" ":"")+t)}function s(e,t){r(e,t)?o(e,t):n(e,t)}function o(e,t){for(var i=" "+e.className+" ";i.indexOf(" "+t+" ")>=0;)i=i.replace(" "+t+" "," ");e.className="function"==typeof i.trim?i.trim():i.replace(/^\s+|\s+$/g,"")}function a(e){return S.document&&document.getElementById&&document.getElementById(e)}function l(){var t,i,r,n,s,o=!1,a=k.urlConfig.length,l="";for(t=0;t<a;t++)if(r=k.urlConfig[t],"string"==typeof r&&(r={id:r,label:r}),n=e(r.id),s=e(r.tooltip),k[r.id]=QUnit.urlParams[r.id],r.value&&"string"!=typeof r.value){if(l+="<label for='qunit-urlconfig-"+n+"' title='"+s+"'>"+r.label+": </label><select id='qunit-urlconfig-"+n+"' name='"+n+"' title='"+s+"'><option></option>",QUnit.is("array",r.value))for(i=0;i<r.value.length;i++)n=e(r.value[i]),l+="<option value='"+n+"'"+(k[r.id]===r.value[i]?(o=!0)&&" selected='selected'":"")+">"+n+"</option>";else for(i in r.value)T.call(r.value,i)&&(l+="<option value='"+e(i)+"'"+(k[r.id]===i?(o=!0)&&" selected='selected'":"")+">"+e(r.value[i])+"</option>");k[r.id]&&!o&&(n=e(k[r.id]),l+="<option value='"+n+"' selected='selected' disabled='disabled'>"+n+"</option>"),l+="</select>"}else l+="<input id='qunit-urlconfig-"+n+"' name='"+n+"' type='checkbox'"+(r.value?" value='"+e(r.value)+"'":"")+(k[r.id]?" checked='checked'":"")+" title='"+s+"' /><label for='qunit-urlconfig-"+n+"' title='"+s+"'>"+r.label+"</label>";return l}function c(){var e,t,i=this,r={};t="selectedIndex"in i?i.options[i.selectedIndex].value||void 0:i.checked?i.defaultValue||!0:void 0,r[i.name]=t,e=QUnit.url(r),"hidepassed"===i.name&&"replaceState"in window.history?(k[i.name]=t||!1,t?n(a("qunit-tests"),"hidepass"):o(a("qunit-tests"),"hidepass"),window.history.replaceState(null,"",e)):window.location=e}function u(){var e=document.createElement("span");return e.innerHTML=l(),i(e.getElementsByTagName("input"),"click",c),i(e.getElementsByTagName("select"),"change",c),e}function h(){var t,i="";if(!C.length)return!1;for(C.sort(function(e,t){return e.localeCompare(t)}),i+="<label for='qunit-modulefilter'>Module: </label><select id='qunit-modulefilter' name='modulefilter'><option value='' "+(void 0===QUnit.urlParams.module?"selected='selected'":"")+">< All Modules ></option>",t=0;t<C.length;t++)i+="<option value='"+e(encodeURIComponent(C[t]))+"' "+(QUnit.urlParams.module===C[t]?"selected='selected'":"")+">"+e(C[t])+"</option>";return i+="</select>"}function d(){var e=a("qunit-testrunner-toolbar"),i=document.createElement("span"),r=h();return!!r&&(i.setAttribute("id","qunit-modulefilter-container"),i.innerHTML=r,t(i.lastChild,"change",function(){var e=i.getElementsByTagName("select")[0],t=decodeURIComponent(e.options[e.selectedIndex].value);window.location=QUnit.url({module:""===t?void 0:t,filter:void 0,testId:void 0})}),void e.appendChild(i))}function p(){var e=a("qunit-testrunner-toolbar");e&&e.appendChild(u())}function f(){var e=a("qunit-banner");e&&(e.className="",e.innerHTML="<a href='"+QUnit.url({filter:void 0,module:void 0,testId:void 0})+"'>"+e.innerHTML+"</a> ")}function g(){var e=a("qunit-tests"),t=a("qunit-testresult");t&&t.parentNode.removeChild(t),e&&(e.innerHTML="",t=document.createElement("p"),t.id="qunit-testresult",t.className="result",e.parentNode.insertBefore(t,e),t.innerHTML="Running...<br />&#160;")}function v(){var e=a("qunit-fixture");e&&(k.fixture=e.innerHTML)}function m(){var e=a("qunit-userAgent");e&&(e.innerHTML=navigator.userAgent)}function y(e){var t,i,r,n,s,o;for(t=0,i=e.length;t<i;t++)for(o=e[t],o.name&&C.push(o.name),r=0,n=o.tests.length;r<n;r++)s=o.tests[r],_(s.name,s.testId,o.name)}function _(e,t,i){var r,n,s,o,l=a("qunit-tests");l&&(r=document.createElement("strong"),r.innerHTML=b(e,i),n=document.createElement("a"),n.innerHTML="Rerun",n.href=QUnit.url({testId:t}),s=document.createElement("li"),s.appendChild(r),s.appendChild(n),s.id="qunit-test-output-"+t,o=document.createElement("ol"),o.className="qunit-assert-list",s.appendChild(o),l.appendChild(s))}function b(t,i){var r="";return i&&(r="<span class='module-name'>"+e(i)+"</span>: "),r+="<span class='test-name'>"+e(t)+"</span>"}if(QUnit.init=function(){var t,i,r,n,s=QUnit.config;s.stats={all:0,bad:0},s.moduleStats={all:0,bad:0},s.started=0,s.updateRate=1e3,s.blocking=!1,s.autostart=!0,s.autorun=!1,s.filter="",s.queue=[],"undefined"!=typeof window&&(n=a("qunit"),n&&(n.innerHTML="<h1 id='qunit-header'>"+e(document.title)+"</h1><h2 id='qunit-banner'></h2><div id='qunit-testrunner-toolbar'></div><h2 id='qunit-userAgent'></h2><ol id='qunit-tests'></ol>"),t=a("qunit-tests"),i=a("qunit-banner"),r=a("qunit-testresult"),t&&(t.innerHTML=""),i&&(i.className=""),r&&r.parentNode.removeChild(r),t&&(r=document.createElement("p"),r.id="qunit-testresult",r.className="result",t.parentNode.insertBefore(r,t),r.innerHTML="Running...<br />&#160;"))},"undefined"!=typeof window){var k=QUnit.config,T=Object.prototype.hasOwnProperty,S={document:void 0!==window.document,sessionStorage:function(){var e="qunit-test-string";try{return sessionStorage.setItem(e,e),sessionStorage.removeItem(e),!0}catch(t){return!1}}()},C=[];QUnit.begin(function(t){var i=a("qunit");v(),i&&(i.innerHTML="<h1 id='qunit-header'>"+e(document.title)+"</h1><h2 id='qunit-banner'></h2><div id='qunit-testrunner-toolbar'></div><h2 id='qunit-userAgent'></h2><ol id='qunit-tests'></ol>",f(),g(),m(),p(),y(t.modules),d(),k.hidepassed&&n(i.lastChild,"hidepass"))}),QUnit.done(function(e){var t,i,r=a("qunit-banner"),n=a("qunit-tests"),s=["Tests completed in ",e.runtime," milliseconds.<br />","<span class='passed'>",e.passed,"</span> assertions of <span class='total'>",e.total,"</span> passed, <span class='failed'>",e.failed,"</span> failed."].join("");if(r&&(r.className=e.failed?"qunit-fail":"qunit-pass"),n&&(a("qunit-testresult").innerHTML=s),k.altertitle&&S.document&&document.title&&(document.title=[e.failed?"✖":"✔",document.title.replace(/^[\u2714\u2716] /i,"")].join(" ")),k.reorder&&S.sessionStorage&&0===e.failed)for(t=0;t<sessionStorage.length;t++)i=sessionStorage.key(t++),0===i.indexOf("qunit-test-")&&sessionStorage.removeItem(i);k.scrolltop&&window.scrollTo&&window.scrollTo(0,0)}),QUnit.testStart(function(e){var t,i;i=a("qunit-test-output-"+e.testId),i?i.className="running":_(e.name,e.testId,e.module),t=a("qunit-testresult"),t&&(t.innerHTML="Running: <br />"+b(e.name,e.module))}),QUnit.log(function(t){var i,r,n,s,o,l=a("qunit-test-output-"+t.testId);l&&(n=e(t.message)||(t.result?"okay":"failed"),n="<span class='test-message'>"+n+"</span>",n+="<span class='runtime'>@ "+t.runtime+" ms</span>",!t.result&&T.call(t,"expected")?(s=e(QUnit.dump.parse(t.expected)),o=e(QUnit.dump.parse(t.actual)),n+="<table><tr class='test-expected'><th>Expected: </th><td><pre>"+s+"</pre></td></tr>",o!==s&&(n+="<tr class='test-actual'><th>Result: </th><td><pre>"+o+"</pre></td></tr><tr class='test-diff'><th>Diff: </th><td><pre>"+QUnit.diff(s,o)+"</pre></td></tr>"),t.source&&(n+="<tr class='test-source'><th>Source: </th><td><pre>"+e(t.source)+"</pre></td></tr>"),n+="</table>"):!t.result&&t.source&&(n+="<table><tr class='test-source'><th>Source: </th><td><pre>"+e(t.source)+"</pre></td></tr></table>"),i=l.getElementsByTagName("ol")[0],r=document.createElement("li"),r.className=t.result?"pass":"fail",r.innerHTML=n,i.appendChild(r))}),QUnit.testDone(function(e){var i,r,o,l,c,u,h,d,p=a("qunit-tests");p&&(o=a("qunit-test-output-"+e.testId),l=o.getElementsByTagName("ol")[0],c=e.passed,u=e.failed,k.reorder&&S.sessionStorage&&(u?sessionStorage.setItem("qunit-test-"+e.module+"-"+e.name,u):sessionStorage.removeItem("qunit-test-"+e.module+"-"+e.name)),0===u&&n(l,"qunit-collapsed"),i=o.firstChild,h=u?"<b class='failed'>"+u+"</b>, <b class='passed'>"+c+"</b>, ":"",i.innerHTML+=" <b class='counts'>("+h+e.assertions.length+")</b>",e.skipped?(n(o,"skipped"),d=document.createElement("em"),d.className="qunit-skipped-label",d.innerHTML="skipped",o.insertBefore(d,i)):(t(i,"click",function(){s(l,"qunit-collapsed")}),o.className=u?"fail":"pass",r=document.createElement("span"),r.className="runtime",r.innerHTML=e.runtime+" ms",o.insertBefore(r,l)))}),S.document&&"complete"!==document.readyState||(k.pageLoaded=!0,k.autorun=!0),S.document&&t(window,"load",QUnit.load)}}();