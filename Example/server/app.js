var http			= require('http'),
	WebSocketServer = require('websocket').server,
	config			= require('./config.js');


var server = http.createServer( function ( req, res ) { });

server.listen( config.port, function(){

	console.log( new Date() + ' - Server is listening on port: ', config.port );
});


var socketServer = new WebSocketServer({

	httpServer: server,
	autoAcceptConnections: false
});


socketServer.on('request', function ( req ) {

	var connection = req.accept( config.protocol, req.origin );

	connection.on('message', function ( msg ) {

		if (msg.type === 'utf8') {

            console.log('Received Message: ' + msg.utf8Data);
            connection.sendUTF(msg.utf8Data);
        }
	});

	connection.on('close', function ( e ) {
		// console.log('[close]');
		// console.log(e);
	});

	connection.on('error', function ( e ) {
		console.log('[error]');
		// console.log(e);
	});

});
