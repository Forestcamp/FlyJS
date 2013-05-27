/*jslint nomen: true, plusplus: true, vars: true, eqeq:true */
/*jshint eqnull:true*/
/*global flyjs, createjs*/
this.flyjs = this.flyjs || {};

(function () {
    "use strict";
    /**
     *
     * @class Command
     * @constructor
     */
    var Command = function () {};

    var p = Command.prototype;

    createjs.EventDispatcher.initialize(p);

    p.start = function () {
        this.execute();
    };

    p.execute = function () {};

    p.complete = function () {
        this.dispatchEvent("complete");
    };

    flyjs.Command = Command;
}());