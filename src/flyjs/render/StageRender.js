/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs, createjs, document, Stats*/

this.flyjs = this.flyjs || {};
(function () {
    "use strict";

    /**
     * Controlling Entities updates, collisions & other rendering process
     * @class StageRender
     * @constructor
     */
    var StageRender = function () {};

    var p = StageRender.prototype = new flyjs.Render();

    ///////////////////////////////////////////////////////////////////////
    /// Overrides methods
    ///////////////////////////////////////////////////////////////////////
    p.Render_initialize = p.initialize;
    p.Render_startRender = p.startRender;
    p.Render_stopRender  = p.stopRender;
    p.Render_tick = p.tickHandler;

    /**
     * @property stage
     * @type {Stage}
     * @public
     */
    p.stage = null;

    /**
     *
     * @param canvasParent - div element name
     * @param options
     */
    p.initialize = function (canvasParent, options) {
        if (!canvasParent) {
            throw new flyjs.Exception("StageRender: error in parameters", "Stage is Null");
        }

        this._parseOptions(options);
        this._createStage(canvasParent);

        ////////////////////
        // Initialize
        ////////////////////
        this._entitiesCollection = new flyjs.EntitiesCollection();
        flyjs.GamePad.initialize(this.stage);
        this.Render_initialize(this.stage);
        this._loadManifestFile();
    };

    ///////////////////////////////////////////////////////////////////////
    /// Public
    ///////////////////////////////////////////////////////////////////////

    /**
     *
     * @method add
     * @param entity
     * @public
     */
    p.add = function (entity) {
        this._entitiesCollection.add(entity);
    };

    p.startRender = function () {
        this.Render_startRender(this.stage);
        this._addStats();
    };

    p.stopRender = function () {
        this.Render_stopRender();
    };

    p.tickHandler = function (event) {
        this._FPSMeter.begin();
        this.Render_tick(event);

        var i = 0,
            length = this._entitiesCollection._listEntities.length,
            entity = null;

        for (i; i < length; i++) {
            entity = this._entitiesCollection._listEntities[i];

            entity.update();
        }

        flyjs.GamePad.update();
        this._FPSMeter.end();
    };

    ///////////////////////////////////////////////////////////////////////
    /// Internals
    ///////////////////////////////////////////////////////////////////////
    /**
     * Create dynamic Canvas stage
     * @param canvasParent
     * @private
     */
    p._createStage = function (canvasParent) {
        var canvasHolder = document.getElementsByClassName(canvasParent)[0],
            canvas = document.createElement('canvas');
        canvas.width = this._options.width;
        canvas.height = this._options.height;
        canvasHolder.appendChild(canvas);

        this.stage = new createjs.Stage(canvas);
        this.stage.addChild(this);
        this.stage.update();
    };

    /**
     * @method _loadManifestFile
     * @private
     */
    p._loadManifestFile = function () {
        this.loader = new flyjs.ManifestManager(this._options.manifest);
        this.loader.addEventListener('ManifestCompleteLoad', this._loadManifestComplete.bind(this));
        this.loader.start();
    };

    /**
     *
     * @private
     */
    p._loadManifestComplete = function () {
        this.loader.removeEventListener('ManifestCompleteLoad', this._loadManifestComplete);
    };

    /**
     * @method _addStats
     * @private
     */
    p._addStats = function () {
        this._FPSMeter = new Stats();
        this._FPSMeter.setMode(0);
        // Align top-left
        this._FPSMeter.domElement.style.position = 'absolute';
        this._FPSMeter.domElement.style.left = '0px';
        this._FPSMeter.domElement.style.top = '0px';

        document.body.appendChild(this._FPSMeter.domElement);
    };

    /**
     * Parse 'options' or set defaults settings
     * @param options
     * @private
     */
    p._parseOptions = function (options) {
        if (options.hasOwnProperty('manifest')) {
            this._options.manifest = options.manifest;
        }
        if (options.hasOwnProperty('width')) {
            this._options.width = options.width;
        }
        if (options.hasOwnProperty('height')) {
            this._options.height = options.height;
        }
    };

    /**
     * Initialize options
     * @type {Object}
     * @private
     */
    p._options = {
        manifest: 'manifest.json',
        width: 800,
        height: 600
    };
    /**
     * @property _entitiesCollection
     * @type {EntitiesCollection}
     * @private
     */
    p._entitiesCollection = null;

    /**
     * @property _FPSMeter
     * @type {Stats}
     * @private
     */
    p._FPSMeter = null;

    flyjs.StageRender = StageRender;
}());