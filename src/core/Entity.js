/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs, extend*/
this.flyjs = this.flyjs || {};

(function () {
    "use strict";
    /**
     * Create game Entity
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
         * @type {Boolean}
         * @property visible
         */
        visible: true,

        /**
         * @type {number}
         * @property x
         */
        x: 0,

        /**
         * @type {number}
         * @property y
         */
        y: 0,

        update: function () {},
        render: function () {}
    });

    flyjs.Entity = Entity;
}());