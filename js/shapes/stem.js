define('Stem', ['underscore', 'createjs', 'ImageLoader'], function (_, createjs, ImageLoader) {

    var Stem = function () {

        createjs.Bitmap.call(this, ImageLoader.getImage('paper-pattern'));

        this._maskBitmap = new createjs.Bitmap(ImageLoader.getImage('stem-image'));

        this.filters = [
            new createjs.AlphaMaskFilter(this._maskBitmap.image),
            new createjs.ColorFilter(0.4, 0.3, 0.25, 1, 0, 0, 0, 0)
        ];

        this.cache(0, 0, this._maskBitmap.image.width, this._maskBitmap.image.height);
    };

    Stem.prototype = Object.create(createjs.Bitmap.prototype);
    Stem.prototype.constructor = Stem;

    //----------------------------
    //----------------------------

    Stem.prototype.update = function () {
    };

    return Stem
});