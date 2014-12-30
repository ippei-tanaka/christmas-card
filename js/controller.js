define('Controller', ['underscore', 'createjs', 'jquery', 'Common$Elements', 'UrlUtil', 'easy-chain',
        'Stage', 'Light', 'Tree', 'MessageWindow', 'Speech', 'Music', 'Snowflake'],
    function (_, createjs, $, elms, UrlUtil, EasyChain,
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
                this.tree.alpha = 0;
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

                this._setupPlayButton();
            };

        Controller.prototype._setupPlayButton = function () {
            this.$playButton = $('#PlayButton');
            this.$playButton.show();
            this.$playButton.on('click', _(function () {
                $('#Splash').hide();
                this._setupMusicButton();
                this.start();
            }).bind(this));
        };

        Controller.prototype._setupMusicButton = function () {
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
        };

        Controller.prototype.start = function () {
            var chain = new EasyChain(),
                musicPromise = this.music ? Music.load(this.music) : null;

            chain
                .single(_(function (next) {
                    Tween.get(this.tree)
                        .to({alpha: 1}, 3000)
                        .call(next);
                }).bind(this))
                .single(_(function (next) {
                    if (musicPromise) {
                        musicPromise.done(function () {
                            Music.play();
                            next();
                        });
                    } else {
                        next();
                    }
                }).bind(this))
                .wait(2000);

            _(this.paragraphs).each(_(function (paragraph) {
                chain
                    .single(_(function () {
                        paragraph = paragraph.replace('\n', '').trim();
                        if (paragraph) {
                            Speech.speak(paragraph)
                        }
                        return this.messageWindow.releaseParagraph(paragraph);
                    }).bind(this))
                    .wait(1000);
            }).bind(this));

            if (this.ending) {
                chain
                    .wait(1000)
                    .single(_(function () {
                        Speech.speak(this.ending);
                        return this.messageWindow.showSingleParagraph(this.ending);
                    }).bind(this))
                    .wait(1000);
            }

            chain
                .single(_(function (next) {
                    setInterval(_(function () {
                        this.tree.renderLight();
                    }).bind(this), 150);
                    next();
                }).bind(this))
                .wait(1000)
                .single(function () {
                    console.log(2323);
                });

            chain.run();

            createjs.Ticker.addEventListener("tick", _(this._renderSnowflakes).bind(this));
            createjs.Ticker.addEventListener("tick", _(this._reposition).bind(this));
            createjs.Ticker.addEventListener("tick", this.stage);
        };

        Controller.prototype._renderSnowflakes = function (event) {
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