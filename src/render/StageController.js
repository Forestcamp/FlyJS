/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs*/
this.flyjs = this.flyjs || {};
(function() {
    "use strict";

    var StageController = function (fps, stage) {
        this.initialize(fps, stage);
    }

    var p = StageController.prototype = new flyjs.Render();

    p.RenderMonitor_initialize = p.initialize;
    p.RenderMonitor_startRender = p.startRender;
    p.RenderMonitor_stopRender  = p.stopRender;
    p.RenderMonitor_setToFrame  = p.setToFrame;
    p.RenderMonitor_resizeCanvas = p.resizeCanvas;
    p.RenderMonitor_tick = p.tick;

    // use EventDispatcher for this target (Class):
    createjs.EventDispatcher.initialize(p);

    p.initialize = function (fps, stage) {
        // call super
        this.RenderMonitor_initialize(fps, stage);
    }

    p.startRender = function () {
        this.RenderMonitor_startRender();
    }

    p.stopRender = function () {
        this.RenderMonitor_stopRender();
    }

    p.tick = function () {

        this.RenderMonitor_tick();
    }

    p._resizeCanvas = function (event){
        this.RenderMonitor_resizeCanvas(event.params);
    }

    flyjs.StageController = StageController;
})();