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
    var Loader = function (options) {
        this._options = options;
    };

    var p = Loader.prototype;

    p.loadFile = function (item) {
        this._loader = new createjs.LoadQueue();
        this._addHandlers();
        this._loader.loadFile(item);
    };

    p.loadManifest = function (item) {
        this._loader = new createjs.LoadQueue(false);
        this._addHandlers();
        this._loader.loadManifest(item);
    };

    p._addHandlers = function () {
        this._loader.onProgress = this._options.onProgress;
        this._loader.onError = this._options.onError;
        this._loader.onFileLoad = this._options.onFileLoad;
        this._loader.onComplete = this._options.onComplete;
    };

    flyjs.Loader = Loader;
}());