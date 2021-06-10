
let width = window.screen.width;
let height = window.screen.height;


$("audio").each((index, each) => {
    each.volume = 0.02;
});

$.mouse = function (e) {
    let wr = e.clientX / width;
    let hr = e.clientY / height;

    let x = e.clientX;
    let y = e.clientY;

    $(".kv").css({ "--x": `${x}px`, "--y": `${y}px` });

    // console.log(x, y);
};

$.mouse({ "clientX": 0, "clientY": 0 });
$(document).on('mousemove', $.mouse);

setTimeout(function () {
    $(".vocal")[0].play();
}, 9000);


// KONVA

// Initialization - Stage
let stage = new Konva.Stage({
    container: $(".konva").get(0),
    width: width,
    height: height,
});

let kv_charas_layer = new Konva.Layer({ listening: false });
let kv_cads_layer = new Konva.Layer({ listening: false });
stage.add(kv_charas_layer, kv_cads_layer);


// Variables
let kv_real_width = 3555;
let kv_real_height = 2000;

let kv_chara_width = width * 1.015;
let kv_chara_height = kv_real_height * (kv_chara_width / kv_real_width);

let kv_chara_x = (width - kv_chara_width);
let kv_chara_y = (height - kv_chara_height);

let positions = {
    TOP_LEFT: { x: 0, y: 0 },
    TOP_CENTER: { x: (width - kv_chara_width) / 2, y: 0 },
    TOP_RIGHT: { x: width - kv_chara_width, y: 0 },
    CENTER_LEFT: { x: 0, y: (height - kv_chara_height) / 2 },
    CENTER_CENTER: { x: (width - kv_chara_width) / 2, y: (height - kv_chara_height) / 2 },
    CENTER_RIGHT: { x: width - kv_chara_width, y: (height - kv_chara_height) / 2 },
    BOTTOM_LEFT: { x: 0, y: height - kv_chara_height },
    BOTTOM_CENTER: { x: (width - kv_chara_width) / 2, y: height - kv_chara_height },
    BOTTOM_RIGHT: { x: width - kv_chara_width, y: height - kv_chara_height },
};

// kv_charas
let kvs = {
    // charas
    "shizuku": { position: positions.BOTTOM_LEFT, start: { x: kv_chara_width * -0.07, y: kv_chara_height * 0.08, rotate: 12, scale: 1.2, delay: 470 } },
    "honoka": { position: positions.TOP_RIGHT, start: { x: kv_chara_width * 0.1, y: kv_chara_height * -0.08, rotate: 20, scale: 1.24, delay: 200 } },
    "miyuki": { position: positions.BOTTOM_RIGHT, start: { x: kv_chara_width * -0.2, y: kv_chara_height * 0.08, rotate: 24, scale: 1.42, delay: 100 } },

    // cads
    "cad-1": { position: positions.CENTER_LEFT, start: { rotate: 16, scale: 1.2, delay: 450 } },
    "cad-2": { position: positions.CENTER_LEFT, start: { y: kv_chara_height * -0.28, scale: 1.2, delay: 400 } },
    "cad-3": { position: positions.TOP_CENTER, start: { y: kv_chara_width * -0.2, rotate: 28, scale: 1.4, delay: 350 } },
    "cad-4": { position: positions.TOP_CENTER, start: { rotate: 36, scale: 1.4, delay: 300 } },
    "cad-5": { position: positions.TOP_CENTER, start: { rotate: 24, scale: 1.6, delay: 250 } },
};


for (let [kv, attr] of Object.entries(kvs)) {
    console.log(kv);
    let kv_img = new Image();
    kv_img.src = `img/${kv}.png`;

    attr.konva = new Konva.Image({
        image: kv_img,
        width: kv_chara_width,
        height: kv_chara_height,
        opacity: attr.opacity || 0,
        x: attr.position.x + (attr.start.x || 0),
        y: attr.position.y + (attr.start.y || 0),
        scaleX: attr.start.scale || 1,
        scaleY: attr.start.scale || 1,
        rotation: attr.start.rotate || 0,
    });
    kv_charas_layer.add(attr.konva);

    attr.tween = new Konva.Tween({
        node: attr.konva,
        duration: 3,
        opacity: 1,
        x: attr.position.x,
        y: attr.position.y,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        easing: Konva.Easings.StrongEaseOut,
    });
    setTimeout(() => attr.tween.play(), 1000 + (attr.start.delay || 0));
}

setTimeout(() => stage.batchDraw(), 500);
