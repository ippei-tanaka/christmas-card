define('Common$Elements', ['jquery'], function ($) {
    var $window = $(window),
        $body = $("body"),
        $canvas = $("#Canvas");

    return {
        $window: $window,
        $body: $body,
        $canvas: $canvas
    };
});