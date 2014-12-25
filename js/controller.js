define('Controller', ['underscore', 'createjs', 'jquery', 'Common$Elements',
        'Stage', 'Light', 'Tree', 'MessageWindow'],
    function (_, createjs, $, elms,
              Stage, Light, Tree, MessageWindow) {

        var Tween = createjs.Tween,

            Controller = function () {
                this.stage = new Stage(elms.$canvas);
                this.tree = new Tree({
                    maxWidth: this.stage.getWidth() - 20,
                    maxHeight: this.stage.getHeight() - 20
                });
                this.message = "Dear Sam,\n\nHave a holy day, eee\neeeeeee\neeeeeee\n\nIppei";

                this.messageWindow = new MessageWindow({
                    width: this.tree.getWidth(),
                    height: this.tree.leafs.getHeight()
                });

                this.stage.addChild(this.tree);
                this.stage.addChild(this.messageWindow);

                this.tree.alpha = 0;
            };

        Controller.prototype.start = function () {
            $({})
                .queue(_(function (next) {
                    Tween.get(this.tree)
                        .to({alpha: 1}, 1500)
                        .call(next);
                }).bind(this))
                .queue(_(function (next) {
                    this.messageWindow.releaseParagraph("32, asdfa, 234.")
                        .done(next)
                }).bind(this))
                .delay(500)
                .queue(_(function (next) {
                    this.messageWindow.releaseParagraph("dddd, asdfadddd, asdfadddd, asdfadddd, asdfadddd, asdfadddd, asdfa, asdf.")
                        .done(next);
                }).bind(this))
                .queue(_(function (next) {
                    setInterval(_(function () {
                        this.tree.renderLight();
                    }).bind(this), 30)
                }).bind(this));

            createjs.Ticker.addEventListener("tick", _(this._reposition).bind(this));
            createjs.Ticker.addEventListener("tick", this.stage);
        };

        Controller.prototype._reposition = function (event) {
            this.messageWindow.set({
                x: (this.stage.getWidth()) / 2,
                y: (this.stage.getHeight() - this.messageWindow.getHeight()) / 2 - 50
            });
            this.tree.set({
                x: (this.stage.getWidth() - this.tree.getWidth()) / 2,
                y: (this.stage.getHeight() - this.tree.getHeight()) / 2
            });
        };

        return Controller
    });