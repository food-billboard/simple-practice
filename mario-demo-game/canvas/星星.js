function drawStar(context, x, y) {
	//Îå½ÇÐÇ
	context.beginPath();
	context.fillStyle = "#fd9840";
	context.strokeStyle = "black";
	context.moveTo(x, y += 10); //(0, 10)
	context.lineTo(x += 7, y += 6); //(7, 16)
	context.lineTo(x -= 7, y += 14); //(0, 30)
	context.lineTo(x += 15, y -= 10); //(15, 20)
	context.lineTo(x += 15, y += 10); //(30, 30)
	context.lineTo(x -= 7, y -= 14); //(23, 16)
	context.lineTo(x += 7, y -= 6); //(30, 10)
	context.lineTo(x -= 10, y); //(20, 10)
	context.lineTo(x -= 5, y -= 10); //(15, 0)
	context.lineTo(x -= 5, y += 10); //(10, 10)
	context.stroke();
	context.fill();
	//ÑÛ¾¦
	context.beginPath();
	context.fillStyle = "#548300";
	context.rect(10, 12, 1, 4); //(10, 12)
	context.rect(17, 12, 1, 4); //(17, 12)
	context.fill();
}