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
            flyjs.AssetManager.addBitmapAsset(listItem);
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
            listItem;

        for (i; i < length; i++) {
            listItem = list[i];
            flyjs.AssetManager.addSpriteSheetAsset(listItem);
        }
    };

    flyjs.ManifestParser = ManifestParser;
}());