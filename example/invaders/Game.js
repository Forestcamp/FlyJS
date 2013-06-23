/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs, console, game*/

this.game = this.game || {};

(function () {
    'use strict';

    var Game = function (canvasParent, options) {
        this.initialize(canvasParent, options);
    };

    var p = Game.prototype = new flyjs.StageRender();

    p.StageRender_initialize = p.initialize;
    p.StageRender_tick = p.tickHandler;

    p.initialize = function (canvasParent, options) {
        // must call super !!
        this.StageRender_initialize(canvasParent, options, 'manifest.json');
    };

    /**
     * @override
     */
    p.loadManifestComplete = function () {
        this._createEntities();
        // after create game Entities run Stage update
        this.startRender();
    };

    /**
     * @method _createEntities
     * @private
     */
    p._createEntities = function () {
        this.stage.addChild(flyjs.AssetManager.getAsset('background'));

        this.add(new game.PlayerShip(this));
        this.add(new game.EnemyShip(this));
    };

    /**
     * @override
     */
    p.tickHandler = function (event) {
        event.target.StageRender_tick(event);
    };

    game.Game = Game;
}());