// В терминале вводим: node server.js и нажимаем Enter.add
// После запуска сервера открываем браузер
// Вводим localhost: 3000
// Переходим в чат

// подключаем expres
const express = require('express')
const app = express()

// протокол для сокитов
const http = require('http').createServer(app)

// подключаем сокет
const io = require('socket.io')(http)

// создаем запрос
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/visual/visual.html')
})

// подключаем стили
app.use(express.static(__dirname + '/styles'))

// подключаем lavascript код
app.use(express.static(__dirname + '/main'))


// выполняем connection
io.on('connection', (socket) => {
    socket.on('chat message', (data) => {
// обрабатываем и возвращаем обратно на frontend
        io.emit('chat message', {
            message: data.message,
            name: data.name
        })
    })
})

http.listen(process.env.PORT || 3000, () => {
    console.log('server is running')
})