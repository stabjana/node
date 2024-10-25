# documentation for server programming

## node

- https://nodejs.org/en
- https://nodejs.org/docs/latest-v20.x/api/index.html
  release-versions:

- https://nodejs.org/about/previous-releases

http (protocoll for reaching the server and browser (also other protocolls))
bla
file system

other documentation we need:

## http

- https://en.wikipedia.org/wiki/HTTP
- https://developer.mozilla.org/en-US/docs/Web/HTTP
- https://developer.mozilla.org/en-US/docs/Web

- HTTP headers
  - https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
- HTTP request methods
  - https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
- HTTP response status codes (example 404, 200 (no prpblems))
  - https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

headers are hidden in express, they are there but we cant see them

## List of TCP and UDP port numbers

if you want to open the port to the server from outside
used is apache server (then you dont have to open the port to the world)

we need it because we are creating
and we create local server that isnt visible to outside

but list of reserved ports that certain programs use:
https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers

if you give a port you have to check if the port is used or not.

tipp: use port 3000-x

when we start our server we need to give a port

## los gehts...

we use first and older version with common JS module system (nodes old system)
because we can import more easily with the require
then go to ES6 system
