// получаем сокет
const socket = io()

// получаем все элименты
const messages = document.querySelector('.messages')

// получаем форму
const form = document.querySelector('.form')

// получаем input
const input = document.querySelector('.input')

// получаем имя
const nameBlock = document.querySelector('.name')

// для внесения имени пользователя
const userName = prompt('Введите Ваше имя: ')
nameBlock.innerHTML = `${userName}`

// обработка формы
form.addEventListener('submit', (e) => {
    e.preventDefault()

    if (input.value) {
        socket.emit('chat message', {
            message: input.value,
            name: userName
        })
        input.value = ''
    }
})

// принимаем данные от сервера на фронте
socket.on('chat message', (data) => {
// выодим что получили от сервера
    const item = document.createElement('li')
    item.innerHTML = `<span>${data.name}</span>: ${data.message}`
// выводим данные на html
    messages.appendChild(item)
    window.scrollTo(0, document.body.scrollHeight)
})