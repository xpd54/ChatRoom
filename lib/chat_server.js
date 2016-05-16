var socketio = require('socket.io');
var io;
var guestNumber = 1;
var nickNames = {};
var namesUsed = [];
var currentRoom = {};

exports.listen = function(server) {
	io = socketio.listen(server);
	io.set('log level', 1);

	io.sockets.on('connection', function (socket) {
		guestNumber = assignGuestName(socket, guestNumber, nickNames, nameUsed);
		joinRoom(socket, 'Lobby');
		handleMessageBroadcasting(socket, nickNames);
		handleNameChangeAttemtpts(socket, nickNames, nameUsed);
		handleRoomJoining(socket);
		socket.on('room', function() {
			socket.emit('room', io.sockets.mnager.rooms);
		})
		handleClientDisconnection(socket, nickNames, nameUsed);
	});
};
