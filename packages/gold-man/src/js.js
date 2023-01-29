window.onload = function() {
	var oInit = document.getElementById("init"),	//��ʼ������;
		oMain = document.getElementById("main"),	//������;
		oBottom = document.getElementsByClassName("bottom")[0],	//��س��ֵ�λ��;
		oLine = document.getElementsByClassName("line")[0],		//����;
		oGoal = document.getElementsByClassName("goalP")[0],	//����;
		oMoney = document.getElementsByClassName("moneyP")[0],	//��Ǯ;
		oPrecious = document.getElementsByClassName("precious")[0],		//��ػ�ͼ��;
		oTime = document.getElementsByClassName("timeP")[0],	//ʱ�������;
		context = oPrecious.getContext("2d"),	//��ػ�ͼ����;
		oStop = document.getElementsByClassName("pause")[0],	//��ͣ��ť;
		oRemind = document.getElementsByClassName("remind")[0],		//�������������;
		swingTimer = "",	//���Ӷ�ʱ��;
		timer = "",		//�����쳤���̶�ʱ��;
		timerTime = "",	//ʱ�䶨ʱ��;
		arr = [],		//��ش洢��;
		isBomb = false,		//ը��������;
		Bomb = false,		//�ӳ�ը��;
		has = true;		//�Ƿ���ը��;
		lineControl = true;	//�����쳤������;
		bombComtrol = false;	//ը���ͷſ�����;
		deg = 0,	//���ӽǶ�;
		num = 999,	//��ʱ��;
		isFaster = false;	//�����϶�����������;
		ctxWidth = oPrecious.width,	//canvas���;
		ctxHeight = oPrecious.height;	//canvas�߶�;
	/*
		��ʼ��Ϸ;
		init: ��ʼ������;
		main: ������
		line: ����
		precious: ���ػ�ͼ��
		time: ʱ�������
		stop: ��ͣ��ť
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
			timeout(time);	//��Ϸ��ʱ������;
			swing(line);	//����ҡ������;
			createPrecious(0, 6, context);	//������ֿ��;
			createPrecious(1, 10, context);
			createPrecious(2, 3, context);
			createPrecious(3, 3, context);
			click(line);	//����;
			stopGame(stop);
		}
	}
	/*
		��Ϸ��ͣ;
		elem: ���Ԫ��;
	*/
	function stopGame(elem) {
		var child = elem.children[0];
		elem.onclick = function(e) {
			var event = e || window.event;
			if(child.innerHTML == "||") {	//��ͣ��Ϸ;
				child.innerHTML = "";
				child.classList.remove("stop");
				child.classList.add("start");
				clearInterval(timerTime);
				lineControl = false;
			}else {		//��ʼ��Ϸ;
				child.innerHTML = "||";
				child.classList.remove("start");
				child.classList.add("stop");
				timeout(oTime);
				lineControl = true;
			}
		}
	}
	/*
		����ʱ����;
		goal: ��ǰǮ��
		money: Ŀ��Ǯ��
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
		����ҡ��;
		elem: ҡ��Ԫ��;
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
		�������;
		type: �������;
		number:	�������;
		context: ��ػ�ͼ����;
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
			for(var j = 0; j < length; j ++) {		//��ֹ����֮����ص�;
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
		���̿���;
		elem: ����Ԫ��;
	*/
	function click(elem) {		
		document.onkeydown = function(e) {
			var event = e || window.event;
			var code = event.key.toLowerCase();
			if(code.slice(0, 1) == "a") {	//��ie�����;
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
		�ͷ�ը��;
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
		���ӱ䳤;
		elem: �䳤Ԫ��;
	*/
	function extend(elem){		//���ӱ䳤;
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
		�߽���ײ���;
		length: ����ԭ��;
		right: �ұ߽糤��;
		rightLeft: �м䳤��;
		left: ��߽糤��;
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
		������ײ���;
		elem: ��ײԪ��;
	*/
	function objectCheck(elem) {		//������ײ���;
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
					bol: true,	//�Ƿ���������;
					worth: arr[i].getWorth(),	//�����ֵ;
					size: arr[i].getSize(),		//�����С;
					speed: arr[i].getSpeed(),	//��ȡ�ٶ�;
					position: arr[i].getPosition(),	//����λ��;
					index: i,	//��ȡָ��;
				}
			}
		}
		return false;
	}
	/*
		���ӻ�ԭ;
		elem: ����;
		key: �Ƿ���������ַ���;
		detail: ����ײ�������ϸ��Ϣ;
			bol: �Ƿ񱻴�����;
			worth: ����ļ�ֵ;
			size: ����Ĵ�С;
			speed: �����϶���������ٶ�;
			position: ���嵱ǰ��λ��;
			index: ������arr�����е�λ��;
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
		����λ�øı�;
		speed: ������ƶ��ٶ�;
		index: ������arr�����е�λ��;
	*/
	function posChange(speed, index) {		
		var x,
			y;
		if(deg > 0) {		//����϶�;		
			x = Math.sin(Math.PI / 180 * deg) * speed;
			y = - Math.cos(Math.PI / 180 * deg) * speed;
		}else if(deg < 0){	//�ұ��϶�;
			x = - Math.sin(Math.PI / 180 * - deg) * speed;
			y = - Math.cos(Math.PI / 180 * -deg) * speed;
		}else {		//��ֱ�϶�;
			x = 0;
			y = - speed;
		}
		arr[index].move(context, x, y, ctxWidth, ctxHeight);	
		repaint(index);	//�����п��ȫ�����»���;
	}
	/*
		���ݸı�;
		worth: ���϶�����ļ�ֵ;
		bol: �����Ƿ��������϶����յ�;
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
		����������������ָı�;
		type: �ı�����;
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
		���ӱ��;
		elem: ����;
		length: ���ӵĵ�ǰ����;
		len: ���ӵ�ԭʼ����;
		detail: �����������ϸ��Ϣ; 251��;
		bol: �Ƿ�������;
	*/
	function cut(elem, length, len, detail, bol) {	
		var speed = isFaster ? 1.5 : typeof detail == "object" ? detail["speed"] : 1;
		isBomb = bol;	
		timer = setInterval(function() {	
			if(bol) {	//��������������;
				bombComtrol = true;
				posChange(speed, detail["index"]);	//�ı������λ��;
				if(length <= len) {
					clearInterval(timer);	
					var worth = detail["worth"];
					dataChange(worth, bol);		//���ݸı�;
					clear(detail["index"]);	//������ʧ;
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
			}else {		//û������;
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
		�����϶������ж���������������»���;
		index: ���ƶ���������arr�����е�λ��;
	*/
	function repaint(index) {	//�����϶������ж���������������»���;
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
		�����϶���ɺ����ɾ��;
		index:Ҫɾ����������arr�е�λ��;
	*/
	function clear(index) {	
		arr.splice(index, 1);	
		context.clearRect(0, 0, ctxWidth, ctxHeight);	
		repaint(-1);		
	}
	startGame(oInit, oMain, oLine, oBottom, oTime, oStop);
}

