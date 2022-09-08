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
var Suite=require("../suite"),Test=require("../test"),escapeRe=require("escape-string-regexp"),utils=require("../utils");module.exports=function(e){var t=[e];e.on("pre-require",function(e,i,r){e.before=function(e,i){t[0].beforeAll(e,i)},e.after=function(e,i){t[0].afterAll(e,i)},e.beforeEach=function(e,i){t[0].beforeEach(e,i)},e.afterEach=function(e,i){t[0].afterEach(e,i)},e.suite=function(e){t.length>1&&t.shift();var r=Suite.create(t[0],e);return r.file=i,t.unshift(r),r},e.suite.only=function(t,i){var n=e.suite(t,i);r.grep(n.fullTitle())},e.test=function(e,r){var n=new Test(e,r);return n.file=i,t[0].addTest(n),n},e.test.only=function(t,i){var n=e.test(t,i),s="^"+escapeRe(n.fullTitle())+"$";r.grep(new RegExp(s))},e.test.skip=function(t){e.test(t)}})};