/*jslint nomen: true, plusplus: true, vars: true, eqeq:true */
/*jshint eqnull:true*/
/*global flyjs, createjs*/
this.flyjs = this.flyjs || {};

(function () {
    "use strict";
    /**
     *
     * @class SerialCommand
     * @constructor
     */
    var SerialCommand = function (commands) {
        this.initialize(commands);
    };

    var p = SerialCommand.prototype = new flyjs.Command();

    p.initialize = function (commands) {
        this._commands = commands;
    };

    p.execute = function () {
        this._completeCommandCount = 0;
        this._commands[0].addEventListener("complete", this.onSubCommandComplete.bind(this));
        this._commands[0].start();
    };

    p.onSubCommandComplete = function () {
        this._commands[this._completeCommandCount].removeEventListener("complete", this.onSubCommandComplete);
        this._completeCommandCount++;

        if (this._completeCommandCount == this._commands.length) {
            this.complete();
        } else {
            this._commands[this._completeCommandCount].addEventListener("complete", this.onSubCommandComplete);
            this._commands[this._completeCommandCount].start();
        }
    };

    /**
     *
     * @type {Array} of flyjs.Command
     * @private
     */
    p._commands = [];
    p._completeCommandCount = 0;

    flyjs.SerialCommand = SerialCommand;
}());