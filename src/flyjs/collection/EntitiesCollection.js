/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true*/
/*global flyjs, Hashtable*/

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
     * @method getEntities
     * @return {Array}
     * @public
     */
    e.getEntities = function () {
        return this._listEntities.entries();
    };

    /**
     *
     * @method getEntitiesValues
     * @returns {Array}
     * @public
     */
    e.getEntitiesValues = function () {
        return this._listEntities.values();
    };

    /**
     * add Entity to collection
     * @method add
     * @param entity {Array}
     * @public
     */
    e.add = function (entity) {
        entity.id = this._entitiesCount;
        this._listEntities.put(entity.id, entity);
        this._entitiesCount++;
    };

    e.remove = function (entity) {
        this._removeStack.push(entity.id);
    };

    e.checkStack = function () {
        if (this._removeStack.length > 0) {
            this.spliceStack(this._listEntities, this._removeStack);
            this._removeStack = [];
        }
    };

    e.spliceStack = function (arr, args) {
        var i = 0,
            argsLength = args.length;

        for (i; i < argsLength; i++) {
            arr.remove(args[i]).removeChild();
        }
    };

    /**
     * @property _listEntities
     * @type {Hashtable}
     * @private
     */
    e._listEntities = new Hashtable();

    /**
     * stack of id`s for one tick
     * @type {Array}
     * @private
     */
    e._removeStack = [];

    /**
     * count of created entities
     * @type {number}
     * @private
     */
    e._entitiesCount = 1;

    flyjs.EntitiesCollection = EntitiesCollection;
}());