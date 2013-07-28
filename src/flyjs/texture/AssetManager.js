/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true, eqeq:true*/
/*jshint eqnull:true*/
/*global flyjs, createjs*/

this.flyjs = this.flyjs || {};
(function () {
    'use strict';

    var AssetManager = function () {
        throw "AssetManager cannot be instantiated.";
    };

    AssetManager.manifest = {};

    AssetManager._assets = {};

    /**
     * @method addBitmapAsset
     * @param asset {Object}
     */
    AssetManager.addBitmapAsset = function (asset) {
        var bitmap;
        bitmap = new createjs.Bitmap(asset.src);
        this._assets[asset.id] = bitmap;
    };

    /**
     * @method addSpriteSheetAsset
     * @param asset {Object}
     */
    AssetManager.addSpriteSheetAsset = function (asset) {
        var spriteSheet,
            bitmapAnimation;
        spriteSheet = new createjs.SpriteSheet(asset);
        bitmapAnimation = new createjs.BitmapAnimation(spriteSheet);

        this._assets[asset.id] = {
            'sprite': spriteSheet,
            'bitmap': bitmapAnimation
        };
    };

    /**
     *
     * @param name
     * @returns {*}
     */
    AssetManager.getAsset = function (name) {
        var asset = this._assets[name];

        if (asset == null) {
            throw "asset not exist!";
        }

        if (asset.clone != null) {
            asset = asset.clone(true);
        }

        if (asset.hasOwnProperty("bitmap")) {
            asset.bitmap = asset.bitmap.clone(true);
        }

        return asset;
    };

    flyjs.AssetManager = AssetManager;
}());