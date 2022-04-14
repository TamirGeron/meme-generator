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

function createMeme(id) {
    gMeme = {
        selectedImgId: id,
        url: `meme-imgs/${id}.jpg`,
        selectedLineIdx: 0,
        lines: [{
            txt: 'Add text',
            size: 100,
            align: 'center',
            color: '#ffffff',
            line: 1,
            font: 'impact',
            isDrag: false,
            pos: {
                x: gElCanvas.width / 2,
                y: gElCanvas.height / 2
            }
        }]
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
    gMeme.lines.push({
        txt: 'Add text',
        size: getFontSize(),
        align: 'center',
        color: getColor(),
        line: line,
        font: getFont(),
        pos: {
            x: gElCanvas.width / 2,
            y: gElCanvas.height / 2
        }
    })
    gMeme.selectedLineIdx++;
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
    gMeme.lines[gMeme.selectedLineIdx].rect = rect
    gCtx.beginPath()
    gCtx.lineWidth = 5
    gCtx.setLineDash([6])
    gCtx.rect(rect.xStr, rect.yStr, rect.xEnd, rect.yEnd)
    gCtx.stroke()
}

function changeAlign(val) {
    gMeme.lines[gMeme.selectedLineIdx].align = val
}

function getLineIndex(clickedPos) {
    const { x, y } = clickedPos
    let lineIdx = -1
    gMeme.lines.forEach((line, index) => {
        let rect = line.rect
        if (
            x > rect.xStr - 100 &&
            y < rect.yStr + 100 &&
            x < rect.xStr + rect.xEnd + 100 &&
            y > rect.yStr - rect.yEnd - 100
        ) lineIdx = index
    })
    return lineIdx
}

function setTextDrag(isDrag, lineIdx = gMeme.selectedLineIdx) {
    gMeme.lines[lineIdx].isDrag = isDrag
    gMeme.selectedLineIdx = lineIdx
    renderMeme()
}

function getText() {
    return gMeme.lines[gMeme.selectedLineIdx]
}

function moveText(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}