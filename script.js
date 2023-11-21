let tg = window.Telegram.WebApp
tg.expand()

tg.MainButton.textColor = "#FFFFFF"
tg.MainButton.color = "#2cab37"

let username = document.querySelector("#username")
let phone = document.querySelector("#phoneNumber")
let list = document.querySelector("#itemlist")

let name = ''
let phoneNumber = ''
let item = ''
let submit = document.querySelector("#submit")
let btn1 = document.querySelector("#btn1")
let btn2 = document.querySelector("#btn2")
let btn3 = document.querySelector("#btn3")
let btn4 = document.querySelector("#btn4")

let items = {
    meatPuncake: 0,
    cheeseCake: 0,
    sirniki: 0,
    puncake: 0,
}

btn1.onclick = () => {
    changeItems('Блинчики с мясом', 'Блинчики с мясом', 'meatPuncake')
}

btn2.onclick = () => {
    changeItems('чизкейк', 'чизкейк', 'cheesecake')
}

btn3.onclick = () => {
    changeItems('сырники', 'сырники', 'sirniki')
}
btn4.onclick = () => {
    changeItems('панкейки', 'панкейки', 'puncake')
}

submit.onclick = () => {
    tg.MainButton.setText("Нажмите на кнопку для оформления заказа!")
    tg.MainButton.show()
}

function getInfo(data) {
    let li = document.createElement("Li")
    li.innerHTML = data
    list.appendChild(li)
}

function changeItems(itemname, changeName, dictName) {
    items[dictName] += 1
    list.innerHTML = ""


    if (name != "") {
        getInfo("Ваше имя - " + name)
    }
    if (phoneNumber != "") {
        getInfo("Ваш телефон - " + phone)
    }
    for (let item in items) {
        getInfo(item + ':' + items[item])
        }
    if (tg.MainButton.isVisible) {
        tg.MainButton.hide()
    } else {
        (tg.MainButton.setText('вы преобрели ') + changeName)
        tg.MainButton.show()
    }
}

username.onchange = () => {
    name = username.value
}
phone.onchange = () => {
    phone = phone.value
}

Telegram.WebApp.onEvent("mainButtonClicked", function() {
    result = ""
    if (name != "") {
        result += "ваше имя - " + name + "\n"
    }
    if (phoneNumber != "") {
        result += "Ваш телефон - " + phoneNumber + "\n"
    }
    result += "Ваш заказ: " + "\n"
    for (let item in items) {
        if (items[item] > 0) {
            result += item + ": " + items[item] + "\n"
        }
    }
    tg.sendData(result)
})