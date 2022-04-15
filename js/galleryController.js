'use strict'



function renderGallery() {
    // let strHtml = ``
    let strHtml = gImg.map((img) => {
        return `<img onclick="onImgClick(${img.id})" class="image" src="${img.url}" alt="">`
    })
    document.querySelector('.saved-images').innerHTML = strHtml.join('')
}

function createImgs() {
    gImg = []
    for (let i = 1; i < 26; i++) {
        gImg.push(createImg(i))
    }
}

function createImg(idx) {
    return {
        id: idx,
        url: `meme-imgs/${idx}.jpg`
    }
}