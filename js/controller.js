define('Controller', ['underscore', 'createjs', 'jquery', 'Common$Elements', 'UrlUtil',
        'Stage', 'Light', 'Tree', 'MessageWindow', 'Speech', 'Music', 'Snowflake'],
    function (_, createjs, $, elms, UrlUtil,
              Stage, Light, Tree, MessageWindow, Speech, Music, Snowflake) {

        var Tween = createjs.Tween,

            Controller = function () {
                var message = UrlUtil.getUrlVars('message'),
                    music = UrlUtil.getUrlVars('music'),
                    ending = UrlUtil.getUrlVars('ending');

                this.stage = new Stage(elms.$canvas);
                this.tree = new Tree({
                    maxWidth: this.stage.getWidth() - 20,
                    maxHeight: this.stage.getHeight() - 20
                });
                this.message = message || "Love, joy and peace are the ingredients for a wonderful Christmas...\nI hope you find them all this festive season...";
                this.music = (music === 'we-wish-you' || !music) ? 'we-wish-you' : music === 'oh-holy-night' ?  'oh-holy-night' : null;
                this.ending = ending === "none" ? false : ending ? ending : "Have a Merry Christmas!";
                this.paragraphs = _(this.message.split("\n")).map(function (paragraph) {
                    return paragraph.trim();
                });

                this.messageWindow = new MessageWindow({
                    width: this.tree.getWidth(),
                    height: this.tree.leafs.getHeight()
                });

                this.stage.addChild(this.tree);
                this.stage.addChild(this.messageWindow);

                if (this.music) {
                    this.$musicButton = $('#MusicButton');
                    this.$musicButton.show();
                    this.$musicButton.on('click', function (event) {
                        if (Music.getVolume() === 0) {
                            $(event.currentTarget).find('.cross').hide();
                            Music.setDefaultVolume();
                        } else {
                            $(event.currentTarget).find('.cross').show();
                            Music.setZeroVolume();
                        }
                    });
                }


                this.$playButton = $('#PlayButton');
                this.$playButton.on('click', _(function (event) {
                    $('#Splash').hide();
                    this.start();
                }).bind(this));
            };

        Controller.prototype.start = function () {
            var jObj = $({});
                musicPromise = this.music ? Music.load(this.music) : null;

            jObj
                .queue(_(function (next) {
                    this.tree.alpha = 0;
                    Tween.get(this.tree)
                        .to({alpha: 1}, 3000)
                        .call(next);

                }).bind(this))
                .queue(_(function (next) {
                    if (musicPromise) {
                        musicPromise.done(function () {
                            Music.play();
                            next();
                        });
                    } else {
                        next();
                    }
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

            if (this.ending) {
                jObj
                    .delay(1000)
                    .queue(_(function (next) {
                        $.when(
                            this.messageWindow.showSingleParagraph(this.ending)
                        ).done(next);
                        Speech.speak(this.ending)
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

            createjs.Ticker.addEventListener("tick", _(this._renderShowflakes).bind(this));
            createjs.Ticker.addEventListener("tick", _(this._reposition).bind(this));
            createjs.Ticker.addEventListener("tick", this.stage);
        };

        Controller.prototype._renderShowflakes = function (event) {
            this._snowflakes = this._snowflakes || [];
            if (this._snowflakes.length < 30 && Math.random() > 0.9) {
                var snowflake = new Snowflake({
                    scale: Math.random() * 0.6 + 0.4,
                    rotationSpeed: Math.random() * 8 + 3,
                    alpha: Math.random() * 0.6 + 0.2
                });
                this.stage.addChildAt(snowflake, 0);
                this._snowflakes.push(snowflake);
                snowflake.x = Math.random() * (this.stage.getWidth()) + (- Math.random() * 200);
                snowflake.y = -snowflake.getHeight();
            }
            _(this._snowflakes).each(function (snowflake) {
                snowflake.rotate();
                snowflake.y += 5;
                snowflake.x += 1;
            });
            this._snowflakes = _(this._snowflakes).filter(_(function (snowflake) {
                if (snowflake.y > this.stage.getHeight() + snowflake.getHeight()) {
                    this.stage.removeChild(snowflake);
                    return false;
                } else {
                    return true;
                }
            }).bind(this));
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