var Socket = function(socket, onopen){
	var connection = new WebSocket(socket);

	connection.onopen = function(){
		onopen();
	};

	var onmessage = function(fn) {
		connection.onmessage = fn;
	};
	
	var onclose = function(fn) {
		connection.onclose = fn;
	};

	var send = function(data){
		connection.send(data);
	};

	return { onmessage:onmessage, send:send };
};