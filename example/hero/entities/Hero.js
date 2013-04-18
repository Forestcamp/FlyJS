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

    var p = Hero.prototype = new flyjs.Entity();

    p.Flyjs_Entity_initialize = p.initialize;

    p.initialize = function (stage) {

        this.Flyjs_Entity_initialize(stage);

        this._prepare();
    };

    /**
     * Prepare our animation & GamePad buttons
     * @private
     */
    p._prepare = function () {
        // get our Sprite
        this.hero = flyjs.SpriteSheetCollection.getSprite('hero');
        // Createjs - Set up looping
        this.hero.sprite.getAnimation("run").next = "run";
        this.hero.sprite.getAnimation("jump").next = "run";

        this.hero.bitmap.gotoAndPlay("run");

        this.stage.addChild(this.hero.bitmap);
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
            this.hero.bitmap.gotoAndPlay("jump");
        }

        if (flyjs.GamePad.check("RIGHT")) {
            this.hero.bitmap.x += 3;
        }

        if (flyjs.GamePad.check("LEFT")) {
            this.hero.bitmap.x -= 3;
        }

    };

    game.Hero = Hero;
}());