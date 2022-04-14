'use strict'

function onInitSavedMemes() {
    getMemes()
    renderSavedMemes()
}

function getMemes() {
    gMemes = loadFromStorage(STORAGE_KEY)
}

function renderSavedMemes() {
    let strHtml = gMemes.map((img) => {
        return `<img onclick="onImgClick(this,${img.id})" class="image" src="${img.url}" alt="">`
    })
    document.querySelector('.gallery').innerHTML = strHtml.join('')
}