r2d2
====

A WebSocket wrapper to ease the human-machine interaction.

_Latest Release: 0.2.0 ([changelog](https://github.com/Klab-Berlin/r2d2/blob/master/HISTORY.md))_


## Introduction

There are various WebSocket modules available via npm - but regarding Socket.IO or SockJS,
we don't need an extended server setup or to provide legacy fallbacks for older browsers.
Therefore we created this simple wrapper based on [websocket-node](https://github.com/Worlize/WebSocket-Node) - a basic implementation of the protocol - which is efficient and allows further customization.


## Info

As the other side of connection will probably call a function with the received data,
the client will encourage this [RPC](https://en.wikipedia.org/wiki/Remote_procedure_call) approach
and uses following scheme to transmit the data:

`<id> <action> <data>`


## Features

* minimal client, ~2.5kb
* no external dependecies
* supports (auto-) reconnection


## Getting Started

Include the files for the browser and node via "script/require". See the [Example](https://github.com/Klab-Berlin/r2d2/blob/master/examples) for setting up the client and server.


## Upcoming

* extensions: File handling (up- & download)
* network details


## License

Copyright (c) 2013, Klab

Distributed under [MIT License](https://github.com/Klab-Berlin/r2d2/blob/master/LICENSE).
