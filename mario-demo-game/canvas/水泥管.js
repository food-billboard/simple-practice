function drawPipe(context, x, y, type) {
	//Í·
	context.fillStyle = "#00ad00";
	context.moveTo(x, y); //(0, 0)
	context.rect(x, y, 65.5, 22.5);
	context.fill();
	context.stroke();
	//½Ó¿Ú
	context.beginPath();
	context.fillStyle = "#030004";
	context.rect(x += 2, y += 22.5, 61, 2);//(2, 22.5)
	context.fill();
	//µ×
	context.beginPath();
	context.fillStyle = "#89cf14";
	var height = 41.5
	if(type == 1) {
		height = 105.5;
	}
	context.rect(x, y += 2, 61, height); //(2, 24.5)
	context.fill();
	context.stroke();
}