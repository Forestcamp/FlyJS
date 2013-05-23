/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true, eqeq: true */
/*global flyjs, createjs, extend*/

this.flyjs = this.flyjs || {};

(function () {

    'use strict';
    /**
     * A helper for common key codes
     * @class Key
     * @constructor
     */
    var Key = function () {
        throw "Key cannot be instantiated.";
    };


    Key.ANY = -1;

    Key.LEFT = 37;
    Key.UP = 38;
    Key.RIGHT = 39;
    Key.DOWN = 40;

    Key.ENTER = 13;
    Key.COMMAND = 15;
    Key.CONTROL = 17;
    Key.SPACE = 32;
    Key.SHIFT = 16;
    Key.BACKSPACE = 8;
    Key.CAPS_LOCK = 20;
    Key.DELETE = 46;
    Key.END = 35;
    Key.ESCAPE = 27;
    Key.HOME = 36;
    Key.INSERT = 45;
    Key.TAB = 9;
    Key.PAGE_DOWN = 34;
    Key.PAGE_UP = 33;
    Key.LEFT_SQUARE_BRACKET = 219;
    Key.RIGHT_SQUARE_BRACKET = 221;

    Key.A = 65;
    Key.B = 66;
    Key.C = 67;
    Key.D = 68;
    Key.E = 69;
    Key.F = 70;
    Key.G = 71;
    Key.H = 72;
    Key.I = 73;
    Key.J = 74;
    Key.K = 75;
    Key.L = 76;
    Key.M = 77;
    Key.N = 78;
    Key.O = 79;
    Key.P = 80;
    Key.Q = 81;
    Key.R = 82;
    Key.S = 83;
    Key.T = 84;
    Key.U = 85;
    Key.V = 86;
    Key.W = 87;
    Key.X = 88;
    Key.Y = 89;
    Key.Z = 90;

    Key.F1 = 112;
    Key.F2 = 113;
    Key.F3 = 114;
    Key.F4 = 115;
    Key.F5 = 116;
    Key.F6 = 117;
    Key.F7 = 118;
    Key.F8 = 119;
    Key.F9 = 120;
    Key.F10 = 121;
    Key.F11 = 122;
    Key.F12 = 123;
    Key.F13 = 124;
    Key.F14 = 125;
    Key.F15 = 126;

    Key.DIGIT_0 = 48;
    Key.DIGIT_1 = 49;
    Key.DIGIT_2 = 50;
    Key.DIGIT_3 = 51;
    Key.DIGIT_4 = 52;
    Key.DIGIT_5 = 53;
    Key.DIGIT_6 = 54;
    Key.DIGIT_7 = 55;
    Key.DIGIT_8 = 56;
    Key.DIGIT_9 = 57;

    Key.NUMPAD_0 = 96;
    Key.NUMPAD_1 = 97;
    Key.NUMPAD_2 = 98;
    Key.NUMPAD_3 = 99;
    Key.NUMPAD_4 = 100;
    Key.NUMPAD_5 = 101;
    Key.NUMPAD_6 = 102;
    Key.NUMPAD_7 = 103;
    Key.NUMPAD_8 = 104;
    Key.NUMPAD_9 = 105;
    Key.NUMPAD_ADD = 107;
    Key.NUMPAD_DECIMAL = 110;
    Key.NUMPAD_DIVIDE = 111;
    Key.NUMPAD_ENTER = 108;
    Key.NUMPAD_MULTIPLY = 106;
    Key.NUMPAD_SUBTRACT = 109;

    flyjs.Key = Key;
}());