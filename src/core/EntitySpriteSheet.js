/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true, eqeq: true */
/*global flyjs, createjs*/
this.flyjs = this.flyjs || {};

(function () {
    "use strict";

    var EntitySpriteSheet = function () {};

    var p = EntitySpriteSheet.prototype = new flyjs.Entity();

    /**
     * @property bitmapAnimation
     * @type {Object}
     * @protected
     */
    p.bitmapAnimation = null;

    /**
     * @property sprite
     * @type {null}
     * @protected
     */
    p.sprite = null;

    /**
     * @property _stage
     * @type {createjs.Stage}
     * @private
     */
    p._stage = null;

    /**
     * @property _loadedAssets
     * @type {Array}
     * @private
     */
    p._loadedAssets = [];

    /**
     * @method initialize
     * @param stage
     * @param spriteSheetManifest
     * @private
     */
    p.initialize = function (stage, spriteSheetManifest) {

        if (!stage) {
            throw new flyjs.Exception("error in parameters", "Stage is Null");
        }

        if (!spriteSheetManifest) {
            throw new flyjs.Exception("error in parameters", "spriteSheetManifest is Null");
        }

        this._stage = stage;

        this.spriteSheet = new createjs.SpriteSheet(spriteSheetManifest);
        this.sprite = new createjs.BitmapAnimation(this.spriteSheet);

        this.loadManifest([{src: spriteSheetManifest.images[0], id: "sprite"}]);
    };

    p.loadManifest = function (manifest) {
        this.loader = new createjs.LoadQueue(false);
        this.loader.onFileLoad = this.handleFileLoad.bind(this);
        this.loader.onComplete = this.handleComplete.bind(this);
        this.loader.loadManifest(manifest);
    };

    p.handleFileLoad = function (event) {
        this._loadedAssets.push(event.item);
    };

    p.handleComplete = function () {

        this._stage.addChild(this.sprite);
    };

    flyjs.EntitySpriteSheet = EntitySpriteSheet;
}());