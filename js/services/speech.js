define('Speech', ['underscore', 'jquery'], function (_, $) {

    var volume = 1.0,
        utterance;

    return {
        speak: function (text) {
            var fallbackSpeechSynthesis = window.getSpeechSynthesis(),
                fallbackSpeechSynthesisUtterance = window.getSpeechSynthesisUtterance(),
                deferred = $.Deferred();

            utterance = new fallbackSpeechSynthesisUtterance(text);

            utterance.lang = 'en-US';
            utterance.volume = volume;
            utterance.rate = 1.0;
            utterance.onend = function () {
                deferred.resolve();
            };
            fallbackSpeechSynthesis.speak(utterance);

            return deferred.promise();
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