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
    var ImageLoader = function () {

    };

    var p = ImageLoader.prototype = new flyjs.Command();

    /**
     *
     * @type {Array}
     */
    p.images = null;

    p.execute = function () {
        if (flyjs.AssetManager.manifest.images) {
            this.images = [];
            this._loader = new flyjs.Loader({
                onFileLoad: this.handleOnFileLoad.bind(this),
                onComplete: this.handleOnComplete.bind(this)
            });
            this._loader.loadManifest(flyjs.AssetManager.manifest.images);
        } else {
            this.complete();
        }
    };

    p.handleOnFileLoad = function (event) {
        this.images.push(event.item);
    };

    p.handleOnComplete = function () {
        flyjs.ManifestParser.parseImages(this.images);
        this._loader.removeHandlers();
        this.complete();
        this.images = null;
    };

    flyjs.ImageLoader = ImageLoader;
}());