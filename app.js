const express = require('express');
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const dotEnv = require('dotenv').config()
const PORT = process.env.PORT || 8000

app.use(express.static(__dirname + '/public'))
app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

io.on('connection', (socket)=>{
    socket.on('sender', (data)=> {
        io.sockets.emit('sender', data)
    })    
})

http.listen(PORT, ()=>{
    console.log(`Server running on ${PORT}`)
})

/* connect
    quocthinhvo
*/