requirejs.config({
    paths: {
        'jquery': '//code.jquery.com/jquery-2.1.1.min',
        'underscore': '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.7.0/underscore-min',
        'createjs': '//code.createjs.com/easeljs-0.8.0.min',
        'tweenjs': '//code.createjs.com/tweenjs-0.6.0.min',
        'preloadjs': '//code.createjs.com/preloadjs-0.6.0.min',
        'soundjs': '//code.createjs.com/soundjs-0.6.0.min',
        'easy-chain': './js/lib/easy-chain.min'
    },
    shim: {
        'easy-chain': {
            exports: 'EasyChain'
        },
        'createjs': {
            deps: ['preloadjs', 'tweenjs', 'soundjs'],
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
                        new Controller();
                    });
            });
        });
    });