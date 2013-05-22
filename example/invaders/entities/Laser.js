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

    var Laser = function (stage) {
        this.initialize(stage);
    };

    var p = Laser.prototype = new flyjs.Entity();

    p.Flyjs_Entity_initialize = p.initialize;

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

        this.setHitBox(4, 4, 0, 0);
    };

    p.update = function () {

    };

    game.Laser = Laser;
}());