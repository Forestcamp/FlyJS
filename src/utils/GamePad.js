/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true, eqeq: true */
/*global flyjs, createjs, window*/

this.flyjs = this.flyjs || {};

(function () {

    'use strict';

    /**
     *
     * @class GamePad
     * @constructor
     */
    var GamePad = function () {
        throw "GamePad cannot be instantiated.";
    };

    /**
     * Define our control Keys
     * @property _control
     * @type {Object}
     * @private
     */
    GamePad._control = {};
    GamePad._key = [256];
    GamePad._press = [256];
    GamePad._release = [256];

    /**
     *
     * @property _pressNum
     * @type {number}
     * @private
     */
    GamePad._pressNum = 0;

    /**
     * @property
     * @type {number}
     * @private
     */
    GamePad._releaseNum = 0;

    /**
     * Max stored characters
     * @property _MAX_STORE_KEYS
     * @type {number}
     * @private
     */
    GamePad._MAX_STORE_KEYS = 100;

    /**
     * @method initialize
     * @param stage
     */
    GamePad.initialize = function (stage) {
        if (stage && stage.canvas.ALLOW_KEYBOARD_INPUT == 1) {
            stage.canvas.ownerDocument.onkeydown = this._onKeyDown.bind(this);
            stage.canvas.ownerDocument.onkeyup = this._onKeyUp.bind(this);
        }
    };

    /**
     * Define actions
     * arguments[0] - Action
     * arguments[1] - Button 1
     * arguments[2] - Button 2
     * For Example : Action="Jump", button "W" and button "39"
     * @method define
     * @param name {String}
     * @param buttons {Array}
     * @public
     */
    GamePad.define = function (name, buttons) {
        if (!name || name.length === 0) {
            throw "name param needed";
        }
        if (!buttons || buttons.length === 0) {
            throw "buttons param needed";
        }

        this._control[name] = buttons;
    };

    /**
     * @method pressed
     * @param inputChar
     * @returns {Boolean}
     * @public
     */
    GamePad.isPressed = function (inputChar) {
        if (inputChar) {
            if (!this._control[inputChar]) {
                return false;
            }
            var v = this._control[inputChar],
                i = v.length;

            while (i--) {
                if (((v[i] < 0) && this._pressNum) || ((v[i] > 0) && this._press.indexOf(v[i]) >= 0)) {
                    return true;
                }
            }
            return false;
        }
        return (inputChar < 0) ? Boolean(this._pressNum) : this._press.indexOf(inputChar) >= 0;
    };

    /**
     * Called for update keyInput (every tick)
     * @method update
     * @public
     */
    GamePad.update = function () {
        while (this._pressNum--) {
            this._press[this._pressNum] = -1;
        }
        this._pressNum = 0;
        while (this._releaseNum--) {
            this._release[this._releaseNum] = -1;
        }
        this._releaseNum = 0;
    };

    /**
     * @method clear
     * @public
     */
    GamePad.clear = function () {
        this._press.length = this._pressNum = 0;
        this._release.length = this._releaseNum = 0;
        var i = this._key.length;
        while (i--) {
            this._key[i] = false;
        }
    };

    //************************************
    //  PRIVATE Methods
    //************************************

    /**
     *
     * @param event
     * @private
     */
    GamePad._onKeyDown = function (event) {
        //cross browser issues exist
        if (!event) {
            event = window.event;
        }
        // get the keyCode
        var keyCode = event.keyCode;

        if (keyCode < 0 || keyCode > 255) {
            return;
        }

        if (!this._key[keyCode]) {
            this._key[keyCode] = true;
            this._press[this._pressNum++] = keyCode;
        }
    };

    /**
     *
     * @param event
     * @private
     */
    GamePad._onKeyUp = function (event) {
        if (!event) {
            event = window.event;
        }
        var keyCode = event.keyCode;

        if (keyCode < 0 || keyCode > 255) {
            return;
        }

        if (this._key[keyCode]) {
            this._key[keyCode] = false;
            this._release[this._releaseNum++] = keyCode;
        }
    };

    flyjs.GamePad = GamePad;
}());