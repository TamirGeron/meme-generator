'use strict'

let gMeme;


function getMeme() {
    return gMeme;
}

function addText() {
    gCtx.font = '50px Arial';
    gCtx.fillStyle = "white";
    gCtx.textAlign = "center"
    gCtx.fillText('Add text', gElCanvas.width / 2, gElCanvas.height / 5);
}

function createMeme(id, elImg) {
    gMeme = {
        selectedImgId: id,
        url: elImg.src,
        selectedLineIdx: 0,
        lines: [{
            txt: 'Add text',
            size: 100,
            align: 'center',
            color: '#ffffff'
        }
        ]
    }
}

function changeColor() {
    let color = document.querySelector('#color').value
    gMeme.lines[gMeme.selectedLineIdx].color = color
    renderMeme()
}

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
    renderMeme()
}

function changeTxt() {
    let txt =document.querySelector('#text').value
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
    renderMeme()

}