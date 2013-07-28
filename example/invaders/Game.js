/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true, eqeq:true */
/*jshint eqnull:true*/
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

        this.invadersList = [];
        this._popInvaderInRow(60, 50);
        this._popInvaderInRow(60, 150);

        this.invaderDirection = game.Direction.LEFT;
    };

    p._popInvaderInRow = function (startX, startY) {
        var currentX = startX,
            enemy = null,
            i = 0;
        for (i; i < game.GameConstant.invadersPerRow; i++) {
            enemy = new game.EnemyShip(this, currentX, startY);
            this.add(enemy);
            this.invadersList.push(enemy);
            currentX += 120;
        }
    };

    /**
     * @override
     */
    p.tickHandler = function (event) {
        var target = event.currentTarget;

        target.StageRender_tick(event);

        target._moveInvaders(target.frameNumber);

        target = null;
    };

    p._moveInvaders = function (frameNumber) {
        if ((frameNumber % game.GameConstant.frameSkipped) === 0) {

            var dirChangeNeeded = this._checkInvadersDirection();

            var i = 0;
            for (i; i < this.invadersList.length; i++) {
                this.invadersList[i].move(this.invaderDirection);

                if (dirChangeNeeded) {
                    this.invadersList[i].move(game.Direction.DOWN);
                }
            }
        }
    };

    p._checkInvadersDirection = function () {
        var dirChangeNeeded = false,
            i = 0;

        if (this.invaderDirection == game.Direction.LEFT) {
            for (i; i < this.invadersList.length; i++) {
                if (this.invadersList[i].x < 10) {
                    dirChangeNeeded = true;
                    this.invaderDirection = game.Direction.RIGHT;
                    break;
                }
            }
        } else if (this.invaderDirection == game.Direction.RIGHT) {
            for (i; i < this.invadersList.length; i++) {
                if (this.invadersList[i].x > this.sceneBounds.width - 80) {
                    dirChangeNeeded = true;
                    this.invaderDirection = game.Direction.LEFT;
                    break;
                }
            }
        }
        return dirChangeNeeded;
    };

    game.Game = Game;
}());