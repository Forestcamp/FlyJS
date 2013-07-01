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
        this.StageRender_initialize(canvasParent, options);

    };

    p.loadManifestComplete = function (event) {
        this._createEntities();

        // after create game Entities run Stage update
        this.startRender();
    };

    /**
     * @private
     * @param stage
     */
    p._createEntities = function () {
        this.add(new game.Hero(this));
    };

    /**
     * @override
     */
    p.tickHandler = function (event) {
        event.target.StageRender_tick(event);
    };

    game.Game = Game;
}());