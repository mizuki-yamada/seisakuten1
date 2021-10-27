let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}

const width = document.body.clientWidth;
const height = window.innerHeight;

const birthday = new Date("1998/01/01");

let birthday_map = {};
let N = 30;
let clicked_birthday = new Array();
let birthday_to_color = {};

//Create a Pixi Application
const app = new PIXI.Application({ 
    width: width,         // default: 800
    height: height,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1,       // default: 1
    backgroundColor: 0xffffff,
});

//Add the canvas that Pixi automatically created for you to the HTML document
let el = document.getElementById('app');
el.appendChild(app.view);

app.renderer.plugins.interaction.autoPreventDefault = false;
app.renderer.view.style.touchAction = 'auto';

const textBlack = new PIXI.TextStyle( { fill: 0x000000, stroke: 0xffffff } );
const textWhite = new PIXI.TextStyle( { fill: 0xffffff } );

const people = []; // array of person container
for (var i = 0; i < N; i++) {
    const container = new PIXI.Container();
    container.x = width / 8 *  ( i%8 );
    container.y = height / 4 * Math.floor(i/8);
    var image = PIXI.Texture.from("../images/person.png");
    var person = new PIXI.Sprite(image);
    person.width = 100;
    person.height = 100;
    person.tint = 0xDDDDDD;

    // const person = new PIXI.Graphics()
    // .beginFill(0xCD853F)
    // .drawRect(50, 0, 100, 50)
    // .endFill();

    person.interactive = true;
    person.buttonMode = true;

    person.on('pointertap', clicked);

    container.addChild(person);
    app.stage.addChild(container);
    people.push(container);

    if (i == 0) {
        var m = ("00" + (birthday.getMonth()+1)).slice(-2);
        var d = ("00" + birthday.getDate()).slice(-2);
        birthday_map[i] = m + "/" + d;
    }
    else {
        birthday_map[i] = getRandomYmd('1920/01/01', '2020/01/01');
    }
}

async function check_all() {
    for (var i = 0; i < people.length; i++) {
        var timer = new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, 100);
        });
        await timer;
        update(i);
    }
};

function clicked(e) {
    update(people.indexOf(e.target.parent));
}

function update(index) {
    if (people[index].children.length > 1) {
        people[index].removeChild(1, people[index].children.length-1);
        clicked_birthday.splice(clicked_birthday.findIndex((elem) => elem == birthday_map[index]), 1);
    }
    same_index = clicked_birthday.findIndex((elem) => elem == birthday_map[index]);
    const text = new PIXI.Text(birthday_map[index], textBlack);
    if (same_index != -1) {
        // people[same_index].children[1].style = textBlack;
        // text.style = textBlack;
        var person_color = Math.random() * 0xFFFFFF;
        people[index].children[0].tint = person_color;
        people[same_index].children[0].tint = person_color;
    }
    
    text.position.set(20, 60 );
    people[index].addChild(text);
    clicked_birthday.push(birthday_map[index]);
}


function getRandomYmd(fromYmd, toYmd){
    var d1 = new Date(fromYmd);
    var d2 = new Date(toYmd);

    var c = (d2 - d1) / 86400000;
    var x = Math.floor(Math.random() * (c+1));

    d1.setDate(d1.getDate() + x);

    var m = ("00" + (d1.getMonth()+1)).slice(-2);
    var d = ("00" + d1.getDate()).slice(-2);

    return m + "/" + d;
}

function showProb(n) {
    if (n > 365) {
        return 1;
    }
    var ans = 1.0;
    for(var i = n; n > 0; n--) {
        ans *= (i-1) / i;
    }
    return 1.0 - ans;
}