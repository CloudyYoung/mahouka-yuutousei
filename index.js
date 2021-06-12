
let width = window.screen.width;
let height = window.screen.height;


$("audio").each((index, each) => {
    each.volume = 0.02;
});



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
    TOP_LEFT: (w, h) => { return { x: 0 + w, y: 0 + h } },
    TOP_CENTER: (w, h) => { return { x: (width - kv_chara_width) / 2 + w, y: 0 + h } },
    TOP_RIGHT: (w, h) => { return { x: width - kv_chara_width + w, y: 0 + h } },
    CENTER_LEFT: (w, h) => { return { x: 0 + w, y: (height - kv_chara_height) / 2 + h } },
    CENTER_CENTER: (w, h) => { return { x: (width - kv_chara_width) / 2 + w, y: (height - kv_chara_height) / 2 + h } },
    CENTER_RIGHT: (w, h) => { return { x: width - kv_chara_width + w, y: (height - kv_chara_height) / 2 + h } },
    BOTTOM_LEFT: (w, h) => { return { x: 0 + w, y: height - kv_chara_height + h } },
    BOTTOM_CENTER: (w, h) => { return { x: (width - kv_chara_width) / 2 + w, y: height - kv_chara_height + h } },
    BOTTOM_RIGHT: (w, h) => { return { x: width - kv_chara_width + w, y: height - kv_chara_height + h } },
};

// kv_charas
let kvs = {
    // cads
    "cad-1": { origin: { width: 156, height: 391, x: 171, y: 683, position: positions.CENTER_LEFT }, start: { y: -0.35, rotate: 18, scale: 1.3, delay: 450 } },
    "cad-2": { origin: { width: 434, height: 400, x: 0, y: 108, position: positions.CENTER_LEFT }, start: { y: -0.3, rotate: 1, scale: 1.5, delay: 400 } },
    "cad-3": { origin: { width: 732, height: 553, x: 616, y: 0, position: positions.TOP_CENTER }, start: { x: 0.02, y: -0.3, rotate: 20, scale: 1.44, delay: 350 } },
    "cad-4": { origin: { width: 288, height: 197, x: 1466, y: 318, position: positions.TOP_CENTER }, start: { rotate: 8, scale: 1.4, delay: 300 } },
    "cad-5": { origin: { width: 234, height: 239, x: 1825, y: 22, position: positions.TOP_CENTER }, start: { rotate: 5, scale: 1.4, delay: 250 } },

    // charas
    "shizuku": { origin: { width: 1638, height: 1020, x: 0, y: 980, position: positions.BOTTOM_LEFT }, start: { x: -0.16, y: -0.24, rotate: 14, scale: 1.4, delay: 470 } },
    "honoka": { origin: { width: 1193, height: 1120, x: 2124, y: 2, position: positions.TOP_RIGHT }, start: { x: 0.1, y: 0.2, rotate: 14, scale: 1.4, delay: 200 } },
    "miyuki": { origin: { width: 1809, height: 1691, x: 1746, y: 309, position: positions.BOTTOM_RIGHT }, start: { x: -0.02, y: 0.08, rotate: 30, scale: 1.46, delay: 100 } },
};


for (let [kv, attr] of Object.entries(kvs)) {
    let kv_img = new Image();
    kv_img.src = `img/${kv}.png`;
    kv_img.onload = function () {
        attr.loaded = true;
    }

    attr.size = {
        width: kv_chara_width * (attr.origin.width / kv_real_width),
        height: kv_chara_height * (attr.origin.height / kv_real_height)
    };

    let calculated_origin_x = kv_chara_width * (attr.origin.x / kv_real_width);
    let calculated_origin_y = kv_chara_height * (attr.origin.y / kv_real_height);
    attr.position = attr.origin.position(calculated_origin_x, calculated_origin_y);

    console.log(kv, attr.position.x, attr.position.y, attr.position.x + (attr.start.x || 0), attr.position.y + (attr.start.y || 0));

    attr.konva = new Konva.Image({
        image: kv_img,
        width: attr.size.width || kv_chara_width,
        height: attr.size.height || kv_chara_height,
        opacity: attr.opacity || 0,
        x: attr.position.x * (1 + attr.start.x || 1),
        y: attr.position.y * (1 + attr.start.y || 1),
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
        setTimeout(() => attr.tween.play(), 3000 + (attr.start.delay || 0));
        setTimeout(() => attr.tween_opacity.play(), 3050 + (attr.start.delay || 0));
    }

    // Logo
    setTimeout(() => $(".logo").addClass("animated fadeIn"), 4200);

    // Glow
    setTimeout(() => $(".glow").addClass("animated fadeInGlow"), 2200);
}



$.mouse = function (e) {
    let wr = e.clientX / width;
    let hr = e.clientY / height;

    let x = e.clientX;
    let y = e.clientY;

    // $(".kv").css({ "--x": `${x}px`, "--y": `${y}px` });
    // kvs["miyuki"].konva.offset({ x: x, y: y });
    // stage.batchDraw();


    // console.log(x, y);
};

$.mouse({ "clientX": 0, "clientY": 0 });
$(document).on('mousemove', $.mouse);