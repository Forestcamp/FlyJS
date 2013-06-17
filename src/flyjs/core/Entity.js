/*jslint nomen: true, plusplus: true, vars: true, eqeq:true */
/*jshint eqnull:true*/
/*global flyjs*/
this.flyjs = this.flyjs || {};

(function () {
    "use strict";
    /**
     * Create game Entity
     * @class Entity
     * @constructor
     */
    var Entity = function () {};

    var p = Entity.prototype;

    /**
     * @type {String}
     * @property name
     * @public
     */
    p.name = null;

    /**
     * @property _stage
     * @type {Stage}
     * @public
     */
    p.stage = null;

    /**
     * @type {Boolean}
     * @property visible
     */
    p.visible = true;

    /**
     * @property allowCollisions
     * @type {boolean}
     */
    p.allowCollisions = true;

    /**
     * x,y position
     * @property last
     * @type {Object}
     */
    p.last = null;
    /**
     * @type {number}
     * @property x
     * @public
     */
    p.x = 0;

    /**
     * @type {number}
     * @property y
     * @public
     */
    p.y = 0;

    p.originX = 0;

    p.originY = 0;

    /**
     *
     * vertices of current entity, for detection collision
     * @type {Object}
     */
    p.verticesHit = null;
    /**
     * Sprite, MovieClip or Graphic
     * @type {Object}
     */
    p.child = null;

    p.initialize = function (stage) {
        this.stage = stage;
        this.last = {};
    };

    p.addChild = function (child) {
        this.child = child;
        this.stage.addChild(child);
    };

    p.setHitBounds = function (hitBounds) {
        this.allowCollisions = true;
        this.hitBounds = hitBounds;
        this.verticesHit = flyjs.VertexLib.convertSquare(this.hitBounds);
    };

    p.update = function () {
        if (this.child != null) {
            this.last.x = this.x = this.child.x;
            this.last.y = this.y = this.child.y;
            if (this.child.hasOwnProperty('image')) {
                this.width = this.child.image.width;
                this.height = this.child.image.height;
            }
            // update position hitRectangle
            if (this.allowCollisions && this.hitBounds &&
                    this.hitBounds.x != this.x && this.hitBounds.y != this.y) {
                this.hitBounds.x = this.x;
                this.hitBounds.y = this.y;
                this.verticesHit = flyjs.VertexLib.convertSquare(this.hitBounds);
            }
        }
    };

    p.destroy = function () {
        this.stage = null;
        this.last = null;
    };

    flyjs.Entity = Entity;
}());