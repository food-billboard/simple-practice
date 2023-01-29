(function () {
    var oStart = document.getElementsByClassName('start')[0],
        oWrap = document.getElementsByClassName('wrap')[0],
        oPoint = document.getElementsByClassName('point')[0],
        oTime = document.getElementsByClassName('time')[0],
        aDiv = document.querySelectorAll('.wrap .main div'),
        oUl = document.querySelectorAll('.wrap .main ul'),
        oTimeCal = document.getElementsByClassName('time')[0];
    var random = retNumForArea(3, 0);
    var first = 1;
    var mark = true,
        lock = false;
    var height = 100;   //白块高度;
    var degree = 0;     //速度用-指定白块数量;
    var timer = 0;  //定时器-速度用;
    var num = Math.round(aDiv[0].offsetHeight / height);    //可以显示的白块的纵向个数;
    var number = 0;
    oTimeCal.innerHTML = number;
    function retNumForArea(maxNum, minNum) {              //生成在一个范围内的随机数;
        var x = Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
        return x;
    }
    oWrap.oncontextmenu = function () {    //取消右键菜单效果;
        return false;
    }
    function startAndOver() {       //点击按钮开始游戏;
        oStart.onclick = function () {
            if (mark) {
                oStart.style.display = 'none';
                oWrap.style.display = 'block';
                oPoint.style.display = 'block';
                oStart.innerHTML = '游戏结束';
                mark = false;
                lock = true;
                init();
            } else if(mark){
                oStart.innerHTML = '开始游戏';
                oPoint.style.display = 'none';
                mark = true;
                lock = false;
            }
        }
    }
    function init() {        //初始化函数;
        for (var i = 0, len = aDiv.length; i < len; i++) {      //为每一个位置添加白色背景;
            aDiv[i] = [];
            var z = num - 1;
            for (var j = 0; j < num; j++) {
                aDiv[i][j] = document.createElement('li');
                oUl[i].appendChild(aDiv[i][j]);
                aDiv[i][j].classList.add('do-not');
                aDiv[i][j].style.top = aDiv[i][j].offsetTop + 100 * z + 'px';
                z--;
            }
        }
        for (var i = 0; i < num; i++) {        //随机产生每个位置的黑块或红块;
            if (aDiv[random][i].offsetTop > 301) {
                aDiv[random][i].classList.add('press');
            } else {
                aDiv[random][i].classList.add('black');
            }
            aDiv[random][i].classList.remove('do-not');
            random = retNumForArea(3, 0);
        }
    }
    function move() {    //键盘事件;
        document.onkeydown = function (e) {   //;
            var event = e || window.event;
            code = event.keyCode;
            if (first) {
                timeCal();
                first = 0;
            }
            if (code == 68 && lock) {
                code == judge() ? down() : gameOver();
            } else if (code == 70 && lock) {
                code == judge() ? down() : gameOver();
            } else if (code == 74 && lock) {
                code == judge() ? down() : gameOver();
            } else if (code == 75 && lock) {
                code == judge() ? down() : gameOver();
            }
        }
    }
    function down() {        //运动;
        for (var j = 0; j < num; j++) {
            for (var i = 0; i < aDiv.length; i++) {
                aDiv[i][j].style.top = aDiv[i][j].offsetTop + height + 'px';
                if (aDiv[i][j].offsetTop >= 301 && aDiv[i][j].className == 'black') {
                    aDiv[i][j].className = '';
                    aDiv[i][j].className = 'press';
                }
                if (aDiv[i][j].offsetTop == 501) {
                    aDiv[i][j].style.top = '1px';
                    if (aDiv[i][j].className == 'press') {
                        random = retNumForArea(3, 0);
                        if (random != i) {
                            aDiv[i][j].classList.remove('press');
                            aDiv[i][j].classList.add('do-not');
                            aDiv[random][j].classList.remove('do-not');
                            aDiv[random][j].classList.add('black');
                        } else {
                            aDiv[i][j].className = 'black';
                        }
                    }
                }
            }
        }
        // degree ++;               //开启定时器;
        // if(degree == 40){
        //     ganmeOver();
        // }
    }
    function judge() {   //判断是否按对;
        var pos = 0;
        var position = 0;
        for (var i = 0; i < num; i++) {    //找出有效行;
            if (aDiv[0][i].offsetTop == 301) {
                pos = i;
            }
        }
        for (var j = 0, len = aDiv.length; j < len; j++) {  //找出黑色块位置;
            if (aDiv[j][pos].className == 'black') {
                position = j;
            }
        }
        switch (position) {        //返回按键;
            case 0: return 68; break;
            case 1: return 70; break;
            case 2: return 74; break;
            case 3: return 75; break;
        }
    }
    function gameOver() {    //游戏结束跳出弹窗;
        clearInterval(timer);
        var timerout = setTimeout(function () {
            oStart.style.display = 'block';
            oPoint.style.display = 'none';
            lock = false;
            window.alert('你用了' + number / 1000 + 's');
        }, 1000)
    }
    function timeCal() {     //计时器;
        timer = setInterval(function () {
            number += 1;
            oTimeCal.innerHTML = number;
        }, 10)
    }
    startAndOver();
    move();

})();


