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

        this.scaleX = 0.2;
        this.scaleY = 0.2;
    };

    Light.prototype = Object.create(createjs.Shape.prototype);
    Light.prototype.constructor = Light;

    //----------------------------


    //----------------------------

    Light.prototype.onFadeOut = function (callback) {
        this._event.on('fadeout', callback);
        return this;
    };

    Light.prototype.update = function () {
        if (this.alpha > 0) {
            this.alpha += this._dAlpha;
        } else {
            this._event.fire('fadeout');
        }
    };

    return Light
});