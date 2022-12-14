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
var Suite=require("../suite"),Test=require("../test");module.exports=function(e){function t(e,r){var n;for(var s in e)if("function"==typeof e[s]){var o=e[s];switch(s){case"before":i[0].beforeAll(o);break;case"after":i[0].afterAll(o);break;case"beforeEach":i[0].beforeEach(o);break;case"afterEach":i[0].afterEach(o);break;default:var a=new Test(s,o);a.file=r,i[0].addTest(a)}}else n=Suite.create(i[0],s),i.unshift(n),t(e[s]),i.shift()}var i=[e];e.on("require",t)};