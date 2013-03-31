/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs, createjs*/
this.flyjs = this.flyjs || {};

(function () {
    "use strict";

    var EntitySpriteSheet = function () {};

    var p = EntitySpriteSheet.prototype = new flyjs.Entity();

    /**
     *
     * @type {createjs.Stage}
     * @protected
     */
    p._stage = null;

    /**
     *
     * @type {Object}
     * @protected
     */
    p.bitmapAnimation = null;

    /**
     * @protected
     * @type {null}
     */
    p.sprite = null;

    p._loadedAssets = [];

    p.initialize = function (stage, spriteSheetManifest) {

        if (!stage) {
            throw new flyjs.Exception("error in parameters", "Stage is Null");
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
        var item = this._loadedAssets[0];
        var id = item.id;
        var result = this.loader.getResult(id);

        if (item.type == createjs.LoadQueue.IMAGE) {
            var bmp = new createjs.Bitmap(result);
        }

        this._stage.addChild(this.sprite);
    };

    flyjs.EntitySpriteSheet = EntitySpriteSheet;
}());