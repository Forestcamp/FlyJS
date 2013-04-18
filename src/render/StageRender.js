/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs*/

this.flyjs = this.flyjs || {};
(function () {
    "use strict";

    /**
     * @class StageRender
     * @constructor
     */
    var StageRender = function () {};

    var p = StageRender.prototype = new flyjs.Render();

    p.Render_initialize = p.initialize;
    p.Render_startRender = p.startRender;
    p.Render_stopRender  = p.stopRender;
    p.Render_tick = p.tickHandler;

    /**
     * @property stage
     * @type {Stage}
     * @private
     */
    p.stage = null;

    /**
     * @property _entitiesCollection
     * @type {EntitiesCollection}
     * @private
     */
    p._entitiesCollection = null;

    /**
     * @property _FPSMeter
     * @type {FPSMeter}
     * @private
     */
    p._FPSMeter = null;

    p.initialize = function (stage, manifest) {
        if (!stage) {
            throw new flyjs.Exception("StageRender: error in parameters", "Stage is Null");
        }

        this.stage = stage;

        //******************
        // Initialize block
        //******************
        this._entitiesCollection = new flyjs.EntitiesCollection();
        flyjs.GamePad.initialize(stage);
        this.Render_initialize(stage);

        this.loader = new flyjs.ManifestLoader();
        this.loader.addEventListener('ManifestCompleteLoad', this.loadManifestComplete.bind(this));
        this.loader.start(manifest);
    };

    p.loadManifestComplete = function (event) {
        this.loader.removeEventListener('ManifestCompleteLoad', this.loadManifestComplete);
    };

    p.startRender = function () {
        this.Render_startRender(this.stage);
        this._FPSMeter = new flyjs.FPSMeter(this.stage);
    };

    p.stopRender = function () {
        this.Render_stopRender();
    };

    p.tickHandler = function (event) {

        this.Render_tick(event);

        var i = 0,
            length = this._entitiesCollection._listEntities.length;

        for (i; i < length; i++) {
            this._entitiesCollection._listEntities[i].update();
        }

        flyjs.GamePad.update();
    };

    /**
     *
     * @method add
     * @param entity
     * @public
     */
    p.add = function (entity) {
        this._entitiesCollection.add(entity);
    };

    flyjs.StageRender = StageRender;
}());