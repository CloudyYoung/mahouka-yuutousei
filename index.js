
let width = window.screen.width;
let height = window.screen.height;
let global_move_rate = 0.026;


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

let kvs_layer = new Konva.Layer({ listening: false });
stage.add(kvs_layer);


// Variables
let kv_real_width = 3555;
let kv_real_height = 2000;

let kv_chara_width = width * (1.01 + global_move_rate);
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
    "miyuki": {
        origin: { width: 1877, height: 1792, x: 1746, y: 309, position: positions.BOTTOM_RIGHT, zIndex: 7 },
        start: { x: kv_chara_width * -0.12, y: kv_chara_height * 0.2, rotate: 24, scale: 1.42, delay: 100 },
        move: { x: 1.4, y: 1.8 },
    },
    "honoka": {
        origin: { width: 1193, height: 1120, x: 2124, y: 2, position: positions.TOP_RIGHT, zIndex: 6 },
        start: { x: kv_chara_width * 0.04, y: kv_chara_height * 0.14, rotate: 14, scale: 1.24, delay: 200 },
        move: { x: 1.8, y: 2.4 },
    },
    "shizuku": {
        origin: { width: 1685, height: 1443, x: -47, y: 980, position: positions.BOTTOM_LEFT, zIndex: 5 },
        start: { x: kv_chara_width * -0.02, y: kv_chara_height * -0.01, rotate: 14, scale: 1.2, delay: 500 },
        move: { x: 1.2, y: 1.2 },
    },

    // cads
    "cad-1": {
        origin: { width: 156, height: 391, x: 171, y: 683, position: positions.CENTER_LEFT, zIndex: 4 },
        start: { x: kv_chara_width * 0.1, y: kv_chara_height * -0.1, rotate: 8, scale: 1.3, delay: 450 },
        move: { x: 0.8, y: 1.8 },
    },
    "cad-2": {
        origin: { width: 434, height: 400, x: 0, y: 108, position: positions.CENTER_LEFT, zIndex: 3 },
        start: { x: kv_chara_width * 0.06, y: kv_chara_height * 0.02, rotate: 12, scale: 1.3, delay: 400 },
        move: { x: 1, y: 1.3 },
    },
    "cad-3": {
        origin: { width: 732, height: 553, x: 616, y: 0, position: positions.TOP_CENTER, zIndex: 2 },
        start: { x: kv_chara_width * 0.1, y: kv_chara_height * 0.08, rotate: 20, scale: 1.44, delay: 350 },
        move: { x: 1.4, y: 1 },
    },
    "cad-4": {
        origin: { width: 288, height: 197, x: 1466, y: 318, position: positions.TOP_CENTER, zIndex: 1 },
        start: { x: kv_chara_width * 0.16, y: kv_chara_height * 0.1, rotate: 8, scale: 1.4, delay: 300 },
        move: { x: 1.85, y: 1.4 },
    },
    "cad-5": {
        origin: { width: 234, height: 239, x: 1825, y: 22, position: positions.TOP_CENTER, zIndex: 0 },
        start: { x: kv_chara_width * 0.08, y: kv_chara_height * 0.2, rotate: 5, scale: 1.6, delay: 250 },
        move: { x: 1.65, y: 1.2 },
    },
};


for (let [kv, attr] of Object.entries(kvs)) {
    let kv_img = new Image();
    kv_img.src = `img/${kv}.png`;
    kv_img.onload = function () {
        attr.loaded = true;
    }

    attr.offset = {
        x: kv_chara_width / 2,
        y: kv_chara_height / 2,
    }

    attr.position = {
        x: attr.origin.position.x + attr.offset.x,
        y: attr.origin.position.y + attr.offset.y,
    };

    attr.kv_position = {
        x: kv_chara_width * (attr.origin.x / kv_real_width),
        y: kv_chara_height * (attr.origin.y / kv_real_height),
    };

    attr.kv_size = {
        width: kv_chara_width * (attr.origin.width / kv_real_width),
        height: kv_chara_height * (attr.origin.height / kv_real_height),
    };

    // Bottom and Right edges
    let global_move_width = width * global_move_rate * attr.move.x;
    let global_move_height = height * global_move_rate * attr.move.y;
    if (kv == "miyuki") {
        attr.kv_position.x += global_move_width;
        attr.kv_position.y += global_move_height;
    } else if (kv == "honoka") {
        attr.kv_position.x += global_move_width;
    } else if (kv == "shizuku") {
        attr.kv_position.y += global_move_height;
    } else if (kv == "cad-1" || kv == "cad-4" || kv == "cad-5") {
        attr.kv_position.x += global_move_width / 2;
        attr.kv_position.y += global_move_height / 2;
    } else if (kv == "cad-2") {
        attr.kv_position.y += global_move_height / 2;
    } else if (kv == "cad-3") {
        attr.kv_position.x += global_move_width / 2;
    }

    // Wrapper group, size as original big kv 3555 x 2000
    // Apply start animation
    attr.konva_group = new Konva.Group({
        width: kv_chara_width,
        height: kv_chara_height,
        x: attr.position.x + (attr.start.x || 0),
        y: attr.position.y + (attr.start.y || 0),
        scaleX: attr.start.scale || 1,
        scaleY: attr.start.scale || 1,
        rotation: attr.start.rotate || 0,
        offsetX: attr.offset.x,
        offsetY: attr.offset.y,
        opacity: attr.opacity || 0,
    });

    // Movement group for kv offset & tween "smooth movement"
    attr.konva_move = new Konva.Group();

    // Actual kv, size as it is
    // Apply mouse movement offset
    attr.konva_kv = new Konva.Image({
        image: kv_img,
        width: attr.kv_size.width,
        height: attr.kv_size.height,
        x: attr.kv_position.x,
        y: attr.kv_position.y,
    });

    // Add to layers: Group -> Movement Group -> Image kv
    kvs_layer.add(attr.konva_group);
    attr.konva_group.add(attr.konva_move);
    attr.konva_move.add(attr.konva_kv);

    attr.tween_start = new Konva.Tween({
        node: attr.konva_group,
        duration: 20,
        x: attr.position.x,
        y: attr.position.y,
        scaleX: 1,
        scaleY: 1,
        rotation: 0,
        easing: mahouka_bezier,
    });

    attr.tween_opacity = new Konva.Tween({
        node: attr.konva_group,
        duration: 0.4,
        opacity: 1,
        easing: Konva.Easings.EaseInOut,
    });
}

// zIndex
for (let [kv, attr] of Object.entries(kvs)) {
    attr.konva_group.zIndex(attr.origin.zIndex || 0);
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
        setTimeout(() => attr.tween_start.play(), 3000 + (attr.start.delay || 0));
        setTimeout(() => attr.tween_opacity.play(), 3050 + (attr.start.delay || 0));
    }

    // Logo
    setTimeout(() => $(".logo").addClass("animated fadeIn"), 4200);
    setTimeout(() => $(".logo10").addClass("animated fadeIn"), 4200);

    // Glow
    setTimeout(() => $(".glow").addClass("animated fadeInGlow"), 2200);
}



$.mouse = function (e) {
    let x = e.clientX * global_move_rate;
    let y = e.clientY * global_move_rate;

    $(".kv").css({ "--x": `${x}px`, "--y": `${y}px` });

    for (let [kv, attr] of Object.entries(kvs)) {
        let total_x = x * attr.move.x;
        let total_y = y * attr.move.y;

        attr.konva_kv.offsetX(total_x * 0.55);
        attr.konva_kv.offsetY(total_y * 0.55);

        attr.tween_move = new Konva.Tween({
            node: attr.konva_move,
            duration: 10,
            offsetX: total_x * 0.45,
            offsetY: total_y * 0.45,
            easing: mahouka_bezier,
        });
        attr.tween_move.play();
    }
    stage.batchDraw();
};

$.mouse({ "clientX": width / 2, "clientY": height / 2 });
$(document).on('mousemove', $.mouse);