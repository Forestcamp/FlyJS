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

    var QuadTree = function (bounds, pointQuad, maxDepth, maxChildren) {
        this.initialize(bounds, pointQuad, maxDepth, maxChildren);
    };

    var p = QuadTree.prototype;

    /**
     * @property root
     * @type {Node}
     */
    p.root = null;

    p.initialize = function (bounds, pointQuad, maxDepth, maxChildren) {
        var node;
        if (pointQuad) {
            node = new flyjs.Node(bounds, 0, maxDepth, maxChildren);
        } else {
            node = new flyjs.BoundsNode(bounds, 0, maxDepth, maxChildren);
        }
        this.root = node;
    };

    p.insert = function (item) {
        if (item instanceof Array) {
            var len = item.length,
                i = 0;
            for (i; i < len; i++) {
                this.root.insert(item[i]);
            }
        } else {
            this.root.insert(item);
        }
    };

    p.remove = function (item) {

    };

    /**
     * @method clear
     */
    p.clear = function () {
        this.root.clear();
    };

    /**
     * get a copy of the array of items
     * @param item
     * @method retrieve
     * @returns {*|Blob}
     */
    p.retrieve = function (item) {
        return this.root.retrieve(item).slice(0);
    };

    flyjs.QuadTree = QuadTree;
}());