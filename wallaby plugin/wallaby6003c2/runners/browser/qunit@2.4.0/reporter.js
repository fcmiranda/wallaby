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
!function(e){var t,i=e.$_$tracer,r=i.initialSpecId();QUnit.begin(function(e){i.started({total:e.totalTests})}),QUnit.done(function(){i.complete()}),QUnit.testStart(function(e){var n=QUnit.config;if(i.hasSpecFilter()){var s,o=e.name,a=e.name.replace(/\s\s*$/,""),l=[a];if(o!==a&&(s=[o]),e.module&&(l.unshift(e.module),s&&s.unshift(e.module)),!(i.specFilter(l)||s&&i.specFilter(s))){for(;n.queue.length;){var c=n.queue.shift();if(c&&~c.toString().indexOf(".finish();"))return}return}}n.current.run=function(){var e;n.current=this,delete n.current.stack,this.callbackStarted=(new Date).getTime();try{i.specSyncStart(),e=this.callback.call(this.testEnvironment,this.assert),this.resolvePromise(e),0===this.timeout&&0!==this.semaphore&&this.pushFailure("Test did not finish synchronously even though assert.timeout( 0 ) was used.")}catch(t){this.pushFailure(t.message,t.stack),n.blocking&&(this.semaphore=0,n.blocking=!1)}finally{i.specSyncEnd()}},t={success:!0,errors:[],id:++r,start:(new i._Date).getTime()},i.specStart(t.id,e.name)}),QUnit.log(function(e){if(!e.result){var r="",n=e.expected,s=e.actual;e.message&&(r+=e.message),t.success=!1,e.showDiff=!0;var o=i.setAssertionData(e,{message:r,stack:e.source});delete e.showDiff,t.errors.push(o),(!e.message||"undefined"!=typeof e.expected&&o.expected)&&(n||s)&&(o.message+=(e.message?"\n":"")+"Expected: "+i._inspect(n,3)+"\nActual: "+i._inspect(s,3))}}),QUnit.testDone(function(e){var r=i.specEnd(),n={id:t.id,timeRange:r,name:e.name,suite:e.module&&[e.module]||[],status:"executed",time:(new i._Date).getTime()-t.start,log:t.errors||[]};n.log.length||delete n.log,i.result(n)})}(window);