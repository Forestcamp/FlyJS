/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true, eqeq:true */
/*jshint eqnull:true*/
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

        this._entitiesCollection = new flyjs.EntitiesCollection();
        ////////////////////
        // Initialize
        ////////////////////
        this._loadManifestFile();

        var bounds = new createjs.Rectangle(0, 0, this._options.width, this._options.height);
        this._quadTree = new flyjs.QuadTree(bounds, false, 7);

        flyjs.GamePad.initialize(this.stage);
        this.Render_initialize(this.stage);
    };

    ///////////////////////////////////////////////////////////////////////
    /// Public
    ///////////////////////////////////////////////////////////////////////

    /**
     * add Entity to scene
     * @method add
     * @param entity
     * @public
     */
    p.add = function (entity) {
        this._entitiesCollection.add(entity);
        if (entity.allowCollisions) {
            this._quadTree.insert(entity);
        }
    };

    /**
     * remove Entity from scene
     * @method remove
     * @param entity
     * @public
     */
    p.remove = function (entity) {
        this._entitiesCollection.remove(entity);
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

        this._entitiesCollection.checkStack();

        var listEntities = this._entitiesCollection.getEntities();

        this._updateEntityPosition(listEntities);
        this._collisionRender(listEntities);

        flyjs.GamePad.update();
        this._FPSMeter.end();
    };

    ///////////////////////////////////////////////////////////////////////
    /// Internals
    ///////////////////////////////////////////////////////////////////////

    /**
     * updated Entities on scene
     * @method _updateEntityPosition
     * @param listEntities
     * @private
     */
    p._updateEntityPosition = function (listEntities) {
        var i = 0,
            entity,
            length = listEntities.length;

        for (i; i < length; i++) {
            entity = listEntities[i][1];
            entity.update();
        }
        i = null;
        entity = null;
        length = null;
    };

    /**
     * checked collision on scene
     * @method _collisionRender
     * @param listEntities
     * @private
     */
    p._collisionRender = function (listEntities) {

        this._quadTree.clear();
        this._quadTree.insert(this._entitiesCollection.getEntitiesValues());

        var i = 0,
            j = 0,
            len = 0,
            length = listEntities.length,
            entity = null,
            entities = null,
            entityNode = null,
            entityEvent = null,
            collide = null;

        for (i; i < length; i++) {
            entity = listEntities[i][1];
            if (entity.allowCollisions) {
                entities = this._quadTree.retrieve(entity);
                len = entities.length;
                j = 0;
                entityEvent = {
                    collisionList: []
                };
                for (j; j < len; j++) {
                    entityNode = entities[j];
                    if (entity.id != entityNode.id && entityNode.allowCollisions) {
                        collide = flyjs.VertexLib.sat(entity.verticesHit, entityNode.verticesHit);
                        if (collide) {
                            entityEvent.collisionList.push(entityNode.name);
                        }
                    }
                }
                if (entityEvent.collisionList.length > 0) {
                    entity.update(entityEvent);
                }
            }
        }
    };

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
        this.loader.addEventListener('ManifestCompleteLoad', this.loadManifestComplete.bind(this));
        this.loader.start();
    };

    /**
     *
     * @protected
     */
    p.loadManifestComplete = function () {
        this.loader.removeEventListener('ManifestCompleteLoad', this.loadManifestComplete);
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
     *
     * @type {QuadTree}
     * @private
     */
    p._quadTree = null;
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