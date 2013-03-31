/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs*/

this.flyjs = this.flyjs || {};
(function () {
    "use strict";

    var StageRender = function () {
    };

    var p = StageRender.prototype = new flyjs.Render();

    p.Render_initialize = p.initialize;
    p.Render_startRender = p.startRender;
    p.Render_stopRender  = p.stopRender;
    p.Render_tick = p.tickHandler;

    p.stage = null;

    p.initialize = function (stage, fps) {
        if (!stage) {
            throw new flyjs.Exception("StageRender: error in parameters", "Stage is Null");
        }

        this.stage = stage;

        // call super
        this.Render_initialize(stage, fps);
        this.Render_startRender(stage);
    };

    p.startRender = function () {
        this.Render_startRender(this.stage);
    };

    p.stopRender = function () {
        this.Render_stopRender();
    }

    p.tickHandler = function (event) {

        this.Render_tick(event);
    }

    flyjs.StageRender = StageRender;
})();