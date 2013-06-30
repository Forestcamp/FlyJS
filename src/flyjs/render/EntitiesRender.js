/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs*/


this.flyjs = this.flyjs || {};

(function () {
    'use strict';
    /**
     * EntitiesRender get all ViewObjects in projects, render & update
     * @class EntitiesRender
     * @param stage {Stage}
     * @constructor
     */
    var EntitiesRender = function (stage) {
        this.initialize(stage);
    };

    var p = EntitiesRender.prototype;

    /**
     * initialize function
     * @method initialize
     * @param stage {Stage}
     */
    p.initialize = function (stage) {
        this._stage = stage;
    };


    /**
     * Update screen when createjs.Tick is working
     * @method updateScene
     * @public
     */
    p.updateScene = function () {

    };


    flyjs.EntitiesRender = EntitiesRender;
}());