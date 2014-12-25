define('ImageLoader', ['underscore', 'jquery', 'createjs'], function (_, $, createjs) {

    var queue = new createjs.LoadQueue(true),
        files = [
            {
                id: 'paper-pattern',
                src: './img/paper-pattern.jpg'
            },
            {
                id: 'stem-image',
                src: './img/stem.png',
                type: createjs.LoadQueue.IMAGE
            },
            {
                id: 'leafs-image',
                src: './img/leafs.png',
                type: createjs.LoadQueue.IMAGE
            },
            {
                id: 'star-image',
                src: './img/star.png',
                type: createjs.LoadQueue.IMAGE
            }
        ];

    return {
        load: function () {
            var deferred = $.Deferred();

            queue.on("complete", function () {
                deferred.resolve();
            }, this);

            queue.on("error ", function () {
                deferred.reject();
            }, this);

            queue.loadManifest(files);

            return deferred.promise();
        },

        getImage: function (id) {
            return queue.getResult(id);
        }
    }
});