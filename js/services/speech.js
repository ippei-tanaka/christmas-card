define('Speech', ['underscore', 'jquery'], function (_, $) {

    var volume = 1.0,
        utterance;

    return {
        speak: function (text) {
            var SpeechSynthesis = window.getSpeechSynthesis(),
                SpeechSynthesisUtterance = window.getSpeechSynthesisUtterance(),
                deferred = $.Deferred();

            utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.volume = volume;
            utterance.rate = 1.0;
            utterance.onend = function () {
                deferred.resolve();
            };

            SpeechSynthesis.speak(utterance);

            return deferred.promise();
        },

        setZeroVolume: function () {
            this.setVolume(0);
        },

        setDefaultVolume: function () {
            this.setVolume(1.0);
        },

        setVolume: function (vol) {
            volume = vol;
            if (utterance) {
                utterance.volume = vol;
            }
        },

        getVolume: function () {
            return volume;
        }
    }
});