define('UrlUtil', ['underscore', 'createjs'], function (_, createjs) {
    return {
        getUrlVars: function (name) {
            var vars = {};
            var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                vars[key] = value;
            });
            return vars[name] ? decodeURIComponent(vars[name]) : undefined;
        }
    }
});