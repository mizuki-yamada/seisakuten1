const url = new URL(window.location.href);
const params = url.searchParams;
const month = params.get('month');
const day = params.get('day');
const room = params.get('room');

document.getElementById("choice").href = "roomChoice.html?month="+month+"&day="+day;

function onChangeNum(e) {
    var num = Number(document.getElementById('num').value);
    document.getElementById('prob_unique').innerHTML = (prob_unique(num)).toPrecision([3]);
    document.getElementById('prob').innerHTML = (100-prob_unique(num)).toPrecision([3]);
}

function onChangeNum2(e) {
    var num = Number(document.getElementById('num2').value);
    document.getElementById('pair1').innerHTML = (prob_pair(num, 1)).toPrecision([3]);
    document.getElementById('pair2').innerHTML = (prob_pair(num, 2)).toPrecision([3]);
    document.getElementById('pair3').innerHTML = (prob_pair(num, 3)).toPrecision([3]);   
    document.getElementById('trio').innerHTML = (prob_trio(num)).toPrecision([3]);   
}

function prob_unique(n) {
    if (n > 365) {
        return 0;
    }
    var ans = 1.0;
    for(var i = 364; i > 365-n; i--) {
        ans *= i / 365;
    }
    return 100*ans;
}

function comb_2(n) {
    return n * (n-1) / 2.0;
}

function prob_pair(n, m) {
    ans = 1.0;
    for(var i = 0; i < m; i++) {
        ans *= comb_2(n-i*2);
        ans /= (i+1);
    }
    for(var i = 365; i >= (365-n+1); i--) {
        if (i >= 365-n+1+m) {
            ans *= i / 365.0;
        }
        else {
            ans /= 365.0;
        }
    }
    return 100*ans;
}

function prob_trio(n) {
    ans = n * (n-1) * (n-2)/ 6.0;
    for(var i = 365; i >= (365-n+1); i--) {
        if (i >= 365-n+3) {
            ans *= i / 365.0;
        }
        else {
            ans /= 365.0;
        }
    }
    return 100*ans;
}

$(function() {
  $('.spinner').each(function() {
    var el  = $(this);
    var add = $('.spinner-add');
    var sub = $('.spinner-sub');

    // substract
    el.parent().on('click', '.spinner-sub', function() {
      if (el.val() > parseInt(el.attr('min'))) {
        el.val(function(i, oldval) {
          return --oldval;
        });
        el.change();
      }
      // disabled
      if (el.val() == parseInt(el.attr('min'))) {
        el.prev(sub).addClass('disabled');
      }
      if (el.val() < parseInt(el.attr('max'))) {
        el.next(add).removeClass('disabled');
      }
    });

    // increment
    el.parent().on('click', '.spinner-add', function() {
      if (el.val() < parseInt(el.attr('max'))) {
        el.val(function(i, oldval) {
          return ++oldval;
        });
        el.change();
      }
      // disabled
      if (el.val() > parseInt(el.attr('min'))) {
        el.prev(sub).removeClass('disabled');
      }
      if (el.val() == parseInt(el.attr('max'))) {
        el.next(add).addClass('disabled');
      }
    });
  });
});