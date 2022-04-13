'use strict'



function renderGallery() {
    // let strHtml = ``
    let strHtml = gImg.map((img) => {
        return `<img onclick="onImgClick(this,${img.id})" class="image" src="${img.url}" alt="">`
    })
    document.querySelector('.gallery').innerHTML = strHtml.join('')
}

function onImgClick(elImg,id) {
    createMeme(id,elImg)    
    renderMeme()
}