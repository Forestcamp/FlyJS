/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true, eqeq:true */
/*jshint eqnull:true*/
/*global flyjs*/
this.flyjs = this.flyjs || {};
(function () {
    'use strict';

    var BoundsNode = function (bounds, depth, maxChildren, maxDepth) {
        this.initialize(bounds, depth, maxChildren, maxDepth);
    };

    var p = BoundsNode.prototype = new flyjs.Node();
    p.Node_initialize = p.initialize;

    p._out = null;
    p._stuckChildren = null;


    p.initialize = function (bounds, depth, maxChildren, maxDepth) {
        this._stuckChildren = [];
        this._out = [];
        this.Node_initialize(bounds, depth, maxChildren, maxDepth);
    };

    /**
     * @override
     * @param item
     */
    p.insert = function (item) {
        if (this.nodes.length) {
            var index = this._findIndex(item);
            var node = this.nodes[index];

            if (item.x >= node._bounds.x &&
                    item.x + item.width <= node._bounds.x + node._bounds.width &&
                    item.y >= node._bounds.y &&
                    item.y + item.height <= node._bounds.y + node._bounds.height) {
                this.nodes[index].insert(item);
            } else {
                this._stuckChildren.push(item);
            }

            return;
        }

        this._appendInsertItem(item);
    };

    p.getChildren = function () {
        return this.children.concat(this._stuckChildren);
    };

    p.retrieve = function (item) {
        var out = this._out;
        out.length = 0;
        if (this.nodes.length) {
            var index = this._findIndex(item);
            out.push.apply(out, this.nodes[index].retrieve(item));
        }

        out.push.apply(out, this._stuckChildren);
        out.push.apply(out, this.children);
        return out;
    };

    p.clear = function () {
        this._stuckChildren.length = 0;
        this.children.length = 0;

        var len = this.nodes.length;

        if (!len) {
            return;
        }

        var i = 0;
        for (i; i < len; i++) {
            this.nodes[i].clear();
        }

        this.nodes.length = 0;
    };

    flyjs.BoundsNode = BoundsNode;
}());