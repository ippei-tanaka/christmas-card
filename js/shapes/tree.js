define('Tree', ['underscore', 'createjs', 'Leafs', 'Stem', 'Star', 'Light'],
    function (_, createjs, Leafs, Stem, Star, Light) {

        var Tree = function (args) {
            createjs.Container.call(this);

            this.leafs = new Leafs();
            this.stem = new Stem();
            this.star = new Star();

            this.addChild(this.stem);
            this.addChild(this.leafs);
            this.addChild(this.star);

            this.leafs.x = 0;
            this.leafs.y = 30;
            this.stem.x = 225;
            this.stem.y = 530;
            this.star.x = 260;
            this.star.y = 0;

            this._width = 650;
            this._height = 810;

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

        Tree.prototype._renderStarLight = function () {
            var light = new Light({
                colour: this._generateRandomColourForStar(),
                radius: Math.random() * 2 + 4,
                alpha: Math.random() * 0.6 + 0.2
            });

            light
                .set(this._getRandomPointWithin(this.star))
                .onFadeOut(_(function () {
                    this.removeChild(light);
                }).bind(this));

            this.addChild(light);
        };


        Tree.prototype._generateRandomColourForStar = function () {
            var r = Math.floor(Math.random() * 20 + 235).toString(16),
                g = Math.floor(Math.random() * 20 + 235).toString(16),
                b = Math.floor(Math.random() * 20 + 150).toString(16);
            return '#' + r + g + b;
        };

        Tree.prototype._renderTreeLight = function () {
            var light = new Light({
                colour: this._generateRandomColourForTree(),
                radius: Math.random() * 6 + 5,
                alpha: Math.random() * 0.4 + 0.3
            });

            light
                .set(this._getRandomPointWithin(this.leafs))
                .onFadeOut(_(function () {
                    this.removeChild(light);
                }).bind(this));

            this.addChild(light);
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

        Tree.prototype._renderStemLight = function () {
            var light = new Light({
                colour: this._generateRandomColourForStem(),
                radius: Math.random() * 4 + 4,
                alpha: Math.random() * 0.3 + 0.2
            });

            light
                .set(this._getRandomPointWithin(this.stem))
                .onFadeOut(_(function () {
                    this.removeChild(light);
                }).bind(this));

            this.addChild(light);
        };

        Tree.prototype._generateRandomColourForStem = function () {
            var r = Math.floor(Math.random() * 160 + 75).toString(16),
                g = Math.floor(Math.random() * 20 + 60).toString(16),
                b = Math.floor(Math.random() * 10 + 20).toString(16);
            return '#' + r + g + b;
        };


        Tree.prototype._getRandomPointWithin = function (displayObject) {
            var x, y, pt;

            do {
                x = Math.random() * this.getWidth();
                y = Math.random() * this.getHeight();
                pt = this.localToLocal(x, y, displayObject);
            } while (!displayObject.hitTest(pt.x, pt.y));

            return new createjs.Point(x, y);
        };

        //----------------------------

        Tree.prototype.update = function () {
            //_.times(1, _(this._renderStarLight).bind(this));
            _.times(1, _(this._renderTreeLight).bind(this));
            //this._renderTreeLight();
            _(this.children).each(function (child) {
                if (child) {
                    child.update();
                }
            });
        };

        Tree.prototype.getWidth = function () {
            return this._width * this.scaleX;
        };

        Tree.prototype.getHeight = function () {
            return this._height * this.scaleY;

        };

        return Tree
    });