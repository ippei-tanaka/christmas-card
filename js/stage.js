define('Stage', ['underscore', 'createjs', 'Common$Elements'], function (_, createjs, elms) {

    var Stage = function ($canvas) {
        createjs.Stage.call(this, $canvas.get(0));
        this._$canvas = $canvas;
        this._setEventListeners();
        this._resizeCanvas();
    };

    Stage.prototype = Object.create(createjs.Stage.prototype);
    Stage.prototype.constructor = Stage;

    //----------------------------

    Stage.prototype._setEventListeners = function () {
        elms.$window.on("resize", _.debounce(_(this._resizeCanvas).bind(this), 10));
    };

    Stage.prototype._resizeCanvas = function () {
        this._$canvas.attr({
            width: elms.$body.width(),
            height: elms.$body.height()
        });
        this.update();
    };

    Stage.prototype.getWidth = function () {
        return elms.$body.width();
    };

    Stage.prototype.getHeight = function () {
        return elms.$body.height();
    };

    //----------------------------

    return Stage
});