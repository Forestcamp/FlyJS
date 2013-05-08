/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true, eqeq: true */
/*global flyjs, createjs*/

this.flyjs = this.flyjs || {};
(function () {
    'use strict';

    /**
     * ManifestParser for load manifest file
     * @constructor
     */
    var ManifestParser = function () {
        throw "ManifestParser cannot be instantiated.";
    };

    /**
     * @method parseImages
     * @param list {Array}
     * @public
     */
    ManifestParser.parseImages = function (list) {
        var i = 0,
            length = list.length,
            listItem,
            bitmap;

        for (i; i < length; i++) {
            listItem = list[i];
            bitmap = new createjs.Bitmap(listItem.src);
            flyjs.StaticImageCollection.setCollection(listItem.id, bitmap);
        }
    };

    /**
     * @method parseSpriteSheets
     * @param list {Array}
     * @public
     */
    ManifestParser.parseSpriteSheets = function (list) {
        var i = 0,
            length = list.length,
            spriteSheet,
            bitmapAnimation,
            listItem;

        for (i; i < length; i++) {
            listItem = list[i];
            spriteSheet = new createjs.SpriteSheet(listItem);
            bitmapAnimation = new createjs.BitmapAnimation(spriteSheet);
            flyjs.SpriteSheetCollection.setCollection(listItem.id, spriteSheet, bitmapAnimation);
        }
    };

    flyjs.ManifestParser = ManifestParser;
}());