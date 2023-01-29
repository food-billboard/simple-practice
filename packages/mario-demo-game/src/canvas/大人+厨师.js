var adult = {
	0: "#ff9b44",
	1: "#da2802",
	2: "#837604",
	3: "#e0a73e",
	4: "#867106",
	5: "#000",
	6: "#857400",
	7: "#837604",
	8: "#dc2b02",
	9: "#ff8a4c",
	10: "#fd9d39"
},
cooker = {
	0: "#ff9b44",
	1: "#FAFB90",
	2: "#ef4209",
	3: "#e0a73e",
	4: "#ef4209",
	5: "#000",
	6: "#ca4c15",
	7: "#ff3105",
	8: "#ffe0ba",
	9: "#ff8a4c",
	10: "#fd9d39"
}
var draw = {
people: function(context, x, y, colorArr) {	//厨师和大人;
			context.beginPath();
			//头
			context.fillStyle = colorArr[0];
			context.moveTo(x += 18, y += 16.5); //(18, 16.5)
			context.lineTo(x += 33, y); //(51, 16.5)
			context.lineTo(x, y += 1.5); //(51, 18)
			context.lineTo(x += 13.5, y += 7.5); //(64.5, 25.5)
			context.lineTo(x -= 11, y += 10.5); //(55.5, 36)
			context.lineTo(x -= 36, y); //(19.5, 36)
			context.lineTo(x -= 3, y -= 18); //(16.5, 18)
			context.lineTo(x += 2.5, y -= 1.5); //(18, 16.5)
			context.fill();
			context.stroke();
			//帽子
			context.beginPath();
			context.fillStyle = colorArr[1];
			context.moveTo(x -= 3, y -= 1.5); //(15, 15)
			context.lineTo(x, y += 1.5); //(15, 16.5)
			context.lineTo(x += 42, y); //(57, 16.5)
			context.lineTo(x, y -= 1.5); //(57, 15)
			context.lineTo(x -= 7.5, y); //(49.5, 15)
			context.lineTo(x -= 7.5, y -= 10.5); //(42, 4.5)
			context.lineTo(x -= 12, y); //(30, 4.5)
			context.lineTo(x -= 15, y += 10.5); //(15, 15)
			context.stroke();
			context.fill();
			//头发
			context.beginPath();
			context.fillStyle = colorArr[2];
			context.moveTo(x += 3, y += 1.5); //(18, 16.5)
			context.lineTo(x += 4.5, y); //(22.5, 16.5)
			context.lineTo(x, y += 3); //(22.5, 19.5)
			context.quadraticCurveTo(x - 7.5, y + 3, x, y += 6); //(22.5, 25.5)
			context.quadraticCurveTo(x - 7.5, y - 3, x -= 4.5, y -= 9); //(18, 16.5)
			context.fill();
			context.stroke();
			//耳朵
			context.beginPath();
			context.fillStyle = colorArr[3];
			context.moveTo(x -= 1.5, y += 1.5); //(16.5, 18)
			context.lineTo(x += 1.5, y += 7.5); //(18, 25.5)
			context.quadraticCurveTo(x - 7.5, y - 4.5, x -= 1.5, y -= 7.5); //(16.5, 18)
			context.fill();
			context.stroke();
			//胡子
			context.beginPath();
			context.fillStyle = colorArr[4];
			context.moveTo(x += 33, y += 7.5); //(49.5, 25.5)
			context.quadraticCurveTo(x - 7.5, y + 4.5, x += 10.5, y += 3); //(60, 28.5)
			context.lineTo(x -= 3, y += 3); //(57, 31.5)
			context.lineTo(x -= 10.5, y); //(46.5, 31.5)
			context.quadraticCurveTo(x + 7.5, y - 3, x += 3, y -= 6); //(49.5, 25.5)
			context.fill();
			context.stroke();
			//眼睛
			context.beginPath();
			context.fillStyle = colorArr[5];
			this._drawCircle(context, x -= 1.5, y -= 4.5, 1.5, 4.5); //(48, 21)
			context.fill();
			//身体
			context.beginPath();
			context.fillStyle = colorArr[6];
			context.moveTo(x -= 18.5, y += 15); //(19.5, 36)
			context.lineTo(x += 18.5, y); //(48, 36)
			context.lineTo(x, y += 1.5); //(48, 37.5)
			context.lineTo(x += 9, y); //(57, 37.5)
			context.lineTo(x += 6, y += 6); //(63, 43.5)
			context.lineTo(x -= 10.5, y += 6); //(52.5, 49.5)
			context.lineTo(x -= 3, y += 6); //(49.5, 55.5)
			context.lineTo(x -= 6, y); //(43.5, 55.5)
			context.lineTo(x -= 7.5, y -= 4.5); //(36, 51)
			context.lineTo(x -= 3, y); //(33, 51)
			context.lineTo(x -= 7.5, y += 4.5); //(25.5, 55.5)
			context.lineTo(x -= 6, y); //(19.5, 55.5)
			context.lineTo(x += 3, y -= 6); //(22.5, 49.5)
			context.lineTo(x -= 10.5, y -= 9); //(18, 43.5)
			context.lineTo(x += 7.5, y -= 7.5); //(19.5, 36)
			context.fill();
			context.stroke();
			//脚
			context.beginPath();
			context.fillStyle = colorArr[7];
			context.moveTo(x, y += 21.5); //(19.5, 55.5)
			context.lineTo(x += 6, y); //(25.5, 55.5)
			context.lineTo(x += 1.5, y += 6); //(27, 61.5)
			context.lineTo(x -= 16.5, y); //(10.5, 61.5)
			context.lineTo(x += 9, y -= 6); //(19.5, 55.5)
			context.moveTo(x += 25, y); //(43.5, 55.5)
			context.lineTo(x += 6, y); //(49.5, 55.5)
			context.lineTo(x += 12, y += 6); //(61.5, 61.5)
			context.lineTo(x -= 21, y); //(42, 61.5)
			context.lineTo(x += 1.5, y -= 6); //(43.5, 55.5)
			context.fill();
			context.stroke();
			//背心
			context.beginPath();
			context.fillStyle = colorArr[8];
			context.moveTo(x -= 20, y -= 18.5); //(12.5, 39)
			context.lineTo(x += 3, y); //(15.5, 39)
			context.lineTo(x, y += 6); //(15.5, 45)
			context.quadraticCurveTo(x + 15, y + 7.5, x += 22.5, y -= 4.5); //(38, 40.5)
			context.lineTo(x += 3, y); //(41, 40.5)
			context.lineTo(x -= 3, y += 6); //(38, 46.5)
			context.quadraticCurveTo(x + 7.5, y + 9, x += 1.5, y += 12); //(39.5, 58.5)
			context.lineTo(x -= 6, y); //(33.5, 58.5)
			context.lineTo(x -= 7.5, y -= 4.5); //(26, 54)
			context.lineTo(x -= 3, y); //(23, 54)
			context.lineTo(x -= 7.5, y += 4.5); //(15.5, 58.5)
			context.lineTo(x -= 9, y); //(9.5, 58.5)
			context.lineTo(x, y -= 6); //(9.5, 52.5)
			context.lineTo(x += 3, y -= 6); //(12.5, 46.5)
			context.lineTo(x, y -= 7.5); //(12.5, 39)
			context.stroke();
			context.fill();
			//纽扣
			context.beginPath();
			context.fillStyle = colorArr[9];
			context.arc(x += 1.5, y += 12, 1.5, Math.PI * 2, false); //(14, 51)
			context.arc(x += 21, y, 1.5, Math.PI * 2, false); //(35, 51)
			context.stroke();
			context.fill();
			//手
			context.beginPath();
			context.fillStyle = colorArr[10];
			context.moveTo(x -= 31, y -= 6.5); //(12, 43.5)
			context.lineTo(x += 10.5, y += 6); //(22.5, 49.5)
			context.lineTo(x -= 12, y += 4.5); //(10.5, 54)
			context.lineTo(x += 1.5, y -= 10.5); //(12, 43.5)
			context.moveTo(x += 40.5, y += 7); //(52.5, 49.5)
			context.lineTo(x += 10.5, y -= 6); //(63, 43.5)
			context.lineTo(x += 1.5, y += 10.5); //(64.5, 54)
			context.lineTo(x -= 10.5, y -= 4.5); //(52.5, 49.5)
			context.fill();
			context.stroke();
		},
		_drawCircle: function(context, x, y, a, b) {	//椭圆的绘制方法;	
			var r = (a > b) ? (1 / a) : (1 / b);
			context.moveTo(x + r, y);
			for(var i = 0, len = Math.PI * 2; i < len; i += r) {
				context.lineTo(x + a * Math.cos(i), y + b * Math.sin(i));
			}
		},
		child: function(context, x, y) {	//小人;
			context.beginPath();
			//头
			context.fillStyle = "#ff9b44";
			context.moveTo(x += 12, y += 11); //(12, 11)
			context.lineTo(x += 22, y); //(34, 11)
			context.lineTo(x, y += 1); //(34, 12)
			context.lineTo(x += 9, y += 5); //(43, 17)
			context.lineTo(x -= 6, y += 7); //(37, 24)
			context.lineTo(x -= 24, y); //(13, 24)
			context.lineTo(x -= 2, y -= 12); //(11, 12)
			context.lineTo(x += 1, y -= 1); //(12, 11)
			context.fill();
			context.stroke();
			//帽子
			context.beginPath();
			context.fillStyle = "#da2802";
			context.moveTo(x -= 2, y -= 1); //(10, 10)
			context.lineTo(x, y += 1); //(10, 11)
			context.lineTo(x += 28, y); //(38, 11)
			context.lineTo(x, y -= 1); //(38, 10)
			context.lineTo(x -= 5, y); //(33, 10)
			context.lineTo(x -= 5, y -= 7); //(28, 3)
			context.lineTo(x -= 8, y); //(20, 3)
			context.lineTo(x -= 10, y += 7); //(10, 10)
			context.stroke();
			context.fill();
			//头发
			context.beginPath();
			context.fillStyle = "#837604";
			context.moveTo(x += 2, y += 1); //(12, 11)
			context.lineTo(x += 3, y); //(15, 11)
			context.lineTo(x, y += 2); //(15, 13)
			context.quadraticCurveTo(x - 5, y + 2, x, y += 4); //(15, 17)
			context.quadraticCurveTo(x - 5, y - 2, x -= 3, y -= 6); //(12, 11)
			context.fill();
			context.stroke();
			//耳朵
			context.beginPath();
			context.fillStyle = "#e0a73e";
			context.moveTo(x -= 1, y += 1); //(11, 12)
			context.lineTo(x += 1, y += 5); //(12, 17)
			context.quadraticCurveTo(x - 5, y - 3, x -= 1, y -= 5); //(11, 12)
			context.fill();
			context.stroke();
			//胡子
			context.beginPath();
			context.fillStyle = "#867106";
			context.moveTo(x += 22, y += 5); //(33, 17)
			context.quadraticCurveTo(x - 5, y + 3, x += 7, y += 2); //(40, 19)
			context.lineTo(x -= 2, y += 2); //(38, 21)
			context.lineTo(x -= 7, y); //(31, 21)
			context.quadraticCurveTo(x + 5, y - 2, x += 2, y -= 4); //(33, 17)
			context.fill();
			context.stroke();
			//眼睛
			context.beginPath();
			context.fillStyle = "#000";
			this._drawCircle(context, x -= 1, y -= 3, 1, 3); //(32, 14)
			context.fill();
			//身体
			context.beginPath();
			context.fillStyle = "#857400";
			context.moveTo(x -= 19, y += 10); //(13, 24)
			context.lineTo(x += 19, y); //(32, 24)
			context.lineTo(x, y += 1); //(32, 25)
			context.lineTo(x += 6, y); //(38, 25)
			context.lineTo(x += 4, y += 4); //(42, 29)
			context.lineTo(x -= 7, y += 4); //(35, 33)
			context.lineTo(x -= 2, y += 4); //(33, 37)
			context.lineTo(x -= 4, y); //(29, 37)
			context.lineTo(x -= 5, y -= 3); //(24, 34)
			context.lineTo(x -= 2, y); //(22, 34)
			context.lineTo(x -= 5, y += 3); //(17, 37)
			context.lineTo(x -= 4, y); //(13, 37)
			context.lineTo(x += 2, y -= 4); //(15, 33)
			context.lineTo(x -= 7, y -= 4); //(8, 29)
			context.lineTo(x += 5, y -= 5); //(13, 24)
			context.fill();
			context.stroke();
			//脚
			context.beginPath();
			context.fillStyle = "#837604";
			context.moveTo(x, y += 13); //(13, 37)
			context.lineTo(x += 4, y); //(17, 37)
			context.lineTo(x += 1, y += 4); //(18, 41)
			context.lineTo(x -= 11, y); //(7, 41)
			context.lineTo(x += 6, y -= 4); //(13, 37)
			context.moveTo(x += 16, y); //(29, 37)
			context.lineTo(x += 4, y); //(33, 37)
			context.lineTo(x += 8, y += 4); //(41, 41)
			context.lineTo(x -= 14, y); //(28, 41)
			context.lineTo(x += 1, y -= 4); //(29, 37)
			context.fill();
			context.stroke();
			//背心
			context.beginPath();
			context.fillStyle = "#dc2b02";
			context.moveTo(x -= 14, y -= 13); //(15, 24)
			context.lineTo(x += 2, y); //(17, 24)
			context.lineTo(x, y += 4); //(17, 28)
			context.quadraticCurveTo(x + 10, y + 5, x += 15, y -= 3); //(32, 25)
			context.lineTo(x += 2, y); //(34, 25)
			context.lineTo(x -= 2, y += 4); //(32, 29)
			context.quadraticCurveTo(x + 5, y + 6, x += 1, y += 8); //(33, 37)
			context.lineTo(x -= 4, y); //(29, 37)
			context.lineTo(x -= 5, y -= 3); //(24, 34)
			context.lineTo(x -= 2, y); //(22, 34)
			context.lineTo(x -= 5, y += 3); //(17, 37)
			context.lineTo(x -= 4, y); //(13, 37)
			context.lineTo(x, y -= 4); //(13, 33)
			context.lineTo(x += 2, y -= 4); //(15, 29)
			context.lineTo(x, y -= 5); //(15, 24)
			context.stroke();
			context.fill();
			//纽扣
			context.beginPath();
			context.fillStyle = "#ff8a4c";
			context.arc(x += 1, y += 8, 1, Math.PI * 2, false); //(16, 32)
			context.arc(x += 14, y, 1, Math.PI * 2, false); //(30, 32)
			context.stroke();
			context.fill();
			//手
			context.beginPath();
			context.fillStyle = "#fd9d39";
			context.moveTo(x -= 22, y -= 3); //(8, 29)
			context.lineTo(x += 7, y += 4); //(15, 33)
			context.lineTo(x -= 8, y += 3); //(7, 36)
			context.lineTo(x += 1, y -= 7); //(8, 29)
			context.moveTo(x += 27, y += 4); //(35, 33)
			context.lineTo(x += 7, y -= 4); //(42, 29)
			context.lineTo(x += 1, y += 7); //(43, 36)
			context.lineTo(x -= 7, y -= 3); //(35, 33)
			context.fill();
			context.stroke();
//			this._add([x, y, canvasWidth[6], canvasHeight[6]]);
		},
}