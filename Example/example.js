var trackSocket = new vwc.Socket( 'localhost:2020', { autoReconnect: true });


trackSocket.on('open', function ( e ) {

	console.log('[open]');

	console.log(trackSocket.info);
});


trackSocket.on('message', function ( msg, e ) {

	console.log('[message]');

	console.log(msg);
});


trackSocket.on('reconnect', function ( msg, e ){

	console.log('[reconnected]');
});


trackSocket.on('close', function ( e ) {

	console.log('[close]');
});


trackSocket.on('error', function ( e ) {

	console.log('[error]');
});




