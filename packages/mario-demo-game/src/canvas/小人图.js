function drawChild(context, x, y) {
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
	drawCircle(context, x -= 1, y -= 3, 1, 3); //(32, 14)
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
}