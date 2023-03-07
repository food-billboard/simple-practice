function retNumForArea(maxNum,minNum){   //随机生成指定范围内的数字;           
	var x = Math.floor(Math.random()*(maxNum-minNum+1)+minNum);
	return x;
}
function mouseover(i){                  //鼠标移动到时;
	li[i].onmouseover = function(){
		if(li[i].className == 'bodys'){
			li[i].setAttribute('class','bodys1');
		}
	}
}
function mouseout(i){                  //鼠标移开时;
	li[i].onmouseout = function(){
		if(li[i].className == 'bodys1'){
			li[i].setAttribute('class','bodys');
		}
	}
}
function isOpen(elem){               //判断方块是否已经被点击过;
	if(elem.className == 'bodys' || elem.className == 'bodys1' || elem.className == 'flag' || elem.className == 'question'){
		return false;
	}else{
		elem.onmouseover = false;
		return true;
	}
}
function clickNum(elem){             //监听被点击的次数;
	if(elem.className == 'bodys1' || elem.className == 'bodys'){
		return 0;
	}else if(elem.className == 'flag'){
		return 1;
	}else if(elem.className == 'question'){
		return 2;
	}
}
function flag(elem){                //右键一次插旗;
	elem.setAttribute('class','flag');
}
function question(elem){           //右键两次打问号;
	elem.setAttribute('class','question');
}
function initialize(elem){        //右键三次初始化;
	elem.setAttribute('class','bodys');
}
function judgeNum(num){          //判断元素的位置;
	if(num > 0 && num < pro - 1){
		return 'top';
	}else if(num == 0){
		return 0;
	}else if(num == pro - 1){
		return pro - 1;
	}else if(num == pro * (pro - 1)){
		return pro * (pro - 1);
	}else if(num == pro * pro - 1){
		return pro * pro - 1;
	}else if(num % pro == 0){
		return 'left';
	}else if((num + 1) % pro == 0){
		return 'right';
	}else if(num > pro * (pro - 1) && num < pro * pro - 1){
		return 'bottom';
	}else{
		return 'center';
	}
}
function createNum(num){         //为有数字的li赋值;
	if(numArr[num] == 1){
		li[num].setAttribute('class','one');
	}else if(numArr[num] == 2){
		li[num].setAttribute('class','two');
	}else if(numArr[num] == 3){
		li[num].setAttribute('class','three');
	}else if (numArr[num] == 4){
		li[num].setAttribute('class','four');
	}else if(numArr[num] == 5){
		li[num].setAttribute('class','five');
	}else if(spaceArr.indexOf(num) != -1){
		li[num].setAttribute('class','bodys2');
	}else if(numArr[num] == 6){
		li[num].setAttribute('class','six');
	}else if(numArr[num] == 7){
		li[num].setAttribute('class','seven');
	}else if(numArr[num] == 8){
		li[num].setAttribute('class','eight');
	}
}
function spaceSpread(num){         //空白格的扩散方法;
	var pos = judgeNum(num);
	createNum(num);
	if(pos == 'top'){
		for(var i = num - 1;i <= num + 1;i += 2){
			if(isOpen(li[i]) == false){
				createNum(i);
				if(spaceArr.indexOf(i) != -1){
				createNum(i);
				spaceSpread(i);
				}	
			}
		}
		for(var i = num + pro - 1;i <= num + pro + 1;i ++){
			if(isOpen(li[i]) == false){
				createNum(i);
				if(spaceArr.indexOf(i) != -1){
				createNum(i);
				spaceSpread(i);
				}	
			}
		}
	}else if(pos == 0){
		for(var i = num + pro;i <= num + pro + 1;i ++){
			if(isOpen(li[i]) == false){
				createNum(i);
				if(spaceArr.indexOf(i) != -1){
				createNum(i);
				spaceSpread(i);
				}	
			}
		}
		if(isOpen(li[num + 1]) == false){
				createNum(num + 1);
				if(spaceArr.indexOf(num + 1) != -1){
				createNum(num + 1);
				spaceSpread(num + 1);
				}	
		}
	}else if(pos == pro - 1){
		for(var i = num + pro - 1;i <= num + pro;i ++){
			if(isOpen(li[i]) == false){
				createNum(i);
				if(spaceArr.indexOf(i) != -1){
				createNum(i);
				spaceSpread(i);
				}	
			}
		}
		if(isOpen(li[num - 1]) == false){
				createNum(num - 1);
				if(spaceArr.indexOf(num - 1) != -1){
				createNum(num - 1);
				spaceSpread(num - 1);
				}	
			}
	}else if(pos == pro * (pro - 1)){
		for(var i = num - pro;i <= num - pro + 1;i ++){
			if(isOpen(li[i]) == false){
				createNum(i);
				if(spaceArr.indexOf(i) != -1){
				createNum(i);
				spaceSpread(i);
				}	
			}
		}
		if(isOpen(li[num + 1]) == false){
				createNum(num + 1);
				if(spaceArr.indexOf(num + 1) != -1){
				createNum(num + 1);
				spaceSpread(num + 1);
				}	
			}
	}else if(pos == pro * pro - 1){
		for(var i = num - pro - 1;i <= num - pro;i ++){
			if(isOpen(li[i]) == false){
				createNum(i);
				if(spaceArr.indexOf(i) != -1){
				createNum(i);
				spaceSpread(i);
				}	
			}
		}
		if(isOpen(li[num]) == false){       ///////
				createNum(num);
				if(spaceArr.indexOf(num) != -1){
				createNum(num);
				spaceSpread(num);
				}	
			}
	}else if(pos == 'left'){
		for(var i = num - pro;i <= num + pro;i += 2 * pro){
			if(isOpen(li[i]) == false){
				createNum(i);
				if(spaceArr.indexOf(i) != -1){
				createNum(i);
				spaceSpread(i);
				}	
			}
		}
		for(var i = num - pro + 1;i <= num + pro + 1;i += pro){
			if(isOpen(li[i]) == false){
				createNum(i);
				if(spaceArr.indexOf(i) != -1){
				createNum(i);
				spaceSpread(i);
				}	
			}
		}
	}else if(pos == 'right'){
		for(var i = num - pro - 1;i <= num + pro - 1;i += pro){
			if(isOpen(li[i]) == false){
				createNum(i);
				if(spaceArr.indexOf(i) != -1){
				createNum(i);
				spaceSpread(i);
				}	
			}
		}
		for(var i = num - pro;i <= num + pro;i += 2 * pro){
			if(isOpen(li[i]) == false){
				createNum(i);
				if(spaceArr.indexOf(i) != -1){
				createNum(i);
				spaceSpread(i);
				}	
			}
		}
	}else if(pos == 'bottom'){
		for(var i = num - pro - 1;i <= num - pro + 1;i ++){
			if(isOpen(li[i]) == false){
				createNum(i);
				if(spaceArr.indexOf(i) != -1){
				createNum(i);
				spaceSpread(i);
				}	
			}
		}
		for(var i = num - 1;i <= num + 1;i += 2){
			if(isOpen(li[i]) == false){
				createNum(i);
				if(spaceArr.indexOf(i) != -1){
				createNum(i);
				spaceSpread(i);
				}	
			}
		}
	}else if(pos == 'center'){
		for(var i = num - pro - 1;i <= num - pro + 1;i ++){
			if(isOpen(li[i]) == false){
				createNum(i);
				if(spaceArr.indexOf(i) != -1){
				createNum(i);
				spaceSpread(i);
				}	
			}
		}
		for(var i = num - 1;i <= num + 1;i +=2){
			if(isOpen(li[i]) == false){
				createNum(i);
				if(spaceArr.indexOf(i) != -1){
				createNum(i);
				spaceSpread(i);
				}	
			}
		}
		for(var i = num + pro - 1;i <= num + pro + 1;i ++){
			if(isOpen(li[i]) == false){
				createNum(i);
				if(spaceArr.indexOf(i) != -1){
				createNum(i);
				spaceSpread(i);
				}	
			}
		}
	}
}
function winMethod(){           //输赢的判定方法;
	var num = 0;
	for(var i = 0,len = landArr.length;i < len;i ++){
		if(li[landArr[i]].className == 'flag'){
			num ++;
		}
	}
	if(num == landpro){
		window.alert('你赢了!');
		location.reload();
	}else{
		window.alert('你有地方猜错了!')
		for(var i = 0,len = landArr.length;i < len;i ++){
			if(li[landArr[i]].className != 'flag'){
				li[landArr[i]].setAttribute('class','red');
			}
		}
	}
}
function clickout(num){        //左键点开方块;
	if(landArr.indexOf(num) != -1){
		shiftFace.style.backgroundImage = 'url(%E7%BB%93%E6%9D%9F%E6%97%B6.jpg)';
		window.alert('你死了');
		var i = 0;
		var timer = setInterval(function(){
			if(i < landpro){
				li[landArr[i]].className = 'landmine';	
				i ++;
			}else{
				clearInterval(timer);
			}
		},100);
	}else if(numArr[num] != 0){
			createNum(num);
	}else{
			spaceSpread(num);
	}
}
function landMine(){      //生成地雷的方法;
	landArr = [];
	var i = 0,
		r = retNumForArea(pro * pro,0);
		while(i < landpro){
			if(landArr.indexOf(r) == -1){
				landArr.push(r);
				i++;
				r = retNumForArea(pro * pro,0);
			}else{
				r = retNumForArea(pro * pro,0);
			}
		}
	return landArr;
}
function number(){         //生成数字的方法;
	numArr = [];
	for(var i = 0,len = pro * pro;i < len;i ++){
		numArr[i] = 0;
	}
	for(var i = 0,len = pro * pro;i < len;i ++){
		if(landArr.indexOf(i) == -1){
			var pos = judgeNum(i);
			if(i == 0){
				if(landArr.indexOf(i + 1) != -1){
					numArr[0] ++;
				}
				for(var j = i + pro;j < i + pro + 2;j ++){
					if(landArr.indexOf(j) != -1){
						numArr[0] ++;
					}
				}
			}else if(i == pro - 1){
				if(landArr.indexOf(i - 1) != -1){
					numArr[i] ++;
				}
				for(var j = i + pro - 1;j < i + pro + 1;j ++){
					if(landArr.indexOf(j) != -1){
						numArr[i] ++;
					}
				}
			}else if(i == pro * (pro - 1)){ 
				if(landArr.indexOf(i + 1) != -1){
					numArr[i] ++;
				}
				for(var j = i - pro;j < i - pro + 2;j ++){
					if(landArr.indexOf(j) != -1){
						numArr[i] ++;
					}
				}
			}else if(i == pro * pro - 1){
				if(landArr.indexOf(i - 1) != -1){
					numArr[i] ++;
				}
				for(var j = i - pro - 1;j < i - pro + 1;j ++){
					if(landArr.indexOf(j) != -1){
						numArr[i] ++;
					}
				}
			}else if(pos == 'top'){
				for(var j = i - 1;j < i + 2;j += 2){
					if(landArr.indexOf(j) != -1){
						numArr[i] ++;
					}
				}
				for(var j = i + pro - 1;j < i + pro + 2;j ++){
					if(landArr.indexOf(j) != -1){
						numArr[i] ++;
					}
				}
			}else if(pos == 'right'){
				for(var j = i - pro - 1;j < i + pro;j += pro){
					if(landArr.indexOf(j) != -1){
						numArr[i] ++;
					}
				}
				for(var j = i - pro;j < i + pro + 1;j += 2 * pro){
					if(landArr.indexOf(j) != -1){
						numArr[i] ++;
					}
				}
			}else if(pos == 'left'){
				for(var j = i - pro;j < i + pro + 1;j += 2 * pro){
					if(landArr.indexOf(j) != -1){
						numArr[i] ++;
					}
				}
				for(var j = i - pro + 1;j < i + pro + 2;j += pro){
					if(landArr.indexOf(j) != -1){
						numArr[i] ++;
					}
				}
			}else if(pos == 'bottom'){
				for(var j = i - pro - 1;j < i - pro + 2;j ++){
					if(landArr.indexOf(j) != -1){
						numArr[i] ++;
					}
				}
				for(var j = i - 1;j < i + 2;j += 2){
					if(landArr.indexOf(j) != -1){
						numArr[i] ++;
					}
				}
			}else if(pos == 'center'){
				for(var j = i - pro - 1;j < i - pro + 2;j ++){
					if(landArr.indexOf(j) != -1){
						numArr[i] ++;
					}
				}
				for(var j = i - 1;j < i + 2;j += 2){
					if(landArr.indexOf(j) != -1){
						numArr[i] ++;
					}
				}
				for(var j = i + pro - 1;j < i + pro + 2;j ++){
					if(landArr.indexOf(j) != -1){
						numArr[i] ++;
					}
				}
				
			}
		}
	}
	return numArr;
}
function space(){         //生成空白格的方法;
	spaceArr = [];
	for(var i = 0,len = pro * pro;i < len;i ++){
		if(numArr[i] == 0 && landArr.indexOf(i) == -1){
			spaceArr.push(i);
		}
	}
	return spaceArr;
}
var body1 = document.getElementsByClassName('body')[0];
var ul = document.getElementsByTagName('ul')[0];
var li = document.getElementsByTagName('li');
var shiftFace = document.getElementsByClassName('shift')[0];
var bodys = document.getElementsByClassName('body')[0];
var border = document.getElementsByClassName('border')[0];
var menu = document.getElementsByClassName('menu')[0];
var font = document.getElementsByClassName('font')[0];
var main = document.getElementsByClassName('main')[0];
var caculate = document.getElementsByClassName('caculate')[0];
var operate = document.getElementsByClassName('main-operate')[0];
var arr = [];
var z = 0;
var landArr = [];          //地雷位置集合;
var numArr = [];           //数字位置集合;
var spaceArr = [];        //空白位置集合;
var input = document.getElementsByTagName('input');
var pro = prompt('请输入行列数','最少也要8行列哦!');
if(pro == null|| parseInt(pro) < 8 || typeof(parseInt(pro)) != 'number'){
	window.alert('不选择或错误选择不可以哦');
	location.reload();
}
var landpro = prompt('请输入雷的数量','最少也得有一颗哦!');
if(landpro == null || typeof(parseInt(landpro)) != 'number' || parseInt(landpro) < 1){
	window.alert('不选择或错误选择不可以哦');
	location.reload();
}
pro = parseInt(pro);
landpro = parseInt(landpro);
input[0].value = landpro;
input[1].value = 999;
operate.style.width = pro * 21 + 'px';
operate.style.height = pro * 21 + 'px';
caculate.style.width = pro *21 + 'px';
shiftFace.style.left = (pro * 21 / 2 + 15) + 'px';
main.style.width = (pro *21 + 34) + 'px';
main.style.height = (pro * 21 + 81) + 'px';
menu.style.width = (pro * 21 + 40) + 'px';
font.style.marginLeft = ((pro * 21) / 2 - 10) + 'px';
border.style.width = (pro * 21 + 40) + 'px';
border.style.height = (main.offsetHeight + 40) + 'px';
body1.style.height = (border.offsetHeight + 42) + 'px';
body1.style.width = (border.offsetWidth + 22) + 'px';
for(var i = 0;i < pro;i ++){
	arr[i] = [];
	for(var j = 0;j < pro;j ++){
		arr[i][j] = 0;
	}
}
var array = [];
for(var j = 0;j < pro;j ++){
	for(var i = 0;i < pro;i ++){
	array[i] = document.createElement('li');
	array[i].setAttribute('class','bodys');
	ul.appendChild(array[i]);
	}
}
for(var i = 0;i < pro; i ++){
	for(var j = 0;j < pro;j ++){
		arr[i][j] = li[z];
		z ++;
	}
}
for(var i = 0,len = pro * pro;i < len;i ++){
	mouseover(i);
	mouseout(i);
}
landMine();
number();
space();
for(var i = 0,len = li.length;i < len;i ++){
	(function(j){
		li[j].onmousedown = function (e){
		var event = e || window.event;
		if(event.button == 0){                       //如果是左键;
			if(input[0].value == 0){
				winMethod();
			}else{
			if(isOpen(li[j]) == false){              //如果没有被点开;
				clickout(j);                        //点开方块;
			}
			}
		}else if(event.button == 2){              //如果是右键;
			if(input[0].value == 0){
				winMethod();
			}else{
			if(isOpen(li[j]) == false){            //如果没有被打开;
				if(clickNum(li[j]) == 0){       //如果没点过;
					flag(li[j]);
					input[0].value -=1;
				}else if(clickNum(li[j]) == 1){  //如果被点了一下;
					question(li[j]);
				}else if(clickNum(li[j]) == 2){  //如果被点了两下;
					initialize(li[j]);
					input[0].value = parseInt(input[0].value) + 1;
				}
			}
		}
	  }
		}
	})(i);
}
body1.oncontextmenu = function(e){     //取消右键菜单效果;
	var event = e || window.event;
	event.returnValue = false;
}
shiftFace.onclick = function(){        //点击笑脸刷新效果;
	location.reload();
}
var timer = setInterval(function(){    //倒计时效果;
	input[1].value -= 1;
	if(input[1].value == 0){
		clearInterval(timer);
		window.alert('时间到了');
		location.reload;
	}
},1000)