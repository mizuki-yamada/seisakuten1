let type = "WebGL";
if (!PIXI.utils.isWebGLSupported()) {
    type = "canvas";
}

const gas_url = "https://script.google.com/macros/s/AKfycbyshKrWP1zYv4Vu2ouaTX6ejAr3dxsalXxOO1CkQ8b5QtdCD2GZXCR8Ggd291Kr7Se4_w/exec"

// URLから誕生日を取得
const url = new URL(window.location.href);
const params = url.searchParams;
const birthday = params.get('bd');
let N;
const row_n = 10;
let birthdays;
let clicked_index = new Set();
let clicked_birthday = new Array();
let birthday_to_color = {};

const width = document.body.clientWidth;
const person_width = width/row_n;
const person_height = person_width * 1.2;
let height;

let textWhite;
let people = []; // array of person container

const wait = (async()=> {
    if (params.get('num') == 'secret') {
        // await OnPost();
        birthdays = await OnGet();
        console.log(birthdays);
        N = birthdays.length;
    }
    else {
        N = Number(params.get('num'));
        birthdays = new Array(N)
        for (var i = 0; i < N; i++) {
            if (i == N-1) {
                birthdays[i] = birthday;
            }
            else {
                birthdays[i] = getRandomYmd('1920/01/01', '2020/01/01');
            }
        }
    }
    
    height = (Math.floor((N-1) / row_n) + 1) * person_height;
   //  height = ((N-1) / row_n + 1) * person_height;

    //Create a Pixi Application
    const app = new PIXI.Application({ 
        width: width,         // default: 800
        height: height,        // default: 600
        antialias: true,    // default: false
        transparent: false, // default: false
        resolution: 1,       // default: 1
        backgroundColor: 0xC9AD7D,
    });

    //Add the canvas that Pixi automatically created for you to the HTML document
    let el = document.getElementById('app');
    el.appendChild(app.view);

    app.renderer.plugins.interaction.autoPreventDefault = false;
    app.renderer.view.style.touchAction = 'auto';

    textWhite = new PIXI.TextStyle( { fill: 0xffffff, stroke: 0xffffff, fontSize: person_width/5 } );

    for (var i = 0; i < N; i++) {
        const container = new PIXI.Container();
        container.x = width / row_n *  ( i%row_n );
        container.y = Math.floor(i/row_n) * person_height;
        // var image_path = "../images/person" + String(1 + Math.floor(Math.random()*3)) + ".png";// for local
        var image_path = "/seisakuten1/images/person" + String(1 + Math.floor(Math.random()*3)) + ".png";// for github pages
        var image = PIXI.Texture.from(image_path); 
        var person = new PIXI.Sprite(image);
        person.width = person_width;
        person.height = person_height;

        person.interactive = true;
        person.buttonMode = true;

        person.on('pointertap', clicked);

        container.addChild(person);
        app.stage.addChild(container);
        people.push(container);
        if (i == N-1) {
            const you = new PIXI.Text("YOU", new PIXI.TextStyle( { fill: 0xffffff, stroke: 0xffffff, fontSize: person_width/6 } ));
            you.position.set(person_width*0.32, person_height * 0.4);
            container.addChild(you);
            update(i);
        }
    }    
})();

async function check_all() {
    for (var i = 0; i < people.length-1; i++) {
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
    clicked_index.add(index);
    var target_birthday = birthdays[index];
    // すでに押されている要素
    if (people[index].children.length > 1) {
        people[index].removeChild(1, people[index].children.length-1);
        clicked_birthday.splice(clicked_birthday.findIndex((elem) => elem == target_birthday), 1);
    }
    // クリックした中に同じ誕生日が存在する
    if (clicked_birthday.findIndex((elem) => elem == target_birthday) != -1) {
        var person_color = birthday_to_color[target_birthday];
        if (person_color == undefined) { // 初めてのペア
            person_color = Math.random() * 0xFFFFFF;
            birthday_to_color[target_birthday] = person_color;
        }
       
        const same_indices = birthdays.flatMap((e, i) => (e == target_birthday ? i : []));
        same_indices.forEach((i) => {
            const ellipse = new PIXI.Graphics()
                .lineStyle(3,person_color)
                .drawEllipse(person_width*0.5, person_height*0.8, person_width*0.3, person_height*0.15);
            people[i].addChild(ellipse);
            }
        );
    }

    const text = new PIXI.Text(target_birthday, textWhite);
    text.position.set(person_width*0.25, person_height*0.7);
    people[index].addChild(text);

    clicked_birthday.push(target_birthday);
    if (clicked_index.size == N) {
        document.getElementById('message').innerHTML = getProbMessage();
    }
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

function getProbMessage() {
    var message = 
    N + "人の教室の中に" + 
    "少なくとも1組同じ誕生日がいる確率は" + (100-100*prob_unique(N)).toPrecision([3]) + "%です．";
    return message
}

async function OnPost(){
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

async function OnGet(){
    return fetch(gas_url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        render_text = data.message;
        return render_text;
    })
    .catch(error => {
        console.log(error);
    });
}