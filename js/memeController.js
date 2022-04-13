'use strict'

let gCtx
let gElCanvas

function onInitMeme(){
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
    let img= new Image()
    img.src= gMeme.url
    gCtx.drawImage(img,0,0,gElCanvas.width,gElCanvas.height)
    gMeme.lines.forEach((line,indx) => {
        gCtx.font = `${line.size}px Ariel`
        gCtx.fillStyle=line.color
        gCtx.textAlign=line.align
        gCtx.fillText(line.txt,gElCanvas.width / 2,gElCanvas.height*(indx+1) / 5)       
    });
}