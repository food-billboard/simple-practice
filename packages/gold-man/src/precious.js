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
		��ʼ�ٶ���: 1 1000 / 60;
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
	_retNumForArea: function(maxNum,minNum){                          //������һ����Χ�ڵ������;
		var x = Math.floor(Math.random()*(maxNum-minNum+1)+minNum);
		return x;
	},
	init: function(type) {	//��ʼ��;
		this.x = Math.ceil(Math.random() * 420);//����x����;
		if(this.x >= 90 && this.x <= 250) {	//����y����;
			this.y = this._retNumForArea(320, 31);
		}else {
			this.y = Math.floor(Math.random() * 320);
		}
		this.type = type//��������;
		this.size = Math.floor(Math.random() * 4);//�����С;
		this.goldSpeed = [0.9, 0.7, 0.5, 0.3];	//�ƽ��϶��ٶ�;
		this.stoneSpeed = [0.9, 0.6, 0.3, 0.1];	//ʯͷ�϶��ٶ�;
		this.diamondSpeed = [0.9];	//��ʯ�϶��ٶ�;
		this.mysterySpeed = [0.6, 0.3];	//��������϶��ٶ�;
	},	
	_text: function(context, type, size) {		//�������;
		context.rect(this.x, this.y, size, size);
		context.stroke();
		context.fill();
		context.fillStyle = "black";
		context.fillText(type[this.type], this.x + (size / 2), this.y + (size / 2));
	},
	draw: function(context) {
		var size = (this.size + 1) * 20;	//������;
		context.textAlign = "right";
		switch(this.type) {		//���������ж�;
			case 0:		//�ƽ�;
				context.beginPath();
				context.fillStyle = "#ffe10c";
				context.strokeStyle = "#b6853d";
				context.lineWidth = "2";
				this._text(context, this._type, size);
				break;
			case 1:		//ʯͷ;
				context.beginPath();
				context.fillStyle = "#929390";
				context.strokeStyle = "#9c8b63";
				context.lineWidth = "1";
				this._text(context, this._type, size);
				break;
			case 2:		//��ʯ;
				context.beginPath();
				context.fillStyle = "#76dcdb";
				context.strokeStyle = "#b6853d";
				context.lineWidth = "1";
				this._text(context, this._type, 20);
				break;
			case 3:		//�������;
				context.beginPath();
				context.fillStyle = "#f5f2b8";
				context.strokStyle = "#6a4605";
				context.lineWidth = "1";
				this._text(context, this._type, 40);
				break;
			default: console.log("����ë��");
		}
	},
	move: function(context, moveX, moveY, width, height) {		//�����˶�;
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
	getPosition: function() {		//��ȡλ��;
		return [this.x, this.y];
	},
	getType: function() {		//��ȡ����;
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
	getSpeed: function() {	//��ȡ�϶��ٶ�;
		switch(this.type) {
			case 0: return this.goldSpeed[this.size];
			case 1:	return this.stoneSpeed[this.size];
			case 2:	return this.diamondSpeed[0];
			case 3:	return this.mysterySpeed[Math.floor(Math.random() * 2)];
		}
	}
}