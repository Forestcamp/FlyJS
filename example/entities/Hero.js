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

    p.SpriteSheet_initialize = p.initialize;
    p.Entity_update = p.update;

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
        this.SpriteSheet_initialize(stage, spriteSheetManifest);

        // Set up looping
        this.spriteSheet.getAnimation("run").next = "run";
        this.spriteSheet.getAnimation("jump").next = "run";

        this.sprite.gotoAndPlay("jump");

    };

    /**
     * @override
     */
    p.update = function () {

        this.sprite.x += 1;

    };

    game.Hero = Hero;
}());