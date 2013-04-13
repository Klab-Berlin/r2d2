Client: Socket.js
=================

The browser module of the WebSocket wrapper.


## API Reference

* [Socket](#class-socket)
  - [.info](#socket-info)
  - [.on](#socket-on-event-callback-)
  - [.off](#socket-off-event-callback-)
  - [.send](#socket-send-action-data-)
  - [.reconnect](#socket-reconnect)


## Class: Socket

### `new Socket( server, [config] )`

Creating a new Socket object - connected to the provided server.

* __`server`__ - { String }: Address of the server
* _`config`_ - { Object }: Change the [settings](#default-settings)


```javascript
// Example
var socket = new Socket( 'localhost:8080' );
```


***


### Socket: `.info`

Show network information.

```javascript
// Example
console.log( socket.info );

// - duration: duration of the current connection
// - lastPing: ...
// - latency: ...
// - bandwidth: ...
// - extensions: ...
// - reconnected: ...
```


### Socket: `.on( event, callback )`

Attach an EventListener.

* __`event`__ - { String }: triggering event type
* __`callback`__ - { Function }: function to be executed as the event occours

```javascript
// Example
socket.on( 'reconnect', onReconnect );
```


### Socket: `.off( event, [callback] )`

Remove an EventListener.

* __`event`__ - { String }: disregarding event type
* _`callback`_ - { Function }: function to be executed as the event occours

```javascript
// Example
socket.off( 'reconnect', onReconnect );
```


### Socket: `.send( action, [data] )`

Sending data over the connection.

* __`action`__ - { String }: named action
* _`data`_ - { Object | string | number }: data to send

```javascript
// Example
socket.send( 'save', { first: 'Octo', last: 'cat' } );
```


### Socket: `.reconnect()`

Close the existing connection & reconnects.

```javascript
// Example
socket.reconnect();
```


***


### Event: `open`

`function ( e ) { }`

* __`e`__ - { Object }: Event data

Emitted on opening the connection.


### Event: `message`

`function ( msg, e ) { }`

* __`msg`__ - { Object }: Message of the data
* __`e`__ - { Object }: Original event data

Emitted on receiving a message from the server.


### Event: `reconnect`

`function ( msg, e ) { } `

* __`msg`__ - { Object }: Message of the data
* __`e`__ - { Object }: Original event data

Emitted on reconnection with the server.


### Event: `close`

`function() { }`

Emitted on closing the connection.


### Event: `error`

`function ( err ) { }`

* __`err`__ - { Object }: Error data

Emitted on error occourence.


## Default Settings

```javascript
config = {
    retryTimer    : 5000,
    autoReconnect : false,
    serialization : null
}
```

* __`retryTimer`__ - { Number }: Interval to try reconnection (milliseconds)
* __`autoReconnect`__ - { Boolean }: Flag to automatic reconnect to the server
* __`serialization`__ - { Object }: Alternative serialization format for data handling
