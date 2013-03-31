/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs, Dictionary*/
this.flyjs = this.flyjs || {};

(function () {
    "use strict";
    /**
     * @class Entity
     * @constructor
     */
    var Entity = function () {};

    var p = Entity.prototype;

    p.initialize = function () {

    };
    /**
     * @type {String}
     * @property name
     * @public
     */
    p.name = null;

    /**
     *
     * @type {boolean}
     */
    p.visible = true;

    /**
     *
     * @type {number}
     */
    p.x = 0;

    /**
     *
     * @type {number}
     */
    p.y = 0;

    p.update = function () {

    };

    p.render = function () {

    };

    p.render = function () {

    };

    flyjs.Entity = Entity;
}());