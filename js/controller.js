define('Controller', ['underscore', 'createjs', 'Common$Elements',
        'Stage', 'Light', 'Tree', 'Message'],
    function (_, createjs, elms,
              Stage, Light, Tree, Message) {

        var Controller = function () {
            this.stage = new Stage(elms.$canvas);
            this.tree = new Tree({
                maxWidth: this.stage.getWidth() - 20,
                maxHeight: this.stage.getHeight() - 20
            });
            this.message = new Message({
                message: "Dear Sam,\n\nHave a holy day, eee\neeeeeee\neeeeeee\n\nIppei",
            });

            this.stage.addChild(this.tree);
            this.stage.addChild(this.message);




        };

        Controller.prototype.start = function () {
            createjs.Ticker.addEventListener("tick", _(function (event) {

                this.message.set({
                    x: (this.stage.getWidth()) / 2,
                    y: (this.stage.getHeight() - this.message.getHeight()) / 2 - 50
                });

                this.tree.set({
                    x: (this.stage.getWidth() - this.tree.getWidth()) / 2,
                    y: (this.stage.getHeight() - this.tree.getHeight()) / 2
                });

                this.stage.update(event);

            }).bind(this));
            createjs.Ticker.setFPS(20);
        };

        return Controller
    });