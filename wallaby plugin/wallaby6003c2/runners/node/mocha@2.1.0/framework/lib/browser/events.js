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
function isArray(e){return"[object Array]"=={}.toString.call(e)}function EventEmitter(){}exports.EventEmitter=EventEmitter,EventEmitter.prototype.on=function(e,t){return this.$events||(this.$events={}),this.$events[e]?isArray(this.$events[e])?this.$events[e].push(t):this.$events[e]=[this.$events[e],t]:this.$events[e]=t,this},EventEmitter.prototype.addListener=EventEmitter.prototype.on,EventEmitter.prototype.once=function(e,t){function i(){r.removeListener(e,i),t.apply(this,arguments)}var r=this;return i.listener=t,this.on(e,i),this},EventEmitter.prototype.removeListener=function(e,t){if(this.$events&&this.$events[e]){var i=this.$events[e];if(isArray(i)){for(var r=-1,n=0,s=i.length;n<s;n++)if(i[n]===t||i[n].listener&&i[n].listener===t){r=n;break}if(r<0)return this;i.splice(r,1),i.length||delete this.$events[e]}else(i===t||i.listener&&i.listener===t)&&delete this.$events[e]}return this},EventEmitter.prototype.removeAllListeners=function(e){return void 0===e?(this.$events={},this):(this.$events&&this.$events[e]&&(this.$events[e]=null),this)},EventEmitter.prototype.listeners=function(e){return this.$events||(this.$events={}),this.$events[e]||(this.$events[e]=[]),isArray(this.$events[e])||(this.$events[e]=[this.$events[e]]),this.$events[e]},EventEmitter.prototype.emit=function(e){if(!this.$events)return!1;var t=this.$events[e];if(!t)return!1;var i=[].slice.call(arguments,1);if("function"==typeof t)t.apply(this,i);else{if(!isArray(t))return!1;for(var r=t.slice(),n=0,s=r.length;n<s;n++)r[n].apply(this,i)}return!0};