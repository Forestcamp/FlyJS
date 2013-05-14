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

    var PlayerShip = function (stage) {
        this.initialize(stage);
    };

    var p = PlayerShip.prototype = new flyjs.Entity();

    p.Flyjs_Entity_initialize = p.initialize;

    /**
     *
     * @type {Boolean}
     */
    p.alive = true;

    p._bottomOffset = 20;

    /**
     *
     * @param stage
     */
    p.initialize = function (stage) {
        this.Flyjs_Entity_initialize(stage);

        this._prepare();
    };

    /**
     * @method _prepare
     * @private
     */
    p._prepare = function () {
        this.ship = flyjs.AssetManager.getAsset('player-ship');
        // set ship position
        this.ship.x = this.stage.canvas.width / 2 - this.ship.image.width / 2;
        this.ship.y = this.stage.canvas.height - this.ship.image.height - this._bottomOffset;

        this.stage.addChild(this.ship);

        // define GamePad buttons
        flyjs.GamePad.define("RIGHT", [flyjs.Key.RIGHT]);
        flyjs.GamePad.define("LEFT", [flyjs.Key.LEFT]);
    };

    p.update = function () {
        if (flyjs.GamePad.check("RIGHT")) {
            this.ship.x += 3;
        }

        if (flyjs.GamePad.check("LEFT")) {
            this.ship.x -= 3;
        }
    };

    game.PlayerShip = PlayerShip;
}());