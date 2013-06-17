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
    /**
     * A helper for common key codes
     * @class Key
     * @constructor
     */
    var MathUtil = function () {
        throw "MathUtil cannot be instantiated.";
    };

    MathUtil.radiansToDegrees = function (rad) {
        return rad * (180 / Math.PI);
    };

    /**
     * Convert degrees to radians
     * @param {number} degrees 0 to 360 degrees
     * @returns {number} Numerical value of radians
     */
    MathUtil.degreesToRadian = function (degrees) {
        return degrees * (Math.PI / 180);
    };

    /**
     * A sign is the dot product of a number. Meaning it pretty much tests if a number is in positive or negative space.
     * @link http://en.wikipedia.org/wiki/Sign_function
     * @link http://en.wikipedia.org/wiki/Dot_product
     */
    MathUtil.sign = function (number) {
        return number && number / Math.abs(number);
    };

    flyjs.MathUtil = MathUtil;
}());