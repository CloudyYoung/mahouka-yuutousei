
window.wallpaperPropertyListener = {
    applyUserProperties: function (properties) {

        // Performance
        if (properties._10th_anniversary_logo) {
            if (properties._10th_anniversary_logo.value) {
                $(".logo10-wrapper").show();
            } else {
                $(".logo10-wrapper").hide();
            }
        }
    }
}