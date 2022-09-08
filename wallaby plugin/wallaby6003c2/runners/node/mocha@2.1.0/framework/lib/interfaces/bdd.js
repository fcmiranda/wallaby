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
var Suite=require("../suite"),Test=require("../test"),utils=require("../utils"),escapeRe=require("escape-string-regexp");module.exports=function(e){var t=[e];e.on("pre-require",function(e,i,r){e.before=function(e,i){t[0].beforeAll(e,i)},e.after=function(e,i){t[0].afterAll(e,i)},e.beforeEach=function(e,i){t[0].beforeEach(e,i)},e.afterEach=function(e,i){t[0].afterEach(e,i)},e.describe=e.context=function(e,r){var n=Suite.create(t[0],e);return n.file=i,t.unshift(n),r.call(n),t.shift(),n},e.xdescribe=e.xcontext=e.describe.skip=function(e,i){var r=Suite.create(t[0],e);r.pending=!0,t.unshift(r),i.call(r),t.shift()},e.describe.only=function(t,i){var n=e.describe(t,i);return r.grep(n.fullTitle()),n},e.it=e.specify=function(e,r){var n=t[0];n.pending&&(r=null);var s=new Test(e,r);return s.file=i,n.addTest(s),s},e.it.only=function(t,i){var n=e.it(t,i),s="^"+escapeRe(n.fullTitle())+"$";return r.grep(new RegExp(s)),n},e.xit=e.xspecify=e.it.skip=function(t){e.it(t)}})};