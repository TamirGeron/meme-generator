'use strict'

let gImg

function onInit() {
    createImgs()
    renderGallery()
    onInitMeme()
}

function createImgs() {
    gImg=[]
    for(let i=1;i<25;i++) {
        gImg.push(createImg(i))
    }
}

function createImg(idx) {
    return {
        id: idx,
        url: `meme-imgs/${idx}.jpg`
    }
}