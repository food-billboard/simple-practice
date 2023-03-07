function drawMushroom(context, x, y) {
	context.beginPath();
	context.fillStyle = "#ff9b3e";
	//Í·
	context.moveTo(x, y += 16.5); //(0, 16.5)
	context.lineTo(x, y += 1); //(0, 17.5)
	context.lineTo(x += 33, y); //(33, 17.5)
	context.lineTo(x, y -= 1); //(33, 16.5)
	context.lineTo(x-= 15, y -= 16.5);
	context.lineTo(x -= 3, y); //(15, 0)
	context.lineTo(x -= 15, y += 16.5);
	context.fill();
	context.stroke();
	//°ß
	context.fillStyle = "#de2e00";
	context.arc(x += 7, y, 3, Math.PI * 2, false); //(7, 16.5)
	context.arc(x += 10, y -= 13.5, 2, Math.PI * 2, false); //(17, 3)
	context.rotate(30);
	context.rect(x += 10, y += 13.5, 3, 2); //(27, 16.5)
	context.rotate(-30);
	context.fill();
	//¸ù
	context.beginPath();
	context.fillStyle = "#e32902";
	context.moveTo(x -= 17, y += 1); //(10, 17.5)
	context.lineTo(x, y += 15.5); //(10, 33)
	context.lineTo(x += 13, y); //(23, 33)
	context.lineTo(x, y -= 15.5); //(23, 17.5)
	context.lineTo(x -= 13, y);
	context.fill();
	context.stroke();
}