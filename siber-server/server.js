const http = require('http').createServer()
const io = require('socket.io')(http, {
    cors: { origin: "*" }
})



io.on('connection', (socket) => {
    console.log(socket.id + " connected");
})

http.listen(3001, () => console.log("listening on 3001"))