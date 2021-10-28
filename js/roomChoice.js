// 現在時刻の設定
var time = new Date();
var second = time.getSeconds();
var minute = time.getMinutes();
var hour = time.getHours();

// 現在時刻を元にした角度の設定
var secondDeg = (second * 360 / 60) + 90 ;
var minuteDeg = (minute * 360 / 60) + ((second * 360 / 60) / 60) + 90;
var hourDeg = (hour * 360 / 12) + ((minute * 360 / 60) / 12)  + ((second * 360 / 60) / 720) + 90;

// style 要素を作り、その中に keyframes アニメーションを入れる
var animation = document.createElement("style");
animation.innerHTML = "@keyframes rotation-s2 {0% {transform: rotate(" + secondDeg + "deg)}100% {transform: rotate(" + (secondDeg + 360) + "deg)}}@keyframes rotation-m2 {0% {transform: rotate(" + minuteDeg + "deg)}100% {transform: rotate(" + (minuteDeg + 360) + "deg)}}@keyframes rotation-h2 {0% {transform: rotate(" + hourDeg + "deg)}100% {transform: rotate(" + (hourDeg + 360) + "deg)}}";
document.head.appendChild(animation);

// レスポンシブな正方形を作る
document.getElementById("clock").style.height = document.getElementById("clock").scrollWidth + "px";

// URLから誕生日を取得
var url = new URL(window.location.href);
var params = url.searchParams;
var month = params.get('month').padStart(2, '0');
var day = params.get('day').padStart(2, '0');
var bd = month + "/" + day;

var targets = document.getElementsByClassName("choice");
for(let i = 0; i < targets.length; i++){
  targets[i].onclick = function() {
    location.href='room.html'+"?bd="+bd + "&num="+targets[i].value;
  }
}
