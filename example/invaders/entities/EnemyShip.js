/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true, eqeq:true */
/*global flyjs, console, game*/

this.game = this.game || {};

(function () {
    'use strict';

    var EnemyShip = function (scene) {
        this.initialize(scene);
    };

    var p = EnemyShip.prototype = new flyjs.Entity();

    p.Flyjs_Entity_initialize = p.initialize;
    p.Flyjs_Entity_initialize = p.initialize;
    p.Flyjs_Entity_setHitBounds = p.setHitBounds;

    /**
     *
     * @param scene
     */
    p.initialize = function (scene) {
        this.Flyjs_Entity_initialize(scene);
        this.name = "EnemyShip";
        this._prepare();
    };

    /**
     * @method _prepare
     * @private
     */
    p._prepare = function () {
        this.ship = flyjs.AssetManager.getAsset('enemy-ship-green');

        // set ship position
        this.ship.x = this.scene.stage.canvas.width / 2 - this.ship.image.width / 2;
        this.ship.y = 50;

        this.Flyjs_Entity_setHitBounds({
            x: this.ship.x,
            y: this.ship.y,
            width: this.ship.image.width,
            height: this.ship.image.height
        });

        this.addChild(this.ship);
    };

    p.update = function (event) {
        this.Flyjs_Entity_initialize();

        if (event && event.collisionList[0] == "Laser") {
            console.log("Enemy damage!!");
        }
    };

    game.EnemyShip = EnemyShip;
}());