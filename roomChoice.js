const STAGE_WIDTH = 1000;
const STAGE_HEIGHT = 1000;

const app = new PIXI.Application({
    width: STAGE_WIDTH,
    height: STAGE_HEIGHT,
    backgroundColor:'#ffffff',
});
document.body.appendChild(app.view);

//make stage
// var stage = new PIXI.Stage(0x66FF99);
// var renderer = PIXI.autoDetectRenderer(STAGE_WIDTH, STAGE_HEIGHT);
// //add paint area to body
// document.body.appendChild(renderer.view);
// //call update by animation frame
// requestAnimFrame(update);

//どの部屋に入るか選ぼう！表示
const message = new PIXI.Text('どの部屋に入るかを選ぼう！');
message.x = STAGE_WIDTH/4+50;
message.y = STAGE_WIDTH/8;
app.stage.addChild(message);

//長方形を書く
const chouhoukei = new.PIXI.Graphics();


//responsive view?
// function update() {
//     requestAnimFrame(update);//need to call update eternally
//     renderer.render(stage);//render the stage
// }

// var $window = $(window);
// // XXX: debounce
// $window.resize(onResize);

// function onResize() {
//     var width;
//     var height;
//     var ratioWidth;
//     var ratioHeight;
//     var ratio;

//     width = $window.width();
//     height = $window.height();
//     ratioWidth = width / STAGE_WIDTH;
//     ratioHeight = height / STAGE_HEIGHT;
//     if (ratioWidth < ratioHeight) {
//         ratio = ratioWidth;
//     } else {
//         ratio = ratioHeight;
//     }
//     renderer.view.style.width = ~~(STAGE_WIDTH * ratio) + 'px';
//     renderer.view.style.height = ~~(STAGE_HEIGHT * ratio) + 'px';
// }
