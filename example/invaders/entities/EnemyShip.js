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

    var EnemyShip = function (scene, startX, startY) {
        this.initialize(scene, startX, startY);
    };

    var p = EnemyShip.prototype = new flyjs.Entity();

    p.Flyjs_Entity_initialize = p.initialize;
    p.Flyjs_Entity_update = p.update;
    p.Flyjs_Entity_setHitBounds = p.setHitBounds;

    p.initialize = function (scene, startX, startY) {
        this.Flyjs_Entity_initialize(scene);
        this.name = "EnemyShip";
        this.x = startX;
        this.y = startY;
        this._prepare();
    };

    /**
     * @method _prepare
     * @private
     */
    p._prepare = function () {
        this.ship = flyjs.AssetManager.getAsset('enemy-ship-green');

        // set ship position
        this.ship.x = this.x;
        this.ship.y = this.y;

        this.Flyjs_Entity_setHitBounds({
            x: this.ship.x,
            y: this.ship.y,
            width: this.ship.image.width,
            height: this.ship.image.height
        });

        this.addChild(this.ship);
    };

    p.update = function (event) {
        this.Flyjs_Entity_update();

        if (event && event.collisionList[0] == "Laser") {
            this.scene.remove(this);
        }
    };

    /**
     * Move entity
     * @param direction
     */
    p.move = function (direction) {
        switch (direction) {
            case game.Direction.RIGHT:
                this.ship.x += 10;
                break;
            case game.Direction.LEFT:
                this.ship.x -= 10;
                break;
            case game.Direction.DOWN:
                this.ship.y += 30;
                break;
        }
    };

    game.EnemyShip = EnemyShip;
}());