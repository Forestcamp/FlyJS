/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true, eqeq: true */
/*global flyjs, createjs, extend*/
this.flyjs = this.flyjs || {};

(function () {
    "use strict";

    var EntitySpriteSheet = function () {};

    var proto = EntitySpriteSheet.prototype = new flyjs.Entity();

    extend(proto, {
        /**
         * @property _stage
         * @type {createjs.Stage}
         * @private
         */
        _stage: null,

        /**
         * @property _loadedAssets
         * @type {Array}
         * @private
         */
        _loadedAssets: [],

        /**
         * @property bitmapAnimation
         * @type {Object}
         * @protected
         */
        bitmapAnimation: null,

        /**
         * @property sprite
         * @type {null}
         * @protected
         */
        sprite: null,

        /**
         * @method initialize
         * @param stage
         * @param spriteSheetManifest
         */
        initialize: function (stage, spriteSheetManifest) {

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
        },

        loadManifest: function (manifest) {
            this.loader = new createjs.LoadQueue(false);
            this.loader.onFileLoad = this.handleFileLoad.bind(this);
            this.loader.onComplete = this.handleComplete.bind(this);
            this.loader.loadManifest(manifest);
        },

        handleFileLoad: function (event) {
            this._loadedAssets.push(event.item);
        },

        handleComplete: function () {
            var item = this._loadedAssets[0];
            var id = item.id;
            var result = this.loader.getResult(id);

            if (item.type == createjs.LoadQueue.IMAGE) {
                var bmp = new createjs.Bitmap(result);
            }

            this._stage.addChild(this.sprite);
        }
    });

    flyjs.EntitySpriteSheet = EntitySpriteSheet;
}());