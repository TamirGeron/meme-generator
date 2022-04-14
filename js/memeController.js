'use strict'

let gCtx
let gElCanvas
let gMaxTxtLines = 5

const STORAGE_KEY = 'memesDB'

function onInitMeme(id, elImg) {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
    createMeme(id, elImg)
    renderMeme()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function renderMeme() {
    console.log(gMeme);
    let img = new Image()
    img.src = gMeme.url
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    gMeme.lines.forEach((line, indx) => {
        let x = gElCanvas.width / 2
        let y = gElCanvas.height * line.line / gMaxTxtLines
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.fillStyle = line.color
        gCtx.textAlign = line.align
        gCtx.fillText(line.txt, x, y)
        if (indx === gMeme.selectedLineIdx) {
            drawRect(x, y, line)
            document.querySelector('#text').value = line.txt
        }
    });
}

function onChange(value) {
    switch (value) {
        case 'color':
            changeColor()
            break;
        case 'sizeAdd':
            changeFontSize(5)
            break;
        case 'sizeDec':
            changeFontSize(-5)
            break;
        case 'text':
            changeTxt()
            break;
        case 'addLine':
            addLine()
            break;
        case 'lineAdd':
            changeLine(1)
            break;
        case 'lineDec':
            changeLine(-1)
            break;
        case 'txtIdx':
            changetxtIdx()
            break;
        case 'delete':
            deleteLine()
            break;
        case 'fontChange':
            changeFont()
            break;
        case 'alignL':
            changeAlign('left')
            break;
        case 'alignC':
            changeAlign('center')
            break;
        case 'alignR':
            changeAlign('right')
            break;
    }
    renderMeme()
}

function renderSettings() {
    document.querySelector('#color').value = gMeme.lines[gMeme.selectedLineIdx].color
    document.querySelector('#font').value = gMeme.lines[gMeme.selectedLineIdx].color
}

function onSave() {
    gMemes.push(gMeme)
    _saveMemesToStorage()
    onMemesClick()
}

function _saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gMemes)
}