define('Star', ['underscore', 'createjs', 'ImageLoader'], function (_, createjs, ImageLoader) {

    var Star = function () {

        createjs.Bitmap.call(this, ImageLoader.getImage('star-image'));

        this.filters = [
            new createjs.ColorFilter(1, 1, 1, 1, 0, -20, -60, 0)
        ];

        this.cache(0, 0, this.image.width, this.image.height);
    };

    Star.prototype = Object.create(createjs.Bitmap.prototype);
    Star.prototype.constructor = Star;

    //----------------------------
    //----------------------------

    Star.prototype.getWidth = function () {
        return this.image.width;
    };

    Star.prototype.getHeight = function () {
        return this.image.height;
    };

    return Star
});