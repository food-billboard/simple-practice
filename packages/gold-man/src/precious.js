function Create() {};
Create.prototype = {
	_type: ["g", "s" , "d", "m"],
	/*worth:
		gold: 1.50;
			  2.100;
			  3.200;
			  4.400;
		stone: 1.5;
			  2.10;
			  3.20;
			  4:40;
		diamond: 800;
		mystery: 1.100;
				 2.500;
				 3.speed ++;
				 4.time ++
	*/
	/*speed:
		初始速度是: 1 1000 / 60;
		gold: 1. 0.9
			  2. 0.7
			  3. 0.5
			  4. 0.3
		stone: 1. 0.9
				2. 0.6
				3. 0.3
				4. 0.1
		diamond: 0.9
		mystrey: 1. 0.6
				 2. 0.3
	*/
	_retNumForArea: function(maxNum,minNum){                          //生成在一个范围内的随机数;
		var x = Math.floor(Math.random()*(maxNum-minNum+1)+minNum);
		return x;
	},
	init: function(type) {	//初始化;
		this.x = Math.ceil(Math.random() * 420);//物体x坐标;
		if(this.x >= 90 && this.x <= 250) {	//物体y坐标;
			this.y = this._retNumForArea(320, 31);
		}else {
			this.y = Math.floor(Math.random() * 320);
		}
		this.type = type//物体类型;
		this.size = Math.floor(Math.random() * 4);//物体大小;
		this.goldSpeed = [0.9, 0.7, 0.5, 0.3];	//黄金拖动速度;
		this.stoneSpeed = [0.9, 0.6, 0.3, 0.1];	//石头拖动速度;
		this.diamondSpeed = [0.9];	//钻石拖动速度;
		this.mysterySpeed = [0.6, 0.3];	//神秘礼包拖动速度;
	},	
	_text: function(context, type, size) {		//文字填充;
		context.rect(this.x, this.y, size, size);
		context.stroke();
		context.fill();
		context.fillStyle = "black";
		context.fillText(type[this.type], this.x + (size / 2), this.y + (size / 2));
	},
	draw: function(context) {
		var size = (this.size + 1) * 20;	//物体宽高;
		context.textAlign = "right";
		switch(this.type) {		//物体类型判断;
			case 0:		//黄金;
				context.beginPath();
				context.fillStyle = "#ffe10c";
				context.strokeStyle = "#b6853d";
				context.lineWidth = "2";
				this._text(context, this._type, size);
				break;
			case 1:		//石头;
				context.beginPath();
				context.fillStyle = "#929390";
				context.strokeStyle = "#9c8b63";
				context.lineWidth = "1";
				this._text(context, this._type, size);
				break;
			case 2:		//钻石;
				context.beginPath();
				context.fillStyle = "#76dcdb";
				context.strokeStyle = "#b6853d";
				context.lineWidth = "1";
				this._text(context, this._type, 20);
				break;
			case 3:		//神秘礼包;
				context.beginPath();
				context.fillStyle = "#f5f2b8";
				context.strokStyle = "#6a4605";
				context.lineWidth = "1";
				this._text(context, this._type, 40);
				break;
			default: console.log("你有毛病");
		}
	},
	move: function(context, moveX, moveY, width, height) {		//物体运动;
		context.clearRect(0, 0, width, height);
		this.x += moveX;
		this.y += moveY;
	},
	_getWorth: function(price) {
		switch(this.size) {
			case 0: return price;break;
			case 1:	return price * 2;break;
			case 2:	return price * 4;break;
			case 3:	return price * 8;break;
		}
	},
	getWorth: function() {
		switch(this.type) {
			case 0: return this._getWorth(50); break;
			case 1:	return this._getWorth(5); break;
			case 2:	return 800; break;
			case 3:	
				var worth = Math.floor(Math.random() * 4);
				switch(worth) {
					case 0: return 100; break;
					case 1:	return 700; break;
					case 2: return "speed"; break;
					case 3: return "time"; break;
				};
				break;
		}
	},
	getPosition: function() {		//获取位置;
		return [this.x, this.y];
	},
	getType: function() {		//获取类型;
		return this.type;
	},
	getSize: function() {
		switch(this.getType()) {
			case 0: return (this.size + 1) * 20;
			case 1:	return (this.size + 1) * 20;
			case 2:	return 20;
			case 3:	return 40;
		}
	},
	getSpeed: function() {	//获取拖动速度;
		switch(this.type) {
			case 0: return this.goldSpeed[this.size];
			case 1:	return this.stoneSpeed[this.size];
			case 2:	return this.diamondSpeed[0];
			case 3:	return this.mysterySpeed[Math.floor(Math.random() * 2)];
		}
	}
}