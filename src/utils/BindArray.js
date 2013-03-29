/**
 *
 * @author Oleg Pimenov, https://github.com/fost
 *
 */
this.flyjs = this.flyjs || {};
(function (){

    var BindArray = function () {
        this.initialize();
    }

    var p = BindArray.prototype;

    // use EventDispatcher for this target (Class):
    createjs.EventDispatcher.initialize(p);

    p.list;

    p.initialize = function () {
        p.addEventListener("initial", function (){}, this);
        this.list = [];
    }

    p._dispatchBubble = function (type, params) {
        p.dispatchEvent(type, null, params);
    }

    /**
     *
     * @param element
     */
    p.addElement = function (element) {
        element.broadcastEvent = p._dispatchBubble;
        this.list.push(element);
    }

    /**
     *
     * @param index
     * @return {*}
     */
    p.getItemAt = function (index) {
        return this.list[index];
    }

    /**
     *
     * @return {Number}
     */
    p.getLength = function () {
        return this.list.length;
    }

    flyjs.BindArray = BindArray;
})();