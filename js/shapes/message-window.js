define('MessageWindow', ['underscore', 'jquery', 'createjs', 'Tree', 'MessageParagraph'],
    function (_, $, createjs, Tree, MessageParagraph) {

        var MessageWindow = function (args) {
            createjs.Container.call(this);
            this._width = args.width;
            this._height = args.height;


            var mask = new createjs.Shape();
            mask.graphics.beginFill("red").drawRect(0, 0, this.getWidth(), this.getHeight());
            mask.x = -Math.floor(this.getWidth() / 2);

            this._innerContainer = new createjs.Container();
            this._innerContainer.mask = mask;

            this.addChild(this._innerContainer);
        };

        MessageWindow.prototype = Object.create(createjs.Container.prototype);
        MessageWindow.prototype.constructor = MessageWindow;

        //----------------------------
        //----------------------------

        MessageWindow.prototype.getWidth = function () {
            return this._width;
        };

        MessageWindow.prototype.getHeight = function () {
            return this._height;
        };

        MessageWindow.prototype.releaseParagraph = function (text) {
            var paragraph = new MessageParagraph({
                    message: text
                }),
                deferred = $.Deferred(),
                speed = 20,
                heightOffset = 30;

            paragraph.lineWidth = this.getWidth();
            paragraph.y = this.getHeight();

            createjs.Tween.get(paragraph)
                .to({y: -paragraph.getHeight() - heightOffset}, (this.getHeight() + paragraph.getHeight() + heightOffset) * speed)
                .call(_(function () {
                    this._innerContainer.removeChild(paragraph);
                }).bind(this))
                .addEventListener("change", _(function () {
                    if (paragraph.y < this.getHeight() - paragraph.getHeight()) {
                        deferred.resolve();
                    }
                }).bind(this));

            this._innerContainer.addChild(paragraph);

            return deferred.promise();
        };

        return MessageWindow
    });