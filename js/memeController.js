'use strict'

let gCtx
let gElCanvas
let gMaxTxtLines = 5

function onInitMeme() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    resizeCanvas()
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}

function renderMeme() {
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
    }
    renderMeme()
}

function renderSettings() {
    document.querySelector('#color').value = gMeme.lines[gMeme.selectedLineIdx].color
    document.querySelector('#font').value = gMeme.lines[gMeme.selectedLineIdx].color
}