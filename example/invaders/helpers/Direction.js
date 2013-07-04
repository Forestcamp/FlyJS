/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs, game*/

this.game = this.game || {};

(function () {
    'use strict';

    var Direction = function () {};

    Direction.RIGHT = 0;
    Direction.LEFT = 1;
    Direction.UP = 2;
    Direction.DOWN = 3;

    game.Direction = Direction;
}());