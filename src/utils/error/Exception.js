/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
/*jslint nomen: true, plusplus: true, vars: true */
/*global enginejs, Dictionary*/

this.enginejs = this.enginejs || {};

(function () {
    "use strict";
    /**
     *
     * @param name
     * @param msg
     * @constructor
     */
    var Exception = function (name, msg) {
        this.initialize(name, msg);
    };

    var p = Exception.prototype;

    p.CONSTRUCTOR_ERROR = "constructor arguments error";

    /**
     *
     * @param name
     * @param msg
     * @return {Object}
     */
    p.initialize = function (name, msg) {
        try {
            throw new Error("");
        } catch (e) {
            e.stack = e.stack.split("@" + e.fileName + ":").join(":");

            var full_stack = e.stack.split("\\n"),
                stack = [],
                lineNumber = 0,
                i = 2;

            stack[0] = "Exception: " + name + "(\"" + msg + "\")";

            for (i; i < full_stack.length - 3; i++) {
                var entry = full_stack[i],
                    entry_detailed = entry.split(":");
                if (i === 2) {
                    lineNumber = entry_detailed[1];
                }
                stack[i] = entry_detailed.join(":");
            }
            return {
                name: name,
                message: msg,
                stack: stack.join("\\n"),
                lineNumber: lineNumber
            };
        }
    }

    enginejs.Exception = Exception;
})();