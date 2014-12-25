define('MessageParagraph', ['underscore', 'createjs'], function (_, createjs) {

    var MessageShape = function (args) {
        createjs.Text.call(this, args.message, "50px 'Francois One'", "#ffffff");

        this.lineHeight = 50 * 1.4;
        this.textAlign = "center";
    };

    MessageShape.prototype = Object.create(createjs.Text.prototype);
    MessageShape.prototype.constructor = MessageShape;

    //----------------------------
    //----------------------------

    MessageShape.prototype.getWidth = function () {
        return this.lineWidth;
    };

    MessageShape.prototype.getHeight = function () {
        return this.getMeasuredHeight();
    };

    return MessageShape
});