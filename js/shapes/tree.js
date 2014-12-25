define('Tree', ['underscore', 'createjs', 'Leafs', 'Stem', 'Star', 'Light', 'CreateJsUtil'],
    function (_, createjs, Leafs, Stem, Star, Light, CreateJsUtil) {

        var Tween = createjs.Tween,

            Tree = function (args) {
                createjs.Container.call(this);

                this.leafs = new Leafs();
                this.stem = new Stem();
                this.star = new Star();

                this.addChild(this.stem);
                this.addChild(this.leafs);
                this.addChild(this.star);

                this.leafs.x = 0;
                this.leafs.y = 60;
                this.stem.x = 195;
                this.stem.y = 540;
                this.star.x = 205;
                this.star.y = 0;

                this._width = this.leafs.getWidth();
                this._height = this.stem.y + this.stem.getHeight();

                this.scaleY = this.scaleX = this._calculateScale(this._width, this._height, args.maxWidth, args.maxHeight);

                this.shadow = new createjs.Shadow("rgba(0, 0, 0, 0.4)", 4, 4, 20);
            };

        Tree.prototype = Object.create(createjs.Container.prototype);
        Tree.prototype.constructor = Tree;

        //----------------------------

        Tree.prototype._calculateScale = function (width, height, maxWidth, maxHeight) {
            var scaleX = maxWidth && maxWidth < width ? maxWidth / width : 1,
                scaleY = maxHeight && maxHeight < height ? maxHeight / height : 1;

            return Math.min(scaleX, scaleY);
        };

        Tree.prototype._renderTreeLight = function () {
            var light = new Light({
                colour: this._generateRandomColourForTree(),
                radius: Math.random() * 6 + 5,
                alpha: Math.random() * 0.4 + 0.3,
                scale: Math.random() * 0.5 + 0.5
            });

            light.set(CreateJsUtil.getRandomPoint(this, this.leafs));

            this.addChild(light);

            Tween.get(light, {loop: true})
                .wait(500 * Math.random() + 200)
                .to({alpha: 0}, 0)
                .wait(100 * Math.random() + 100)
                .to({alpha: 1}, 0)
                .call(_(function () {
                    if (Math.random() > 0.5) {
                        this.removeChild(light);
                    }
                }).bind(this));
        };


        Tree.prototype._generateRandomColourForTree = function () {
            var r, g, b, num = Math.random();

            if (num < 0.90) {
                r = Math.floor(Math.random() * 0 + 255).toString(16);
                g = Math.floor(Math.random() * 230 + 25).toString(16);
                b = Math.floor(Math.random() * 10 + 20).toString(16);
            } else if (num < 0.98) {
                r = Math.floor(Math.random() * 200 + 25).toString(16);
                g = Math.floor(Math.random() * 0 + 255).toString(16);
                b = Math.floor(Math.random() * 10 + 20).toString(16);
            } else {
                r = (255).toString(16);
                g = (255).toString(16);
                b = (255).toString(16);
            }
            return '#' + r + g + b;
        };

        //----------------------------

        Tree.prototype.getWidth = function () {
            return this._width * this.scaleX;
        };

        Tree.prototype.getHeight = function () {
            return this._height * this.scaleY;
        };

        Tree.prototype.renderLight = function () {
            this._renderTreeLight();
        };

        return Tree
    });