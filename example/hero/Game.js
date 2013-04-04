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

    var Game = function (stage) {
        this.initialize(stage);
    };

    var p = Game.prototype = new flyjs.StageRender();

    p.StageRender_initialize = p.initialize;
    p.StageRender_tick = p.tickHandler;

    p.initialize = function (stage) {
        // must call super !!
        this.StageRender_initialize(stage);

        this._createEntities(stage);

        // after create game Entities run Stage update
        this.Render_startRender(stage);
    };

    /**
     * @private
     * @param stage
     */
    p._createEntities = function (stage) {
        this.add(new game.Hero(stage));
    };

    /**
     * @override
     */
    p.tickHandler = function (event) {
        event.target.StageRender_tick(event);
    };

    game.Game = Game;
}());