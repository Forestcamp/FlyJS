/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs, extend*/
this.flyjs = this.flyjs || {};

(function () {
    "use strict";
    /**
     * Create game Entity
     * @class Entity
     * @constructor
     */
    var Entity = function () {};

    var p = Entity.prototype;

    /**
     * @type {String}
     * @property name
     * @public
     */
    p.name = null;

    /**
     * @property _stage
     * @type {Stage}
     * @public
     */
    p.stage = null;

    /**
     * @type {Boolean}
     * @property visible
     */
    p.visible = true;

    /**
     * @type {number}
     * @property x
     * @public
     */
    p.x = 0;

    /**
     * @type {number}
     * @property y
     * @public
     */
    p.y = 0;

    p.initialize = function (stage) {
        this.stage = stage;
    };

    p.update = function () {};
    p.render = function () {};


    flyjs.Entity = Entity;
}());