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
        // must call super !!
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

        this.bounds = new createjs.Rectangle(0, 0, 600, 500);
        this.circles = [];
        this.circles2 = [];

        this.tree = new flyjs.QuadTree(this.bounds, false, 7);

        this._createCircles(1, this.circles);
        this._createCircles(2, this.circles2);
    };

    p._createCircles = function (num, list) {
        var c,
            x,
            y;

        var radius,
            i = 0;

        for (i; i < this._circleCount; i++) {
            radius = Math.ceil(Math.random() * 10) + 1;
            if (num == 1) {
                c = new flyjs.Circle(this.bounds, radius, "rgb(255,255,255)", "rgba(217,83,77,0.7)");
            } else if (num == 2) {
                c = new flyjs.Circle(this.bounds, radius, "rgba(108,202,255, 0.8)", "rgba(50,221,94,0.9)");
            }

            x = Math.random() * this.bounds.width;
            y = Math.random() * this.bounds.height;

            if (x + c.width > this.bounds.width) {
                x = this.bounds.width - c.width - 1;
            }

            if (y + c.height > this.bounds.height) {
                y = this.bounds.height - c.height - 1;
            }

            c.x = x;
            c.y = y;

            this.stage.addChild(c);
            list.push(c);
            this.tree.insert(c);
        }
    };

    /**
     * @override
     */
    p.tickHandler = function (event) {
        event.target.StageRender_tick(event);

        var target = event.target,
            circlesLength = target.circles.length,
            i = 0;

        for (i; i < circlesLength; i++) {
            target.circles[i].update();
            target.circles2[i].update();
        }

        target.tree.clear();
        target.tree.insert(target.circles);
        target.tree.insert(target.circles2);

        target._renderItems(target.circles);
        target._renderItems(target.circles2);
    };

    p._renderItems = function (list) {
        var items,
            c,
            len,
            item,
            dx,
            dy,
            radii,
            colliding = false,
            listLength = list.length,
            i = 0,
            j = 0;

        for (i; i < listLength; i++) {
            c = list[i];

            items = this.tree.retrieve(c);
            len = items.length;
            j = 0;
            for (j; j < len; j++) {
                item = items[j];

                if (c == item || (c.isColliding && item.isColliding)) {
                    break;
                }

                dx = c.x - item.x;
                dy = c.y - item.y;
                radii = c.radius + item.radius;

                colliding = ((dx * dx)  + (dy * dy)) < (radii * radii);

                if (!c.isColliding) {
                    c.setIsColliding(colliding);
                }

                if (!item.isColliding) {
                    item.setIsColliding(colliding);
                }
            }
        }
    };

    p._circleCount = 20;

    game.Game = Game;
}());