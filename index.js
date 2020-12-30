
for (let t = 0; t < 200; t++) {
    $(".snow").append(`<div class="snow-each"></div>`)
}

// Clear all delays
setTimeout(function () {
    $(".animated").each((index, each) => {
        for (t = 0; t <= 7; t++) {
            $(each).removeClass(`delay-${t}`);
        }
    });
}, 7000);

