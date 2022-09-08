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
var JasmineReporter=function(e){var t=e.initialSpecId(),i=[],r={},n=function(t){if(t&&t.failedExpectations&&t.failedExpectations.length)for(var i=0;i<t.failedExpectations.length;i++){var r=t.failedExpectations[i];r&&!r.matcherName&&"string"==typeof r.message&&"string"==typeof r.stack&&e.reportDeclarationError({message:r.message,stack:r.stack})}};this.jasmineStarted=function(t){e.started({total:t.totalSpecsDefined})},this.jasmineDone=function(t){n(t),e.complete()},this.suiteStarted=function(e){i.push(e.description)},this.suiteDone=function(e){n(e),i.pop()},this.specStarted=function(i){var n=++t,s=r[i.id]={id:n};e.specStart(n,i.description),s.time=(new e._Date).getTime()},this.specDone=function(n){var s=r[n.id]||{id:t};n._id=s.id,n._time=s.time,delete r[n.id];var o="passed"===n.status,a="disabled"===n.status||"pending"===n.status||"excluded"===n.status||n._disabled,l=a?"pending"===n.status?"skipped":"excluded"===n.status?"disabled":"disabled"===n.status?"disabled":"executed":"executed";n._disabled&&(l="disabled");var c=e.specEnd(),u={id:n._id,timeRange:c,name:n.description,suite:i.slice(),status:l,time:a?0:(new e._Date).getTime()-n._time,log:[],testFile:n._testFile};if(!o&&!a)for(var h=n.failedExpectations,d=0;d<h.length;d++){var p=h[d];p.showDiff=p.showDiff||"toEqual"===p.matcherName,u.log.push(e.setAssertionData(p,{message:p.message,stack:p.stack}))}u.log.length||delete u.log,e.result(u)}},jasmineEnv=jasmine.getEnv(),tracer=window.$_$tracer,adapter=new JasmineReporter(tracer);jasmineEnv.addReporter(adapter);