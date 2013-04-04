/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs, createjs*/

this.flyjs = this.flyjs || {};

(function () {
    "use strict";

    /**
     * @class EngineMonitor
     * @constructor
     */
    var Render = function () {};

    var p = Render.prototype = new createjs.Container();

    // use EventDispatcher for this target (Class):
    createjs.EventDispatcher.initialize(p);
    /**
     *  From hack with debuger
     * @type {Number}
     * @property _tickThreshold
     * @default 3000
     * @private
     */
    p._tickThreshold = 3000;

    /**
     *
     * @type {Number}
     * @property _fps
     * @default 0
     * @private
     */
    p._fps = 25;

    /**
     *  current Tick fps (frame)
     * @type {Number}
     * @property frameNumber
     * @default 0
     * @protected
     */
    p.frameNumber = 0;

    /**
     * initialize method
     * @param fps {Number}
     * @param stage {createjs.Stage}
     * @method initialize
     * @protected
     */
    p.initialize = function (stage, fps) {
        if (!stage) {
            throw new flyjs.Exception("error in parameters", "Stage is Null");
        }

        if (fps) {
            this._fps = fps;
        }
    };

    /**
     * start engine tick, switch off from pause Ticker
     * @method startEngine
     * @protected
     */
    p.startRender = function (stage) {
        createjs.Ticker.addEventListener("tick", stage);
        createjs.Ticker.setFPS(this._fps);
        this.addEventListener("tick", this.tickHandler);
    };

    /**
     *  stop engine tick
     *  @method stopEngine
     *  @protected
     */
    p.stopRender = function () {

    };

    /**
     *  handler for createjs.Tick - update Entity('s) on Stage
     * @method tick
     * @protected
     */
    p.tickHandler = function () {
        this.frameNumber++;
    };

    flyjs.Render = Render;
}());