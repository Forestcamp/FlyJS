/*jslint nomen: true, plusplus: true, vars: true, eqeq:true, bitwise: true */
/*jshint eqnull:true*/
/*global flyjs, createjs*/
this.flyjs = this.flyjs || {};
(function () {
    'use strict';
    /**
     * Object simple Rectangle
     * @param bounds
     * @param radius
     * @param color
     * @param colorHit
     * @constructor
     */
    var Rectangle = function (bounds, radius, color, colorHit) {
        this.initialize(bounds, radius, color, colorHit);
    };

    Rectangle.MAX_SPEED = 4;

    var p = Rectangle.prototype = new createjs.Shape();

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
     * Rectangle radius
     * @type {number}
     * @property radius
     */
    p.radius = 0;

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
     * @param bounds
     * @param radius
     * @param color
     * @param colorHit
     */
    p.initialize = function (bounds, radius, color, colorHit) {
        this.snapToPixel = true;

        this._bounds = bounds;
        this.radius = radius;
        this._color = color;
        this._colorHit = colorHit;

        this.height = this.width = this.radius * 2;

        this._vx = Rectangle.MAX_SPEED * Math.random() + 1;
        //y velocity and direction
        this._vy = Rectangle.MAX_SPEED * Math.random() + 1;

        //pick a random direction on x axis
        if (Math.random() > 0.5) {
            this._vx *= -1;
        }

        //pick a random direction on y axis
        if (Math.random() > 0.5) {
            this._vy *= -1;
        }

        this._draw();
    };

    p.update = function () {
        this.isColliding = false;

        this.x += this._vx;
        this.y += this._vy;

        if (this.x + this.width > this._bounds.width) {
            this.x = this._bounds.width - this.width - 1;
            this._vx *= -1;
        } else if (this.x < this._bounds.x) {
            this.x = this._bounds.x + 1;
            this._vx *= -1;
        }

        if (this.y + this.height > this._bounds.height) {
            this.y = this._bounds.height - this.height - 1;
            this._vy *= -1;
        } else if (this.y < this._bounds.y) {
            this.y = this._bounds.y + 1;
            this._vy *= -1;
        }
    };

    p.setIsColliding = function (isColliding) {
        this.isColliding = isColliding;
        if (isColliding) {
            console.log('Rectangle: ' + isColliding);
        }

        this._draw();
    };

    p._draw = function () {
        if (this.isColliding) {
            if (this._collidingCacheCanvas) {
                this.cacheCanvas = this._collidingCacheCanvas;
                return;
            }
        } else {
            if (this._normalCacheCanvas) {
                this.cacheCanvas = this._normalCacheCanvas;
                return;
            }
        }

        var g = this.graphics;
        g.clear();
        g.setStrokeStyle(1);
        g.beginStroke(createjs.Graphics.getRGB(0, 0, 0, 0.4));

        if (this.isColliding) {
            g.beginFill(this._colorHit);
        } else {
            g.beginFill(this._color);
        }

        g.rect(0, 0, this.radius, this.radius);

        this.uncache();
        this.cache(-1, -1, this.width + 2, this.height + 2);

        if (this.isColliding) {
            this._collidingCacheCanvas = this.cacheCanvas;
        } else {
            this._normalCacheCanvas = this.cacheCanvas;
        }
    };

    p._bounds = null;
    p._vx = 0;
    p._vy = 0;
    p._collidingCacheCanvas = null;
    p._normalCacheCanvas = null;

    flyjs.Rectangle = Rectangle;
}());