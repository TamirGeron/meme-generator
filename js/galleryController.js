'use strict'



function renderGallery() {
    // let strHtml = ``
    let strHtml = gImg.map((img) => {
        return `<img onclick="onImgClick(this,${img.id})" class="image" src="${img.url}" alt="">`
    })
    document.querySelector('.gallery').innerHTML = strHtml.join('')
}

function onImgClick(elImg, id) {
    let elGal = document.querySelector('.gallery')
    elGal.classList.remove("grid")
    elGal.classList.add("display-none")
    let elCan = document.querySelector('.canvas-container')
    elCan.classList.remove("display-none")
    elCan.classList.add("flex")
    onInitMeme(id, elImg)
}

function createImgs() {
    gImg = []
    for (let i = 1; i < 25; i++) {
        gImg.push(createImg(i))
    }
}

function createImg(idx) {
    return {
        id: idx,
        url: `meme-imgs/${idx}.jpg`
    }
}