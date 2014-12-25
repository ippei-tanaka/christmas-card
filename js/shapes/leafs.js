define('Leafs', ['underscore', 'createjs', 'ImageLoader'], function (_, createjs, ImageLoader) {

    var Leafs = function () {
        createjs.Bitmap.call(this, ImageLoader.getImage('leafs-image'));

        this.filters = [
            new createjs.ColorFilter(0.25, 0.55, 0.35, 1, 0, 0, 0, 0)
        ];

        this.cache(0, 0, this.image.width, this.image.height);
    };

    Leafs.prototype = Object.create(createjs.Bitmap.prototype);
    Leafs.prototype.constructor = Leafs;

    //----------------------------
    //----------------------------

    Leafs.prototype.getWidth = function () {
        return this.image.width;
    };

    Leafs.prototype.getHeight = function () {
        return this.image.height;
    };

    return Leafs
});