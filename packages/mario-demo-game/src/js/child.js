var draw = {
	child: function(context, x, y) {
			context.beginPath();
			//头
			context.fillStyle = "#ff9b44";
			context.moveTo(x += 6, y += 7); //(6, 7)
			context.lineTo(x += 11, y); //(17, 7)
			context.lineTo(x, y += 0.5); //(17, 7.5)
			context.lineTo(x += 4.5, y += 3.5); //(21.5, 11)
			context.lineTo(x -= 3, y += 4.5); //(18.5, 15.5)
			context.lineTo(x -= 12, y); //(6.5, 15.5)
			context.lineTo(x -= 1, y -= 8); //(5.5, 7.5)
			context.lineTo(x += 0.5, y -= 0.5); //(6, 7)
			context.fill();
			context.stroke();
			//帽子
			context.beginPath();
			context.fillStyle = "#da2802";
			context.moveTo(x -= 1, y -= 0.5); //(5, 6.5)
			context.lineTo(x, y += 0.5); //(5, 7)
			context.lineTo(x += 14, y); //(19, 7)
			context.lineTo(x, y -= 0.5); //(19, 6.5)
			context.lineTo(x -= 2.5, y); //(16.5, 6.5)
			context.lineTo(x -= 2.5, y -= 4.5); //(14, 2)
			context.lineTo(x -= 4, y); //(10, 2)
			context.lineTo(x -= 5, y += 4.5); //(5, 6.5)
			context.stroke();
			context.fill();
			//头发
			context.beginPath();
			context.fillStyle = "#837604";
			context.moveTo(x += 1, y += 0.5); //(6, 7)
			context.lineTo(x += 1.5, y); //(7.5, 7)
			context.lineTo(x, y += 1.5); //(7.5, 8.5)
			context.quadraticCurveTo(x - 2.5, y + 1, x, y += 2.5); //(7.5, 11)
			context.quadraticCurveTo(x - 2.5, y - 1, x -= 1.5, y -= 4); //(6, 7)
			context.fill();
			context.stroke();
			//耳朵
			context.beginPath();
			context.fillStyle = "#e0a73e";
			context.moveTo(x -= 0.5, y += 0.5); //(5.5, 6.5)
			context.lineTo(x += 0.5, y += 4.5); //(6, 11)
			context.quadraticCurveTo(x - 2.5, y - 1.5, x -= 0.5, y -= 3.5); //(5.5, 7.5)
			context.fill();
			context.stroke();
			//胡子
			context.beginPath();
			context.fillStyle = "#867106";
			context.moveTo(x += 11, y += 3.5); //(16.5, 11)
			context.quadraticCurveTo(x - 2.5, y + 1.5, x += 3.5, y += 1); //(20, 12)
			context.lineTo(x -= 1, y += 1.5); //(19, 13.5)
			context.lineTo(x -= 3.5, y); //(15.5, 13.5)
			context.quadraticCurveTo(x + 2.5, y - 1, x += 1, y -= 2.5); //(16.5, 11)
			context.fill();
			context.stroke();
			//眼睛
			context.beginPath();
			context.fillStyle = "#000";
			this._drawCircle(context, x -= 0.5, y -= 2, 1, 3); //(16, 10)
			context.fill();


			//身体;
			context.beginPath();
			context.fillStyle = "#857400";
			context.moveTo(x -= 9.5, y += 5.5);	//(6.5, 15.5)
			context.lineTo(x += 12, y);	//(18.5, 15.5)
			context.lineTo(x, y += 8);	//(18.5, 23.5)
			context.lineTo(x -= 15.5, y);	//(3, 23.5)
			context.lineTo(x += 3.5, y -= 8);	//(6.5, 15.5)
			context.fill();
			//背心;
			context.beginPath();
			context.fillStyle = "#dc2b02";
			context.moveTo(x += 0.5, y);	//(7, 15.5)
			context.lineTo(x += 1, y);//(8, 15.5)
			context.lineTo(x += 4, y += 3);	//(12, 18.5)
			context.lineTo(x += 4, y);	//(16, 18.5)
			context.lineTo(x += 1.5, y -= 3);	//(17.5, 15.5)
			context.lineTo(x += 1, y);	//(18.5, 15.5)
			context.lineTo(x, y += 5.5);	//(18.5, 21)
			context.lineTo(x += 3.5, y);	//(22, 21)
			context.lineTo(x, y += 6.5);	//(22, 27.5)
			context.lineTo(x -= 8, y);	//(14, 27.5)
			context.lineTo(x -= 6.5, y += 4);	//(7.5, 31.5)
			context.lineTo(x -= 1.5, y);	//(6, 31.5)
			context.lineTo(x, y -= 12);	//(6, 19.5)
			context.lineTo(x += 1, y -= 4);	//(7, 15.5)
			context.fill();
			//手臂;
			context.beginPath();
			context.fillStyle = "#857400";
			context.moveTo(x, y);	//(7, 15.5)
			context.lineTo(x += 4, y += 3);	//(11, 18.5)
			context.lineTo(x -= 4, y += 5);	//(7, 23.5)
			context.lineTo(x -= 1, y -= 4);	//(6, 19.5)
			context.lineTo(x -= 3, y);	//(3, 19.5)
			context.lineTo(x += 1, y -= 4);	//(4, 15.5)
			context.lineTo(x += 3, y);	//(7, 15.5)
			context.moveTo(x += 11.5, y += 1);	//(18.5, 16.5)
			context.lineTo(x += 6, y -= 3.5);	//(24.5, 13)
			context.lineTo(x, y -= 2);	//(24.5, 11)
			context.lineTo(x -= 2, y);	//(22.5, 11)
			context.lineTo(x -= 4, y += 5.5);	//(18.5, 16.5)
			context.fill();
			//手;
			context.beginPath();
			context.fillStyle = "#fd9d39";
			context.moveTo(x -= 18, y += 2);	//(0.5, 18.5)
			context.lineTo(x += 2, y);	//(2.5, 18.5)
			context.lineTo(x -= 1.5, y += 1.5);	//(1, 20)
			context.moveTo(x += 21.5, y -= 9);	//(22.5, 11)
			context.lineTo(x += 2, y);	//(24.5, 11)
			context.lineTo(x, y += 1);	//(24.5, 12)
			context.lineTo(x -= 2, y);	//(22.5, 12)
			context.fill();
			//脚;
			context.beginPath();
			context.fillStyle = "#857400";
			context.moveTo(x -= 0.5, y += 9);	//(22, 21)
			context.lineTo(x, y += 6.5);	//(22, 27.5)
			context.lineTo(x += 2, y);	//(24, 27.5)
			context.lineTo(x, y -= 9);	//(24, 16.5)
			context.lineTo(x -= 0.5, y);	//(23.5, 16.5)
			context.lineTo(x, y += 4.5);	//(23.5, 21)
			context.lineTo(x -= 1.5, y);	//(22, 21)
			context.moveTo(x -= 16, y += 1.5);	//(6, 21.5)
			context.lineTo(x, y += 6);	//(6, 27.5)
			context.lineTo(x -= 2, y);	//(4, 27.5)
			context.lineTo(x, y += 4);	//(4, 31.5)
			context.lineTo(x -= 0.5, y);	//(3.5, 31.5)
			context.lineTo(x, y -= 10);	//(3.5, 21.5)
			context.lineTo(x += 2.5, y);	//(6, 21.5)
			context.fill();
			//纽扣;
			context.beginPath();
			context.fillStyle = "#ff8a4c";
			context.arc(x += 6, y -= 5, 1, Math.PI * 2, false); //(8, 16)
			context.arc(x += 6, y, 1, Math.PI * 2, false); //(15, 16)
			context.stroke();
			context.fill();
	},
	_drawCircle: function(context, x, y, a, b) {
			var r = (a > b) ? (1 / a) : (1 / b);
			context.moveTo(x + r, y);
			for(var i = 0, len = Math.PI * 2; i < len; i += r) {
				context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
			}
	}
}
adultStand = [
	//帽子;
	[7.2, 2.3, 12, 2.36, "#da2802"],
	[4.8, 4.7, 21.5, 2.36, "#da2802"],
	//头发;
	[4.8, 7, 7.2, 2.36, "#837604"],
	[2.4, 9.4, 2.4, 4.72, "#837604"],
	[2.4, 14.1, 4.8, 2.36, "#837604"],
	[7.2, 9.4, 2.4, 4.72, "#837604"],
	[9.6, 14.1, 2.4, 2.36, "#837604"],
	//脸;
	[4.8, 9.4, 2.4, 4.72, "#ff9b44"], 
	[12, 7, 4.8, 2.36, "#ff9b44"], 
	[9.6, 9.4, 7.2, 2.36, "#ff9b44"], 
	[19.2, 7, 2.4, 4.72, "#ff9b44"], 
	[21.5, 9.4, 4.8, 2.36, "#ff9b44"], 
	[9.6, 11.8, 9.6, 2.36, "#ff9b44"], 
	[21.5, 11.8, 7.2, 2.36, "#ff9b44"], 
	[7.2, 14.1, 7.2, 2.36, "#ff9b44"], 
	[7.2, 16.5, 19.2, 2.36, "#ff9b44"], 
	//眼睛;
	[16.8, 7, 2.4, 4.72, "black"],
	//胡子;
	[14.4, 14.1, 12, 2.36, "#867106"], 
	[19.2, 11.8, 2.4, 2.36, "#867106"],
	//身体;
	[4.8, 18.8, 16.8, 2.36, "#857400"],
	[2.4, 21.2, 24, 2.36, "#857400"],
	[0, 23.6, 28.8, 2.36, "#857400"],
	[4.8, 25.9, 2.4, 2.36, "#857400"],
	[24, 25.9, 2.4, 2.36, "#857400"],
	//衣服;
	[7.2, 25.9, 2.4, 9.44, "#dc2b02"],
	[4.8, 30.6, 2.4, 4.72, "#dc2b02"],
	[9.6, 18.8, 2.4, 16.52, "#dc2b02"],
	[12, 23.6, 2.4, 9.44, "#dc2b02"],
	[14.4, 23.6, 2.4, 9.44, "#dc2b02"],
	[16.8, 18.8, 2.4, 16.52, "#dc2b02"],
	[19.2, 25.9, 2.4, 9.44, "#dc2b02"],
	[21.5, 30.6, 2.4, 4.72, "#dc2b02"],
	//脚;
	[2.4, 33, 7.2, 2.36, "#857400"],
	[0, 35.4, 9.6, 2.36, "#857400"],
	[19.2, 33, 7.2, 2.36, "#857400"],
	[19.2, 35.4, 9.6, 2.36, "#857400"],
	//手;
	[0, 25.9, 4.8, 2.36, "#fd9d39"],
	[0, 28.3, 7.2, 2.36, "#fd9d39"],
	[0, 30.6, 4.8, 2.36, "#fd9d39"],
	[26.4, 25.9, 4.8, 2.36, "#fd9d39"],
	[24, 28.3, 7.2, 2.36, "#fd9d39"],
	[26.4, 30.6, 4.8, 2.36, "#fd9d39"],
	//纽扣;
	[9.6, 25.9, 2.4, 2.36, "#ff8a4c"],
	[16.8, 25.9, 2.4, 2.36, "#ff8a4c"]
],
_childStand = [		//小人站立;
	//帽子;
	[6, 2, 10, 2, "#da2802"], 
	[4, 4, 18, 2, "#da2802"], 
	//头发;
	[4, 6, 6, 2, "#837604"],  
	[2, 8, 2, 4, "#837604"], 
	[2, 12, 4, 2, "#837604"], 
	[6, 8, 2, 4, "#837604"], 
	[8, 12, 2, 2, "#837604"],
	//眼睛;
	[14, 6, 2, 4, "black"],
	//胡子;
	[12, 12, 10, 2, "#867106"], 
	[16, 10, 2, 2, "#867106"], 
	//脸;
	[4, 8, 2, 4, "#ff9b44"], 
	[10, 6, 4, 2, "#ff9b44"], 
	[8, 8, 6, 2, "#ff9b44"], 
	[16, 6, 2, 4, "#ff9b44"], 
	[18, 8, 4, 2, "#ff9b44"], 
	[8, 10, 8, 2, "#ff9b44"], 
	[18, 10, 6, 2, "#ff9b44"],
	[6, 12, 6, 2, "#ff9b44"],
	[6, 14, 16, 2, "#ff9b44"],
	//身体;
	[4, 16, 14, 2, "#857400"],
	[2, 18, 20, 2, "#857400"],
	[0, 20, 24, 2, "#857400"],
	[4, 22, 2, 2, "#857400"],
	[20, 22, 2, 2, "#857400"],
	//脚;
	[2, 28, 6, 2, "#857400"],
	[0, 30, 8, 2, "#857400"], 
	[16, 28, 6, 2, "#857400"],
	[16, 30, 8, 2, "#857400"],
	//手;
	[0, 22, 4, 2, "#fd9d39"],
	[0, 24, 6, 2, "#fd9d39"],
	[0, 26, 4, 2, "#fd9d39"],
	[22, 22, 4, 2, "#fd9d39"],
	[20, 24, 6, 2, "#fd9d39"],
	[22, 26, 4, 2, "#fd9d39"],
	//衣服;
	[6, 22, 2, 8, "#dc2b02"],
	[4, 26, 2, 4, "#dc2b02"], 
	[8, 16, 2, 14, "#dc2b02"],
	[10, 20, 2, 8, "#dc2b02"],
	[12, 20, 2, 8, "#dc2b02"],
	[14, 16, 2, 14, "#dc2b02"],
	[16, 22, 2, 8, "#dc2b02"],
	[18, 26, 2, 4, "#dc2b02"],
	//纽扣;
	[8, 22, 2, 2, "#ff8a4c"],
	[14, 22, 2, 2, "#ff8a4c"]
];


function getNum(array, x, y) {
	var arr;
	for(var i = 0, len = array.length; i < len; i ++) {
		arr = array[i];
		for(var j = 0, length = arr.length; j < length; j ++) {
			if(j < 4) {
				if(j % 2 == 0) {
					arr[j] = Math.floor(arr[j] * x * 10) / 10;
				}else if(j == 1){
//					arr[j] += 20;
					arr[j] = Math.floor(arr[j] * 10 * y) / 10;
				}else {
					arr[j] *= y;
				}
			}	
		}
	}
	return array;
}

