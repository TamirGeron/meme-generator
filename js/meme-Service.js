'use strict'

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
            line: 1,
            font: 'impact'
        }
        ]
    }
}

function getColor() {
    return document.querySelector('#color').value
}

function getFont() {
    return document.querySelector('#font').value
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
    let line
    let size
    if (gMeme.lines.length === gMaxTxtLines) {
        alert('You can\'t make more lines')
        return
    } else if (!gMeme.lines.length) {
        size = 100
        line = 1
    }
    else if (gMeme.lines.length === 1) {
        size = 100
        line = 5
    }
    else line = Math.round(gMaxTxtLines / 2)
    gMeme.lines.push({
        txt: 'Add text',
        size: getFontSize(),
        align: 'center',
        color: getColor(),
        line: line,
        font: getFont()
    })
    gMeme.selectedLineIdx++;
}

function changeLine(diff) {
    let line = gMeme.lines[gMeme.selectedLineIdx].line + diff
    if (line < 1 || line > 5) return
    gMeme.lines[gMeme.selectedLineIdx].line = line
}

function changetxtIdx() {
    let txtIdx = gMeme.selectedLineIdx + 1
    if (txtIdx === gMeme.lines.length) txtIdx = 0
    gMeme.selectedLineIdx = txtIdx
    renderSettings()
}

function deleteLine() {
    if (gMeme.lines.length === 1) {
        gMeme.lines[gMeme.selectedLineIdx].txt = ''
        return
    }
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx--
}

function changeFont() {
    gMeme.lines[gMeme.selectedLineIdx].font = getFont()
}

function drawRect(x, y, line) {
    let textMetrics = gCtx.measureText(line.txt);
    const rect = {
        xStr: x - 10 - textMetrics.width / 2,
        yStr: y - line.size,
        xEnd: 10 + textMetrics.width + 10,
        yEnd: line.size + 10

    }
    switch (line.align) {
        case 'right':
            rect.xStr -= textMetrics.width / 2
            break;
        case 'left':
            rect.xStr += textMetrics.width / 2
            break;
    }
    gCtx.beginPath()
    gCtx.lineWidth = 5
    gCtx.setLineDash([6])
    gCtx.rect(rect.xStr, rect.yStr, rect.xEnd, rect.yEnd)
    gCtx.stroke()
}

function changeAlign(val) {
    gMeme.lines[gMeme.selectedLineIdx].align = val
}