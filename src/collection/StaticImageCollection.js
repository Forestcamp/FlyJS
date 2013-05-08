/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true, eqeq: true */
/*global flyjs, createjs, window*/
this.flyjs = this.flyjs || {};
(function () {
    'use strict';

    var StaticImageCollection = function () {
        throw "StaticImageCollection cannot be instantiated.";
    };

    /**
     *
     * @type {Object}
     * @private
     */
    StaticImageCollection._collection = {};

    /**
     * @method setCollection
     * @param id {String}
     * @param bitmap {DisplayObject}
     */
    StaticImageCollection.setCollection = function (id, bitmap) {
        this._collection[id] = bitmap;
    };

    /**
     * @method getSource
     * @returns {DisplayObject}
     */
    StaticImageCollection.getSource = function (id) {
        var displayObject = null;
        if (this._collection.hasOwnProperty(id)) {
            displayObject = this._collection[id];
        }
        return displayObject;
    };

    flyjs.StaticImageCollection = StaticImageCollection;
}());