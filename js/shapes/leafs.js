define('Leafs', ['underscore', 'createjs', 'ImageLoader'], function (_, createjs, ImageLoader) {

    var Leafs = function () {
        createjs.Bitmap.call(this, ImageLoader.getImage('wooden-pattern'));

        this._maskBitmap = new createjs.Bitmap(ImageLoader.getImage('leafs-image'));

        this.filters = [
            new createjs.AlphaMaskFilter(this._maskBitmap.image),
            new createjs.ColorFilter(1, 1, 1, 1, -13, 0, -9, 0)
        ];

        this.cache(0, 0, this._maskBitmap.image.width, this._maskBitmap.image.height);
    };

    Leafs.prototype = Object.create(createjs.Bitmap.prototype);
    Leafs.prototype.constructor = Leafs;

    //----------------------------
    //----------------------------

    Leafs.prototype.update = function () {
    };

    return Leafs
});