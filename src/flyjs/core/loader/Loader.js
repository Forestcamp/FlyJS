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
     * @class Loader
     * @param options
     * @constructor
     */
    var Loader = function (options) {
        this._options = options;
    };

    var p = Loader.prototype;

    p.loadFile = function (item) {
        this._load(true, item);
    };

    p.loadManifest = function (item) {
        this._load(false, item);
    };

    /**
     *
     * @param useXHR - Determines whether the preload instance will favor loading with XHR.
     * @param item
     * @private
     */
    p._load = function (useXHR, item) {
        this._loader = new createjs.LoadQueue(useXHR);
        this._addHandlers();
        if (useXHR) {
            this._loader.loadFile(item);
        } else {
            this._loader.loadManifest(item);
        }
    };

    p._addHandlers = function () {
        this._loader.onProgress = this._options.onProgress;
        this._loader.onError = this._options.onError;
        this._loader.onFileLoad = this._options.onFileLoad;
        this._loader.onComplete = this._options.onComplete;
    };

    flyjs.Loader = Loader;
}());