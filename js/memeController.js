'use strict'

let gCtx
let gElCanvas

const STORAGE_KEY = 'memesDB'

function onInitMeme(id) {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    getMemes()
    if (!gIsEditMeme) createMeme(id)
    gIsEditMeme = false
    addListeners()
    renderMeme()
}

function renderMeme(saveClick = false) {
    let img = new Image()
    img.src = gMeme.url
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    gMeme.lines.forEach((line, indx) => {
        let x = line.pos.x
        let y = line.pos.y
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.fillStyle = line.color
        gCtx.textAlign = line.align
        gCtx.fillText(line.txt, x, y)
        if (indx === gMeme.selectedLineIdx && !saveClick) {
            drawRect(x, y, line)
            document.querySelector('#text').value = line.txt
        }
    });
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()
    window.addEventListener('resize', () => {
        resizeCanvas()
    })
}

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    const pos = getEvPos(ev)
    let lineIdx = getLineIndex(pos)
    if (lineIdx < 0) return
    setTextDrag(true, lineIdx)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}

function onMove(ev) {
    const text = getText();
    if (!text.isDrag) return
    const pos = getEvPos(ev)
    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y
    moveText(dx, dy)
    gStartPos = pos
    
    renderMeme()
}

function onUp() {
    setTextDrag(false)
    document.body.style.cursor = 'grab'
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
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
    renderMeme(true)
    gMeme.img = gElCanvas.toDataURL()
    gMemes.push(gMeme)
    _saveMemesToStorage()
    onMemesClick()
}

function _saveMemesToStorage() {
    saveToStorage(STORAGE_KEY, gMemes)
}

function downloadCanvas() {
    renderMeme(true)
    let link = document.createElement('a');
    link.download = 'Canvas.png';
    link.href = gElCanvas.toDataURL()
    link.click();
}

