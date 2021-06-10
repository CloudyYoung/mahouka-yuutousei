
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

let kv_chara_width = width * 1.01;
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
    // cads
    "cad-1": { position: positions.CENTER_LEFT, start: { y: kv_chara_height * -0.35, rotate: 12, scale: 1.4, delay: 450 } },
    "cad-2": { position: positions.CENTER_LEFT, start: { y: kv_chara_height * -0.3, scale: 1.4, delay: 400 } },
    "cad-3": { position: positions.TOP_CENTER, start: { x: kv_chara_width * 0.02, y: kv_chara_height * -0.3, rotate: 18, scale: 1.4, delay: 350 } },
    "cad-4": { position: positions.TOP_CENTER, start: { rotate: 7, scale: 1.4, delay: 300 } },
    "cad-5": { position: positions.TOP_CENTER, start: { rotate: 2, scale: 1.6, delay: 250 } },

    // charas
    "shizuku": { position: positions.BOTTOM_LEFT, start: { x: kv_chara_width * -0.1, y: kv_chara_height * -0.06, rotate: 12, scale: 1.2, delay: 470 } },
    "honoka": { position: positions.TOP_RIGHT, start: { x: kv_chara_width * -0.1, y: kv_chara_height * -0.2, rotate: 20, scale: 1.32, delay: 200 } },
    "miyuki": { position: positions.BOTTOM_RIGHT, start: { x: kv_chara_width * -0.34, y: kv_chara_height * -0.5, rotate: 24, scale: 1.62, delay: 100 } },
};


for (let [kv, attr] of Object.entries(kvs)) {
    console.log(kv);

    let kv_img = new Image();
    kv_img.src = `img/${kv}.png`;
    kv_img.onload = function () {
        attr.loaded = true;
    }

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
        duration: 18,
        x: attr.position.x,
        y: attr.position.y,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        easing: mahouka_bezier,
    });

    attr.tween_opacity = new Konva.Tween({
        node: attr.konva,
        duration: 0.4,
        opacity: 1,
        easing: Konva.Easings.EaseInOut,
    });
}

let all_loaded_detection = setInterval(() => {
    let all_loaded = true;
    for (let [kv, attr] of Object.entries(kvs)) {
        if (!attr.loaded) {
            all_loaded = false;
            break;
        }
    }

    if (all_loaded) {
        console.warn("kvs all loaded");
        clearInterval(all_loaded_detection);
        start();
    }
}, 100);

setTimeout(() => stage.batchDraw(), 500);


function mahouka_bezier(t, b, c, d) {
    let a = bezier(0.01, 0.9, 0, 0.79);
    return b + a(t / d) / c;
}


function start() {
    // kvs start animation
    for (let [kv, attr] of Object.entries(kvs)) {
        setTimeout(() => attr.tween.play(), 2000 + (attr.start.delay || 0));
        setTimeout(() => attr.tween_opacity.play(), 2000 + (attr.start.delay || 0));
    }

    // Logo
    setTimeout(() => $(".logo").addClass("animated fadeIn"), 3200);

    // Glow
    setTimeout(() => $(".glow").addClass("animated fadeInGlow"), 1200);
}