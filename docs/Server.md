Server: vws.Socket.js
=====================

The server side component of the WebSocket wrapper.


## API Reference

* Socket
  - [.server](#socket-server-id-callback-)
  - [.server.config](#server-config-options-)
  - [.server.send](#server-send-msg-ids-)


## Module: Socket

### Socket: `.server( id, callback )`

Creates a new server handling connections.

* __`id`__ - { String }: ID of the server
* __`requestListener`__ - { Function | args: connection, server }: Callback on incoming request

```javascript
// Example
var test = socket.server( 'test', function( connection, server ) {
  console.log( connection.id );
});
```


***


### Server: `.config( options )`

Define custom setting for the server.

* __`options`__ - { Object }: Custom server settings

```javascript
// Example
server.config({ port: 8080 });
```


### Server: `.send( msg, [ids] )`

Sends a message to a specific ID or by default - all current connections.

* __`msg`__ - { String }: Message

* _`ids`_ - { String | Array }: Target IDs

```javascript
// Example
server.send( 'test' );
```
