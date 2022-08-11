let form = document.getElementById('Form')
let length = 0
let Prime = false
let Double = false
let count = 0
let size = 3
let previous = ''
let Move = ''
let Chosen = ''
let moveText = document.getElementById('move')
let backgroundColor = document.getElementById('main')
let backgroundText = document.getElementById('main')
let backgroundButton = document.getElementById('backgroundButton')
let backgroundState = 0
function randomChoice(Chars) {
    if (typeof Chars == String) {
        Chars = Chars.split('')
    }
    let index = Math.floor(Math.random() * Chars.length)
    return Chars[index]
}
function scramble() {
    console.clear()
    moveText.textContent = 'Moves:'
    length = parseInt(form[1].value)
    console.log(size)
    console.log(length)
    previous = ''
    count = 0
    if (length > 9000) {
        alert ("IT'S OVER 9000!!!")
    }
    while (length > count) {
        count += 1
        if (previous == 'U' || previous == 'D') {
            Move = 'FBLR'
        }else if (previous == 'F' || previous == 'B') {
            Move = 'UDLR'
        }else if (previous == 'L' || previous == 'R') {
            Move = 'UDFB'
        }else{
            Move = 'UDFBLR'
        }
        Chosen = randomChoice(Move)
        console.log(Chosen)
        previous = Chosen
        Double = Math.floor(Math.random() * 10) > 5
        Prime = Math.floor(Math.random() * 100) > 75
        if (Double) {
            Chosen += 2
        }else if (Prime) {
            Chosen += "'"
        }
        moveText.textContent += ' ' + Chosen
    }
}
function valueSelect() {
    document.getElementById('length').value = Math.floor(Math.random() * 10) + 10
}
function backgroundChange() {
    if (backgroundState == 1) {
        console.log('Changing Background to Dark Mode!')
        backgroundColor.style.backgroundColor = 'black'
        backgroundText.style.color = 'white'
        backgroundButton.textContent = 'Light Mode'
        backgroundState = 0
    }else {
        console.log('Changing Background to Light Mode!')
        backgroundColor.style.backgroundColor = 'white'
        backgroundText.style.color = 'black'
        backgroundButton.textContent = 'Dark Mode'
        backgroundState = 1
    }
}
valueSelect()
scramble()