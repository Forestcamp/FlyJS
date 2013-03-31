/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs, Dictionary*/
this.flyjs = this.flyjs || {};

(function () {
    "use strict";

    var EntitySprite = function () {
        this.initialize();
    };

    var p = EntitySprite.prototype;

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

    p.initialize = function () {

    };
    /**
     *
     */
    p.update = function () {

    };

    /**
     *
     * @param target
     * @param point
     * @param camera
     */
    p.render = function (target, point, camera) {

    };

    flyjs.EntitySprite = EntitySprite;
})();