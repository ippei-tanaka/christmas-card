define('Snowflake', ['underscore', 'createjs', 'ImageLoader'], function (_, createjs, ImageLoader) {

    var Snowflake = function (args) {
        createjs.Container.call(this);

        var image = Math.random() > 0.4 ?
            ImageLoader.getImage('snowfalke01-image') : ImageLoader.getImage('snowfalke02-image');
        this.bitmap = new createjs.Bitmap(image);

        this.bitmap.filters = [
            new createjs.ColorFilter(1, 1, 1, 1, 50, 50, 50, 0)
        ];

        this.bitmap.cache(0, 0, this.bitmap.image.width, this.bitmap.image.height);

        this.bitmap.scaleX = this.bitmap.scaleY = 0.2 * args.scale;
        this.bitmap.x = -this.bitmap.image.width * this.bitmap.scaleX / 2 ;
        this.bitmap.y = -this.bitmap.image.height * this.bitmap.scaleY / 2;

        this._rotationSpeed = args.rotationSpeed;
        this.alpha = args.alpha;

        this.addChild(this.bitmap);
    };

    Snowflake.prototype = Object.create(createjs.Container.prototype);
    Snowflake.prototype.constructor = Snowflake;

    //----------------------------
    //----------------------------

    Snowflake.prototype.getWidth = function () {
        return this.bitmap.image.width;
    };

    Snowflake.prototype.getHeight = function () {
        return this.bitmap.image.height;
    };

    Snowflake.prototype.rotate = function () {
        this.rotation += this._rotationSpeed;
        return this;
    };

    return Snowflake
});