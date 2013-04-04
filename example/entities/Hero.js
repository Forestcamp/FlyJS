/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs, console, game, createjs*/
this.game = this.game || {};

(function () {
    'use strict';

    var Hero = function (stage) {
        this.initialize(stage);
    };

    var p = Hero.prototype = new flyjs.EntitySpriteSheet();

    p.Flyjs_SpriteSheet_initialize = p.initialize;
    p.Flyjs_Entity_update = p.update;

    p.initialize = function (stage) {

        var spriteSheetManifest = {
            "animations": {
                "run": [0, 25],
                "jump": [26, 63]
            },
            "images": ["assets/runningGrant.png"],
            "frames": {
                "regX": 0,
                "height": 292.5,
                "count": 64,
                "regY": 0,
                "width": 165.75
            }
        };

        //
        this.Flyjs_SpriteSheet_initialize(stage, spriteSheetManifest);

        this._prepare();
    };

    /**
     * Prepare our animation & GamePad buttons
     * @private
     */
    p._prepare = function () {
        // Createjs - Set up looping
        this.spriteSheet.getAnimation("run").next = "run";
        this.spriteSheet.getAnimation("jump").next = "run";

        this.sprite.gotoAndPlay("run");

        // define GamePad buttons
        flyjs.GamePad.define("UP", [flyjs.Key.UP]);
        flyjs.GamePad.define("RIGHT", [flyjs.Key.RIGHT]);
        flyjs.GamePad.define("LEFT", [flyjs.Key.LEFT]);
    };

    /**
     * @override
     */
    p.update = function () {

        if (flyjs.GamePad.isPressed("UP")) {
            this.sprite.gotoAndPlay("jump");
        }

        if (flyjs.GamePad.check("RIGHT")) {
            this.sprite.x += 3;
        }

        if (flyjs.GamePad.check("LEFT")) {
            this.sprite.x -= 3;
        }

    };

    game.Hero = Hero;
}());