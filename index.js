//Variables are started for almost every function to work
var form = document.getElementById('Form'), length = 0, Prime, Double, count = 0, size, previous = '', Move = '', Chosen = ''
var moveText = document.getElementById('move'), backgroundColor = document.getElementById('main'), backgroundText = document.getElementById('main'), backgroundButton = document.getElementById('backgroundButton')
var backgroundState = 0, id = null, timerId = null, extraDeclare, letRo = false, letEx = false, truePre = ""
var moveFont = document.getElementById("move")
var cubeRotate = false, cubeExtras = false, dCh, pCh, moveMain = document.getElementById('moves')
//This just reduces keys pressed to just reduce errors for many aspects
function randInt(max) {
    return Math.floor(Math.random() * max) + 1
}
//Makes the final deciding factor for every size, small and simple
function randomChoice(Chars) {
    if (typeof Chars == String) {
        Chars = Chars.split('')
    }
    let index = Math.floor(Math.random() * Chars.length)
    return Chars[index]
}
//Main scrambler with basic rules to stop opposite/same face moves
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
    console.log(Chosen + "-" + count)
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
    return Chosen
}
//Simple move genorator, with steroids for larger sizes
function xyzMoveGen() {
    extraDeclare = false
    var Rotate = document.getElementById("rCh").value
    //Familiar?
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
//Size 2x2 cube scrambler, the basic of basics, made before the 3x3 when I didn't know how much JavaBS I would have to deal with
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
//Size 3x3 cube scrambler, if (you.haveNoClue.onHowThisWorks() == true) {console.log("Me too kid, me too.")}
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
                    let Move = []
                    if (truePre == 'U' || truePre == 'D') {
                        Move.push("E")
                    }
                    if (truePre == 'F' || truePre == 'B') {
                        Move.push("S")
                    }
                    if (truePre == 'L' || truePre == 'R') {
                        Move.push("M")
                    }
                    let posMove = new Set(["M", "E", "S"])
                    for (let x = 0; x < Move.length; x++) {
                        if (posMove.has(Move[x])) {
                            posMove.delete(Move[x])
                        }
                    }
                    if (Move.length < 1) {alert ("Fuck!")}
                    loadedMove = randomChoice((Array.from(posMove)).join(''))
                    if (loadedMove == "M") {
                        previous = "R"
                    }else if (loadedMove == "E") {
                        previous = "D"
                    }else if (loadedMove == "S") {
                        previous = "B"
                    }
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
        truePre = loadedMove.split('')[0]
        moveText.scrollTop = moveText.scrollHeight
        document.getElementById('done').textContent = "Done: " + count
    }
}
//Scrambling prep handler, it's whats called when you enter the form
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
//Creates random numbers for the main values when called
function valueSelect() {
    document.getElementById('length').value = Math.floor(Math.random() * 21) + 10
    document.getElementById('dCh').value = randInt(7) + 1
    document.getElementById('pCh').value = randInt(5) + 3
}
//Button handler for the Dark/Light mode switcher, easy and small
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
//When scrambling there is a live progress report for how much scrambling is done, when the scrambling is complete there is 30 seconds before hiding it from the screen
function progDel() {
    document.getElementById("proggers").style.display = "none"
    console.log("Begone THOT!!!")
}
//Loaded upon startup to whow what goes where
function startFunct() {
    if (loadCheck == 0) {
        sizeCheck()
        valueSelect()
        scramble()
        loadCheck = 1
    }
}
//Just updates the form and size value when another size is selected
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
//This shows/hides extra values depending on what extra options are available
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
//This is what calls the sized scrambling, changes based on what sized is selected
function sizeScrambleStart() {
    if (size == 2) {
        id = setInterval(s2, 1)
    }else if (size == 3) {
        id = setInterval(s3, 1)
    }else{
    document.getElementById("moves").textContent = "Size is not supported!"    
    }
}
//Finishing touches to show the product of this hellscape I call "Programming"
var loadCheck = 0
document.getElementById("main").addEventListener("load", startFunct())
