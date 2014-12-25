define('Star', ['underscore', 'createjs', 'ImageLoader'], function (_, createjs, ImageLoader) {

    var Star = function () {

        createjs.Bitmap.call(this, ImageLoader.getImage('paper-pattern'));

        this._maskBitmap = new createjs.Bitmap(ImageLoader.getImage('star-image'));

        this.filters = [
            new createjs.AlphaMaskFilter(this._maskBitmap.image),
            new createjs.ColorFilter(1, 1, 1, 1, 0, -20, -60, 0)
        ];

        this.cache(0, 0, this._maskBitmap.image.width, this._maskBitmap.image.height);
    };

    Star.prototype = Object.create(createjs.Bitmap.prototype);
    Star.prototype.constructor = Star;

    //----------------------------
    //----------------------------

    Star.prototype.update = function () {
    };

    return Star
});