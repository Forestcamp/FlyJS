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

    var SpriteSheetCollection = function () {
        throw "SpriteSheetCollection cannot be instantiated.";
    };

    /**
     *
     * @type {Object}
     * @private
     */
    SpriteSheetCollection._collection = {};

    SpriteSheetCollection.setCollection = function (id, spriteSheet, bitmapAnimation) {
        this._collection[id] = {
            sprite: spriteSheet,
            bitmap: bitmapAnimation
        };
    };

    /**
     *
     * @returns {Object}
     */
    SpriteSheetCollection.getSprite = function (id) {
        if (this._collection.hasOwnProperty(id)) {
            return this._collection[id];
        }
        return null;
    };

    flyjs.SpriteSheetCollection = SpriteSheetCollection;
}());