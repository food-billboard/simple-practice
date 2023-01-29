window.onload = function() {
	var oInit = document.getElementById("init"),	//初始化界面;
		oMain = document.getElementById("main"),	//主界面;
		oBottom = document.getElementsByClassName("bottom")[0],	//矿藏出现的位置;
		oLine = document.getElementsByClassName("line")[0],		//绳子;
		oGoal = document.getElementsByClassName("goalP")[0],	//分数;
		oMoney = document.getElementsByClassName("moneyP")[0],	//金钱;
		oPrecious = document.getElementsByClassName("precious")[0],		//矿藏绘图板;
		oTime = document.getElementsByClassName("timeP")[0],	//时间计数器;
		context = oPrecious.getContext("2d"),	//矿藏绘图环境;
		oStop = document.getElementsByClassName("pause")[0],	//暂停按钮;
		oRemind = document.getElementsByClassName("remind")[0],		//神秘礼包提醒器;
		swingTimer = "",	//钩子定时器;
		timer = "",		//绳子伸长缩短定时器;
		timerTime = "",	//时间定时器;
		arr = [],		//矿藏存储器;
		isBomb = false,		//炸弹启动器;
		Bomb = false,		//扔出炸弹;
		has = true;		//是否有炸弹;
		lineControl = true;	//绳子伸长控制器;
		bombComtrol = false;	//炸弹释放控制器;
		deg = 0,	//绳子角度;
		num = 999,	//总时间;
		isFaster = false;	//绳子拖动加速启动器;
		ctxWidth = oPrecious.width,	//canvas宽度;
		ctxHeight = oPrecious.height;	//canvas高度;
	/*
		开始游戏;
		init: 初始化界面;
		main: 主界面
		line: 绳子
		precious: 宝藏绘图板
		time: 时间计数器
		stop: 暂停按钮
	*/
	function startGame(init, main, line, precious, time, stop) {
		var oBtn = document.getElementsByClassName("btn")[0],
			oLvel = document.getElementsByClassName("lvelP")[0];
		oBtn.onclick = function(e) {
			init.style.display = "none";
			main.style.display = "block";
			oMoney.innerHTML = 2000;
			oGoal.innerHTML = 0;
			oLvel.innerHTML = "lvel1";
			timeout(time);	//游戏定时器启动;
			swing(line);	//钩子摇摆启动;
			createPrecious(0, 6, context);	//随机出现矿藏;
			createPrecious(1, 10, context);
			createPrecious(2, 3, context);
			createPrecious(3, 3, context);
			click(line);	//控制;
			stopGame(stop);
		}
	}
	/*
		游戏暂停;
		elem: 点击元素;
	*/
	function stopGame(elem) {
		var child = elem.children[0];
		elem.onclick = function(e) {
			var event = e || window.event;
			if(child.innerHTML == "||") {	//暂停游戏;
				child.innerHTML = "";
				child.classList.remove("stop");
				child.classList.add("start");
				clearInterval(timerTime);
				lineControl = false;
			}else {		//开始游戏;
				child.innerHTML = "||";
				child.classList.remove("start");
				child.classList.add("stop");
				timeout(oTime);
				lineControl = true;
			}
		}
	}
	/*
		倒计时工具;
		goal: 当前钱数
		money: 目标钱数
	*/
	function timeout(time) {
		var money,
			goal;
		time.innerHTML = num;
	    timerTime = setInterval(function() {
			money = parseInt(oMoney.innerHTML);
			goal = parseInt(oGoal.innerHTML);
			if(num == 0) {
				clearInterval(timerTime);
				if(goal >= money) {
					alert("You Win!");
				}else {
					alert("You Lose!");
				}
			}
			if(goal >= money) {
				clearInterval(timerTime);
				alert("You Win!");
			}
			num --;
			time.innerHTML = num;
		}, 1000);
	}
	/*
		绳子摇摆;
		elem: 摇摆元素;
	*/
	function swing(elem) {
		var rotate,
			direct = true;
		swingTimer = setInterval(function() {
			if(direct) {
				if(deg == 80) {
					direct = false;
					deg --;		
				}else {
					deg ++;
				}
			}else {
				if(deg == -80) {
					direct = true;
					deg ++;
				}else {
					deg --;
				}
			}
			elem.style.transform = "rotate(" + deg + "deg)";
		}, 1000 / 60);
	}
	/*
		创建矿藏;
		type: 矿藏类型;
		number:	矿藏数量;
		context: 矿藏绘图环境;
	*/
	function createPrecious(type, number, context) {	
		var num = 0,
			newX,
			newY,
			newSize,
			preX,
			preY,
			preSize,
			length;
		for(var i = 0; i < number; i ++) {
			var c = new Create();
			c.init(type);
			newX = c.getPosition()[0];
			newY = c.getPosition()[1];
			newSize = c.getSize();
			length = arr.length;
			for(var j = 0; j < length; j ++) {		//防止物体之间的重叠;
				preX = arr[j].getPosition()[0];	
				preY = arr[j].getPosition()[1];
				preSize = arr[j].getSize();
				if((newX < preX && newX + newSize > preX + preSize && newY < preY && newY + newSize > preY + preSize) || (newX > preX && newX + newSize < preX + preSize && newY > preY && newY + newSize < preY + preSize)) {
					var c = new Create();
					c.init(type);
					j = -1;
					newX = c.getPosition()[0];
					newY = c.getPosition()[1];
					newSize = c.getSize();
				}else if(!(newY + newSize < preY - 4 || newY > preY + preSize + 4 || newX > preX + preSize + 4 || newX + newSize < preX - 4)) {
					var c = new Create();
					c.init(type);
					j = -1;
					newX = c.getPosition()[0];
					newY = c.getPosition()[1];
					newSize = c.getSize();
				}
			}
			c.draw(context);
			arr.push(c);
		}
	}
	/*
		键盘控制;
		elem: 控制元素;
	*/
	function click(elem) {		
		document.onkeydown = function(e) {
			var event = e || window.event;
			var code = event.key.toLowerCase();
			if(code.slice(0, 1) == "a") {	//非ie浏览器;
				code = code.slice(5);
			}
			if(code == "down" && lineControl) {
				extend(elem);	
				lineControl = false;
			}else if(code == "up" && bombComtrol) {
				Bomb = true;
			}
		}
	}
	/*
		释放炸弹;
	*/
	function bomb() {		
		var oBomb = document.getElementsByClassName("bomb")[0],
			cache = oBomb.children[0];
		if(cache.children.length > 1) {
			cache.removeChild(cache.children[0]);
		}else {
			cache.innerHTML = "Empty!";
			cache.style.cssText = "color:red;font-weight:bold;padding:66px 0 0 0;height:15px;line-height:15px;";
			has = false;
		}
	}
	/*
		绳子变长;
		elem: 变长元素;
	*/
	function extend(elem){		//绳子变长;
		clearInterval(swingTimer);			
		var length = 40,
			right = 290 / Math.cos(Math.PI / 180 * (90 + deg)),
			rightLeft = 400 / Math.cos(Math.PI / 180 * deg),
			left = 210 / Math.cos(Math.PI / 180 * (90 - deg));
		timer = setInterval(function() {
			if(objectCheck(elem)["bol"]) {
				clearInterval(timer);
				var object = objectCheck(elem);
				restore(elem, "have", object, timer);
			}else if(borderCheck(length, right, rightLeft, left)) {
				clearInterval(timer);
				restore(elem, "nothing", 1, timer);
			}else {
				elem.style.height = (isFaster ? length += 1.5 : length ++) + "px";
			}
		}, 1000 / 60);
	}
	/*
		边界碰撞检测;
		length: 绳子原长;
		right: 右边界长度;
		rightLeft: 中间长度;
		left: 左边界长度;
	*/
	function borderCheck(length, right, rightLeft, left) {	
		if(Math.abs(deg) <= 45 && length > rightLeft) {
			return true;
		}else if(deg > 45 && length > left) {
			return true;
		}else if(deg < -45 && length > right) {
			return true;
		}
		return false;
	}
	/*
		物体碰撞检测;
		elem: 碰撞元素;
	*/
	function objectCheck(elem) {		//物体碰撞检测;
		var oX,
			oY,
			oSize,
			lX,
			lY,
			height = parseInt(elem.style.height);
		if(deg > 0) {
			lX = 210 - height * Math.sin(Math.PI / 180 * deg);
			lY = height * Math.cos(Math.PI / 180 * deg) - 9;
		}else if(deg < 0) {
			lX = height * Math.sin(Math.PI / 180 * - deg) + 210;
			lY = height * Math.cos(Math.PI / 180 * - deg) - 9;
		}else {
			lX = 210;
			lY = height;
		}
		for(var i = 0, len = arr.length; i < len; i ++) {	
			oX = arr[i].getPosition()[0];
			oY = arr[i].getPosition()[1];
			oSize = arr[i].getSize();
			if(lX >= oX && lX <= oX + oSize && lY >= oY && lY <= oY + oSize) {
				return {
					bol: true,	//是否触碰到物体;
					worth: arr[i].getWorth(),	//物体价值;
					size: arr[i].getSize(),		//物体大小;
					speed: arr[i].getSpeed(),	//获取速度;
					position: arr[i].getPosition(),	//物体位置;
					index: i,	//获取指针;
				}
			}
		}
		return false;
	}
	/*
		绳子还原;
		elem: 绳子;
		key: 是否有物体的字符串;
		detail: 被碰撞物体的详细信息;
			bol: 是否被触碰到;
			worth: 物体的价值;
			size: 物体的大小;
			speed: 绳子拖动该物体的速度;
			position: 物体当前的位置;
			index: 物体在arr数组中的位置;
	*/
	function restore(elem, key, detail) {
		var length = parseInt(elem.style.height),
			len = 40,
			lineX,
			leneY;
		if(key == "have") {
			cut(elem, length, len, detail, true);
		}else if(key == "nothing") {
			cut(elem, length, len, detail, false);
		}
	}
	/*
		物体位置改变;
		speed: 物体的移动速度;
		index: 物体在arr数组中的位置;
	*/
	function posChange(speed, index) {		
		var x,
			y;
		if(deg > 0) {		//左边拖动;		
			x = Math.sin(Math.PI / 180 * deg) * speed;
			y = - Math.cos(Math.PI / 180 * deg) * speed;
		}else if(deg < 0){	//右边拖动;
			x = - Math.sin(Math.PI / 180 * - deg) * speed;
			y = - Math.cos(Math.PI / 180 * -deg) * speed;
		}else {		//垂直拖动;
			x = 0;
			y = - speed;
		}
		arr[index].move(context, x, y, ctxWidth, ctxHeight);	
		repaint(index);	//将所有矿藏全部重新绘制;
	}
	/*
		数据改变;
		worth: 被拖动物体的价值;
		bol: 物体是否真正被拖动到终点;
	*/
	function dataChange(worth, bol) {	
		if(bol) {
			if(typeof worth == "number") {
				var text = parseInt(oGoal.innerHTML);
				oGoal.innerHTML = text + worth;	
				changeText("goal");
			}else {
				switch(worth) {
					case "time": num += 20;
								oTime.innerHTML = num; 
								changeText("time");
								break;
					case "speed": isFaster = true; 
								oRemind.innerHTML = "speed increase";
								setTimeout(function() {
									oRemind.innerHTML = "pay attention";
									isFaster = false;
								}, 10000);
				}
			}
		}
	}
	/*
		神秘礼包提醒器文字改变;
		type: 改变类型;
	*/
	function changeText(type) {
		switch(type) {
			case "time": oRemind.innerHTML = "time increase";break;
			case "speed": oRemind.innerHTML = "speed increase"; break;
			case "goal": oRemind.innerHTML = "goal increase"; break;
		}
		setTimeout(function() {
			oRemind.innerHTML = "pay attention";
		}, 2000);
	}
	/*
		绳子变短;
		elem: 绳子;
		length: 绳子的当前长度;
		len: 绳子的原始长度;
		detail: 焦点物体的详细信息; 251行;
		bol: 是否有物体;
	*/
	function cut(elem, length, len, detail, bol) {	
		var speed = isFaster ? 1.5 : typeof detail == "object" ? detail["speed"] : 1;
		isBomb = bol;	
		timer = setInterval(function() {	
			if(bol) {	//在有物体的情况下;
				bombComtrol = true;
				posChange(speed, detail["index"]);	//改变物体的位置;
				if(length <= len) {
					clearInterval(timer);	
					var worth = detail["worth"];
					dataChange(worth, bol);		//数据改变;
					clear(detail["index"]);	//物体消失;
					swing(elem);
					bol = false;
					lineControl = true;
				}
				if(has && Bomb) {	
					bomb();
					clear(detail["index"]);
					clearInterval(timer);	
					Bomb = false;
					cut(elem, parseInt(elem.style.height), 40, 1, false);
				}
			}else {		//没有物体;
				bombComtrol = false;
				if(length <= len) {
					clearInterval(timer);
					swing(elem);
					lineControl = true;
				}
			}
			length -= speed;
			elem.style.height = length + "px";
		}, 1000 / 60);
	}
	/*
		物体拖动过程中对所有物体进行重新绘制;
		index: 被移动的物体在arr数组中的位置;
	*/
	function repaint(index) {	//物体拖动过程中对所有物体进行重新绘制;
		for(var i = 0, len = arr.length; i < len; i ++) {
			if(i != index) {
				arr[i].draw(context);
			}
		}
		if(index != -1) {
			arr[index].draw(context);
		}
	}
	/*
		物体拖动完成后进行删除;
		index:要删除的物体在arr中的位置;
	*/
	function clear(index) {	
		arr.splice(index, 1);	
		context.clearRect(0, 0, ctxWidth, ctxHeight);	
		repaint(-1);		
	}
	startGame(oInit, oMain, oLine, oBottom, oTime, oStop);
}

