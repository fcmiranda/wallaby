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
var tracer=global.$_$tracer;jasmine.ExceptionFormatter=function(){this.message=function(e){return e?e.name&&e.message?e.name+": "+e.message:e.toString():"empty error"},this.stack=function(e){return e?e.stack:null}},jasmine.SpyStrategy=function(e){e=e||{};var t=e.name||"unknown",i=e.fn||function(){},r=e.getSpy||function(){},n=function(){};this.identity=function(){return t},this.exec=function(){return n.apply(this,arguments)},this.callThrough=function(){return n=i,r()},this.returnValue=function(e){return n=function(){return e},r()},this.returnValues=function(){var e=Array.prototype.slice.call(arguments);return n=function(){return e.shift()},r()},this.throwError=function(e){return n=function(){throw e instanceof Error?e:new Error(e)},r()},this.callFake=function(e){return n=e,r()},this.stub=function(e){return n=function(){},r()}};var jasmineEnv=jasmine.getEnv(),currentSuite=[],originalDescribe=jasmineEnv.describe;jasmineEnv.describe=function(){currentSuite.push(arguments[0]);var e=Function.prototype.apply.call(originalDescribe,this,arguments);return currentSuite.pop(),e};var originalFDescribe=jasmineEnv.fdescribe;jasmineEnv.fdescribe=function(){currentSuite.push(arguments[0]);var e=Function.prototype.apply.call(originalFDescribe,this,arguments);return currentSuite.pop(),e};var existingSpecFilter=jasmineEnv.specFilter.bind(jasmineEnv),originalIt=jasmineEnv.it,originalFit=jasmineEnv.fit,overrideTestExecutionFunction=function(e){return function(){var t=arguments[1];{if("encountered a declaration exception"!==arguments[0]){if(!t)return Function.prototype.apply.call(e,this,arguments);t.length?arguments[1]=function(e){tracer.specSyncStart();try{var i=Function.prototype.apply.call(t,this,arguments)}finally{tracer.specSyncEnd()}return i}:arguments[1]=function(){tracer.specSyncStart();try{var e=Function.prototype.apply.call(t,this,arguments)}finally{tracer.specSyncEnd()}return e};var i=Function.prototype.apply.call(e,this,arguments);i.result&&(i.result._testFile=tracer.entryFile());var r=currentSuite.slice();return r.push(i.description),i.disabled=tracer.hasSpecFilter()&&!tracer.specFilter(r)&&existingSpecFilter(i.description),i}try{t()}catch(n){tracer.reportDeclarationError(n)}}}};if(jasmineEnv.it=overrideTestExecutionFunction(originalIt),jasmineEnv.fit=overrideTestExecutionFunction(originalFit),global.it&&global.it.todo){var originalTodo_1=global.it.todo;global.it.todo=function(){var e=Function.prototype.apply.call(originalTodo_1,this,arguments);e.result&&(e.result._testFile=tracer.entryFile());var t=currentSuite.slice();return t.push(e.description),e.disabled=tracer.hasSpecFilter()&&!tracer.specFilter(t)&&existingSpecFilter(e.description),e}}var originalAfterEach=jasmineEnv.afterEach;jasmineEnv.afterEach=function(){if(tracer.needToNotifySingleTestRun()){var e=arguments[0];e.length?arguments[0]=function(t){tracer.notifySingleTestAfterEach(function(){e(t)})}:arguments[0]=function(t){tracer.notifySingleTestAfterEach(function(){try{e()}finally{t()}})}}return Function.prototype.apply.call(originalAfterEach,this,arguments)},jasmineEnv.addReporter(tracer._jasmineAdapter),jasmineEnv.specFilter=function(){return!0};