'use strict'

let gCtx
let gElCanvas

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
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.fillStyle = line.color
        gCtx.textAlign = line.align
        gCtx.fillText(line.txt, gElCanvas.width / 2, gElCanvas.height * line.line / 5)
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

function renderColor() {
    document.querySelector('#color').value = gMeme.lines[gMeme.selectedLineIdx].color

}