var classlist = ['two','four','eight','oneSix','threeTwo','sixFour','oneTwoEight'
	,'twoFiveSix','fiveOneTwo','oneZeroTwoFour','twoZeroFourEight'];        //图片类;
var arr = [];        //方格数组;
var direct = '';     //方向;
var chessBoard = document.getElementsByClassName('chessBoard')[0];
var score = document.getElementsByClassName('score')[0];
var length = 4;      //矩阵长度;
var lock = true;    //整理锁;
var keyUpDown = true,     //移动锁;
	keyLeftRight = true;
var gameWin = document.getElementsByClassName('gameWin')[0];
var gameOver = document.getElementsByClassName('gameOver')[0];             							//变量;
function init(){          									//初始化;
	for(var i = 0;i < length;i ++){          //添加方格;
		arr[i] = [];
		for(var j = 0;j < length;j ++){
			(function(z){
				arr[i][z] = document.createElement('li');
				chessBoard.appendChild(arr[i][z]);
				arr[i][z].setAttribute('class','space');
			})(j)
		}
	}
	build();     //随机初始化两个方块;
	build();
}
function retNumForArea(maxNum,minNum){                          //生成在一个范围内的随机数;
	var x = Math.floor(Math.random()*(maxNum-minNum+1)+minNum);
	return x;
}
function build(){      									//生成新的数字方块;
		var row = Math.floor(retNumForArea(length - 1,0));      
		var column = Math.floor(retNumForArea(length - 1,0));
		var number = Math.floor(retNumForArea(-1,4));
		while(arr[row][column].className != 'space'){
			row = Math.floor(retNumForArea(length - 1,0)); 
			column = Math.floor(retNumForArea(length - 1,0));
		}
		if(number > 2){
			arr[row][column].setAttribute('class',classlist[1]);
		}else{
			arr[row][column].setAttribute('class',classlist[0]);
		}			
}
function move(){             							//键盘移动事件;
	document.onkeydown = function(e){    //38上40下37左39右
		var event = e || window.event;
		var code = event.keyCode;
		if(code == 38){
			direct = 'top';
			clear();
			add(direct);
			lock = true;
			if(emptyMethod()){
				posEmptyTb();
				posEmptyLr();
			}else{
				keyUpDown = true;
			}
			if(keyUpDown){
				build();	
			}
			method();
		}else if(code == 40){
			direct = 'bottom';
			clear();
			add(direct);
			lock = true;
			if(emptyMethod()){
				posEmptyTb();
				posEmptyLr();
			}else{
				keyUpDown = true;
			}
			if(keyUpDown){
				build();
			}
			method();
		}else if(code == 37){
			direct = 'left';
			clear();
			add(direct);
			lock = true;
			if(emptyMethod()){
				posEmptyLr();
				posEmptyTb();
			}else{
				keyLeftRight = true;
			}
			if(keyLeftRight){
				build();
			}
			method();
		}else if(code == 39){
			direct = 'right';
			clear();
			add(direct);
			lock = true;
			if(emptyMethod()){
				posEmptyLr();
				posEmptyTb();
			}else{
				keyLeftRight = true;
			}
			if(keyLeftRight){
				build();
			}
			method();
		}
	}
}
function judge(elem){       	//判断是否是空;
	if(elem.className == 'space'){
		return true;
	}else{
		return false;
	}
}
function clear(){         		//清除被标记的方格;
	for(var i = 0;i < length;i ++){
		for(var j = 0;j < length;j ++){
			if(arr[i][j].id == 'isChange'){
				arr[i][j].id = '';
			}
		}
	}
}
function number(elem1,elem2){   		//判断是否相同;
	if(elem1.className == elem2.className && elem1.id != 'isChange'){
		var pos = classlist.indexOf(elem1.className);
		elem1.setAttribute('class',classlist[pos + 1]);
		elem1.id == 'isChange';
		elem2.setAttribute('class','space');
	}
}
function add(direct){    			//相加的方法;
	if(direct == 'top'){  //向上运动;
		for(var i = 0;i < length;i ++){
			var j = 0;
			for(var z = 0;z < length;z ++){
				j = z;
				while(judge(arr[j][i]) && j < 3){
				j ++;		
				}
				if(z != j){
					arr[z][i].setAttribute('class',arr[j][i].className);
					arr[j][i].setAttribute('class','space');	
				}
			}
				if(lock){
					for(var z = 1;z < length;z ++){
						if(arr[z][i].className != 'space'){
							number(arr[z - 1][i],arr[z][i]);
						}
					}		
				}
		}	
		if(lock){
			lock = false;
			add('top');	
		}
	}else if(direct == 'bottom'){   //向下运动;
		for(var i = 0;i < length;i ++){
			var j = 0;
			for(var z = length - 1;z > 0;z --){
				j = z;
				while(judge(arr[j][i]) && j > 0){
				j --;		
			}
				if(z != j){
					arr[z][i].setAttribute('class',arr[j][i].className);
					arr[j][i].setAttribute('class','space');	
				}
			}
			if(lock){
				for(var z = length - 2;z >= 0;z --){
					if(arr[z][i].className != 'space'){
					number(arr[z + 1][i],arr[z][i]);
					}
				}
			}
		}
		if(lock){
			lock = false;
			add('bottom');	
		}
	}else if(direct == 'left'){      //向左运动;
		for(var i = 0;i < length;i ++){
			var j = 0;
			for(var z = 0;z < length;z ++){
				j = z;
				while(judge(arr[i][j]) && j < 3){
				j ++;		
			}
				if(z != j){
					arr[i][z].setAttribute('class',arr[i][j].className);
					arr[i][j].setAttribute('class','space');	
				}
			}
			if(lock){
				for(var z = 1;z < length;z ++){
					if(arr[i][z].className != 'space'){
						number(arr[i][z - 1],arr[i][z]);
					}
				}
			}
		}
		if(lock){
			lock = false;
			add('left');	
		}
	}else{     //向右运动;
		for(var i = 0;i < length;i ++){
			var j = 0;
			for(var z = length - 1;z > 0;z --){
				j = z;
				while(judge(arr[i][j]) && j > 0){
				j --;		
			}
				if(z != j){
					arr[i][z].setAttribute('class',arr[i][j].className);
					arr[i][j].setAttribute('class','space');	
				}
			}
			if(lock){
				for(var z = length - 2;z >= 0;z --){
					if(arr[i][z].className != 'space'){
						number(arr[i][z + 1],arr[i][z]);
					}
				}
			}
		}
		if(lock){
			lock = false;
			add('right');	
		}
	}
}
function method(){  		//判断输赢的方法;
	var num = 0;
	for(var i = 0;i < length;i ++){
		for(var j = 0;j < length;j ++){
			if(arr[i][j].classList.contains('twoZeroFourEight')){
				gameWin.style.display = 'block';
				gameWin.onclick = function(){
					location.reload();
				}
			}else if(keyUpDown == false && keyLeftRight == false){
					gameOver.style.display = 'block';
					gameOver.onclick = function(){
						location.reload();
					}
			}
		}
	}
}
function emptyMethod(){        //判断是否已经布满;
	var num = 0;
	for(var i = 0;i < length;i ++){
		for(var j = 0;j < length;j ++){
			if(arr[i][j].className != 'space'){
				num ++;
			}
		}
	}
	if(num == 16){
		return true;
	}
}
function posEmptyLr(){      //判断方格满后左右是否可以移动;
	var	leftR = 0;
	for(var i = 0;i < length;i ++){
		for(var j = 0;j < length; j ++){
				for(var z = j - 1;z <= j + 1;z += 2){
					if(arr[i][z] && arr[i][z].className != arr[i][j].className){	
						leftR ++;
					}
				}
			}
		}
	if(leftR == 24){
		keyLeftRight = false;
	}else{
		keyLeftRight = true;
	}
}
function posEmptyTb(){      //判断方格满后上下是否可以移动;
	var topBot = 0;
		for(var i = 0;i < length;i ++){
		for(var j = 0;j < length; j ++){
				for(var z = i - 1;z <= i + 1;z += 2){
					if(arr[z] && arr[z][j].className != arr[i][j].className){	
						topBot ++;
					}
				}
			}
		}
	if(topBot == 24){
		keyUpDown = false;
	}else{
		keyUpDown = true;
	}
}
init();
move();