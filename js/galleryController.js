'use strict'



function renderGallery() {
    // let strHtml = ``
    let strHtml = gImg.map((img) => {
        return `<img onclick="onImgClick(this,${img.id})" class="image" src="${img.url}" alt="">`
    })
    document.querySelector('.gallery').innerHTML = strHtml.join('')
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