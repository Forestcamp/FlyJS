/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs, Dictionary*/
this.flyjs = this.flyjs || {};

(function () {
    "use strict";
    /**
     * @class Entity
     * @constructor
     */
    var Entity = function () {};

    extend(Entity.prototype, {
        initialize: function () {},
        /**
         * @type {String}
         * @property name
         * @public
         */
        name: null,

        /**
         * @type {boolean}
         */
        visible: true,

        /**
         * @type {number}
         */
        x: 0,

        /**
         * @type {number}
         */
        y: 0,

        update: function () {},
        render: function () {}
    });

    flyjs.Entity = Entity;
}());