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

    var PlayerShip = function (stage, render) {
        this.initialize(stage, render);
    };

    var p = PlayerShip.prototype = new flyjs.Entity();

    p.Flyjs_Entity_initialize = p.initialize;

    /**
     *
     * @param stage
     */
    p.initialize = function (stage, render) {
        this.Flyjs_Entity_initialize(stage, render);

        this._prepare();
    };

    /**
     * @method _prepare
     * @private
     */
    p._prepare = function () {
        this.ship = flyjs.AssetManager.getAsset('player-ship');

        this.stage.addChild(this.ship);

        // define GamePad buttons
        flyjs.GamePad.define("RIGHT", [flyjs.Key.RIGHT]);
        flyjs.GamePad.define("LEFT", [flyjs.Key.LEFT]);
        flyjs.GamePad.define("SPACE", [flyjs.Key.SPACE]);

        // set ship position
        this.ship.x = this.stage.canvas.width / 2 - this.ship.image.width / 2;
        this.ship.y = this.stage.canvas.height - this.ship.image.height;

        this.allowCollisions = false;
    };

    p.update = function () {
        if (flyjs.GamePad.check("RIGHT")) {
            this.ship.x += 3;
        }

        if (flyjs.GamePad.check("LEFT")) {
            this.ship.x -= 3;
        }

        if (flyjs.GamePad.isPressed("SPACE")) {
            var laser = new game.Laser(this.stage, this.stageRender);
            laser.setPosition({
                x: this.ship.x + this.ship.image.width / 2,
                y: this.ship.y
            });

            this.stageRender.add(laser);
        }
    };

    game.PlayerShip = PlayerShip;
}());