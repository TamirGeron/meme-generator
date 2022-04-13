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
            color: '#ffffff',
            line: 1
        }
        ]
    }
}

function getColor() {
    return document.querySelector('#color').value
}

function getFontSize() {
    return gMeme.lines[gMeme.selectedLineIdx].size
}

function getLine() {
    return gMeme.lines[gMeme.selectedLineIdx].line
}

function changeColor() {
    let color = getColor()
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function changeFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].size += diff;
}

function changeTxt() {
    let txt = document.querySelector('#text').value
    gMeme.lines[gMeme.selectedLineIdx].txt = txt

}

function addLine() {
    if (gMeme.lines.length === 5) {
        alert('You can\'t make more lines')
        return
    }
    gMeme.lines.push({
        txt: 'Add text',
        size: getFontSize(),
        align: 'center',
        color: getColor(),
        line: getLine() + 1
    })
    gMeme.selectedLineIdx++;
}

function changeLine(diff) {
    let line = gMeme.lines[gMeme.selectedLineIdx].line + diff
    if (line === 0 || line === 5) return
    gMeme.lines[gMeme.selectedLineIdx].line = line
}

function changetxtIdx() {
    let txtIdx = gMeme.selectedLineIdx + 1
    if (txtIdx === gMeme.lines.length) txtIdx = 0
    gMeme.selectedLineIdx = txtIdx
    renderColor()
}

function deleteLine() {
    if (gMeme.lines.length === 1) {
        gMeme.lines[gMeme.selectedLineIdx].txt = ''
        return
    }
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
}