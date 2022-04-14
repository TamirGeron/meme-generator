'use strict'

function onInitSavedMemes() {
    getMemes()
    renderSavedMemes()
}

function getMemes() {
    gMemes = loadFromStorage(STORAGE_KEY)
    if (!gMemes) gMemes=[]
}

function renderSavedMemes() {
    let strHtml = gMemes.map((meme) => {
        return `<img onclick="onMemeClick(this)" class="image" src="${meme.url}" alt="">`
    })
    document.querySelector('.saved-memes').innerHTML = strHtml.join('')
}