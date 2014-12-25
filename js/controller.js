define('Controller', ['underscore', 'createjs', 'jquery', 'Common$Elements',
        'Stage', 'Light', 'Tree', 'MessageWindow', 'Speech', 'Music'],
    function (_, createjs, $, elms,
              Stage, Light, Tree, MessageWindow, Speech, Music) {

        var Tween = createjs.Tween,

            Controller = function () {
                this.stage = new Stage(elms.$canvas);
                this.tree = new Tree({
                    maxWidth: this.stage.getWidth() - 20,
                    maxHeight: this.stage.getHeight() - 20
                });
                this.message = "Dear Sam,\n\nHave a holy day, eee\neeeeeee\neeeeeee\n\nIppei";
                this.music = 'oh-holy-night';
                this.lastParagraph = "Merry Chrismas";
                this.paragraphs = _(this.message.split("\n")).map(function (paragraph) {
                    return paragraph.trim();
                });

                this.messageWindow = new MessageWindow({
                    width: this.tree.getWidth(),
                    height: this.tree.leafs.getHeight()
                });

                this.stage.addChild(this.tree);
                this.stage.addChild(this.messageWindow);

                this.$musicButton = $('#MusicButton');
                //this.$speechButton = $('#SpeechButton');

                this.$musicButton.on('click', function (event) {
                    if (Music.getVolume() === 0) {
                        $(event.currentTarget).find('.cross').hide();
                        Music.setDefaultVolume();
                    } else {
                        $(event.currentTarget).find('.cross').show();
                        Music.setVolume(0);
                    }
                });
            };

        Controller.prototype.start = function () {
            var jObj = $({}),
                musicPromise = Music.load(this.music);

            jObj
                .queue(_(function (next) {
                    this.tree.alpha = 0;
                    Tween.get(this.tree)
                        .to({alpha: 1}, 3000)
                        .call(next);

                }).bind(this))
                .queue(_(function (next) {
                    musicPromise.done(function () {
                        Music.play();
                        next();
                    });
                }).bind(this))
                .delay(2000);

            _(this.paragraphs).each(_(function (paragraph) {
                jObj
                    .queue(_(function (next) {
                        $.when(
                            this.messageWindow.releaseParagraph(paragraph)
                        ).done(next);

                        paragraph = paragraph.replace('\n', '').trim();
                        if (paragraph) {
                            Speech.speak(paragraph)
                        }
                    }).bind(this))
                    .delay(1000);
            }).bind(this));

            if (this.lastParagraph) {
                jObj
                    .delay(1000)
                    .queue(_(function (next) {
                        $.when(
                            this.messageWindow.showSingleParagraph(this.lastParagraph)
                        ).done(next);
                        Speech.speak(this.lastParagraph)
                    }).bind(this))
                    .delay(1000);
            }

            jObj
                .queue(_(function (next) {
                    setInterval(_(function () {
                        this.tree.renderLight();
                    }).bind(this), 150);
                    setTimeout(next, 1000)
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