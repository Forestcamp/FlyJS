/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true, eqeq:true, bitwise: true */
/*jshint eqnull:true*/
/*global flyjs*/
this.flyjs = this.flyjs || {};
(function () {
    'use strict';

    /**
     *
     * @param bounds
     * @param depth
     * @param maxDepth
     * @param maxChildren
     * @constructor
     */
    var Node = function (bounds, depth, maxDepth, maxChildren) {
        this.initialize(bounds, depth, maxDepth, maxChildren);
    };

    var p = Node.prototype;

    Node.TOP_LEFT = 0;
    Node.TOP_RIGHT = 1;
    Node.BOTTOM_LEFT = 2;
    Node.BOTTOM_RIGHT = 3;

    /**
     *
     * @type {Array}
     */
    p.children = null;

    /**
     *
     * @type {Array}
     */
    p.nodes = null;

    p.initialize = function (bounds, depth, maxDepth, maxChildren) {
        this._bounds = bounds;
        this.children = [];
        this.nodes = [];

        if (maxChildren) {
            this._maxChildren = maxChildren;
        }

        if (maxDepth) {
            this._maxDepth = maxDepth;
        }

        if (depth) {
            this._depth = depth;
        }
    };

    p.insert = function (item) {
        if (this.nodes.length) {
            var index = this._findIndex(item);
            this.nodes[index].insert(item);
            return;
        }
        this._appendInsertItem(item);
    };

    p.subdivide = function () {
        var depth = this._depth + 1;

        var bx = this._bounds.x;
        var by = this._bounds.y;

        //floor the values
        var b_w_h = (this._bounds.width / 2) | 0;
        var b_h_h = (this._bounds.height / 2) | 0;
        var bx_b_w_h = bx + b_w_h;
        var by_b_h_h = by + b_h_h;

        //top left
        this.nodes[Node.TOP_LEFT] = new flyjs.Node({
            x: bx,
            y: by,
            width: b_w_h,
            height: b_h_h
        }, depth);

        //top right
        this.nodes[Node.TOP_RIGHT] = new flyjs.Node({
            x: bx_b_w_h,
            y: by,
            width: b_w_h,
            height: b_h_h
        }, depth);

        //bottom left
        this.nodes[Node.BOTTOM_LEFT] = new flyjs.Node({
            x: bx,
            y: by_b_h_h,
            width: b_w_h,
            height: b_h_h
        }, depth);


        //bottom right
        this.nodes[Node.BOTTOM_RIGHT] = new flyjs.Node({
            x: bx_b_w_h,
            y: by_b_h_h,
            width: b_w_h,
            height: b_h_h
        }, depth);
    };

    p.clear = function () {
        this.children.length = 0;

        var len = this.nodes.length,
            i = 0;
        for (i; i < len; i++) {
            this.nodes[i].clear();
        }

        this.nodes.length = 0;
    };

    p.retrieve = function (item) {
        if (this.nodes.length) {
            var index = this._findIndex(item);
            return this.nodes[index].retrieve(item);
        }
        return this.children;
    };

    p._appendInsertItem = function (item) {
        this.children.push(item);

        var len = this.children.length,
            i = 0;
        if ((this._depth < this._maxDepth) && len > this._maxChildren) {
            this.subdivide();

            for (i; i < len; i++) {
                this.insert(this.children[i]);
            }

            this.children.length = 0;
        }
    };

    p._findIndex = function (item) {
        var b = this._bounds,
            left = (item.x <= b.x + b.width / 2),
            top = (item.y <= b.y + b.height / 2);

        //top left
        var index = Node.TOP_LEFT;
        if (left) {
            //left side
            if (!top) {
                //bottom left
                index = Node.BOTTOM_LEFT;
            }
        } else {
            //right side
            if (top) {
                //top right
                index = Node.TOP_RIGHT;
            } else {
                //bottom right
                index = Node.BOTTOM_RIGHT;
            }
        }

        return index;
    };

    /**
     *
     * @type {Rectangle}
     * @private
     */
    p._bounds = null;

    /**
     *
     * @type {number}
     * @private
     */
    p._depth = null;

    /**
     *
     * @type {number}
     * @private
     */
    p._maxDepth = null;

    /**
     *
     * @type {number}
     * @private
     */
    p._maxChildren = null;

    flyjs.Node = Node;
}());