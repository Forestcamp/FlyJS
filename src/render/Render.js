/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs, Dictionary*/

this.flyjs = this.flyjs || {};

(function () {
    "use strict";

    /**
     * @class EngineMonitor
     * @constructor
     */
    var Render = function () {

    };

    var e = Render.prototype;

    /**
     *  From hack with debuger
     * @type {Number}
     * @property _tickThreshold
     * @default 3000
     * @private
     */
    e._tickThreshold = 3000;

    /**
     *
     * @type {Number}
     * @property _fps
     * @default 0
     * @private
     */
    e._fps = 0;

    /**
     *  current canvas element
     *  @property _stage
     *  @protected
     */
    e._stage = null;

    /**
     *  current Tick fps (frame)
     * @type {Number}
     * @property frameNumber
     * @default 0
     * @protected
     */
    e.frameNumber = 0;

    /**
     *  Now we do seek And Stop(Pause)
     * @type {Boolean}
     * @property _seekAndPause
     * @default false
     * @private
     */
    e._seekAndPause = false;

    /**
     * initialize method
     * @param fps {Number}
     * @param stage {createjs.Stage}
     * @method initialize
     * @protected
     */
    e.initialize = function (fps, stage) {

        if (fps === null || fps === 0) {
            throw new flyjs.Exception("error in parameters", "FPS is Null");
        }
        if (stage === null) {
            throw new flyjs.Exception("error in parameters", "Stage is Null");
        }

        this._fps = fps;
        this._stage = stage;

        this._initTicker();
    }

    /**
     * Initialize createjs.Ticker
     * @method _initTicker
     * @private
     */
    e._initTicker = function () {
        createjs.Ticker.setPaused(true);
        createjs.Ticker.setFPS(this._fps);
        createjs.Ticker.addEventListener("tick", e.tick);
    }

    /**
     * start engine tick, switch off from pause Ticker
     * @method startEngine
     * @protected
     */
    e.startEngine = function () {
        createjs.Ticker.setPaused(false);
    }

    /**
     *  stop engine tick
     *  @method stopEngine
     *  @protected
     */
    e.stopEngine = function () {
        createjs.Ticker.setPaused(true);
    }

    /**
     * @method setToFrame
     * @param frameId {Number}
     * @param isPaused {Boolean}
     * @protected
     */
    e.setToFrame = function (frameId, isPaused) {
        this.stopEngine();
        this.frameNumber = frameId;
        this._seekAndPause = isPaused;
        this.startEngine();
    }

    /**
     *  handler for createjs.Tick - update Entity('s) on Stage
     * @method tick
     * @protected
     */
    e.tick = function (e) {
        this._stage.update();
        this.frameNumber++;
        if (this._seekAndPause){
            this._seekAndPause = false;
            this.stopEngine();
        }
    }

    /**
     * @method resizeCanvas
     * @param event {Object} with params - y,x,width,height
     * @protected
     */
    e.resizeCanvas = function (event){
        var canvasObject = $(this._stage.canvas);
        canvasObject.css("top", event.y );
        canvasObject.css("left", event.x );
        canvasObject.attr("width", event.width);
        canvasObject.attr("height", event.height);
        this._stage.update();
    }

    flyjs.Render = Render;
})();