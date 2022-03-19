const http = require('http').createServer()
const io = require('socket.io')(http, {
    cors: { origin: "*" }
})


const users = {}

io.on('connection', (socket) => {

    socket.on('login', (name) => {
        users[socket.id] = name
        io.emit('users', users)
    })


    socket.on('disconnect', () => {        
        delete users[socket.id]
        io.emit('users', users)
    })


    socket.on('message', ({ id, msg, isImg }) => {
        io.to(id).emit('message', { id: socket.id, msg, isImg})
    })
})

http.listen(3003, () => console.log("listening on 3003"))