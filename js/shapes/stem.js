define('Stem', ['underscore', 'createjs', 'ImageLoader'], function (_, createjs, ImageLoader) {

    var Stem = function () {

        createjs.Bitmap.call(this, ImageLoader.getImage('stem-image'));

        this.filters = [
            new createjs.ColorFilter(0.4, 0.3, 0.25, 1, 0, 0, 0, 0)
        ];

        this.cache(0, 0, this.image.width, this.image.height);
    };

    Stem.prototype = Object.create(createjs.Bitmap.prototype);
    Stem.prototype.constructor = Stem;

    //----------------------------
    //----------------------------

    Stem.prototype.getWidth = function () {
        return this.image.width;
    };

    Stem.prototype.getHeight = function () {
        return this.image.height;
    };

    return Stem
});