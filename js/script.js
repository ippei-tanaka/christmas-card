requirejs.config({
    paths: {
        'jquery': '//code.jquery.com/jquery-2.1.1.min',
        'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min',
        'createjs': '//code.createjs.com/easeljs-0.8.0.min',
        'preloadjs': '//code.createjs.com/preloadjs-0.6.0.min'
    },
    shim: {
        'createjs': {
            deps: ['preloadjs'],
            exports: 'createjs'
        }
    }
});

require(['jquery', 'ImageLoader'],
    function ($, ImageLoader) {
        $(function () {
            ImageLoader.load().done(function () {
                require(['Controller'],
                    function (Controller) {
                        new Controller().start();
                    });
            });
        });
    });