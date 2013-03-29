/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs, Dictionary*/

this.flyjs = this.flyjs || {};
(function () {
    'use strict';
    /**
     * Manager for control lists of data
     * @class EntitiesCollection
     * @constructor
     */
    var EntitiesCollection = function () {

    };

    var e = EntitiesCollection.prototype;

    /**
     * @property _listEntities
     * @type {Dictionary}
     * @private
     */
    e._listEntities;

    /**
     * @private
     */
    e._listFrames;

    /**
     * @method getById
     * @param entityId {String}
     * @return {Object}
     * @public
     */
    e.getById = function (entityId) {
        return this._listEntities[entityId];
    }

    /**
     * @method getByFrame
     * @param frameId {String} num of frame
     * @return {Object}
     * @public
     */
    e.getByFrame = function (frameId) {
        return this._listFrames[frameId];
    }

    /**
     * @method getByFrameAndId
     * @param frameId {String}
     * @param entityId {String}
     * @return {}
     * @public
     */
    e.getByFrameAndId = function (frameId, entityId) {
        return this._listFrames[frameId][entityId];
    }

    /**
     * @method getEntities
     * @return {Object}
     * @public
     */
    e.getEntities = function () {
        return this._listEntities;
    }

    /**
     * Set data from AVSX parser
     * @method setData
     * @param entity {Array}
     * @param frames {Array}
     * @public
     */
    e.setData = function (entity, frames) {
        this._listEntities = entity;
        this._listFrames = frames;
    }

    flyjs.EntitiesCollection = EntitiesCollection;
})();