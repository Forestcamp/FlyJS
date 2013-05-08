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
        var result = event.result,
            contentManifest;
        if (result.hasOwnProperty('spriteSheets')) {
            contentManifest = flyjs.ManifestParser.parseSpriteSheets(result.spriteSheets);
            this._loader.loadManifest(contentManifest);
        } else if (result.hasOwnProperty('images')) {
            contentManifest = flyjs.ManifestParser.parseImages(result.images);
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

    flyjs.ManifestLoader = ManifestLoader;
}());