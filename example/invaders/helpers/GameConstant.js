/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true */
/*global flyjs, console, game*/

this.game = this.game || {};

(function () {
    'use strict';

    var GameConstant = function () {};

    GameConstant.gameLives = 3;

    GameConstant.invadersPerRow = 5;

    GameConstant.frameSkipped = 10;

    game.GameConstant = GameConstant;
}());