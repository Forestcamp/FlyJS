/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true, eqeq: true */
/*global flyjs, createjs*/

this.flyjs = this.flyjs || {};
(function () {
    'use strict';
    var SpriteSheetLoader = function () {};

    var p = SpriteSheetLoader.prototype = new flyjs.Command();

    p.spriteSheets = null;

    p.execute = function () {
        if (flyjs.AssetManager.manifest.spriteSheets) {
            this.spriteSheets = [];
            this._loader = new flyjs.Loader({
                onFileLoad: this.handleOnFileLoad.bind(this),
                onComplete: this.handleOnComplete.bind(this)
            });
            var i = 0,
                spriteSheet,
                tempListImages = [],
                imagesLength = flyjs.AssetManager.manifest.spriteSheets.length;

            for (i; i < imagesLength; i++) {
                spriteSheet = flyjs.AssetManager.manifest.spriteSheets[i];
                tempListImages.push(spriteSheet.images[0]);
            }

            this._loader.loadManifest(tempListImages);
        } else {
            this.complete();
        }
    };

    p.handleOnFileLoad = function (event) {
        this.spriteSheets.push(event.item);
    };

    p.handleOnComplete = function () {
        flyjs.ManifestParser.parseSpriteSheets(flyjs.AssetManager.manifest.spriteSheets);
        this.complete();
        this.spriteSheets = null;
    };

    flyjs.SpriteSheetLoader = SpriteSheetLoader;
}());