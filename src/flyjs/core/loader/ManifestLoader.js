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
    var ManifestLoader = function (url) {
        this.initialize(url);
    };

    var p = ManifestLoader.prototype = new flyjs.Command();

    p.initialize = function (url) {
        this._manifestUrl = url;
    };

    p.execute = function () {
        this._loader = new flyjs.Loader({
            onFileLoad: this.handleOnFileLoad.bind(this),
            onComplete: this.handleOnComplete.bind(this)
        });
        this._loader.loadFile(this._manifestUrl);
    };

    p.handleOnFileLoad = function (event) {
        flyjs.AssetManager.manifest = event.result;
    };

    p.handleOnComplete = function () {
        this._loader.removeHandlers();
        this.complete();
    };

    flyjs.ManifestLoader = ManifestLoader;
}());