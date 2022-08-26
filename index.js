var form = document.getElementById('Form'), length = 0, Prime, Double, count = 0, size, previous = '', Move = '', Chosen = ''
var moveText = document.getElementById('move'), backgroundColor = document.getElementById('main'), backgroundText = document.getElementById('main'), backgroundButton = document.getElementById('backgroundButton')
var backgroundState = 0, id = null, timerId = null, extraDeclare, letRo = false, letEx = false
var moveFont = document.getElementById("move")
var cubeRotate = false, cubeExtras = false, dCh, pCh, moveMain = document.getElementById('moves')
function randInt(max) {
    return Math.floor(Math.random() * max) + 1
}
function randomChoice(Chars) {
    if (typeof Chars == String) {
        Chars = Chars.split('')
    }
    let index = Math.floor(Math.random() * Chars.length)
    return Chars[index]
}
function regularMoveGen() {
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
    previous = Chosen
    Double = document.getElementById("dCh").value
    Prime = document.getElementById("pCh").value
    dCh = randInt(Double)
    pCh = randInt(Prime)
    if (dCh == pCh && dCh == Double && pCh == Prime) {
        console.log("Stalemate Resolution!")
        if (randInt(2) == 1){
            dCh = 0
        }else{
            pCh = 0
        }
    }
    if (dCh == Double && Double > 0) {
        Chosen += 2
    }else if (pCh == Prime && Prime > 0) {
        Chosen += "'"
    }
    console.log(Chosen)
    return Chosen
}
function xyzMoveGen() {
    extraDeclare = false
    var Rotate = document.getElementById("rCh").value
    var loadedMove = regularMoveGen()
    if (document.getElementById("cubeRo").checked == true) {
        if (randInt(Rotate) == Rotate && ("X" != previous && "Y" != previous && "Z" != previous) && letRo == true) {
            letRo = false
            extraDeclare = true
            loadedMove = randomChoice("XYZ")
            previous = loadedMove
            if (dCh == Double && Double > 0) {
                loadedMove += 2
            }else if (pCh == Prime && Prime > 0) {
                loadedMove += "'"
            }
        }else{
            letRo = true
        }
    }
    return loadedMove
}
function s2() {
    if (count == length) {
        timerId = setTimeout(progDel, 30000)
        clearInterval(id)
    }else{
        clearTimeout(timerId)
        count += 1
        moveText.textContent += ' ' + regularMoveGen()
        moveMain.scrollTop = moveMain.scrollHeight
        document.getElementById('done').textContent = "Done: " + count
    }
}
function s3() {
    if (count == length) {
        timerId = setTimeout(progDel, 30000)
        clearInterval(id)
    }else{
        clearTimeout(timerId)
        count += 1
        var loadedMove = xyzMoveGen()
        if (document.getElementById("cubeEx").checked == true) {
            var Extra = document.getElementById("eCh").value
            var eCh = randInt(Extra)
            if (eCh == Extra && extraDeclare) {
                console.log("Contridection Resolution!")
                if (randInt(2) == 1) {
                    extraDeclare = false
                }
            }
            if (eCh == Extra && !extraDeclare && letEx == true) {
                letEx = false
                if (randInt(2) == 1) {
                    loadedMove = randomChoice("MES")
                    if (dCh == Double && Double > 0) {
                        loadedMove += 2
                    }else if (pCh == Prime && Prime > 0) {
                        loadedMove += "'"
                    }
                }else{
                    loadedMove = previous + "w"
                    if (dCh == Double && Double > 0) {
                        loadedMove += 2
                    }else if (pCh == Prime && Prime > 0) {
                        loadedMove += "'"
                    }
                }
            }else{
                letEx = true
            }
        }
        moveText.textContent += ' ' + loadedMove
        moveText.scrollTop = moveText.scrollHeight
        document.getElementById('done').textContent = "Done: " + count
    }
}
function scramble() {
    document.getElementById("proggers").style.display = "block"
    console.clear()
    clearInterval(id)
    moveText.textContent = ''
    length = parseInt(document.getElementById("length").value)
    console.log(size)
    console.log(length)
    document.getElementById('total').textContent = "Total: " + length
    document.getElementById('done').textContent = "Done: 0"
    previous = ''
    count = 0
    if (length > 9000) {
        console.log("IT'S OVER 9000!!!")
    }
    sizeScrambleStart()
}
function valueSelect() {
    document.getElementById('length').value = Math.floor(Math.random() * 21) + 10
    document.getElementById('dCh').value = randInt(7) + 1
    document.getElementById('pCh').value = randInt(5) + 3
}
function backgroundChange() {
    if (backgroundState == 1) {
        console.log('Changing Background to Dark Mode!')
        backgroundColor.style.backgroundColor = 'black'
        backgroundText.style.color = 'white'
        document.getElementById('backgroundButton').textContent = 'Light Mode'
        backgroundState = 0
    }else {
        console.log('Changing Background to Light Mode!')
        backgroundColor.style.backgroundColor = 'white'
        backgroundText.style.color = 'black'
        document.getElementById('backgroundButton').textContent = 'Dark Mode'
        backgroundState = 1
    }
}
function progDel() {
    document.getElementById("proggers").style.display = "none"
    console.log("Begone THOT!!!")
}
function startFunct() {
    if (loadCheck == 0) {
        sizeCheck()
        valueSelect()
        scramble()
        loadCheck = 1
    }
}
function sizeCheck() {
    size = parseInt(document.querySelector('input[type="radio"]:checked').value)
    if (size > 2) {
        document.getElementById("extra").style.display = "block"
    }else{
        document.getElementById("extra").style.display = "none"
        document.getElementById("cubeRo").checked = false
        document.getElementById("cubeEx").checked = false
        extrasUpdate()
    }
}
function extrasUpdate() {
    if (document.getElementById("cubeRo").checked == true) {
        document.getElementById("cubeRotate").style.display = "block"
        document.getElementById("rCh").required = true
        cubeRotate = true
    }else{
        document.getElementById("cubeRotate").style.display = "none"
        document.getElementById("rCh").required = false
        cubeRotate = false
    }
    if (document.getElementById("cubeEx").checked == true) {
        document.getElementById("cubeExtras").style.display = "block"
        document.getElementById("eCh").required = true
        cubeRotate = true
    }else{
        document.getElementById("cubeExtras").style.display = "none"
        document.getElementById("eCh").required = false
        cubeRotate = false
    }
}
function sizeScrambleStart() {
    if (size == 2) {
        id = setInterval(s2, 1)
    }else if (size == 3) {
        id = setInterval(s3, 1)
    }else{
    document.getElementById("moves").textContent = "Size is not supported!"    
    }
}
var loadCheck = 0
document.getElementById("main").addEventListener("load", startFunct())
