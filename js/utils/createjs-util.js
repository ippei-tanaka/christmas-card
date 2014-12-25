define('CreateJsUtil', ['underscore', 'createjs'], function (_, createjs) {
    return {
        getRandomPoint: function (parent, child) {
            var x, y, pt;
            do {
                x = Math.random() * parent.getWidth();
                y = Math.random() * parent.getHeight();
                pt = parent.localToLocal(x, y, child);
            } while (!child.hitTest(pt.x, pt.y));

            return new createjs.Point(x, y);
        }
    }
});