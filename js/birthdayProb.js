function onChangeNum(e) {
    var num = Number(document.getElementById('num').value);
    document.getElementById('prob_unique').innerHTML = (100*prob_unique(num)).toPrecision([3]);
    document.getElementById('prob').innerHTML = (100*(1.0-prob_unique(num))).toPrecision([3]);    
}

function prob_unique(n) {
    if (n > 365) {
        return 0;
    }
    var ans = 1.0;
    for(var i = 364; i > 365-n; i--) {
        ans *= i / 365;
    }
    return ans;
}
