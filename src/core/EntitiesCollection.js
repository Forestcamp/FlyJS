/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true*/
/*global flyjs, Dictionary*/

this.flyjs = this.flyjs || {};

(function () {
    'use strict';
    /**
     * Manager for control lists of data
     * @class EntitiesCollection
     * @constructor
     */
    var EntitiesCollection = function () {};

    var e = EntitiesCollection.prototype;

    /**
     * @property _listEntities
     * @type {Array}
     * @private
     */
    e._listEntities = [];

    /**
     * @method getEntities
     * @return {Object}
     * @public
     */
    e.getEntities = function () {
        return this._listEntities;
    };

    /**
     * Set data from AVSX parser
     * @method setData
     * @param entity {Array}
     * @public
     */
    e.add = function (entity) {
        this._listEntities.push(entity);
    };

    flyjs.EntitiesCollection = EntitiesCollection;
}());