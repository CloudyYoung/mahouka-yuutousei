
let width = window.screen.width;
let height = window.screen.height;

$("audio").each((each) => {
    each.volume = 20;
});

$.mouse = function (e) {
    let wr = e.clientX / width;
    let hr = e.clientY / height;

    let x = e.clientX;
    let y = e.clientY;

    $(".kv").css({ "--x": `${x}px`, "--y": `${y}px` });

    console.log(x, y);
};

$.mouse({ "clientX": 0, "clientY": 0 });
$(document).on('mousemove', $.mouse);
