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
     * @param manifestUrl - url to Manifest JSON file
     */
    var ManifestManager = function (manifestUrl) {
        this.initialize(manifestUrl);
    };

    var p = ManifestManager.prototype;

    createjs.EventDispatcher.initialize(p);

    /**
     *
     * @type {string}
     * @private
     */
    p._manifestUrl = '';

    /**
     *
     * @type {SerialCommand}
     * @private
     */
    p._serial = null;

    /**
     * @method initialize
     */
    p.initialize = function (manifestUrl) {
        this._manifestUrl = manifestUrl;
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
        this.serial.removeEventListener("complete", this.handleComplete);
        this.serial = null;
        this.dispatchEvent('ManifestCompleteLoad');
    };

    flyjs.ManifestManager = ManifestManager;
}());