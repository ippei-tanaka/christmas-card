define('Message', ['underscore', 'createjs', 'ImageLoader'], function (_, createjs, ImageLoader) {

    var Message = function (args) {
        createjs.Text.call(this, "", "50px 'Francois One'", "#ffffff");

        this._message = args.message;
        this.textAlign = "center";
    };

    Message.prototype = Object.create(createjs.Text.prototype);
    Message.prototype.constructor = Message;

    //----------------------------
    //----------------------------

    Message.prototype.update = function () {
        if (this._message.length > 0) {
            this.text += this._message[0];
            this._message = this._message.substr(1);
        }
    };

    Message.prototype.getWidth = function () {
        return this.getMeasuredWidth();
    };

    Message.prototype.getHeight = function () {
        return this.getMeasuredHeight();
    };

    return Message
});