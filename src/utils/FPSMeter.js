/*
 * Atari Arcade SDK
 * Developed by gskinner.com in partnership with Atari
 * Visit http://atari.com/arcade/developers for documentation, updates and examples.
 *
 * Copyright (c) Atari Interactive, Inc. All Rights Reserved. Atari and the Atari logo are trademarks owned by Atari Interactive, Inc.
 *
 * Distributed under the terms of the MIT license.
 * http://www.opensource.org/licenses/mit-license.html
 *
 * This notice shall be included in all copies or substantial portions of the Software.
 */

/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs, createjs*/

this.flyjs = this.flyjs || {};
(function () {
    "use strict";
    var FPSMeter = function (stage) {
        this.initialize(stage);
    };

    var p = FPSMeter.prototype;

    p.initialize = function (stage) {
        createjs.Ticker.addListener(this);
        var text = this.text = new createjs.Text("--", "20px Arial bold", "#3399ff");
        text.textBaseline = "alphabetic";
        text.maxWidth = 200;
        text.y = 24;
        text.x = 5;
        this.stage = stage;
        stage.addChild(text);
    };

    p.tick = function () {
        var stage = this.stage;
        var text = this.text;
        if (stage.getChildIndex(text) + 1 < stage.getNumChildren()) {
            stage.addChild(text);
        }
        text.text = Math.round(createjs.Ticker.getMeasuredFPS());
    };

    flyjs.FPSMeter = FPSMeter;
}());