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

    var Hero = function (scene) {
        this.initialize(scene);
    };

    var p = Hero.prototype = new flyjs.Entity();

    p.Flyjs_Entity_initialize = p.initialize;

    p.initialize = function (scene) {

        this.Flyjs_Entity_initialize(scene);

        this._prepare();
    };

    /**
     * Prepare our animation & GamePad buttons
     * @private
     */
    p._prepare = function () {
        // get our Sprite
        this.heroSpriteSheet = flyjs.AssetManager.getAsset('hero');
        // Createjs - Set up looping
        this.heroSpriteSheet.getAnimation("run").next = "run";
        this.heroSpriteSheet.getAnimation("jump").next = "run";

        this.heroSprite = new createjs.Sprite(this.heroSpriteSheet, "run");

        this.scene.addChild(this.heroSprite);
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
            this.heroSprite.gotoAndPlay("jump");
        }

        if (flyjs.GamePad.check("RIGHT")) {
            this.heroSprite.x += 3;
        }

        if (flyjs.GamePad.check("LEFT")) {
            this.heroSprite.x -= 3;
        }

    };

    game.Hero = Hero;
}());