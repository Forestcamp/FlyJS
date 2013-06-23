/*jslint nomen: true, plusplus: true, vars: true, eqeq:true, bitwise: true */
/*jshint eqnull:true*/
/*global flyjs, createjs, console*/
this.flyjs = this.flyjs || {};
(function () {
    'use strict';
    /**
     * Class simple RectangleBox
     * @param scene
     * @param demensions
     * @param color
     * @param colorHit
     * @constructor
     */
    var RectangleBox = function (scene, demensions, color, colorHit) {
        this.initialize(scene, demensions, color, colorHit);
    };

    RectangleBox.MAX_SPEED = 4;

    var p = RectangleBox.prototype = new flyjs.Entity();

    p.Flyjs_Entity_initialize = p.initialize;
    p.Flyjs_Entity_setHitBounds = p.setHitBounds;
    p.Flyjs_Entity_update = p.update;
    /**
     * object height
     * @type {number}
     * @property height
     */
    p.height = 0;

    /**
     * object width
     * @type {number}
     * @property width
     */
    p.width = 0;

    /**
     * RectangleBox demensions
     * @type {Object}
     * @property demensions
     */
    p.demensions = null;

    /**
     * Check collide this object
     * @type {boolean}
     * @property isColliding
     */
    p.isColliding = false;
    p._color = "";
    p._colorHit = "";

    /**
     *
     * @param scene
     * @param demensions
     * @param color
     * @param colorHit
     */
    p.initialize = function (scene, demensions, color, colorHit) {
        this.Flyjs_Entity_initialize(scene);

        this.demensions = demensions;
        this._color = color;
        this._colorHit = colorHit;

        this.height = this.demensions.height;
        this.width = this.demensions.width;
        this.x = this.demensions.x;
        this.y = this.demensions.y;

        this.Flyjs_Entity_setHitBounds({
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        });

        this.shape = new createjs.Shape();
        this.shape.x = this.x;
        this.shape.y = this.y;

        this._draw();
        this.update(null);
        this.scene.addChild(this.shape);
    };

    p.update = function (event) {
        this.Flyjs_Entity_update(event);
        this.isColliding = false;

        if (event != null) {
            var listLength = event.collisionList.length,
                i = 0;
            if (listLength > 0) {
                this.isColliding = true;
                this._draw();
                for (i; i < listLength; i++) {
                    console.log(this.name + " collide with: " + event.collisionList[i]);
                }
            }
        }
    };

    p._draw = function () {
        var g = this.shape.graphics;

        g.clear();
        g.setStrokeStyle(1);
        g.beginStroke(createjs.Graphics.getRGB(0, 0, 0, 0.4));

        if (this.isColliding) {
            g.beginFill(this._colorHit);
        } else {
            g.beginFill(this._color);
        }

        g.rect(0, 0, this.width, this.height);
    };

    p._collidingCacheCanvas = null;
    p._normalCacheCanvas = null;

    flyjs.RectangleBox = RectangleBox;
}());