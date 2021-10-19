window.onload = function(){
    //誕生日の選択肢
    birthDay = document.getElementById('birth_day');
    //月が決まったの動作
    birthMonth = document.getElementById('birth_month');
    birthMonth.onchange = changeMonth;
    print();
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
        {cd:"0",label:"1"},
        {cd:"1",label:"2"},
        {cd:"2",label:"3"},
        {cd:"3",label:"4"},
        {cd:"4",label:"5"},
        {cd:"5",label:"6"},
        {cd:"6",label:"7"},
        {cd:"7",label:"8"},
        {cd:"8",label:"9"},
        {cd:"9",label:"10"},
        {cd:"10",label:"11"},
        {cd:"11",label:"12"},
        {cd:"12",label:"13"},
        {cd:"13",label:"14"},
        {cd:"14",label:"15"},
        {cd:"15",label:"16"},
        {cd:"16",label:"17"},
        {cd:"17",label:"18"},
        {cd:"18",label:"19"},
        {cd:"19",label:"20"},
        {cd:"20",label:"21"},
        {cd:"21",label:"22"},
        {cd:"22",label:"23"},
        {cd:"23",label:"24"},
        {cd:"24",label:"25"},
        {cd:"25",label:"26"},
        {cd:"26",label:"27"},
        {cd:"27",label:"28"},
        {cd:"28",label:"29"},
        {cd:"29",label:"30"},
        {cd:"30",label:"31"}
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
            {cd:"0",label:"1"},
            {cd:"1",label:"2"},
            {cd:"2",label:"3"},
            {cd:"3",label:"4"},
            {cd:"4",label:"5"},
            {cd:"5",label:"6"},
            {cd:"6",label:"7"},
            {cd:"7",label:"8"},
            {cd:"8",label:"9"},
            {cd:"9",label:"10"},
            {cd:"10",label:"11"},
            {cd:"11",label:"12"},
            {cd:"12",label:"13"},
            {cd:"13",label:"14"},
            {cd:"14",label:"15"},
            {cd:"15",label:"16"},
            {cd:"16",label:"17"},
            {cd:"17",label:"18"},
            {cd:"18",label:"19"},
            {cd:"19",label:"20"},
            {cd:"20",label:"21"},
            {cd:"21",label:"22"},
            {cd:"22",label:"23"},
            {cd:"23",label:"24"},
            {cd:"24",label:"25"},
            {cd:"25",label:"26"},
            {cd:"26",label:"27"},
            {cd:"27",label:"28"},
            {cd:"28",label:"29"},
            {cd:"29",label:"30"}
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
                {cd:"0",label:"1"},
                {cd:"1",label:"2"},
                {cd:"2",label:"3"},
                {cd:"3",label:"4"},
                {cd:"4",label:"5"},
                {cd:"5",label:"6"},
                {cd:"6",label:"7"},
                {cd:"7",label:"8"},
                {cd:"8",label:"9"},
                {cd:"9",label:"10"},
                {cd:"10",label:"11"},
                {cd:"11",label:"12"},
                {cd:"12",label:"13"},
                {cd:"13",label:"14"},
                {cd:"14",label:"15"},
                {cd:"15",label:"16"},
                {cd:"16",label:"17"},
                {cd:"17",label:"18"},
                {cd:"18",label:"19"},
                {cd:"19",label:"20"},
                {cd:"20",label:"21"},
                {cd:"21",label:"22"},
                {cd:"22",label:"23"},
                {cd:"23",label:"24"},
                {cd:"24",label:"25"},
                {cd:"25",label:"26"},
                {cd:"26",label:"27"},
                {cd:"27",label:"28"},
                {cd:"28",label:"29"}
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

  function print(){//できない
    var month_idx = birthMonth.selectedIndex;
    var month = birthMonth.options[month_idx].text;
    document.getElementsByClassName('month-print')[0].textContent = month;
  }