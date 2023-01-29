function drawBomb(context, x, y) {
	context.fillStyle = "#e32902";
	//¿ò
	context.moveTo(x, y += 6); //(0, 6)
	context.lineTo(x, y += 2); //(0, 8)
	context.quadraticCurveTo(3, 12, x += 7, y += 9); //(7, 17)
	context.lineTo(x += 2, y); //(9, 17)
	context.quadraticCurveTo(x + 3, y - 4, x += 8, y -= 10); //(17,7)
	context.quadraticCurveTo(x - 7, y + 8, x -= 8.5, y -= 2); //(8.5, 5)
	context.lineTo(x, y -= 2); //(8.5, 3)
	context.quadraticCurveTo(x - 4, y - 3, x -= 8.5, y += 3); //(0, 6)
	context.fill();
	context.stroke();
	//»ðÐÇ
	context.beginPath();
	context.fillStyle = "#bb3c05";
	context.translate(x += 7, y += 3.5);
	context.rotate(10);
	drawCircle(context, x - 7, y - 9.5, 6, 3);	//(7, 9.5);
	context.rotate(-10);
	context.translate(- x, - y);
	context.fill();
	//°×ÐÇ
	context.beginPath();
	context.fillStyle = "#fff7ca";
	context.rect(x -= 1, y -= 1, 1, 1); //(6, 6)
	context.fill();
}