define('Light', ['underscore', 'createjs', 'Event', 'ImageLoader'], function (_, createjs, Event, ImageLoader) {

    var Light = function (args) {
        createjs.Shape.call(this);

        this._radius = 200;
        this.graphics
            .beginFill(args.colour)
            .drawCircle(0, 0, this._radius);
        this._event = new Event();
        this._dAlpha = -0.05;

        this.alpha = args.alpha;

        this._maskBitmap = new createjs.Bitmap(ImageLoader.getImage('star-image'));

        this.filters = [
            new createjs.AlphaMaskFilter(this._maskBitmap.image)
        ];

        this.cache(0, 0, this._maskBitmap.image.width, this._maskBitmap.image.height);

        this.scaleX = 0.3 * args.scale;
        this.scaleY = 0.3 * args.scale;
        //this.rotation = args.rotation;
    };

    Light.prototype = Object.create(createjs.Shape.prototype);
    Light.prototype.constructor = Light;

    //----------------------------
    //----------------------------

    Light.prototype.getWidth = function () {
        return this._maskBitmap.image.width;
    };

    Light.prototype.getHeight = function () {
        return this._maskBitmap.image.height;
    };

    return Light
});