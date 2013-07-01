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

    var Game = function (holderCanvasId, options) {
        this.initialize(holderCanvasId, options);
    };

    var p = Game.prototype = new flyjs.StageRender();

    p.StageRender_initialize = p.initialize;
    p.StageRender_tick = p.tickHandler;

    p.initialize = function (holderCanvasId, options) {
        //call super
        this.StageRender_initialize(holderCanvasId, options);
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

        this._popInvaderInRow(60, 50);
    };

    p._popInvaderInRow = function (startX, startY) {
        var currentX = startX,
            i = 0;
        for (i; i < game.GameConstant.invadersPerRow; i++) {
            this.add(new game.EnemyShip(this, currentX, startY));
            currentX += 120;
        }
    };

    /**
     * @override
     */
    p.tickHandler = function (event) {
        event.target.StageRender_tick(event);
    };

    game.Game = Game;
}());