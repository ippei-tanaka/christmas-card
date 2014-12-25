define('Music', ['underscore', 'jquery', 'createjs'], function (_, $, createjs) {

    var music = '',
        volume = 0.15,
        instance;

    return {
        load: function (name) {
            var deferred = $.Deferred();

            music = '';

            createjs.Sound.on("fileload", function () {
                music = name;
                deferred.resolve();
            }, this);

            createjs.Sound.registerSound("mp3/" + name + ".mp3", "bgm");

            return deferred.promise();
        },

        play: function () {
            if (music) {
                instance = createjs.Sound.play("bgm");
                instance.volume = volume;
            }
        },

        setDefaultVolume: function () {
            this.setVolume(0.15);
        },

        setVolume: function (vol) {
            volume = vol;
            if (instance) {
                instance.volume = vol;
            }
        },

        getVolume: function () {
            return volume;
        }
    }
});