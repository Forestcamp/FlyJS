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

    var EnemyShip = function (stage, render) {
        this.initialize(stage, render);
    };

    var p = EnemyShip.prototype = new flyjs.Entity();

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
        this.ship = flyjs.AssetManager.getAsset('enemy-ship-green');

        this.scene.stage.addChild(this.ship);

        // set ship position
        this.ship.x = this.scene.stage.canvas.width / 2 - this.ship.image.width / 2;
        this.ship.y = 50;

        this.allowCollisions = false;
    };

    p.update = function () {


    };

    game.EnemyShip = EnemyShip;
}());