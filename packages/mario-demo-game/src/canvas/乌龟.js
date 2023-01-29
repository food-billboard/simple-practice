function drawTortoise(context, x, y) {
	//Í·
	context.fillStyle = "#fe9a44";
	context.moveTo(x , y += 19); //(0, 19)
	context.lineTo(x, y += 2); //(0, 21)
	context.quadraticCurveTo(x + 5, y - 5, x += 8, y -= 4); //(8, 17)
	context.quadraticCurveTo(x + 5, y + 5, x -= 5, y += 7); //(3, 24)
	context.lineTo(x += 5, y += 4); //(8, 28)
	context.lineTo(x += 6, y -= 9); //(14, 19)
	context.lineTo(x, y -= 12); //(14, 7)
	context.lineTo(x -= 6, y -= 3); //(8, 4)
	context.lineTo(x -= 8, y += 15); //(0, 19)
	context.stroke();
	context.fill();
	//±Ç×Ó
	context.beginPath();
	context.fillStyle = "#726f12";
	context.rect(x += 2, y -= 4, 2, 2); //(2, 15)
	context.fill();
	context.stroke();
	//ÑÛ°×
	context.beginPath();
	context.fillStyle = "#fff8f8";
	drawCircle(context, x += 5, y -= 10, 3, 10); //(7, 5)
	context.fill();
	context.stroke();
	//ÑÛ¾¦
	context.beginPath();
	context.fillStyle = "#2f8d1d";
	context.rect(x -= 2.5, y -= 2, 2, 6); //(4.5, 3)
	context.stroke();
	context.fill();
	//¹ê¿Ç
	context.beginPath();
	context.fillStyle = "#00b200";
	context.moveTo(x += 9.5, y += 14); //(14, 17)
	context.lineTo(x += 10, y); //(24, 17)
	context.quadraticCurveTo(x + 5, y + 9, x += 4, y += 18); //(28, 35)
	context.lineTo(x -= 18, y); //(10, 35)
	context.quadraticCurveTo(x - 5, y - 9, x += 4, y -= 18); //(14, 17)
	context.stroke();
	context.fill();
	//°ßµã
	context.beginPath();
	context.fillStyle = "#9ece47";
	context.strokeStyle = "#9ece47";
	context.lineWidth = 2;
	context.moveTo(x -= 6, y += 11); //(8, 28)
	context.lineTo(x += 11, y += 8); //(19, 36)
	context.moveTo(x -= 5, y -= 19); //(14, 17)
	context.lineTo(x += 14, y += 18); //(28, 35)
	context.moveTo(x -= 18, y); //(10, 35)
	context.lineTo(x += 9, y -= 18); //(19 17)
	context.moveTo(x += 5, y); //(24, 17)
	context.lineTo(x -= 7, y += 19); //(17, 36)
	context.stroke();
	//½Å
	context.beginPath();
	context.lineWidth = 1;
	context.strokeStyle = "#000";
	context.fillStle = "#ff9c37";
	context.translate(x -= 7, y -= 1);
	context.rotate(20);
	drawCircle(context, 0, 0, 6, 3); //(10, 37)
	context.rotate(-20);
	context.translate(- x, - y);
	context.translate(x += 14, y += 4);
	context.rotate(-20);
	drawCircle(context, 0, 0, 3, 6); //(24, 41) 
	context.rotate(20);
	context.translate(- x, - y);
	context.fill();
	context.stroke();
}
