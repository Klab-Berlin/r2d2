// Namespace Handling
if ( !window.vwc ) window.vwc = {};

/**
 *  vwc.Socket
 *  ==========
 *
 *  A wrapper for the WebSocket client.
 *
 *  - info
 *  - .on()
 *  - .send()
 *  - .reconnect()
 */


vwc.Socket = (function(){


	var config = {

			retryTimer:	5000
		},

		WEBSOCKET_STATES = {

			'connecting'	:	0,
			'open'			:	1,
			'closing'		:	2,
			'closed'		:	3
		};


	/**
	 *  vwc.Socket - Wrapper Constructor
	 *
	 *  @param { Object }	params		- configuration for this socket
	 */
	var Socket = function ( params ) {

		this.config = params;

		this.info = {

			duration	: null,		// Dauer der Verbindung
			lastPing	: null,		//
			latency		: null,		//
			bandwidth	: null,		//
			extensions	: null,		// gzip ?
			reconnected	: false		// list of reconnections
		};

		connect.call( this );
	};


	/**
	 *  Creating the socket for connection
	 */
	function connect() {

		var config = this.config,
			socket;

		try {

			if ( config.server ) {

				socket = new WebSocket( 'ws://' + config.server );

			} else {

				socket = new WebSocket( 'ws://' + config.url + ':' + config.port,
											config.protocol || null );
			}

		} catch ( e ) {

			console.log( '[error] - ' + e );

			// if ( config.autoReconnect )  this.reconnect();
		}

		this.socket = socket;

		init.call( this, config.autoReconnect );
	}


	/**
	 *  [init description]
	 *  @param  {[type]} autoReconnect [description]
	 *  @return {[type]}               [description]
	 */
	function init ( autoReconnect ) {

		var socket	= this.socket,
			events	= [ 'open', 'message', 'close', 'error' ],
			handler = this.handler || {};	// reconnect

		for ( var i = 0, l = events.length; i < l; i++ ) {

			if ( !this.handler ) handler[ events[i] ] = [];
			socket.addEventListener( events[i],	handle );
		}

		if ( autoReconnect ) {

			handler.close.push( this.reconnect.bind( this ) );
		}

		if ( !this.handler ) {

			handler.reconnect = [];
			this.handler = handler;
		}

		function handle ( e ) {

			// console.log('[' + e.type + ']');
			var channel = handler[ e.type ];

			if ( channel.length ) {

				for ( var i = 0, l = channel.length; i < l; i++ ) {

					channel[i]( e );
				}
			}
		}
	}


	/**
	 *  [on description]
	 *  @param  {[type]}   topic    [description]
	 *  @param  {Function} callback [description]
	 *  @return {[type]}            [description]
	 */
	Socket.prototype.on = function ( topic, callback ) {

		callback = decode( callback );

		this.handler[ topic ].push( callback );
	};


	/**
	 *  [reconnect description]
	 *  @param  {[type]} e [description]
	 *  @return {[type]}   [description]
	 */
	Socket.prototype.reconnect = function ( e ) {

		if ( this.reconnectID ) return;

		// connection still there - manual reconnection
		if ( this.socket.readyState !== WEBSOCKET_STATES['closed']  ) {

			this.socket.close();
		}

		this.reconnectID = setInterval( reconnect.bind(this),	this.config.retryTimer ||
																config.retryTimer );
	};


	/**
	 *  [reconnect description]
	 *  @return {[type]} [description]
	 */
	function reconnect(){

		if (	this.socket.readyState !== WEBSOCKET_STATES['connecting'] &&
				this.socket.readyState !== WEBSOCKET_STATES['open']				) {

			// console.log('[ try reconnection ]');
			connect.call( this, this.config );

		} else {

			clearInterval( this.reconnectID );
			delete this.reconnectID;
		}
	}


	/**
	 *  [decode description]
	 *  @param  {Function} callback [description]
	 *  @return {[type]}            [description]
	 */
	function decode ( callback ) {

		return function ( e ) {

			var msg = e.data;

			if ( msg !== void 0 ) {

				try {

					msg = JSON.parse(msg);

				} catch ( err ) {

					// console.log(err);
				}

				callback( msg, e );

			} else {

				callback( e );
			}
		};
	}


	/**
	 *  [send description]
	 *  @param  {[type]} msg [description]
	 *  @return {[type]}     [description]
	 */
	Socket.prototype.send = function ( msg ) {

		msg = JSON.stringify(msg);

		this.socket.send( msg );
	};


	return Socket;

})();



	/**
	 * Unsubscribe callbacks from a topic.

	 * @param  {String}		topic		- topic of which listeners should be removed
	 * @param  {Function}	callback	- specific callback which should be removed
	 */
