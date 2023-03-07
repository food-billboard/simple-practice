window.onload = function() {
	/*��������;
		oStart: ��Ϸ��ʼ����;
		oLoading: loading����;
		oMain: ������;
		oInterphase: ��ͼ������;
		oScore: ���ݽ���;
		oScoreDate: ������Ϣ;
		oTime: ʱ������;
		oChild: ����;
		oSpecialCoin: ����ש��;
		life: ������������;
		timer: ���ض�ʱ��;
		objMoveTimer: �����˶���ⶨʱ��;
		monsterMoveTimer: �����˶���ʱ��;
		buffMoveTimer: buff�˶���ʱ��;
		operateTimer: �������������ʱ��;
		up: ���̰����Ƿ��µļ���;
			83: s
			65: a
			68: d
			74: j
			75: k
		object: �����������;
		specialBrick: ����ש�鼯��;
		music: �������ֵļ���;
		LOCK: λ��ִ�п���;
		_lock: ��Ϸ��ͣ��ť;
		_isSide: �Ƿ񵽴���߽߱�;
		jumpLock: ��Ծ����;
		child_moveLock: ������ײ;
			moveLockArrOn: �˶�������������;
			moveLockArrOff: �˶����عرռ���;
			objMoveArr: ��ײ������;
		buff_moveLock: buff��ײ;
		bomb_moveLock: �ӵ���ײ;
		monster_moveLock: ������ײ;
		buffArr: ����ש�����Ʒ��ʾ����;
		buffDirect: buff�˶�����;
		monsterArr: ����������ļ���;
		monsterDirect: �����˶����򼯺�;
		bombDirect: �ӵ��˶����򼯺�;
		personState: ����״̬;
		objChecked: ����������ļ���;
		pos: ����λ����Ϣ;
		time: ����ʱ�䵹��ʱ;
		_positionBottom: �����ʼ��ص�;
		_positionTop: ������붥���ľ���;
		_positionLeft: �����ʼ������ߵľ���;
		_brickSize: ש��Ĵ�С;
		_brickBottom: ש��Ѿ���ײ��ľ���;
		_childWidth: �����ʼ���;
		_childHeight: �����ʼ�߶�;
		_pipeSize: ˮ��ܵĸ߶�;
		_stoneTop: ��������ǽ�ĸ߶�;
		_stoneHeight: ǽ��height;
		_moneyWorth: ��ҵķ���;
		_isBomb: �����Ƿ���Է����ӵ�;
		_bombSize: �ӵ��Ĵ�С;
		_isUnbeatable: �����Ƿ����޵�״̬;
		isWin: �Ƿ�Ӯ����Ϸ���ж�;
		isMute: �Ƿ����Ŀ���;
		mute:����ͼƬ;
		unmute:�Ǿ���ͼƬ;
		bombShooting: ���ڷ����е��ӵ�����;
		aCanvas: ������ͼ����;
		contextChild: �����ͼ����;
		contextDetail: ��ͼ���ƻ���;
		holeArr: ��ͼ�Ͽӵ�λ��;
		isHug: �����Ƿ��ڱ���״̬;
		isRun: �����Ƿ����ܶ�״̬;
		date: ʱ����������;
	*/
	var oStart = document.getElementById("start"),
		oLoading = document.getElementById("loading"),	
		oMain = document.getElementById("main"),	
		oInterphase = oMain.getElementsByClassName("main")[0],	
		oScore = document.getElementById("score"),	
		oScoreDate = oScore.getElementsByClassName("score")[0],
		oTime = oScore.getElementsByClassName("Time")[0],	
		oChild = oMain.getElementsByClassName("main_person")[0],
		aCanvas = document.getElementsByTagName("canvas"),	
		contextChild = aCanvas[0].getContext("2d"),		
		contextDetail = aCanvas[1].getContext("2d"),	
		oSpecialCoin = oMain.getElementsByClassName("special")[0],
		aMusic = document.querySelectorAll("#direction audio"),
		oMusicControls = document.querySelector("#direction p"),
		up = {	
			83: [false, down],	
			65:	[false, back],	
			68:	[false, go],	
			74:	[false, jump],	
			75:	[false, attack]	
		},		
		child_moveLock = {		
			"moveLockArrOn": {	
				"pipeGoLock": true,	
				"pipeBackLock": true, 
				"stoneGoLock": true, 
				"stoneBackLock": true, 
			},
			"moveLockArrOff": {	
				"pipeJumpLock": false,	
				"stoneJumpLock": false,	
				"brickJumpBottomLock": false,	
				"brickJumpTopLock": false,	
				"isBrickSide": false,	
				"isStoneSide": false,	
				"isPipeSide": false	
			},
			"objMoveArr": {	
				"hole": false,
				"brick": false,
				"stone": false,
				"monster": false,
				"pipe": false,
				"flag": false,
				"bomb": false
			}
		},
		buff_moveLock = {		
			"moveLockArrOn": {	
				"pipeGoLock": true,	
				"pipeBackLock": true, 
				"stoneGoLock": true, 
				"stoneBackLock": true, 
			},
			"moveLockArrOff": {	
				"pipeJumpLock": false,	
				"stoneJumpLock": false,	
				"brickJumpBottomLock": false,	
				"brickJumpTopLock": false,	
				"isBrickSide": false,	
				"isStoneSide": false,	
				"isPipeSide": false	
			},
			"objMoveArr": {	
				"hole": false,
				"brick": false,
				"stone": false,
				"monster": false,
				"pipe": false,
				"flag": false,
				"bomb": false
			}
		},
		bomb_moveLock = {		
			"moveLockArrOn": {	
				"pipeGoLock": true,	
				"pipeBackLock": true, 
				"stoneGoLock": true, 
				"stoneBackLock": true, 
			},
			"moveLockArrOff": {	
				"pipeJumpLock": false,	
				"stoneJumpLock": false,	
				"brickJumpBottomLock": false,	
				"brickJumpTopLock": false,	
				"isBrickSide": false,	
				"isStoneSide": false,	
				"isPipeSide": false	
			},
			"objMoveArr": {	
				"hole": false,
				"brick": false,
				"stone": false,
				"monster": false,
				"pipe": false,
				"flag": false,
				"bomb": false
			}
		},
		monster_moveLock = {	
			"moveLockArrOn": {	
				"pipeGoLock": true,	
				"pipeBackLock": true, 
				"stoneGoLock": true, 
				"stoneBackLock": true, 
			},
			"moveLockArrOff": {	
				"pipeJumpLock": false,	
				"stoneJumpLock": false,	
				"brickJumpBottomLock": false,	
				"brickJumpTopLock": false,	
				"isBrickSide": false,	
				"isStoneSide": false,	
				"isPipeSide": false	
			},
			"objMoveArr": {	
				"hole": false,
				"brick": false,
				"stone": false,
				"monster": false,
				"pipe": false,
				"flag": false,
				"bomb": false
			}
		},
		buffArr = {		
			"mushroom":[],
			"flower": [],
			"star": [],
			"money": []
		},
		buffDirect = {	
			"mushroom":[],
			"star": [],
			"money": [],
			"flower": []
		},
		monsterArr = {	
			"monsterMush": [],
			"tortoise": []
		},
		monsterDirect =	{	
			"monsterMush": [],
			"tortoise": []
		},
		bombDirect = {		
			"bomb": []
		},
		personState = {		
			"child": true,
			"adult": false,
			"cooker": false
		},
		objChecked = {
			"monsterMush": [],
			"tortoise": [],
			"money": [],
			"flower": [],
			"mushroom": [],
			"star": []
		},
		music = {
			"jump": "music/jump.mp3",
			"coin": "music/coin.mp3",
			"big": "music/big.mp3",
			"died": "music/died.mp3",
			"win": "music/win.mp3",
			"monsterMush": "music/monsterMush.mp3",
			"brickBreak": "music/brickBreak.mp3"
		},
		pos = {},	
		object = {},	
		specialBrick = {},		
		holeArr = [[1962, 2028], [2510, 2576], [4632, 4698]],
		bombShooting = [],
		LOCK = true,	
		_lock = true,	
		_isSide = false,	
		jumpLock = true,
		_isBomb = false,
		_isUnbeatable = false,	
		isWin = false,
		isHug = false,
		isRun = false,	
		isMute = false,
		timer = null,	
		objMoveTimer = null,	
		monsterMoveTimer = null,	
		buffMoveTimer = null,	
		operateTimer = null,
		life = 3,
		time = 300,	
		_positionBottom = 64,		
		_positionTop = 404,		
		_positionLeft = 85,		
		_brickSize = 32,	
		_brickBottom = 160,	
		_childWidth = 25,	
		_childHeight = 32,	
		_pipeSize = 0,	
		_stoneTop = 0,	
		_stoneHeight = 32,	
		_moneyWorth = 100,		
		_bombSize = 17,
		mute = "pic/mute.png",
		unmute = "pic/unmute.png",
		date = 0;
	/*
		�ӵ��Ĺ��캯��;
	*/
	function Bomb() {};	
	/*
		�ӵ��Ĳ�������;
	*/
	Bomb.prototype = {
		context: contextDetail,	//��ͼ���ƻ���;
		/*
			��ʼ��;
			direct: �ӵ����˶�����;
		*/
		init: function(direct) {	
			this.y = oChild.offsetTop + (oChild.offsetHeight / 2);
			this._x = 0;	//�ӵ��ĳ�ʼλ��;
			this._range = 300;	//�˶�����;
			this.direct = direct;
			this.speed = 4;
			if(this.direct % 2 == 0) {
				this.x = oChild.offsetLeft + oChild.offsetWidth + 5;
			}else {
				this.x = oChild.offsetLeft - oChild.offsetWidth - 5;
			}
		},
		draw: function() {
			this.context.beginPath();
			draw.bomb(this.context, this.x, this.y);
		},
		move: function() {
			if(this.direct % 2 == 0) {	//�ж��˶�����;
				this.x += this.speed;
			}else {
				this.x -= this.speed;
			}
			this._x += this.speed;
			this.draw();
		}
	}
	/*
		�������ȿ�¡;
		origin: Դ����;
		target: Ŀ�����;
	*/
	function deepClone(origin, target) {
		var target = target || {},
			toString = Object.prototype.toString,
			array = "[object Array]";
		for(var attr in origin) {
			if(origin.hasOwnProperty(attr)) {
				if(origin[attr] != null && typeof origin[attr] == "object") {
					if(toString.call(origin[attr]) == array) {
						target[attr] = [];
					}else {
						target[attr] = {};
					}
					deepClone(origin[attr], target[attr]);
				}else {
					target[attr] = origin[attr];
				}
			}
		}
		return target;
	}
	/*
		��ʼ��;
	*/
	function init() {
		document.addEventListener("keypress", initDetail, false);
		oMusicControls.addEventListener("click", controls, false);
	}
	/*
		���ֿ���;
		e: �¼�����;
	*/
	function controls(e) {
		if(!isMute) {
			this.style.background = "url(" + mute + ")";
			isMute = true;
			aMusic[0].pause();
		}else {
			this.style.background = "url(" + unmute + ")";
			isMute = false;
			if(oMain.style.display == "block") {
				aMusic[0].play();
			}
		}
		this.style.backgroundSize = "50% 50%";
		this.style.backgroundPosition = "30px center";
		this.style.backgroundRepeat = "no-repeat";
	}
	/*
		���¿�ʼ��Ϸ;
		elem: ����������;
	*/
	function restart(elem) {
		elem.innerHTML = ("x" + life);
		detail();
	}
	/*
		��ʼ��ϸ��;
		e: �¼�����;
	*/
	function initDetail(e) {
		var event = e || window.event;
		if(event.charCode == "104" && oMain.style.display != "block") {
			oStart.style.display = "none";
			oLoading.style.display = "block";
			oLoading.getElementsByTagName("span")[0].innerHTML = ("x" + life);	//������������ʾ;
			var timeout = setTimeout(function() {	//loading�����ͼ����;
				detail();
				document.removeEventListener("keypress", initDetail, false);
			}, 2000);
		}
	}
	/*
		��Ϸ��ʼ�����з���;
	*/
	function detail() {
		object = deepClone(obj, object);
		oLoading.style.display = "none";
		oMain.style.display = "block";
		if(!isMute) {
			aMusic[0].play();
		}
		oSpecialCoin.index = 6;	//�趨����ש��ʣ�����ײ����;
		if(!oSpecialCoin.classList.contains("special")) {
			oSpecialCoin.classList.add("special");
			oSpecialCoin.classList.remove("nouse");
		}
		oTime.innerHTML = time;
		changeRole("child");
		oChild.style.zIndex = "99";
		start();	//��ʽ��ʼ��Ϸ;
		loadingData();	//���س���Ԫ��λ������;
		specialBrick = deepClone(nodeArr[1], specialBrick);
		_childWidth = 25;
		_childHeight = 32;
		isRun = false;
		oChild.width = _childWidth;
		oChild.height = _childHeight;
		_positionTop = 404;
		_positionTop = oMain.offsetHeight - _positionBottom - oChild.offsetHeight;
	}
	/*
		�л�����״̬;
		state: ������Ҫ�л���״̬;
	*/
	function changeRole(state) {
		for(var attr in personState) {
			if(attr != state) {
				personState[attr] = false;
			}else {
				personState[attr] = true;
			}
		}
		_positionTop = oMain.offsetHeight - _positionBottom - _childHeight;
	}
	/*
		��Ϸ��ʼ;
	*/
	function start() {
		stopGame();	//��Ϸֹͣ����;
		interval(); //��Ϸ����ʱ����;
		objCheck();	//�����˶���⹦��;
		document.addEventListener("keydown", walk, false);
		document.addEventListener("keyup", stop, false);
	}
	/*
		�����ƶ�;
		e: �¼�����;
	*/
	function walk(e) {	
		var event = e || window.event;
		if(up[event.keyCode] && _lock) {		//�������Ч����;
			up[event.keyCode][0] = true;
			if(LOCK) {	//�ж��Ƿ�Ϊ��һ��������ʱ��;
				LOCK = false;
				operateTimer = setInterval(function() {
					pos.left = oChild.offsetLeft;	//���������ߵ�λ��;
					pos.top = oChild.offsetTop,		//��������ϱߵ�λ��;
					pos._x = oInterphase.offsetLeft;	//��ͼ������ľ�����ߵ�ֵ;
					for(var attr in up) {
						if(up[attr][0] && jumpLock) {	//��������µ�λ�Ʋ���;
							up[attr][1](pos);
						}
						if(up[attr][0] && attr == 75) {	//����������ӵ��ķ���;
							up[attr][1](pos);
						}
						if(!up[attr][0] && attr == 83) {	//������п��Զ��µ�����;
							stand(attr);
						}
						if(up[65][0] || up[68][0]) {
							isRun = true;
						}else {
							isRun = false;
						}
					}
				}, 10);
			}
		}
	}
	/*
		�������֮��վ����;
		attr: �������ϵİ������;
	*/
	function stand(attr) {
		if(oChild.height == parseInt(_childHeight / 2)) {
			oChild.height = oChild.height * 2;
		}
	}
	/*
		����̧�𴥷��¼�;
		e: �¼�����;
	*/
	function stop(e) {		
		var event = e || window.event,
			index = 0,		//û�а��µļ���������;
			length = 0;		//up���ϵ�������;
		if(up[event.keyCode]) {
			up[event.keyCode][0] = false;
			for(var attr in up) {
				if(up[attr][0]) {	//ֻҪ��һ���������ǰ��µ�״̬��ʱ���ͼ���ִ��;
					return;
				}
			}
			clearInterval(operateTimer);	//����ȫ��̧��,��ʱ�����;
			stand(83);
			LOCK = true;	//���ش�;
			isRun = false;
		}
	}
	/*
		ǰ��;
		pos: ����λ����Ϣ����;
	*/
	function go(pos) {
		pos.top = oChild.offsetTop;
		pos.left = oChild.offsetLeft;
		pos._x = oInterphase.offsetLeft;
		var bottom = oMain.offsetHeight - pos.top - oChild.height,
			_position = [oChild.offsetLeft, oChild.offsetTop],
			_size = [oChild.offsetWidth, oChild.offsetHeight];
		if(!leaveCheck(child_moveLock["objMoveArr"]) && bottom != _positionBottom && jumpLock){	//��һ������ײ����һ��û����ײ�����;
			jumpLock = false;
			leave(0.8, child_moveLock, _position, _size, - pos._x);
		}else if(- pos._x <= oInterphase.offsetWidth - oMain.offsetWidth && child_moveLock["moveLockArrOn"]["pipeGoLock"] && child_moveLock["moveLockArrOn"]["stoneGoLock"]) {
			var left = pos.left;
			pos.left ++;
			goCheck(pos, (pos.left - left));		//����ӿ���Ҫ�ı�;
			oChild.style.left = pos.left + "px";
			child_moveLock["moveLockArrOn"]["stoneBackLock"] = true;
		}
		if(!_isUnbeatable) {
			isImpact(1, child_moveLock, _position, _size);
		}
		if(oChild.offsetTop != _positionTop) {
			isImpact(2, child_moveLock, _position, _size);
		}
		isImpact(3, child_moveLock, _position, _size);
		isImpact(5, child_moveLock, _position, _size);
	}
	/*
		�ж��ӿ��Ƿ���Ҫ�ı䲢���иı�;
		pos: ����λ����Ϣ����;
		_x: ���������һ��λ�õı仯ֵ;
	*/
	function goCheck(pos, _x) {	
		if(- pos._x <= oInterphase.offsetWidth - oMain.offsetWidth && pos["left"] + pos["_x"] > oMain.offsetWidth / 2 && - oInterphase.offsetLeft < 5690) {	//����λ�ó����ӿڿ��һ������;
			pos._x -= _x;
			oInterphase.style.left = pos._x + "px";
		}
	}
	/*
		�¶�;
		pos: ����λ����Ϣ����;
	*/
	function down(pos) {
		if(oChild.height == parseInt(_childHeight)) {
			oChild.height = oChild.height / 2;
		}
	}
	/*
		����;
		pos: ����λ����Ϣ����;
	*/
	function back(pos) {
		pos.top = oChild.offsetTop;
		var bottom = oMain.offsetHeight - pos.top - oChild.offsetHeight,
			_position = [oChild.offsetLeft, oChild.offsetTop],
			_size = [oChild.width, oChild.height];
		if(Math.abs(oInterphase.offsetLeft) != oChild.offsetLeft) {
			if(bottom != _positionBottom && !leaveCheck(child_moveLock["objMoveArr"])) {
				jumpLock = false;
				leave(-0.8, child_moveLock, _position, _size, - oInterphase.offsetLeft);
			}else if(child_moveLock["moveLockArrOn"]["pipeBackLock"] && child_moveLock["moveLockArrOn"]["stoneBackLock"]) {
				pos.left --;
				oChild.style.left = pos.left + "px";
				child_moveLock["moveLockArrOn"]["stoneGoLock"] = true;
			}
		}
		if(!_isUnbeatable) {
			isImpact(1, child_moveLock, _position, _size);
		}
		isImpact(3, child_moveLock, _position, _size);
		isImpact(5, child_moveLock, _position, _size);
		if(oChild.offsetTop != _positionTop) {
			isImpact(2, child_moveLock, _position, _size);
		}
	}
	/*
		��Ծ;
		pos: ����λ����Ϣ����;
	*/
	function jump(pos) {
		if(jumpLock) {
			jumpLock = false;
			/*
				data: ��Ծ���ݼ���;
				viewportTimer: �����ж��Ƿ���Ҫ�ı��ӿ�λ�õĶ�ʱ��;
				maxHeightTimer: ���ﵽ����ߴ��Ķ�ʱ��;
				clearTimer: ���λ�ñ任�����������ʱ��;
				left: �����leftֵ;
				top: �����topֵ;
				bottom: �����ʼbottomֵ;
				countLeft: �����˶��ļ�ʱλ��left��Ϣ;
				countBottom: �����˶��ļ�ʱλ��bottom��Ϣ;
				_position: ����λ����Ϣ;
				_size: ����Ĵ�С;
				xSpeed: �����˶��ٶ�;
				ySpeed: �����˶��ٶ�;
			*/
			var data = "",
				viewportTimer = "",	
				maxHeightTimer = "",	
				clearTimer = "",	
				left = oChild.offsetLeft,	
				top = oChild.offsetTop,	
				bottom = oMain.offsetHeight - top - oChild.height,	
				countLeft = 0,	
				countBottom = 0,
				_position = [],
				_size = [oChild.width, oChild.height],
				ySpeed = 3,
				xSpeed = 1.5;
			if(up[83][0]) {		//������Ծ��ʽ�ĸ�ֵ;
				data = jumpCheck([50]);
			}else {
				data = jumpCheck([140]);
			}
			for(var attr in up) {	//������Ծ�����ж�����������������;
				if(attr != 75) {
					up[attr][0] = false;
				}
			}
			if(!isMute) {	//��Ծ���ֲ���;
				aMusic[1].src = music["jump"];
				aMusic[1].play();
			}
			viewportTimer = setInterval(function() {	//��ʼ�˶�;
				if(countBottom < data[0]) {	//����߶������ֵ��Χ��;
					goCheck(pos, 1);
					countBottom += ySpeed;	
					if(data.length != 1) {	//�ж������Ƿ���Ҫ�����ƶ�;
						if(data[1] > 0 && countLeft <= (data[1] / 2)) {
							countLeft += xSpeed;
						}else if(data[1] < 0 && countLeft >= (data[1] / 2)) {
							countLeft -= xSpeed;
						}
					}
					oChild.style.bottom = (bottom + countBottom) + "px";
					oChild.style.left = (left + countLeft) + "px";
					_position = [oChild.offsetLeft, oChild.offsetTop];
					isImpact(2, child_moveLock, _position, _size);
					isImpact(3, child_moveLock, _position, _size);
					isImpact(5, child_moveLock, _position, _size);
					isImpact(7, child_moveLock, _position, _size);
					isImpact(9, child_moveLock, _position, _size);
					if(_isSide) {		//�߽�����ײ;
						clearInterval(viewportTimer);
						clear(viewportTimer, countBottom, countLeft, bottom, data, left, pos, xSpeed, ySpeed);
					}else if(child_moveLock["moveLockArrOff"]["brickJumpBottomLock"]){		//�����������ש��;
						clearInterval(viewportTimer);
						child_moveLock["moveLockArrOff"]["brickJumpBottomLock"] = false;
						clear(viewportTimer, countBottom, countLeft, bottom, data, left, pos, xSpeed, ySpeed);
					}else {		//����б߲���ײ;
						_airImpactCheck(viewportTimer, viewportTimer, data, countLeft, countBottom, bottom, xSpeed, ySpeed);
					}
				}else {		//�������߶ȳ������ֵ;
					clearInterval(viewportTimer);
					initLock(child_moveLock);
					if(up[65][0]) {
						oChild.style.left = (oChild.offsetLeft - 3) + "px";	
					}else if(up[68][0]){
						oChild.style.left = (oChild.offsetLeft + 3) + "px";
					}
					clear(viewportTimer, countBottom, countLeft, bottom, data, left, pos, xSpeed, ySpeed);
				}
			}, 1000 / 60);
		}
	}
	/*
		���;
		viewportTimer: �����ж��Ƿ���Ҫ�ı��ӿ�λ�õĶ�ʱ��;
		countBottom: �����˶��ļ�ʱλ��bottom��Ϣ;
		countLeft: �����˶��ļ�ʱλ��left��Ϣ;
		bottom: �����ʼbottomֵ;
		data: ��Ծ���ݼ���;
		left: �����leftֵ;
		pos: ����λ����Ϣ����; 
		xSpeed: �����˶��ٶ�;
		ySpeed: �����˶��ٶ�;
	*/
	function clear(viewportTimer, countBottom, countLeft, bottom, data, left, pos, xSpeed, ySpeed) {
		var _position = [],
			_size = [oChild.width, oChild.height];
		maxHeightTimer = setInterval(function() {	//���￪ʼ�����˶�;
			pos.left = oChild.offsetLeft;	//���������ߵ�λ��;
			pos.top = oChild.offsetTop,		//��������ϱߵ�λ��;
			pos._x = oInterphase.offsetLeft;	//��ͼ������ľ�����ߵ�ֵ;
			goCheck(pos, 1);
			if(!_isSide) {
				if(data.length != 1) {	//�ж������Ƿ���Ҫ�����ƶ�;
					if(data[1] > 0 && countLeft <= data[1]) {
						countLeft += xSpeed;
					}else if(data[1] < 0 && countLeft >= data[1]) {
						countLeft -= xSpeed;
					}
					oChild.style.left = (left + countLeft) + "px";
				}
			}
			countBottom -= ySpeed;
			oChild.style.bottom = (bottom + countBottom) + "px";
			_position = [oChild.offsetLeft, oChild.offsetTop];
			if(!_isUnbeatable) {	//��������޵е�;
				isImpact(1, child_moveLock, _position, _size);
			}	
			isImpact(2, child_moveLock, _position, _size);	//�����������˶������е���ײ���м��;
			isImpact(3, child_moveLock, _position, _size);
			isImpact(5, child_moveLock, _position, _size);
			isImpact(7, child_moveLock, _position, _size);
			isImpact(9, child_moveLock, _position, _size);	//������������߽�;
			if(child_moveLock["objMoveArr"]["hole"] || parseInt(oChild.style.bottom) <= _positionBottom) {	//������ﵽ����ײ�����������;
				clearInterval(maxHeightTimer);
				initLock(child_moveLock);
				oChild.style.bottom = _positionBottom + "px";
				jumpLock = true;
				isRun = false;
				viewportTimer = null;
				maxHeightTimer = null;
				_isSide = false;
			}else {		//�����������ש��,ǽ,ˮ��ܻ������ӻ���û��������;
				_airImpactCheck(viewportTimer, maxHeightTimer, data, countLeft, countBottom, bottom, xSpeed, ySpeed);	//������ײ���;
			}	
		}, 1000 / 60);	
	}
	/*
		������ײ���;
		viewportTimer: �����ж��Ƿ���Ҫ�ı��ӿ�λ�õĶ�ʱ��;
		moveTimer: �˶���ʱ��;
		dataMove: �ƶ�����;
		left: �����ƶ�������;
		bottom: �����ƶ�������;
		_Bottom: ������������ײ���λ��;
		xSpeed: �����˶��ٶ�;
		ySpeed: �����˶��ٶ�;
	*/
	function _airImpactCheck(viewportTimer, moveTimer, dataMove, left, bottom, _Bottom, xSpeed, ySpeed) {
		var _position = [],
			_size = [oChild.width, oChild.height];
		if(leaveCheck(child_moveLock["objMoveArr"])) {	//�ж��Ƿ�����ײ;
			if(child_moveLock["objMoveArr"]["monster"] || child_moveLock["moveLockArrOff"]["isBrickSide"] || child_moveLock["moveLockArrOff"]["isStoneSide"] || child_moveLock["moveLockArrOff"]["isPipeSide"] || child_moveLock["objMoveArr"]["flag"]) {	//�ж��Ƿ�Ϊ������ײ;
				clearInterval(moveTimer);
				child_moveLock["moveLockArrOff"]["isBrcikSide"] = false;
				child_moveLock["moveLockArrOff"]["isStoneSide"] = false;
				child_moveLock["moveLockArrOff"]["isPipeSide"] = false;
				var flag = child_moveLock["objMoveArr"]["flag"];
				if(!child_moveLock["objMoveArr"]["monster"]) {
					if(dataMove[1] > 0 && left <= dataMove[1]) {
						oChild.style.left = (oChild.offsetLeft - 2) + "px";
					}else if(dataMove[1] < 0 && left >= dataMove[1]) {
						oChild.style.left = (oChild.offsetLeft + 2) + "px";
					}
				}
				if(flag) {	//�ж��Ƿ�Ϊ���ӵ���ײ;
					oChild.style.left = oChild.offsetLeft + 18 + "px";
					gameover(timer, objMoveTimer, 7);
				}else {
					var checkTimer = setInterval(function() {
						bottom -= ySpeed;
						oChild.style.bottom = (_Bottom + bottom) + "px";
						_position = [oChild.offsetLeft, oChild.offsetTop];
						if(!_isUnbeatable) {
							isImpact(1, child_moveLock, _position, _size);
						}	
						isImpact(2, child_moveLock, _position, _size);	//�����������˶������е���ײ���м��;
						isImpact(3, child_moveLock, _position, _size);
						isImpact(5, child_moveLock, _position, _size);
						if((child_moveLock["objMoveArr"]["hole"] || child_moveLock["moveLockArrOff"]["brickJumpTopLock"] || child_moveLock["moveLockArrOff"]["stoneJumpLock"] || child_moveLock["moveLockArrOff"]["pipeJumpLock"]) || parseInt(oChild.style.bottom) <= _positionBottom) {	//�ж������Ƿ�����ײ;
							clearInterval(checkTimer);
							if(parseInt(oChild.style.bottom) <= _positionBottom) {
								oChild.style.bottom = _positionBottom + "px";
							}else {
								var _bottom = _Bottom + _brickBottom - _brickSize;
								land(_bottom, _Bottom, child_moveLock);
							}	
							jumpLock = true;
							isRun = false;
							viewportTimer = null;
							moveTimer = null;
							checkTimer = null;
							_isSide = false;
						}
					}, 1000 / 60);	
				}
			}else {		//����Ƕ�����ײ;
				var _bottom = _Bottom + _brickBottom - _brickSize;
				land(_bottom, _Bottom, child_moveLock);
				oChild.style.left = oChild.offsetLeft + "px";
				clearInterval(moveTimer);
				jumpLock = true;
				isRun = false;
				viewportTimer = null;
				moveTimer = null;
				_isSide = false;
			}
		}
	}
	/*
		������ز���;	
		bottom: �������λ��;
		_bottom: �����ʼλ��;
		impactType: ��ײ����;
	*/
	function land(bottom, _bottom, impactType) {
		var impact = impactType["moveLockArrOff"];
		if(impact["brickJumpTopLock"]) {	//ש��;
			bottom = _brickBottom;
		}else if(impact["stoneJumpLock"]) {		//ǽ;
			bottom = oMain.offsetHeight - _stoneTop;	
		}else {		//ˮ���;
			bottom = _positionBottom + _pipeSize;
		}
		oChild.style.bottom = bottom + "px";
		for(var attr in impact) {
			if(attr != "brickJumpBottomLock") {
				impact[attr] = false;
			}
		}
	}
	/*
		��Ծ�߶�ȷ��;
		data: ���ݲο�;
	*/
	function jumpCheck(data) {
		var left = 140,
			right = 140;
		if(Math.abs(oInterphase.offsetLeft) != oChild.offsetLeft) {
			if(up[68][0]) {	//�Ҽ�����;
				data.push(data[0] - 35 > 0 ? left : left - 60);
			}else if(up[65][0]) {	//�������;
				data.push(data[0] - 35 > 0 ? -right : -right + 60);
			}
		}
		return data;
	}
	/*
		����;
		pos: ����λ����Ϣ����;
	*/
	function attack(pos) {
		var size = [_bombSize, _bombSize],
			direct = 0;
		if(_isBomb) {	//�ж��Ƿ���з����ӵ����ʸ�;
			if(bombShooting.length < 1) {	//������ڷ����е��ӵ�����С��1ʱ;
				up[75][0] = false;
				var b = new Bomb();	//�����ӵ�;
				if(up[65][0]) {
					direct = 1;
				}
				bombShooting.push(b);
				bombShooting[0].init(direct);
				bombShooting[0].draw();
				bombDirect["bomb"].push(direct);
			}
		}
	}
	/*
		�˶����صļ��忪�ز���;
	*/
	function moveLockOperate() {
		clearMove();
		initLock(child_moveLock);
		initLock(buff_moveLock);
		initLock(bomb_moveLock);
		initLock(monster_moveLock);
		initArray(buffArr);
		initArray(buffDirect);
		initArray(monsterArr);
		initArray(monsterDirect);
		initArray(bombDirect);
		initArray(objChecked);
		pos = {};
		object = {};	
		specialBrick = {};		
		bombShooting = [];
		personState = {		
			"child": true,
			"adult": false,
			"cooker": false
		}
		_childWidth = 25;	
		_childHeight = 32;
		_positionBottom = 64;	
		_positionTop = 404;
		time = 300;
		LOCK = true;
		jumpLock = true;
		_lock = true;
		_isBomb = false;
		_isUnbeatable = false;
		_isSide = false;
		timer = null;	
		operateTimer = null;
		isWin = false;
		monsterMoveTimer = null;
		buffMoveTimer = null;
		objMoveTimer = null;
	}
	/*
		��ʼ����������;
		array: ��ʼ������;
	*/
	function initArray(array) {
		for(var arr in array) {
			array[arr] = [];
		}
	}
	/*
		��ʼ��������;
		lock: ���ļ���;
	*/
	function initLock(lock) {
		for(var attr in lock) {
			if(attr == "moveLockArrOn") {
				for(var on in lock["moveLockArrOn"]) {
					lock["moveLockArrOn"][on] = true;
				}
			}else if(attr == "moveLockArrOff"){
				for(var off in lock["moveLockArrOff"]) {
					lock["moveLockArrOff"][off] = false;
				}
			}else {
				for(var obj in lock["objMoveArr"]) {
					lock["objMoveArr"][obj] = false;
				}
			}
		}
	}
	/*
		��Ϸ����ʱ��ʱ��;
	*/
	function interval() {	
		timer = setInterval(function() {
			if(time >= 0) {
				oScore.getElementsByClassName("Time")[0].innerHTML = time --;	//ʱ��--;
				monsterMove();
			}else{
				gameover(timer, objMoveTimer, 4);
			}
		}, 1000);
	}
	/*
		�����˶���ⶨʱ��;
	*/
	function objCheck() {
		var index = 0,
			person = {
				"jump": false,
				"run": false,
				"hug": false,
				"stand": false
			};
		objMoveTimer = setInterval(function() {
			generalMove(monster_moveLock, monsterArr, monsterDirect);
			generalMove(buff_moveLock, buffArr, buffDirect);
			if(bombShooting.length != 0) {
				if(bombShooting[0]["x"] > - oInterphase.offsetLeft && bombShooting[0]["x"] <= - oInterphase.offsetLeft + oMain.offsetWidth) {
					bombShoot(bomb_moveLock, bombShooting, bombDirect);
				}else {
					bombShooting.shift();
					bombDirect["bomb"].shift();
					initLock(bomb_moveLock);
				}
			}
			for(var attr in personState) {	//����״̬���;
				if(personState[attr]) {
					person["state"] = attr;
					break;
				}
			}
			if(!jumpLock) {	//�����˶�״̬�仯;
				personChange(person, "jump", "state");
			}else if(isHug) {
				personChange(person, "hug", "state");
			}else if(isRun) {
				personChange(person, "run", "state");
			}else {
				personChange(person, "stand", "state");
			}
			contextDetail.clearRect(-oInterphase.offsetLeft, 0, oInterphase.offsetWidth, oInterphase.offsetHeight);
			contextChild.clearRect(0, 0, oChild.width, oChild.height);
			loadingElement(contextDetail, {"posX": - oInterphase.offsetLeft, "posY": 0}, object, buffArr, monsterArr, bombShooting, index, person, contextChild, _isUnbeatable);
			index ++;
		}, 1000 / 60);
	}
	/*
		�ı������˶�״̬;
		person: ����״̬����;
		target: ������Ҫ���õ�״̬;
	*/
	function personChange(person, target, state) {
		for(var attr in person) {
			if(attr == state) {
				continue;
			}else if(attr == target) {
				person[attr] = true;
			}else {
				person[attr] = false;
			}
		}
	}
	/*
		�ӵ����;
		impactType: ��ײ������;
		objArr: ��ײ������Ϣ;
		directArr: �����˶����򼯺�;
	*/
	function bombShoot(impactType, objArr, directArr) {
		var	size = [_bombSize, _bombSize],	//�ӵ���С;
			attr = "bomb",	//�����������;
			impactObj = impactType["objMoveArr"],	//�����˶�����;
			impactOff = impactType["moveLockArrOff"],	//����ر���;
			impactOn = impactType["moveLockArrOn"];	//�������;
		for(var i = 0, len = objArr.length; i < len; i ++) {
			if(objArr[i]) {
				isImpact(2, impactType, [objArr[i]["x"], objArr[i]["y"]], size);
				isImpact(3, impactType, [objArr[i]["x"], objArr[i]["y"]], size);
				isImpact(5, impactType, [objArr[i]["x"], objArr[i]["y"]], size);
				isImpact(6, impactType, [objArr[i]["x"], objArr[i]["y"]], size);
				isImpact(4, impactType, [objArr[i]["x"], objArr[i]["y"]], size);
				isImpact(8, child_moveLock, [oChild.offsetLeft, oChild.offsetTop], [oChild.offsetWidth, oChild.offsetHeight]);
				if(leaveCheck(impactType["objMoveArr"])) {
					if(impactObj["brick"]) {	//brick;
						if(!impactOff["brickJumpTopLock"]) {	//�����ײ;
							directArr[attr][i] ++;
						}
					}
					if(impactObj["stone"]) {	//stone;
						if(impactOff["isStoneSide"]) {	//�����ײ;
							directArr[attr][i] ++;
						}
					}
					if(impactObj["pipe"]) {		//pipe;
						if(impactOff["pipeJumpLock"]) {	//�����ײ;
							directArr[attr][i] ++;
						}
					}
					if(impactObj["monster"]) {	//monster;
						bombShooting.shift();
						directArr[attr].shift();
					}
					if(impactObj["pipe"]) {		//pipe;
						directArr[attr][i] ++;
					}
				}else {		//û����ײ;
					if(objArr[i]) {
						if(objArr[i]["y"] + size[1] < 500 - _positionBottom) {		//�ж��Ƿ��ڿ���;
							down = true;
						}else if(objArr[i]["y"] + size[1] >= 500 - _positionBottom){	//û���ڿ���;
							objArr[i]["y"] = 500 - _positionBottom - size[1];
							down = false;
						}
					}
				}
				if(child_moveLock["objMoveArr"]["bomb"]) {	//�ӵ�;
					bombShooting.shift();
					directArr[attr].shift();
					if(personState["child"]) {
						gameover(timer, objMoveTimer, 4);
					}else {
						_childWidth /= 1.2;
						_childHeight /= 1.2;
						changeRole("child");
						oChild.width = _childWidth;
						oChild.height = _childHeight;
						_isBomb = false;
					}
				}
				if(objArr[i]) {
					objArr[i]["direct"] = directArr[attr][i];
					if(objArr[i]["_x"] >= objArr[i]["_range"]) {		//�ж��Ƿ񵽴�������;
						objArr.shift();
						directArr[attr].shift();
					}
				}
			}
		}
	}
	/*
		�����˶�;
	*/
	function monsterMove() {
		var area,
			position;
		area = {		//��������Χλ����Ϣ;
				"left": - oInterphase.offsetLeft, 
				"width": oMain.offsetWidth, 
				"height": oMain.offsetHeight
		}
		for(var attr in object) {		
			if(attr == "monsterMush" || attr == "tortoise") {	//�ж��Ƿ��ǹ���;
				position = object[attr]["position"];
				for(var i = 0, len = position.length; i < len; i ++) {	//�����й���λ����Ϣ���б���;
					if(position[i][0] <= area["left"] + area["width"] && position[i][0] >= area["left"] + area["width"] / 2) {	//�ж������Ƿ񼴽����������;		
						if(monsterArr[attr].length != 0) {		//�ж���ʾ�����弯���Ƿ�Ϊ��;
							for(var j = 0, lenJ = monsterArr[attr].length; j < lenJ; j ++) {
								if(objChecked[attr].indexOf(i) != -1) {
									break;
								}
							}
							if(j == lenJ) {		//���û���ҵ���ͬλ�õ�����;
								monsterArr[attr].push(position[i]);
								monsterDirect[attr].push(1);
								objChecked[attr].push(i);
							}
						}else if(monsterArr[attr].length == 0){		//�����ʾΪ��;
							if(objChecked[attr].indexOf(i) == -1) {
								monsterArr[attr].push(position[i]);
								monsterDirect[attr].push(1);
								objChecked[attr].push(i);
							}
						}
					}				
				}
			}
		}
	}
	/*
		��ҵ��˶���ʽ;
		target: ��Ҷ���;
		size: ��Ҵ�С;
		position: ���λ��;
	*/
	function moneyMove(position, size) {
		var speed = 3;
		if(position["distance"] >= 20) {
			position[1] -= 3;
			position["distance"] -= 3;
		}else if(position["distance"] >= 0){
			position[1] += 3;
			position["distance"] -= 3;
		}
	}
	/*
		�˶�����;
		impactType: ��ײ������;
		objArr: ��ײ������Ϣ;
		directArr: �����˶����򼯺�;
	*/
	function generalMove(impactType, objArr, directArr) {
		var down = false,	//�����Ƿ���Ҫ����ֱ������ж�;
			speed,	//�˶��ٶ�;
			downSpeed = 8,	//�½��ٶ�;
			size,	//����Ĵ�С;
			impactObj = impactType["objMoveArr"],	//�����˶�����;
			impactOff = impactType["moveLockArrOff"],	//����ر���;
			impactOn = impactType["moveLockArrOn"];	//�������;
		if(impactType == monster_moveLock) {	//���þ���������˶��ٶ�;
			speed = 1;
		}else {
			speed = 2;
		}
		for(var attr in objArr) {
			switch(attr) {
				case "flower":
				case "monsterMush": 
				case "mushroom": size = [33, 33]; break;
				case "star": size = [30, 34]; break;
				case "tortoise": size = [33, 44]; break;
				case "money": size = [17, 17]; break;
				default: throw new Error("please select the right object!");
			}
			for(var i = 0, len = objArr[attr].length; i < len; i ++) {
				if(objArr[attr][i]) { 
					if(attr == "money")	{	//�ж��Ƿ�Ϊ����ƶ�;
						moneyMove(objArr[attr][i], size);
						if(objArr[attr][i]["distance"] <= 0) {
							objArr[attr].splice(i, 1);
							_money();
						}
					}else if(attr == "flower") {	//�ж��Ƿ�Ϊ��;
						isImpact(6, child_moveLock, [oChild.offsetLeft, oChild.offsetTop], [oChild.offsetWidth, oChild.offsetHeight]);
					}else {
						isImpact(2, impactType, objArr[attr][i], size);
						isImpact(3, impactType, objArr[attr][i], size);
						isImpact(5, impactType, objArr[attr][i], size);
						if(impactType == monster_moveLock && !_isUnbeatable) {
							isImpact(4, child_moveLock, [oChild.offsetLeft, oChild.offsetTop], [oChild.offsetWidth, oChild.offsetHeight]);
						}
						if(impactType == buff_moveLock){
							isImpact(6, child_moveLock, [oChild.offsetLeft, oChild.offsetTop], [oChild.offsetWidth, oChild.offsetHeight]);
						}
						if(leaveCheck(impactType["objMoveArr"])) {	
							if(impactObj["brick"]) {	//brick;
								if(impactOff["brickJumpTopLock"]) {	//������ײ;
									down = false;
								}else {		//�����ײ;
									directArr[attr][i] ++;
								}
							}
							if(impactObj["stone"]) {	//stone;
								directArr[attr][i] ++;
							}
							if(impactObj["pipe"]) {		//pipe;
								if(impactOff["pipeJumpLock"]) {	//������ײ;
									down = false;
								}else {		//�����ײ;
									directArr[attr][i] ++;
								}
							}
						}else {		//û����ײ;
							if(objArr[attr][i]) {
								if(objArr[attr][i][1] + size[1] < 500 - _positionBottom) {		//�ж��Ƿ��ڿ���;
									down = true;
								}else if(objArr[attr][i][1] + size[1] >= 500 - _positionBottom){	//û���ڿ���;
									objArr[attr][i][1] = 500 - _positionBottom - size[1];
									down = false;
								}
							}
						}
						if(objArr[attr][i]) {
							if(down) {
								objArr[attr][i][1] += downSpeed;
							}else {
								if(directArr[attr][i] % 2 == 1) {	//����������ƶ�;
									objArr[attr][i][0] -= speed;
								}else {	//����������ƶ�;
										objArr[attr][i][0] += speed;
								}
							}
						}
					}
				}
			}
		}
	}
	/*
		��Ϸֹͣ��ʼ����;
	*/
	function stopGame() {		
		document.addEventListener("keypress", press, false);
	}
	/*
		��Ϸֹͣ����ʵ��;
	*/
	function press(e) {
		var event = e || window.event;
		if(event.charCode == "104") {	//�жϵ�ǰ�����Ƿ���H;
			if(_lock) {
				clearInterval(timer);	//�����ʱ��;
				clearInterval(monsterMoveTimer);	//��������˶���ʱ��;
				clearInterval(buffMoveTimer);	//���buff�˶���ʱ��;
				clearInterval(objMoveTimer);
				_lock = false; //��ͼ���������лᶯ������ȫ��ֹͣ�˶�;
			}else {
				interval();		//������ʱ��;
				objCheck();	//������ʱ��;
				_lock = true;
			}
		}
	}
	/*
		��Ϸ����;
		timer: ��Ϸ����ʱ��ʱ������;
		objTimer: canvas�˶���ʱ��;
		impactType: ��ײ����;
	*/
	function gameover(timer, objTimer, impactType) {
		var elem = oLoading.getElementsByTagName("span")[0],
			timeout = null,
			_time = null;
		clearInterval(timer);
		clearInterval(operateTimer);
		document.removeEventListener("keydown", walk, false);	//����߶�����;
		document.removeEventListener("keyup", stop, false);		//���ֹͣ����;
		document.removeEventListener("keypress", press, false);	//�������̧�𿪹�;
		if(impactType == 4) {
			clearInterval(objTimer);
			jumpLock = true;
			isHug = false;
			isRun = false;
			died();
			if(!isMute) {
				aMusic[0].pause();
				aMusic[0].load();	//���¼�������;
				aMusic[1].src = music["died"];
				aMusic[1].play();
			}
			timeout = setTimeout(function() {
				oChild.style.transition = "";
				oChild.style.transform = "rotate(0)";
				diedDetail(elem);
				timeout = null;
			}, 4000);
		}else if(impactType == 7) {
			//���ﶨ����Ϸ�����յ�ʱ��һ���Զ��˶��Ĺ켣;
			var speed = 2,	//�����˶����ٶ�;
				countBottom = oMain.offsetHeight - oChild.offsetTop - oChild.height,	//������Ҫ�½��ľ���;
				endAnimationTimer = null;	//�����½��õĶ�ʱ��;
			var time = setTimeout(function() {
				endAnimationTimer = setInterval(function() {
					if(countBottom >= _positionBottom) {	//���ﻹ�ڿ��е�ʱ��;
						countBottom -= speed;
						oChild.style.bottom = countBottom + "px";
					}else {		//������غ�;
						jumpLock = true;
						isHug = false;
						isRun = true;
						if(!isMute) {
							aMusic[0].pause();
							aMusic[1].src = music["win"];
							aMusic[1].play();
						}
						oChild.style.bottom = _positionBottom + "px";
						goHome(endAnimationTimer, speed, time, elem, objTimer);
					}
				}, 1000 / 60);
			}, 1500);
		}else {
			jumpLock = true;
			isHug = false;
			isRun = false;
			clearInterval(objTimer);
			if(!isMute) {
				aMusic[0].pause();
				aMusic[0].load();	//���¼�������;
				aMusic[1].src = music["died"];
				aMusic[1].play();
			}
			timeout = setTimeout(function() {
				diedDetail(elem);
				timeout = null
			}, 2000);
		}
		_time = setTimeout(function() {
			moveLockOperate();
			time = null;
		}, 20);
	}
	/*
		������������ϸ��;
		elem: ʱ����ʾ��;
	*/
	function diedDetail(elem) {
		oTime.innerHTML = "";	//ʱ������;		
		life --;
		time = 300;
		oMain.style.display = "none";
		oInterphase.style.left = 0;
		oChild.style.left = _positionLeft + "px";
		oChild.style.bottom = _positionBottom + "px";
		if(isWin) {	//�ж��Ƿ�Ӯ����Ϸ;
			elem.style.letterSpacing = "normal";
			elem.style.fontSize = "12px";
			elem.innerHTML = "You Win!!";
			life = 3;
			document.addEventListener("keypress", _restart, false);
			oLoading.style.display = "block";
		}else if(life < 0) {	//�ж����ǲ���û��;
			elem.style.letterSpacing = "normal";
			elem.style.fontSize = "12px";
			elem.innerHTML = "Game Over";
			life = 3;
			document.addEventListener("keypress", _restart, false);
			oLoading.style.display = "block";
		}else {
			elem.innerHTML = ("x" + life);
			oLoading.style.display = "block";
			var timeout = setTimeout(function() {
				restart(elem);
				timeout = null;
			}, 1000);
		}
	}
	/*
		����Ч��;
	*/
	function died() {
		oChild.style.transition = "3s";
		oChild.style.transform = "rotate(-90deg)";
	}
	/*
		��Ϸ�ص���ʼ״̬����;
		e: �¼�����
	*/
	function _restart(e) {
		var event = e || window.event;
		if(event.charCode == 104) {
			oLoading.getElementsByTagName("span")[0].style.letterSpacing = "19px";
			oLoading.getElementsByTagName("span")[0].style.fontSize = "16px";
			oLoading.style.display = "none";
			oStart.style.display = "block";
			init();
			document.removeEventListener("keypress", _restart, false);
		}
	}
	/*
		��ײ���;
		CheckType: �������;
			1: hole;
			2: brick;
			3: stone;
			4: monster;
			5: pipe;
			6: buff;	
			7: flag;
			8: bomb;
			9: leftArea;
		impactType: �������ײ��������;
			child_moveLock
			buff_moveLock
			bomb_moveLock
		position: ����λ����Ϣ;
		size: ����Ĵ�С;
	*/
	function isImpact(checkType, impactType, position, size) {
		var area = {"left": - oInterphase.offsetLeft, "width": oMain.offsetWidth},
			pos = {},
			detail;
		pos = {
			"left": position[0],
			"bottom": oMain.offsetHeight - size[1] - position[1],
			"top": position[1],
			"width": size[0],
			"height": size[1]
		}
		switch(checkType) {
			case 1: 
				if(typeof holeCheck(area, holeArr, pos) == "object") {	//���ӵ��ж�;
					detail = holeCheck(area, holeArr, pos);
					impactType["objMoveArr"]["hole"] = true;
					if(impactType == child_moveLock) {
						oChild.style.left = ((detail["position"][1] - detail["position"][0]) / 2 + detail["position"][0] + "px");
						oChild.style.bottom = "0px";
						gameover(timer, objMoveTimer, 1);	
					}
				}
				break; 
			case 2: 
				if(typeof brickCheck(area, nodeArr[1], pos) == "object") {	//����שͷ���ж�;
					detail = brickCheck(area, nodeArr[1], pos);
					impactType["objMoveArr"]["brick"] = true;
					_brickBottom = oMain.offsetHeight - detail["element"][1] - _brickSize + _brickSize;
					if(impactType != bomb_moveLock) {
						if(detail["person"][0] + pos.width - detail["position"][0] <= 2 || detail["position"][0] + detail["size"][0] - detail["person"][0] <= 2) {	//�߲���ײ;
							impactType["moveLockArrOff"]["isBrickSide"] = true;
						}else if(detail["person"][1] < detail["position"][1]) {	//����Ƕ�����ײ;
							impactType["moveLockArrOff"]["brickJumpTopLock"] = true;
						}else {		//�ײ���ײ;
							impactType["moveLockArrOff"]["brickJumpBottomLock"] = true;
							_mysteryCheck(detail["node"], detail["position"]);
						}
					}
				}else {
					impactType["moveLockArrOff"]["brickJumpBottomLock"] = false;
					impactType["moveLockArrOff"]["brickJumpTopLock"] = false;
					impactType["objMoveArr"]["brick"] = false;
					impactType["moveLockArrOff"]["isBrickSide"] = false;
				}
				break; 
			case 3: 
				if(typeof stoneCheck(area, nodeArr[2], pos) == "object") {		//����ǽ�ļ��;
					detail = stoneCheck(area, nodeArr[2], pos);
					impactType["objMoveArr"]["stone"] = true;
					_stoneTop = detail["position"][1];	//�趨����ǽ��λ�õĸ߶�;
					if(impactType == child_moveLock) {
						if(detail["person"][1] == _positionTop) {	//�����ڵ���;
							if(detail["person"][0] <= detail["position"][0]) {
								impactType["moveLockArrOn"]["stoneGoLock"] = false;
							}else if(detail["person"][0] >= detail["position"][0] + _stoneHeight) {
								impactType["moveLockArrOn"]["stoneBackLock"] = false;
							}
						}else {	//��������;
							if(impactType == child_moveLock && !personState["child"]) {
								detail["person"][1] += 6.4;
								detail["person"][0] += 5;
								pos["width"] = 25;
								pos["height"] = 32;
							}
							if(detail["position"][1] - detail["person"][1] <= 5) {		//ǰ�����˼��;
								if(detail["person"][0] >= detail["position"][0] && detail["person"][0] - detail["position"][0] - detail["size"][0] <= 2) {	//�����ײ;
									impactType["moveLockArrOn"]["stoneBackLock"] = false;
								}else if(detail["person"][0] <= detail["position"][0] && detail["position"][0] - detail["person"][0] - pos["width"] <= 2){		//�Ҳ���ײ;
									impactType["moveLockArrOn"]["stoneGoLock"] = false;
								}
							}else {		//�޷�ǰ���ļ��;
								impactType["moveLockArrOn"]["stoneBackLock"] = true;
								impactType["moveLockArrOn"]["stoneGoLock"] = true;
							}
							if(detail["person"][1] < detail["position"][1]) {	//���ﶥ���ж�;
								impactType["moveLockArrOff"]["stoneJumpLock"] = true;
							}
							if(detail["person"][0] + pos["width"] - detail["position"][0] <= 4 || detail["position"][0] + detail["size"][0] - detail["person"][0] <= 4) {		//�߲���;
								impactType["moveLockArrOff"]["isStoneSide"] = true;
							}
						}
					}
				}else {
					impactType["objMoveArr"]["stone"] = false;
					impactType["moveLockArrOn"]["stoneGoLock"] = true;
					impactType["moveLockArrOn"]["stoneBackLock"] = true;
					impactType["moveLockArrOff"]["stoneJumpLock"] = false;
					impactType["moveLockArrOff"]["isStoneSide"] = false;
				}
				break;
			case 4:
				if(typeof monsterCheck(area, monsterArr, pos) == "object") {	//��������ļ��;
					var obj,
						abandon;
					detail = monsterCheck(area, monsterArr, pos);
					if(pos.bottom > _positionBottom || impactType == bomb_moveLock) {	//�ж������Ƿ��Ǵ������������ӵ���ײ;
						var time = null;
						if(!isMute) {
							aMusic[1].src = music["monsterMush"];
							aMusic[1].play();
						}
						impactType["objMoveArr"]["monster"] = true;
						obj = monsterArr[detail["type"]];
						for(var i = 0, len = obj.length; i < len; i ++) {
							if(obj[i][0] == detail["position"][0]) {
								abandon = i;
								clearInterval(objMoveTimer);
								break;
							}
						}
						if(impactType == child_moveLock) {
							pos.left -= 10;
							oChild.style.left = pos.left + "px";
						}
						obj.splice(abandon, 1);
						time = setTimeout(function() {
							objCheck();
							impactType["objMoveArr"]["monster"] = false;
							time = null;
						}, 200);
					}else {		//���Ǵ�����������;
						if(!_isUnbeatable && impactType == child_moveLock) {	//�����޵е����;
							if(!personState["child"]) {	//����С�˵����;
								_isUnbeatable = true;
								_isBomb = false;
								_childWidth /= 1.2;
								_childHeight /= 1.2;
								changeRole("child");
								oChild.width = _childWidth;
								oChild.height = _childHeight;
								var time = setTimeout(function() {
									_isUnbeatable = false;
									time = null;
								}, 1000);
							}else {	//С�������;
								if(new Date().getTime() - date >= 100) {
									gameover(timer, objMoveTimer, 4);
									date = new Date().getTime();
								}
							}	
						}
					}
				}
				break;
			case 5:
				if(typeof pipeCheck(area, object, pos) == "object") {		//����ˮ��ܵļ��;
					detail = pipeCheck(area, object, pos);
					impactType["objMoveArr"]["pipe"] = true;
					_pipeSize = detail["size"][1];
					if((pos.top + pos.height) - detail["position"][1] <= 2 && (pos.top + pos.height) - detail["position"][1] >= -1) {	//������ײ;
						impactType["moveLockArrOn"]["pipeGoLock"] = true;
						impactType["moveLockArrOn"]["pipeBackLock"] = true;
						impactType["moveLockArrOff"]["pipeJumpLock"] = true;		
					}else {	//������ײ;
						if(pos.left <= detail["position"][0]) {	//���������ײ;
							impactType["moveLockArrOn"]["pipeGoLock"] = false;
						}else {	//���������ײ;
							impactType["moveLockArrOn"]["pipeBackLock"] = false;
						}
						if(detail["person"][0] + pos.width - detail["position"][0] <= 3 || detail["position"][0] + detail["size"][0] - detail["person"][0] <= 3) {		//�߲���ײ;
							impactType["moveLockArrOff"]["isPipeSide"] = true;
						}
					}
				}else {
					impactType["objMoveArr"]["pipe"] = false;
					impactType["moveLockArrOn"]["pipeGoLock"] = true;
					impactType["moveLockArrOn"]["pipeBackLock"] = true;
					impactType["moveLockArrOff"]["pipeJumpLock"] = false;
					impactType["moveLockArrOff"]["isPipeSide"] = false;
				}
				break;
			case 6:
				if(typeof buffCheck(area, buffArr, {canvasWidth, canvasHeight, objName}, pos) == "object") {	//����buff�ļ��;
					detail = buffCheck(area, buffArr, {canvasWidth, canvasHeight, objName}, pos);
					switch(detail["type"]) {
						case "flower": _flower(deleteBuff(detail["type"], detail["position"])); 
							break;
						case "mushroom": _mushroom(deleteBuff(detail["type"], detail["position"]));
							break;
						case "star": _star(deleteBuff(detail["type"], detail["position"])); break;
					}
				};
				break;
			case 7: 
				if(typeof flagCheck(area, object, pos) == "object") {	//������˻������ӵļ��;
					impactType["objMoveArr"]["flag"] = true;
					isHug = true;
				}
				break;
			case 8: 
				if(typeof bombCheck(area, bombShooting, pos) == "object") {
					detail = bombCheck(area, bombShooting, pos);
					impactType["objMoveArr"]["bomb"] = true;
				}
				break;
			case 9: 
				_isSide = leftAreaCheck(area, pos);
				break;
			default: throw new Error("please write one argument");
		}
	}
	/*
		����ж���ť;
	*/
	function clearMove() {
		for(var attr in up) {
			up[attr][0] = false;
		}
	}
	/*
		�����������ײ���;
		obj1:{
			x: �����x����;
			y: �����y����;
			width: ����Ŀ��;
			height: ����ĸ߶�;
		}
		obj2:{
			x: �����x����;
			y: �����y����;
			width: ����Ŀ��;
			height: ����ĸ߶�;
		}
	*/
	function _isImpact(obj1, obj2) {
		return (obj1.x + obj1.width > obj2.x && obj1.x < (obj2.x + obj2.width) && obj1.y + obj1.height >= obj2.y && obj1.y <= (obj2.y + obj2.height));
	}
	/*
		�Ƿ��ڿ��ڵ��ж�;
		area: ��������ǰ��λ����Ϣ;
		holeArr: ������λ�õ�������Ϣ;
		childPos: ���ﵱǰ������λ����Ϣ;
	*/
	function holeCheck(area, holeArr, childPos) {
		for(var i = 0, len = holeArr.length; i < len; i ++) {
			if(area.left < holeArr[i][0] && (area.left + area.width) > holeArr[i][1]) {	//�ж�ÿһ�����Ƿ��ڿ�������Χ��;
				if(childPos.left > holeArr[i][0] && childPos.left < holeArr[i][1]) {	//�ж������Ƿ��ڿ��������ڵĿ���;
					if(childPos.bottom == _positionBottom) {	//�ж��Ƿ���ƽ����;
						return {
							"bol": true,
							"position": [holeArr[i][0], holeArr[i][1]]
						}
					}
				}
			}
		}
		return false;
	}
	/*
		�Ƿ�����ש����ж�;
		area: ��������ǰ��λ����Ϣ;
		nodeArr: ש���λ����Ϣ;
		childPos: ���ﵱǰ������λ����Ϣ;
	*/
	function brickCheck(area, nodeArr, childPos) {
		var children,	//ש��ѵ���Ԫ��;
			nodePosition,
			brick,		
			childPosition = {};
		for(var i = 0, len = nodeArr.length; i < len; i ++) {
			nodePosition = {
				"x": nodeArr[i]["left"],
				"y": nodeArr[i]["top"],
				"width": nodeArr[i]["width"],
				"height": nodeArr[i]["height"]
			}
			childPosition = {
				"x": childPos.left,
				"y": childPos.top,
				"height": childPos.height,
				"width": childPos.width
			}
			if(typeof stone_brick_check(area, nodeArr[i], children, childPosition, nodePosition) == "object") {	//��ײ���;
				return stone_brick_check(area, nodeArr[i], children, childPosition, nodePosition);
			}	
		}
		return false;
	}
	/*
		�Ƿ�����ǽ���ж�;
		area: ��������λ����Ϣ;
		nodeArr: ǽ��λ����Ϣ;
		childPos: �����λ����Ϣ;
	*/
	function stoneCheck(area, nodeArr, childPos) {
		var stone,
			children,
			childPosition,
			nodePosition;
		for(var attr in nodeArr) {
			stone = nodeArr[attr];
			childPosition = {
				"x": childPos.left,
				"y": childPos.top,
				"width": childPos.width,
				"height": childPos.height
			}
			nodePosition = {
				"x": stone["left"],
				"y": stone["top"],
				"width": stone["width"],
				"height": stone["height"]
			}
			if(typeof stone_brick_check(area, stone, children, childPosition, nodePosition) == "object") {
				return stone_brick_check(area, stone, children, childPosition, nodePosition);
			}
		}
		return false;
	}
	/*
		�Ƿ�����������ж�;
		area: �ɼ���λ�õ���Ϣ;
		monsterArr: �����λ����Ϣ;
		childPos: �����λ����Ϣ;
	*/
	function monsterCheck(area, monsterArr, childPos) {
		var monster,	//���Ｏ��;
			monsterPosition,
			size,
			correct = [],
			_childPos;
		for(var attr in monsterArr) {	//��ÿһ�ֹ�����һ�ж�;
			if(attr == "monsterMush" || attr == "tortoise") {
				monster = monsterArr[attr];
				if(monster.length == 0) {	//�жϿ������ڹ��������Ƿ�Ϊ��;
					continue;
				}else {
					if(attr == "monsterMush") {		//ȷ��������Ĵ�С;
						size = [33, 33];
					}else {
						size = [33, 50];
					}
					if(typeof monster_buff_check(monster, monsterPosition, _childPos, monster, childPos, size, attr) == "object") {
						return monster_buff_check(monster, monsterPosition, _childPos, monster, childPos, size, attr);
					}
				}

			}
		}
		return false;
	}
	/*
		�Ƿ�����ˮ��ܺ����ӵ��ж�;
		area: �ɼ���λ�õ���Ϣ;
		pipeArr: ˮ��ܺ����ӵ�λ����Ϣ;
		childPos: �����λ����Ϣ;
	*/
	function pipeCheck(area, pipeArr, childPos) {
		var pipe,
			height,
			pipePosition;
		for(var attr in pipeArr) {
			pipe = pipeArr[attr];
			if(attr == "pipe") {
				for(var i = 0, len = pipe["position"].length; i < len; i ++) {
					if(pipe["position"][i][0] > area.left && (area.left + area.width) > pipe["position"][i][0]) {	//�ж������Ƿ��ڿ�������Χ��;
						height = pipe["height"][0];
						if(i < 2) {
							height = pipe["height"][1];
						}
						pipePosition = {
							"x": pipe["position"][i][0], 
							"y": pipe["position"][i][1], 
							"width": pipe["width"], 
							"height": height
						}
						if(_isImpact({"x": childPos.left, "y": childPos.top, "width": childPos.width, "height": childPos.height}, pipePosition)) {
							return {
								"bol": true,
								"position": [pipePosition["x"], pipePosition["y"]],
								"size": [pipePosition["width"], pipePosition["height"]],
								"person": [childPos.left, childPos.top]
							}
						}
					}
				}
			}
		}
		return false;
	}
	/*
		�Ƿ�����buff���ж�;
		area: �ɼ���λ�õ���Ϣ;
		buff: buff��λ����Ϣ;
		buffSize: buff�Ĵ�С��Ϣ;
		childPos: �����λ����Ϣ;
	*/
	function buffCheck(area, buff, buffSize, childPos) {
		var _buff,
			index,
			width,
			height,
			position = {},
			size,
			_pos;
		for(var attr in buff) {
			_buff = buff[attr];
			if(_buff.length != 0) {	//�жϵ�ǰ��ʾbuff�Ƿ�Ϊ��;
				index = buffSize["objName"][attr];
				width = buffSize["canvasWidth"][index];
				height = buffSize["canvasHeight"][index];
				size = [width, height];
				if(typeof monster_buff_check(_buff, position, _pos, _buff, childPos, size, attr) == "object") {
					return monster_buff_check(_buff, position, _pos, _buff, childPos, size, attr);
				}
			}
		}
		return false;
	}
	/*
		�Ƿ��������ӻ���˵��ж�;
		area: �ɼ�����λ����Ϣ;
		flagArr: ���ӵ�λ����Ϣ;
		childPos: �����λ����Ϣ;
	*/
	function flagCheck(area, flagArr, childPos) {
		var flag,
			flagPosition,
			left = 6070,
			top = 119,
			width = 4,
			height = 289;
		for(var attr in flagArr) {
			if(attr == "flag") {	//�ж������Ƿ�Ϊ����;
				flag = flagArr[attr];
				if(flag["position"][0][0] > area.left && (area.left + area.width) > flag["position"][0][0]) {	//�ж������Ƿ��ڿ�������Χ��;
					flagPosition = {	//���ӵ�λ����Ϣ;
						"x": left,
						"y": top,
						"width": width,
						"height": height
					}
					if(_isImpact({"x": childPos.left, "y": childPos.top, "width": childPos.width, "height": childPos.height}, flagPosition)) {
						return {
							"bol": true,
							"position": [childPos.left, childPos.top]
						}
					}
					return false;
				}
			}
		}
	}
	/*
		�Ƿ������ӵ��ļ��;
		area: ������λ����Ϣ;
		bombArr: �ӵ�λ�ü���;
		pos: ������弯��;
	*/
	function bombCheck(area, bombArr, pos) {
		var correct = [],	//��ײ����;
			size = [17, 17],	//�ӵ���С;
			bomb;	//�ӵ���ϸ��Ϣ;
		if(bombArr.length != 0) {
			for(var i = 0, len = bombArr.length; i < len; i ++) {
				bomb = {
					"x": bombArr[i]["x"],
					"y": bombArr[i]["y"],
					"width": size[0],
					"height": size[1]
				}
				if(_isImpact({"x": pos["left"], "y": pos["top"], "width": pos["width"], "height": pos["height"]}, bomb)) {
					correct.push({
						"bol": true,
						"position": [bomb["x"], bomb["y"]],
						"index": i,
						"size": size
					});
				}
			}
			if(correct.length != 0) {
				return correct;
			}
		}
		return false;
	}
	/*
		��߽���ײ���;
		area: ������λ����Ϣ;
		pos: ����λ����Ϣ;
	*/
	function leftAreaCheck(area, pos) {
		if(pos["left"] <= area["left"]) {
			return true;
		}
	}
	/*
		��ײ����ϸ��;
		array: ��������ļ���;
		_origin: ������������;
		_target: ����������;
		origin: ����;
		target: ����;
		size: ��С;
		attr: ����;
	*/
	function monster_buff_check(array, _origin, _target, origin, target, size, attr) {
		for(var i = 0, len = array.length; i < len; i ++) {
			_origin = {
				"x": origin[i][0],
				"y": origin[i][1],
				"width": size[0],
				"height": size[1]
			}
			_target = {
				"x": target["left"],
				"y": target["top"],
				"width": target["width"],
				"height": target["height"]
			}
			if(_isImpact(_target, _origin)) {
				return {
					"bol": true,
					"position": [_origin["x"], _origin["y"]],
					"size": [size[0], size[1]],
					"type": attr
				}
			}
		}
	}
	/*
		�����Ƿ���Ҫ�뿪��ײ����ж�;
		objMoveArr: �������������Ϣ;
	*/
	function leaveCheck(objMoveArr) {
		var obj = "";
		for(var attr in objMoveArr) {
			if(objMoveArr[attr] && attr != "bomb") {
				return true;
			}
		}
		return false;
	}
	/*
		�����뿪��ײ��ķ���;
		direct: �����˶��ķ���;
		impactType: �������������;
		position: ���������λ����Ϣ;
		size: ����������С��Ϣ;
		viewport: �ӿ�λ����Ϣ;
	*/
	function leave(direct, impactType, position, size, viewport) {
		var left = position[0],	//����left;
			top = position[1],	//����top;
			bottom = oMain.offsetHeight - position[1] - size[1],	//����ĳ�ʼλ��;
			index = direct,		//����;
			speed = 4,		//���ﴹֱ�����ٶ�;
			pos = [],	//����ʵʱλ����Ϣ;
			isLR = true,	//�ж��Ƿ���Ҫ�����˶�;
			impactObj = impactType["objMoveArr"],
			impactOff = impactType["moveLockArrOff"],
			impactOn = impactType["moveLockArrOn"];
		var timer = setInterval(function() {
			bottom -= speed;
			if(impactType == child_moveLock) {	//�жϼ������Ƿ�Ϊ����;
				if(isLR) {		//�����Ҫ�����ƶ�;
					left += index;
					oChild.style.left = left + "px";
				}
				oChild.style.bottom = bottom + "px";	
			}else {	//�жϼ������Ƿ�������;
				top += speed;
			}
			pos = [left, oMain.offsetHeight - bottom - size[1]];
			if(!_isUnbeatable) {
				isImpact(1, impactType, pos, size);
			}
			isImpact(2, impactType, pos, size);
			isImpact(3, impactType, pos, size);
			isImpact(5, impactType, pos, size);
			viewport = - oInterphase.offsetLeft;
			if(leaveCheck(impactType["objMoveArr"]) || (bottom <= _positionBottom)) {	//�ж������Ƿ񵽴���ص�;
				if(impactType == child_moveLock) {
					if(bottom <= _positionBottom) {		//�ж������Ƿ��Ѿ��������;
						clearInterval(timer);
						oChild.style.bottom = _positionBottom + "px";
						jumpLock = true;
						isRun = false;
					}else if(impactOff["isBrickSide"] || impactOff["isStone"] || impactOff["isPipeSide"]){		//�ж������Ƿ��Ǳ߲���ײ;
						isLR = false;
					}else {		//�ж������Ƿ��Ƕ�����ײ;
						clearInterval(timer);
						jumpLock = true;
						isRun = false;
					}
				}
			}
		}, 1000 / 60);	
	}
	/*
		�����������ײ���Ĺ��з���;
		area: ��������λ����Ϣ;
		objArr: �ж��������Ϣ;
		children: ��ײ���ϵ���Ԫ��;
		childPosition: �����λ����Ϣ;
		nodePosition: �����λ����Ϣ;
	*/
	function stone_brick_check(area, objArr, children, childPosition, nodePosition) {
		if(area.left < (nodePosition["x"] + nodePosition["width"]) && (area.left + area.width) > nodePosition["x"]) {	//�ж������Ƿ��ڿ�������Χ��;
				var elem = [nodePosition["x"], nodePosition["y"]];
				if(_isImpact(childPosition, nodePosition)) {	//�жϿ�������Χ�ڵ����弯���Ƿ�����������ײ;
				children = objArr["node"].children;
				for(var j = 0, length = children.length; j < length; j ++) {	
					nodePosition["x"] = objArr["left"] + children[j].offsetLeft;
					nodePosition["y"] = objArr["top"] + children[j].offsetTop;
					nodePosition["width"] = children[j].offsetWidth;
					nodePosition["height"] = children[j].offsetHeight;
					if(_isImpact(childPosition, nodePosition)) {	//�жϿ�������Χ�ڵ������Ƿ�����������ײ;
						return {
							"bol": true,	//�Ƿ���ײ���ж�ֵ;
							"position": [nodePosition["x"], nodePosition["y"]],	//ש���λ����Ϣ;
							"size": [nodePosition["width"], nodePosition["height"]],	//ש��ѵĿ��;
							"person": [childPosition["x"], childPosition["y"]],	//���ﵱǰ��left & top ֵ;
							"element": elem,	//ש���Ԫ�ص�λ����Ϣ;
							"node": [children[j], objArr["node"]]
						}
					}
				}
			}
		}
	}
	/*
		�Ƿ�Ϊ�����ô�����;
		elem: ��ײԪ�����丸Ԫ�ؼ���;
		position: ��ײԪ�ص�λ����Ϣ;
	*/
	function _mysteryCheck(elem, position) {
		var	child = elem[0],
			classList = child.classList;
		if(classList.contains("mystery")) {	//�ж���ײש���Ƿ�������ש��;
			child.classList.remove("mystery");
			child.classList.add("nouse");
			for(var i = 0, len = classList.length; i < len; i ++) {		//��ײש���༯�ϱ���;
				switch(classList[i]) {
					case "money":	//���; 
						if(!isMute) {
							aMusic[1].src = music["coin"];
							aMusic[1].play();
						}
						upMotion("money", countPosition(position, object["money"]["position"]));
						break;	
					case "mushroom":	//Ģ��;
						if(personState["child"]) {
							if(!isMute) {
								aMusic[1].src = music["big"];
								aMusic[1].play();
							}
							upMotion("mushroom", countPosition(position, object["mushroom"]["position"]));
						}else {
							upMotion("flower", countPosition(position, object["flower"]["position"]));
						}
						break; 
					case "flower":	//��; 
						if(personState["adult"] || personState["cook"]) {
							upMotion("flower", countPosition(position, object["flower"]["position"]));
						}else {
							if(!isMute) {
								aMusic[1].src = music["big"];
								aMusic[1].play();
							}
							upMotion("mushroom", countPosition(position, object["mushroom"]["position"]));
						}
						break;	
					case "star":	//����; 
						upMotion("star", countPosition(position, object["star"]["position"]));
						break;	
				}
			}	
		}else if(classList.contains("special")) {	//����ש��;
			if(!isMute) {
				aMusic[1].src = music["coin"];
				aMusic[1].play();
			}
			upMotion("money", countPosition(position, object["money"]["position"]));
			oSpecialCoin.index --;
			if(oSpecialCoin.index == 0) {
				classList.remove("special");
				classList.remove("usual");
				classList.add("nouse");
			}
		}else if(classList.contains("usual")) {
			if(!personState["child"]) {
				if(!isMute) {	//��Ծ���ֲ���;
					aMusic[1].src = music["brickBreak"];
					aMusic[1].play();
				}
				child.classList.add("hidden");
			}else {
				brickAnimation(elem[0]);
			}
		}
	}
	/*
		ש���˶�����;
		elem: ����ײ��ש��;
	*/
	function brickAnimation(elem) {
		var top = elem.offsetTop,
			_y = 0,
			init = top;
		var timer = setInterval(function() {
			if(_y <= 10) {	//����;
				top --;
				elem.style.top = top + "px";
			}else if(_y <= 20) {	//�½�;
				top ++;
				elem.style.top = top + "px";
			}else {		//ֹͣ;
				clearInterval(timer);
				timer = null;
				elem.style.top = init + "px";
			}
			_y ++;
		}, 1000 / 60);
	}
	/*
		��������λ����Ϣ����;
		position: ש���λ����Ϣ;
		array: �����λ����Ϣ����;
	*/
	function countPosition(position, array) {
		for(var i = 0, len = array.length; i < len; i ++) {
			if(array[i][0] - position[0] < 32 && array[i][0] - position[0] >= 0) {	//�������ש�������λ������;
				return array[i];
			}
		}
	}
	/*
		�����������˶�;
		obj: �˶���������;
		callback: ������������Ļص�����;
	*/
	function upMotion(obj, callback) {	
		var position = callback;
		draw[obj](contextDetail, position[0], position[1]);
		buffArr[obj].push(position);
		buffDirect[obj].push(0);
		if(obj == "money") {
			buffArr[obj][buffArr[obj].length - 1].distance = 40;
		}
	}
	/*
		����ײ��buff��������ɾ��;
		elem: buff����;
		position: buffλ����Ϣ;
	*/
	function deleteBuff(elem, position) {
		for(var attr in buffArr) {	
			if(attr == elem) {
				for(var i = 0, len = buffArr[attr].length; i < len; i ++) {
					if(position[0] == buffArr[attr][i][0]) {
						buffArr[elem].splice(i, 1);
					}
				}
			}
		}
	}
	/*
		�Ե�Ǯ�����;
	*/
	function _money() {
		var inner = oScoreDate.innerHTML,
			scoreLength = 5,
			zero = "0";
		inner = (parseInt(inner) + _moneyWorth).toString();
		if(inner.length != 5) {		//�жϷ��������Ƿ���Ҫ����;
			for(var i = 0, len = scoreLength - inner.length; i < len; i ++) {
				zero += "0";
			}
			zero += inner;
			oScoreDate.innerHTML = zero;
		}
	}
	/*
		�Ե�Ģ�������;
		callback: �ص�����;
	*/
	function _mushroom(callback) {
		if(personState["child"]) {	//�ж������Ƿ�Ϊ����״̬;
			_childWidth *= 1.2;
			_childHeight *= 1.2;
			oChild.width = _childWidth;
			oChild.height = _childHeight;
			changeRole("adult");
			_isBomb = false;
		}
		callback;
	}
	/*
		�Ե��������;
		callback: �ص�����;
	*/
	function _flower(callback) {
		if(personState["adult"]) {	//�ж������Ƿ�Ϊ����״̬;
			changeRole("cooker");
			_isBomb = true;
		}
		callback;
	}
	/*
		�Ե����ǵ����;
		callback: �ص�����;
	*/
	function _star(callback) {
		_isUnbeatable = true;
		var timer = setTimeout(function() {
			_isUnbeatable = false;
		}, 10000);
		callback;
	}
	/*
		����ؼҹ���;
		animation: �����½��Ķ�����ʱ��;
		speed: �����˶����ٶȵ�;
		time: ����ؼҶ�����ʱ��;
		elem: ����Ԫ��;
	*/
	function goHome(animation, speed, time, elem, objTimer) {
		clearInterval(animation);
		animation = null;
		var left = oChild.offsetLeft,	//�����ʼλ�õ�leftֵ;
			countLeft = 6335 + 70;	//������Ҫ�˶��ľ���;
			goHomeTimer = null,		//�����˶��Ķ�ʱ��;
			index = 0,
			viewLeft = oInterphase.offsetLeft,
			_viewLeft = 6050;
			person = {
				"jump": false,
				"hug": false,
				"run": true,
				"stand": false
			};
		for(var attr in personState) {
			if(personState[attr]) {
				person["state"] = attr;
			}
		}
		isRun = true;
		goHomeTimer = setInterval(function() {
			if(left <= countLeft) {
				left += speed;
				if(viewLeft <= _viewLeft) {
					viewLeft -= speed;
					oInterphase.style.left = viewLeft + "px";
				}
				oChild.style.left = left + "px";
				contextDetail.clearRect(-oInterphase.offsetLeft, 0, oInterphase.offsetWidth, oInterphase.offsetHeight);
				loadingElement(contextDetail, {"posX": - oInterphase.offsetLeft, "posY": 0}, object, buffArr, monsterArr, bombShooting, index, person, contextChild);
				index ++;
			}else {
				clearInterval(goHomeTimer);
				oChild.style.zIndex = -1;	//�������λ������Ļ���ƶ�;
				clearInterval(objTimer);
				var timer = setTimeout(function() {
					goHomeTimer = null;
					timer = null;
					isWin = true;
					diedDetail(elem);
					timeout = null;
					time = null;
					isRun = false;
				}, 3000);	
			}
		}, 1000 / 60);
	}
	init();
}