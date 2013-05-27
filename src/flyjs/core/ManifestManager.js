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
     * ManifestManager for load manifest file
     * @constructor
     */
    var ManifestManager = function (manifest) {
        this.initialize(manifest);
    };

    var p = ManifestManager.prototype;

    createjs.EventDispatcher.initialize(p);

    /**
     *
     * @type {LoadQueue}
     * @private
     */
    p._loader = null;

    /**
     *
     * @type {string}
     * @private
     */
    p._manifestUrl = '';

    /**
     * @method initialize
     */
    p.initialize = function (manifest) {
        this._manifestUrl = manifest;
    };

    p.start = function () {
        this.serial = new flyjs.SerialCommand([
            new flyjs.ManifestLoader(this._manifestUrl),
            new flyjs.ImageLoader(),
            new flyjs.SpriteSheetLoader()
        ]);
        this.serial.addEventListener("complete", this.handleComplete.bind(this));
        this.serial.start();
    };

    p.handleComplete = function () {
        this.dispatchEvent('ManifestCompleteLoad');
    };

    p.handleFileLoad = function (event) {
//        var result = event.result,
//            contentManifest;
//        if (result.hasOwnProperty('spriteSheets')) {
//            contentManifest = flyjs.ManifestParser.parseSpriteSheets(result.spriteSheets);
//            this._loader.loadManifest(contentManifest);
//        } else if (result.hasOwnProperty('images')) {
//            contentManifest = flyjs.ManifestParser.parseImages(result.images);
//            this._loader.loadManifest(contentManifest);
//        }

    };

    flyjs.ManifestManager = ManifestManager;
}());