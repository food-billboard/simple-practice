/*
	draw.pipe(contextDetail, 5494, 371, 0); //5471
	draw.tortoise(contextDetail, 2931, 392);//386
	draw.money(contextDetail, 2753.5, 299);	//�������;
*/

var nodeArr = [],	//�����ڵ�Ԫ�ص�λ����Ϣ;
	obj = {
		"pipe": {
			"position": [[1221, 308], [1577, 308], [889, 372], [4955, 372], [5494, 372]],
			"width": 64,
			"height": [64, 128]
		},
		"flag": {
			"position": [[6051, 115]],
			"width": 32,
			"height": 32
		},
		"monsterMush":{
			"position": [[642, 403], [675, 403], [1419, 403], [1452, 403], [2318, 146], [2351, 146], [2737, 403], [2770, 403], [3316, 403], [3349, 403], [3703, 403], [3736, 403], [3893, 403], [3926, 403], [5245, 403], [5278, 403]],
			"width": 33,
			"height": 33
		},
		"tortoise": {
				"position": [[2931, 392]],
				"width": 33,
				"height": 50
		},
		"flower": {
				"position": [[2255, 274], [3220, 146]],
				"width": 33,
				"height": 33
		},
		"mushroom": {
				"position": [[675, 275], [2255, 275], [3220, 146]],
				"width": 33,
				"height": 33
		},
		"star": {
				"position": [[2964, 275]],
				"width": 30,
				"height": 34
		},
		"money": {
				"position": [[2753.5, 299], [530.5, 299], [723.5, 169], [756.5, 299], [2753, 299],[3140.5, 299], [3236.5, 299], [3332.5, 299], [3880.5, 169], [3912.5, 169], [5199.5, 299]],
				"width": 4,
				"height": 8
		}
	},
	objName = {		//ÿһ������ľ�������;
		"pipe": 0,
		"flower": 1,
		"bomb": 2,
		"mushroom": 3,
		"monsterMush": 4,
		"tortoise": 5,
		"child": 6,
		"star": 7,
		"money": 8, 
		"flag": 9
	},
	objIndex = {	//ÿһ����������;
		"hole": 1,
		"brick": 2,
		"stone": 3,
		"monster": 4,
		"fix": 5
	}
/*
	��ͼ������ļ���;
	contextDetail: ����Ļ��ƻ���;
	operate: λ����Ϣ;
	buffArr: ��������canvas��buff�����λ����Ϣ;
	monsterArr: ��������canvas��monster�����λ����Ϣ;
	bombArr: ��������canvas��bombλ����Ϣ;
	holeArr: �ӵ�λ����Ϣ;
	index: Ģ���˶�����;
	person: ����״̬����;
	childContext: ������ƻ���;
*/
function loadingElement(contextDetail, operate, obj, buffArr, monsterArr, bombArr, index, person, childContext, isUnbeatable) {
	//�������;
	
	/*var cloud = [100, 1200, 2100, 2800, 4100, 6000, 6300],	//�ƶ�λ�ü���
		green = [50, 160, 700, 1800, 3000, 3400, 6200];	//�ݴ�λ�ü���;
	var oBground = document.getElementsByClassName("main_background")[0],
		aLi = oBground.getElementsByTagName("li");
	for(var i = 0, len = aLi.length; i < len; i ++) {
		var className = aLi[i].className;
		switch(className) {
			case "green1": aLi[i].style.left = green[i % green.length] + "px"; break; 
			case "green2": aLi[i].style.left = green[i % green.length] + "px"; break;
			case "cloud": aLi[i].style.left = cloud[i % cloud.length] + "px"; break;
		}
	}*/
	var abandon = [];	//������ʱ����Ҫ������buff����;
	for(var attr in obj) {
		var object = obj[attr]["position"];
		if(attr == "pipe" || attr == "flag") {
			for(var i = 0, len = object.length; i < len; i ++) {
				if(object[i][0] > operate.posX && object[i][0] < operate.posX + 500) {	//�ж������Ƿ�����ڿ��ӷ�Χ��;
					if(attr != "pipe") {	//�ж��Ƿ��ǹܵ�;
						draw[attr](contextDetail, object[i][0], object[i][1]);
					}else {
						if(i < 2) {
							draw[attr](contextDetail, object[i][0], object[i][1], 1);
						}else {
							draw[attr](contextDetail, object[i][0], object[i][1], 0);
						}
					}
				}
			}
		}
	}
	if(bombArr.length != 0) {	//�ӵ��Ļ���;
		for(var j = 0, lenJ = bombArr.length; j < lenJ; j ++) {
			bombArr[j].move();
		}
	}
	if(person["run"]) {	//�ܶ�״̬;
		personState(person["state"], childContext, "run", isUnbeatable, index % 21);	
	}else if(person["jump"]) {	//��Ծ״̬;
		personState(person["state"], childContext, "jump", isUnbeatable, index % 21);
	}else if(person["stand"]) {		//վ��״̬;
		personState(person["state"], childContext, "stand", isUnbeatable, index % 21);
	}else if(person["hug"]){		//����״̬;
		personState(person["state"], childContext, "hug", isUnbeatable, index % 21);
	}
	loadingDetail(buffArr, operate, abandon, contextDetail, 0);	//buff����;
	loadingDetail(monsterArr, operate, abandon, contextDetail, index % 20);	//�������;
}

/*
	����״̬�ж�;
	person: �����С״̬;
	childContext: ������ƻ���;
	state: �����˶�״̬;
	isUnbeatable: �����Ƿ�Ϊ�޵�״̬;
	index: �����ܶ���ǰͼƬ;
*/
function personState(person, childContext, state, isUnbeatable, index) {
	draw["child"](childContext, isUnbeatable, person, state, index);
}
/*
	���������ͨ�÷���;
	obj: ������������;
	operate: �ӿ�λ����Ϣ;
	abandon: ����Ҫ�������Ƶ����弯��;
	context: ���ƻ���;
	index: Ģ���˶�����;
*/
function loadingDetail(obj, operate, abandon, context, index) {
	for(var attr in obj) {
		if(obj[attr].length == 0) {		//������弯��Ϊ��ʱ;
			continue;
		}else {
			var _obj = obj[attr];
			for(var i = 0, len = _obj.length; i < len; i ++) {
				if(_obj[i][0] > operate.posX && _obj[i][0] < operate.posX + 500) {	//����ڿ�������Χ��;
					if(attr == "monsterMush") {
						draw[attr](context, _obj[i][0], _obj[i][1], index);
					}else {
						draw[attr](context, _obj[i][0], _obj[i][1]);
					}
				}else {
					abandon.push(i);
				}
			}
			for(var j = 0, length = abandon.length; j < length; j ++) {		//ͳһ����Ļ����������ȡ����ʾ;
				_obj.splice(abandon[j], 1);
			}
		}
	}
}

/*
	����Ԫ��λ�����ݼ���;
*/
function loadingData() {	
	var brick = document.getElementsByClassName("main_brick")[0],	//�ϰ��︸Ԫ��;
		brickDetail = brick.getElementsByTagName("p"),
		stone = brick.getElementsByTagName("ul"),
		floorArr = [],
		brickArr = [],
		stoneArr = [];
	for(var i = 0, lenI = 4; i < lenI; i ++) {		//�ذ峤�ȼ���;
		floorArr.push(document.getElementsByClassName("main")[0].getElementsByTagName("div")[i].offsetWidth);
	}
	for(var j = 0, lenJ = brickDetail.length; j < lenJ; j ++) {		//שͷ����;
		var brickNode = brickDetail[j].children;
		for(var z = 0, lenZ = brickNode.length; z < lenZ; z ++) {
			if(brickNode[z].classList.contains("hidden")) {
				brickNode[z].classList.remove("hidden");
			}else if(brickNode[z].classList.contains("nouse")) {
				brickNode[z].classList.add("mystery");
				brickNode[z].classList.remove("nouse");
			}
		}
		brickArr[j] = {
			"node": brickDetail[j],
			"width": brickDetail[j].offsetWidth,
			"height": brickDetail[j].offsetHeight,
			"left": brickDetail[j].offsetLeft,
			"top": brickDetail[j].offsetTop
		}
		
	}
	for(var k = 0, lenK = stone.length; k < lenK; k ++) {	//�ϰ��Ｏ��;
		stoneArr[k] = {
			"node": stone[k],
			"width": stone[k].offsetWidth,
			"height": stone[k].offsetHeight,
			"left": stone[k].offsetLeft,
			"top": stone[k].offsetTop
		}
	}
	nodeArr.push(floorArr);
	nodeArr.push(brickArr);
	nodeArr.push(stoneArr);
}

