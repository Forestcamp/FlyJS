/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs, Dictionary*/
this.flyjs = this.flyjs || {};

(function () {
    "use strict";
    /**
     * @class Entity
     * @constructor
     */
    var Entity = function (x, y, graphic) {
        this.initialize(x, y, graphic);
    };

    var p = Entity.prototype = new flyjs.EntitySprite();

    p.Graphic_initialize = p.initialize;
    p.Graphic_update = p.update;

    p.initialize = function (x, y, graphic) {
        this.Graphic_initialize();

        this._graphic = graphic;
        this._components = [];
    };
    /**
     * @type {String}
     * @property name
     * @public
     */
    p.name = null;
    /**
     * @type {Entity}
     * @property _previous
     * @private
     */
    p._previous = null;

    /**
     * @type {Entity}
     * @property _next
     * @private
     */
    p._next = null;

    p._visible = true;

    p._graphic;
    p.x;
    p.y;
    p.width;
    p.height;

    p.update = function () {

    };

    p.render = function () {
        if (this._graphic) {
            this._point.x = this.x;
            this._point.y = this.y;
        }
    }

    /**
     * @property {Dictionary}
     * @private
     */
    p._components = null;

    /**
     * <code>var entity : Entity = new Entity()
     *          .add( new Position( 100, 200 )
     *          .add( new Display( new PlayerClip() );
     * </code>
     * @method add
     * @public
     * @return {Entity}
     */
    p.add = function (component, componentClass) {
        if (!componentClass) {
            componentClass = component.name;
        }
        this._components[componentClass] = component;
        return this;
    };

    /**
     * Remove a component from Entity
     * @method remove
     * @public
     * @return {Object}
     */
    p.remove = function (componentClass) {
        var component = this._components[componentClass];
        if (component) {
            delete this._components[componentClass];
            return this._component;
        }
        return null;
    };

    p.get = function (componentClass) {
        return this._components[componentClass];
    };

    p.has = function (componentClass) {
        return this._components[componentClass] !== null;
    };

    p.getAll = function () {
        var componentArray = [],
            key;
        // for each
        for (key in this._components) {
            if (this._components.hasOwnProperty(key)) {
                componentArray.push(this._components[key]);
            }
        }
        return componentArray;
    };

    flyjs.Entity = Entity;
})();