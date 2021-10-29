let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}

const gas_url = "https://script.google.com/macros/s/AKfycbyshKrWP1zYv4Vu2ouaTX6ejAr3dxsalXxOO1CkQ8b5QtdCD2GZXCR8Ggd291Kr7Se4_w/exec"

// URLから誕生日を取得
const url = new URL(window.location.href);
const params = url.searchParams;
const birthday = params.get('bd');
const N = Number(params.get('num'));
document.getElementById('num').innerHTML = N.toString();
document.getElementById('prob_unique').innerHTML = prob_unique(N).toPrecision([5]);
document.getElementById('prob').innerHTML = (1.0-prob_unique(N)).toPrecision([5]);

let birthdays = new Array(N);
let clicked_birthday = new Array();
let birthday_to_color = {};

const width = document.body.clientWidth;
const person_size = width/10;
const height = (N / 10 + 1) * person_size;

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

const textBlack = new PIXI.TextStyle( { fill: 0x000000, stroke: 0xffffff, fontSize: person_size/5 } );
const textWhite = new PIXI.TextStyle( { fill: 0xffffff } );

const people = []; // array of person container
for (var i = 0; i < N; i++) {
    const container = new PIXI.Container();
    container.x = width / 10 *  ( i%10 );
    container.y = Math.floor(i/10) * person_size;
    // var image = PIXI.Texture.from("/seisakuten1/images/person.png"); // for github pages
    var image = PIXI.Texture.from("../images/person.png"); // for local
    var person = new PIXI.Sprite(image);
    person.width = person_size;
    person.height = person_size;
    person.tint = 0xDDDDDD;

    person.interactive = true;
    person.buttonMode = true;

    person.on('pointertap', clicked);

    container.addChild(person);
    app.stage.addChild(container);
    people.push(container);

    if (i == N-1) {
        birthdays[i] = birthday;
        const rect = new PIXI.Graphics()
        .beginFill(0xDDDDDD, 0.5)
        .drawRect(0, 0, person_size, person_size)
        .endFill();
        container.addChild(rect);
        update(i);
    }
    else {
        birthdays[i] = getRandomYmd('1920/01/01', '2020/01/01');
    }
}

async function check_all() {
    for (var i = 0; i < people.length; i++) {
        var timer = new Promise(function(resolve, reject) {
            setTimeout(function() {
                resolve();
            }, 10);
        });
        await timer;
        update(i);
    }
};

function clicked(e) {
    update(people.indexOf(e.target.parent));
}

function update(index) {
    var target_birthday = birthdays[index];
    if (people[index].children.length > 1) {
        people[index].removeChild(1, people[index].children.length-1);
        clicked_birthday.splice(clicked_birthday.findIndex((elem) => elem == target_birthday), 1);
    }
    const text = new PIXI.Text(target_birthday, textBlack);
    if (clicked_birthday.findIndex((elem) => elem == target_birthday) != -1) {
        var person_color = birthday_to_color[target_birthday];
        if (person_color == undefined) {
            person_color = Math.random() * 0xFFFFFF;
            birthday_to_color[target_birthday] = person_color;
        }
        people[index].children[0].tint = person_color;
        const same_indices = birthdays.flatMap((e, i) => (e == target_birthday ? i : []));
        same_indices.forEach((i) => {
            people[i].children[0].tint = person_color;}
        );
    }
    
    text.position.set(person_size*0.25, person_size*0.7);
    people[index].addChild(text);
    clicked_birthday.push(target_birthday);
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

function prob_unique(n) {
    if (n > 365) {
        return 0;
    }
    var ans = 1.0;
    for(var i = 364; i > 365-N; i--) {
        ans *= i / 365;
    }
    return ans;
}

function OnPost(){
    let SendDATA = {
      "birthday" : birthday
    };
    let postparam = {
      "method" : "POST",
      "mode" : "no-cors",
      "Content-Type" : "application/x-www-form-urlencoded",
      "body" : JSON.stringify(SendDATA)
    };
    fetch(gas_url, postparam);
    console.log(postparam);
}

function OnGet(){
    fetch(gas_url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data)
        render_text = data.message;
        console.log(render_text);
        document.getElementById("gas_get").innerHTML = render_text;
    })
    .catch(error => {
        console.log(error)
        document.getElementById("gas_get").innerHTML = error;
    }); 
}