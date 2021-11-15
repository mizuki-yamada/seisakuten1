const gas_url = "https://script.google.com/macros/s/AKfycbyk5ln210mfkSV2WfneMZqRg7EEUGKCTCuB93LpcE2n7UmQIvX8574xYjJuKccAtIHtuQ/exec"

window.onload = function(){
    //誕生日の選択肢
    birthDay = document.getElementById('birth_day');
    //月が決まったの動作
    birthMonth = document.getElementById('birth_month');
    birthMonth.onchange = changeMonth;
};

//月が決まった時の動作
function changeMonth(){
    var changedMonth = birthMonth.value;
    if(changedMonth=="2"){
        //2月が選択された時
        set_twentynine();
    }else if(changedMonth=="4" || changedMonth=="6" || changedMonth=="9" || changedMonth=="11"){
        //1ヶ月30日の月が選択された時
        set_thirty();
    }else{
        //それ以外
        set_thirtyone();
    }
}

function set_thirtyone(){
    birthDay.textContent = null;
    var thirty_one =[
        {cd:"",label:""},
        {cd:"1",label:"1"},
        {cd:"2",label:"2"},
        {cd:"3",label:"3"},
        {cd:"4",label:"4"},
        {cd:"5",label:"5"},
        {cd:"6",label:"6"},
        {cd:"7",label:"7"},
        {cd:"8",label:"8"},
        {cd:"9",label:"9"},
        {cd:"10",label:"10"},
        {cd:"11",label:"11"},
        {cd:"12",label:"12"},
        {cd:"13",label:"13"},
        {cd:"14",label:"14"},
        {cd:"15",label:"15"},
        {cd:"16",label:"16"},
        {cd:"17",label:"17"},
        {cd:"18",label:"18"},
        {cd:"19",label:"19"},
        {cd:"20",label:"20"},
        {cd:"21",label:"21"},
        {cd:"22",label:"22"},
        {cd:"23",label:"23"},
        {cd:"24",label:"24"},
        {cd:"25",label:"25"},
        {cd:"26",label:"26"},
        {cd:"27",label:"27"},
        {cd:"28",label:"28"},
        {cd:"29",label:"29"},
        {cd:"30",label:"30"},
        {cd:"31",label:"31"}
    ];
    thirty_one.forEach(function(value){
        var op = document.createElement("option");
        op.value = value.cd;
        op.text = value.label;
        birthDay.appendChild(op);
    });
}

function set_thirty(){
    birthDay.textContent = null;
    var thirty =[
        {cd:"",label:""},
        {cd:"1",label:"1"},
        {cd:"2",label:"2"},
        {cd:"3",label:"3"},
        {cd:"4",label:"4"},
        {cd:"5",label:"5"},
        {cd:"6",label:"6"},
        {cd:"7",label:"7"},
        {cd:"8",label:"8"},
        {cd:"9",label:"9"},
        {cd:"10",label:"10"},
        {cd:"11",label:"11"},
        {cd:"12",label:"12"},
        {cd:"13",label:"13"},
        {cd:"14",label:"14"},
        {cd:"15",label:"15"},
        {cd:"16",label:"16"},
        {cd:"17",label:"17"},
        {cd:"18",label:"18"},
        {cd:"19",label:"19"},
        {cd:"20",label:"20"},
        {cd:"21",label:"21"},
        {cd:"22",label:"22"},
        {cd:"23",label:"23"},
        {cd:"24",label:"24"},
        {cd:"25",label:"25"},
        {cd:"26",label:"26"},
        {cd:"27",label:"27"},
        {cd:"28",label:"28"},
        {cd:"29",label:"29"},
        {cd:"30",label:"30"}
    ];
    thirty.forEach(function(value){
        var op = document.createElement("option");
        op.value = value.cd;
        op.text = value.label;
        birthDay.appendChild(op);
    });
}
    function set_twentynine(){
        birthDay.textContent = null;
        var twentynine =[
            {cd:"",label:""},
            {cd:"1",label:"1"},
            {cd:"2",label:"2"},
            {cd:"3",label:"3"},
            {cd:"4",label:"4"},
            {cd:"5",label:"5"},
            {cd:"6",label:"6"},
            {cd:"7",label:"7"},
            {cd:"8",label:"8"},
            {cd:"9",label:"9"},
            {cd:"10",label:"10"},
            {cd:"11",label:"11"},
            {cd:"12",label:"12"},
            {cd:"13",label:"13"},
            {cd:"14",label:"14"},
            {cd:"15",label:"15"},
            {cd:"16",label:"16"},
            {cd:"17",label:"17"},
            {cd:"18",label:"18"},
            {cd:"19",label:"19"},
            {cd:"20",label:"20"},
            {cd:"21",label:"21"},
            {cd:"22",label:"22"},
            {cd:"23",label:"23"},
            {cd:"24",label:"24"},
            {cd:"25",label:"25"},
            {cd:"26",label:"26"},
            {cd:"27",label:"27"},
            {cd:"28",label:"28"},
            {cd:"29",label:"29"}
        ];
        twentynine.forEach(function(value){
            var op = document.createElement("option");
            op.value = value.cd;
            op.text = value.label;
            birthDay.appendChild(op);
        });  
}

//Enterキーを無効にする
document.getElementById("birthday").onkeypress = (e) => {
    // birthdayに入力されたキーを取得
    const key = e.keyCode || e.charCode || 0;
    // 13はEnterキーのキーコード
    if (key == 13) {
      // アクションを行わない
      e.preventDefault();
    }
  }

function OnPost(){
    var month = birthMonth.value.padStart(2, '0');
    var day = birthDay.value.padStart(2, '0');
    if (month == "00" || day ==  "00") return;
    var postTime = new Date().toString();
    let SendDATA = {
      "birthday" : month + "/" + day,
      "time" : postTime
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