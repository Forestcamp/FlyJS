/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs*/


this.flyjs = this.flyjs || {};

(function () {
    /**
     * EntitiesRender get all ViewObjects in projects, render & update
     * @class EntitiesRender
     * @param stage {createjs.Stage}
     * @constructor
     */
    var EntitiesRender = function (stage) {
        this.initialize(stage);
    }

    var p = EntitiesRender.prototype;

    /**
     * initialize function
     * @method initialize
     * @param stage {createjs.Stage}
     */
    p.initialize = function (stage) {
        this._stage = stage;
    }

    /**
     * Draw ActiveObjects with initial size
     * @method draw
     * @param listEntities {Object}
     * @public
     */
    p.draw = function (listEntities) {

        this._viewObjectsList = new flyjs.BindArray();

        for (var key in listEntities) {
            this._renderEntity(listEntities[key]);
        }
    }

    /**
     *
     * @method _renderEntity
     * @param entity {Entity}
     * @private
     */
    p._renderEntity = function (entity) {

        var factory = new flyjs.ViewFactory(this._stage, entity);

        this._viewObjectsList.addElement(factory);
    }

    /**
     * Update screen when createjs.Tick is working
     * @method updateScene
     * @param markup {Object}
     * @param frameNumber {Number}
     * @public
     */
    p.updateScene = function (markup, frameNumber) {

        var viewObject,
            i = 0,
            length = this._viewObjectsList.getLength();

        for ( i; i < length; i++) {

            viewObject = this._viewObjectsList.getItemAt(i);

            viewObject.update(null, frameNumber);
        }
    }

    /**
     * @method getViewObjectList
     * @return {BindArray} - view objects on stage
     * @public
     */
    p.getViewObjectList = function () {
        return this._viewObjectsList;
    }

    /**
     * List of View Entities (in ActiveObject)
     * @property _viewObjectsList
     * @type {Array}
     * @private
     */
    p._viewObjectsList;

    /**
     * Stage - Canvas Element
     * @property _stage
     * @type {createjs.Stage}
     * @private
     */
    p._stage;

    flyjs.EntitiesRender = EntitiesRender;
})();