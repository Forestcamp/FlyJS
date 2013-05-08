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

    var AssetManager = function () {
        throw "AssetManager cannot be instantiated.";
    };

    AssetManager._assets = {};

    AssetManager.addBitmapAsset = function (asset) {
        var bitmap = new createjs.Bitmap(asset.src);
        this._assets[asset.id] = bitmap;
    };

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
//        if (this._assetsSpriteSheet[name] != null && this._assetsBitmap != null) {
//            throw "asset name must be unique!";
//        }
//
        if (asset == null || asset == undefined) {
            throw "asset not exist!";
        }

        return asset;
    };

    flyjs.AssetManager = AssetManager;
}());