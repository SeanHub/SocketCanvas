var Canvas = function(){
	var socket = new Socket("ws://echo.websocket.org", function(){
		socket.onmessage(function(data) {
			parseData(data.data);
		});
	});
	
	var resizeCanvas = function(){
		document.getElementById("canvas").height = document.height;
		document.getElementById("canvas").width = document.width;
	};
	
	window.onresize = resizeCanvas;
	resizeCanvas();
	
	document.addEventListener("mousemove", function(event) {
		checkPosition(event.x, event.y);
	}, false);
	
	var checkPosition = function(x,y){
		if((x >= position.x && x <= position.x+100) && (y >= position.y && y <= position.y+100)){
			context.fillStyle = "rgb(200,0,0)";
			context.fillRect(position.x,position.y,100,100);
		}
		else {
			context.fillStyle = "rgb(0,0,0)";
			context.fillRect(position.x,position.y,100,100);
		}
	};
	
	var parseData = function(data){
		var data = JSON.parse(data);
		move(context, data.x, data.y);
	};
	
	var move = function(context, x, y){
		canvas.width = canvas.width;
		context.fillRect(x,y,100,100);
	};

	var context = document.getElementById("canvas").getContext("2d");
	context.fillRect(0,0,100,100);
	
	position = {
		x:0,
		y:0
	}
	
	document.onkeydown = function(data){
		if(position.x >= 0 && position.y >= 0 && position.x <= document.width && position.y <= document.height){
			if(data.keyCode === 40){
				if(position.y+100 < document.height){
					position.y += 10;
					socket.send(JSON.stringify(position));
					//move(context, position.x, position.y);
				}
			}
			else if(data.keyCode === 38){
				if(position.y !== 0){
					position.y -= 10;
					socket.send(JSON.stringify(position));
					//move(context, position.x, position.y);
				}
			}
			else if(data.keyCode === 37){
				if(position.x !== 0){
					position.x -= 10;
					socket.send(JSON.stringify(position));
					//move(context, position.x, position.y);
				}
			}
			else if(data.keyCode === 39){
				if(position.x+100 < document.width){
					position.x += 10;
					socket.send(JSON.stringify(position));
					//move(context, position.x, position.y);
				}
			}
		}
	};
};

window.onload = function(){
	new Canvas();
};