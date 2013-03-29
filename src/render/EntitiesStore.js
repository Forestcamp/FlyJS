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
     * @class EntityManager
     * @constructor
     */
    var EntitiesStore = function () {

    };

    var e = EntityManager.prototype;

    /**
     * @property _listEntities
     * @type {Dictionary}
     * @private
     */
    e._listEntities;

    /**
     * @property _listMarkups
     * @type {Dictionary}
     * @private
     */
    e._listMarkups;

    /**
     * @method getById
     * @param entityId {String}
     * @return {EntityMarkupSection}
     * @public
     */
    e.getById = function (entityId) {
        return  this._listEntities[entityId];
    }

    /**
     * @method getByFrame
     * @param frameId {String} num of frame
     * @return {EntityMarkupSection}
     * @public
     */
    e.getByFrame = function (frameId) {
        return this._listMarkups[frameId];
    }

    /**
     * @method getByFrameAndId
     * @param frameId {String}
     * @param entityId {String}
     * @return {EntityMarkupSection}
     * @public
     */
    e.getByFrameAndId = function (frameId, entityId) {
        return this._listMarkups[frameId][entityId];
    }

    /**
     * @method getListEntities
     * @return {Object}
     * @public
     */
    e.getListEntities = function () {
        return this._listEntities;
    }

    /**
     * Set data from AVSX parser
     * @method loadData
     * @param entity {Array}
     * @param markup {Array}
     * @public
     */
    e.loadData = function (entity, markup) {

        this._listEntities = entity;
        this._listMarkups = markup;
    }

    flyjs.EntityManager = EntityManager;
})();