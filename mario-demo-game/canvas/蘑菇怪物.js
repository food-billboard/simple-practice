function drawMonsterMush(context, x, y) {
	//Í·	
	context.fillStyle = "#cb5913";
	context.moveTo(x += 14, y); //(14, 0)
	context.lineTo(x += 5, y); //(19, 0)
	context.lineTo(x += 14, y += 19); //(33, 19)
	context.lineTo(x, y += 1); //(33, 20)
	context.lineTo(x -= 33, y); //(0, 20)
	context.lineTo(x, y -= 1); //(0, 19)
	context.lineTo(x += 14, y -= 19); //(14, 0)
	context.stroke();
	context.fill();
	//ÑÛ°×
	context.beginPath();
	context.fillStyle = "#ffbd9e";
	context.moveTo(x -= 4, y += 11); //(10, 11)
	context.lineTo(x, y += 7); //(10, 18)
	context.lineTo(x += 6, y); //(16, 18)
	context.lineTo(x, y -= 4); //(16, 14)
	context.lineTo(x -= 4, y -= 3); //(12, 11)
	context.lineTo(x -= 2, y); //(10, 11)
	context.moveTo(x += 13, y += 3); //(23, 14)
	context.lineTo(x += 4, y -= 3); //(27, 11)
	context.lineTo(x += 2, y += 5); //(29, 16)
	context.lineTo(x, y += 2); //(29, 18)
	context.lineTo(x -= 6, y); //(23, 18)
	context.lineTo(x, y -= 4); //(23, 14)
	context.stroke();
	context.fill();
	//Ã¼Ã«
	context.beginPath();
	context.fillStyle = "#380000";
	context.rect(x -= 15, y -= 5, 4, 2); //(8, 9)
	context.rect(x += 19, y, 4, 2); //(27, 9)
	context.fill();
	context.stroke();
	//ÑÛ¾¦
	context.beginPath();
	context.fillStyle = "#150000";
	context.rect(x -= 15, y += 1, 2, 6); //(12, 10)
	context.rect(x += 13, y, 2, 6); //(25, 10)
	context.fill();
	context.stroke();
	//±Ç×Ó
	context.beginPath();
	context.fillStyle = "#320000";
	context.rect(x -= 11, y += 10, 8, 2); //(14, 20)
	context.fill();
	context.stroke();
	//½Å
	context.beginPath();
	context.fillStyle = "#000002";
	context.moveTo(x -= 10, y += 13); //(4, 33)
	context.lineTo(x += 10.5, y); //(14.5, 33)
	context.lineTo(x, y -= 7); //(14.5, 26)
	context.quadraticCurveTo(x - 7, y + 3, x -= 10.5, y += 7); //(4, 33)
	context.moveTo(x += 16.5, y -= 7); //(20.5, 26)
	context.quadraticCurveTo(x + 7, y + 3, x += 10.5, y += 7); //(31, 33)
	context.lineTo(x -= 10.5, y); //(20.5, 33)
	context.lineTo(x, y -= 7); //(20.5, 26)
	context.stroke();
	context.fill();
	//×ì
	context.beginPath();
	context.fillStyle = "#ffc1c1";
	context.moveTo(x -= 7.5, y -= 6); //(13, 20)
	context.lineTo(x += 14, y); //(27, 20)
	context.quadraticCurveTo(x + 5, y + 5, x -= 10.5, y += 10); //(16.5, 30)
	context.quadraticCurveTo(x - 5, y - 5, x -= 3.5, y -= 10); //(13, 20)
	context.fill();
	context.stroke();
}