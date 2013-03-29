/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs, Dictionary*/

this.flyjs = flyjs || {};

(function () {
    "use strict";

    /**
     * @class State
     * @constructor
     */
    var State = function () {

    };

    var p = State.prototype;

    /**
     *
     * @type {Dictionary}
     * @private
     */
    p._providers = new Dictionary();

    /**
     *
     * @param clazz
     */
    p.add = function (clazz) {

    };

    /**
     *
     * @param clazz
     * @returns {*}
     */
    p.get = function (clazz) {
        return this._providers[clazz];
    };

    /**
     *
     * @param clazz
     * @returns {boolean}
     */
    p.has = function (clazz) {
        return this._providers[clazz] !== null;
    };

    flyjs.State = State;
})();