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
     * ManifestLoader for load manifest file
     * @constructor
     */
    var ManifestLoader = function () {
        this.initialize();
    };

    var p = ManifestLoader.prototype;

    createjs.EventDispatcher.initialize(p);

    /**
     *
     * @type {LoadQueue}
     * @private
     */
    p._loader = null;

    /**
     * @method initialize
     */
    p.initialize = function () {
        this._loader = new createjs.LoadQueue(false);
        this._loader.onProgress = this.handleLoadProgress.bind(this);
        this._loader.onError = this.handleLoadAssetError.bind(this);
        this._loader.onFileLoad = this.handleFileLoad.bind(this);
        this._loader.onComplete = this.handleComplete.bind(this);
    };

    p.start = function (manifest) {
        this._loader.loadManifest(manifest);
    };

    p.handleFileLoad = function (event) {
        if (event.result.hasOwnProperty('spriteSheets')) {
            var contentManifest = this._parseSpriteSheets(event.result.spriteSheets);
            this._loader.loadManifest(contentManifest);
        }
    };

    p.handleComplete = function () {
        this.dispatchEvent('ManifestCompleteLoad');
    };

    p.handleLoadProgress = function (event) {
        event.progress = event.loaded / event.total;
    };

    p.handleLoadAssetError = function (event) {

    };

    /**
     * @method _parseSpriteSheets
     * @param list {Array}
     * @private
     */
    p._parseSpriteSheets = function (list) {
        var i = 0,
            loadImagesList = [],
            length = list.length,
            spriteSheet,
            bitmapAnimation,
            listItem;

        for (i; i < length; i++) {
            listItem = list[i];
            loadImagesList.push({src: listItem.images[0], id: listItem.id});
            spriteSheet = new createjs.SpriteSheet(listItem);
            bitmapAnimation = new createjs.BitmapAnimation(spriteSheet);
            flyjs.SpriteSheetCollection.setCollection(listItem.id, spriteSheet, bitmapAnimation);
        }
    };

    flyjs.ManifestLoader = ManifestLoader;
}());