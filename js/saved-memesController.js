'use strict'

function onInitSavedMemes() {
    getMemes()
    renderSavedMemes()
}

function getMemes() {
    gMemes = loadFromStorage(STORAGE_KEY)
    if (!gMemes) gMemes = []
}

function renderSavedMemes() {
    let strHtml = gMemes.map((meme,index) => {
        return `<img onclick="onMemeClick(${index})" class="image" src="${meme.url}" alt="">`
    })
    document.querySelector('.saved-memes').innerHTML = strHtml.join('')
}

