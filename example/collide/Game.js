/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true, eqeq:true */
/*jshint eqnull:true*/
/*global createjs, flyjs, console, game, Circle2, Circle*/

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
        // call super !!
        this.StageRender_initialize(canvasParent, options);
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
        this._createCircles();
    };

    p._createCircles = function (num, list) {
        var c,
            i = 0,
            x,
            y,
            width,
            height,
            canvas = this.stage.canvas;

        for (i; i < 5; i++) {

            width = Math.ceil(Math.random() * 50) + 20;
            height = Math.ceil(Math.random() * 50) + 20;

            x = Math.random() * canvas.width;
            y = Math.random() * canvas.height;

            if (x + width > canvas.width) {
                x = canvas.width - width - 1;
            }

            if (y + height > canvas.height) {
                y = canvas.height - height - 1;
            }

            c = new flyjs.RectangleBox(
                this,
                {width: width, height: height, x: x, y: y},
                "rgb(255,255,255)",
                "rgba(217,83,77,0.7)"
            );
            c.name = "Rectangle :: " + i;
            this.add(c);
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