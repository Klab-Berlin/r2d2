var testSocket = new Socket( 'localhost:2020', { autoReconnect: true });


testSocket.on('open', function ( e ) {

  console.log('[open]');


  testSocket.on('message', function ( msg, e ) {

    console.log('[message]');
    console.log(msg);
  });


  testSocket.on('reconnect', function ( msg, e ) {

    console.log('reconnected');
  });


  testSocket.on('close', function ( e ) {

    console.log('[close]');
  });


  testSocket.on('error', function ( e ) {

    console.log('[error]');
  });

});



