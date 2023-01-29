function drawFlower(context, x, y) {
	//Ò¶±ú
	context.beginPath();
	context.strokeStyle = "black";
	context.fillStyle = "#00a409";
	context.moveTo(x += 8.5, y += 18.5);	//(8.5, 18.5)
	context.lineTo(x += 5, y += 14.5);	//(13.5, 33)
	context.lineTo(x += 5, y);	//(18.5, 33)
	context.lineTo(x += 4, y -= 14.5);	//(22.5, 18.5)
	context.lineTo(x -= 2, y);	//(20.5, 18.5)
	context.lineTo(x -= 3, y += 11.5); //(17.5, 30)
	context.lineTo(x, y -= 13.5); //(17.5, 16.5)
	context.lineTo(x -= 2, y); //(15.5, 16.5)
	context.lineTo(x, y += 13.5); //(15.5, 30)
	context.lineTo(x -= 5, y -= 11.5); //(10.5, 18.5)
	context.lineTo(x -= 2, y);
	context.stroke();
	context.fill();
	//°×»¨
	context.beginPath();
	context.fillStyle = "#fcffff";
	drawCircle(context, x += 8, y -= 9.5, 12.5, 6); //(16.5, 7)
	context.fill();
	//»Æ»¨
	context.beginPath();
	context.fillStyle = "#fc993c";
	drawCircle(context, x, y, 7, 3.5); //(16.5, 7)
	context.fill();
	//ÂÌ»¨
	context.beginPath();
	context.fillStyle = "#00a409";
	drawCircle(context, x, y, 2, 1); //(16.5, 7)
	context.fill();
}