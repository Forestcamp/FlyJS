/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true, eqeq: true */
/*global flyjs, createjs, extend*/
this.flyjs = this.flyjs || {};

(function () {

    'use strict';

    var EntityImage = function () {};

    var p = EntityImage.prototype = new flyjs.Entity();

    p.initialize = function () {

    };

    flyjs.EntityImage = EntityImage;
}());