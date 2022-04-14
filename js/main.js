'use strict'

let gImg
let gMemes

function onInit() {
    createImgs()
    renderGallery()
    gMemes=[]
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
    let icon = document.querySelector('.btn-toggle-menu').innerText
    icon = (icon === 'X') ? '☰' : 'X'
    document.querySelector('.btn-toggle-menu').innerText = icon
}

function onClickGallery() {
    let elGal = document.querySelector('.gallery')
    elGal.classList.add("grid")
    elGal.classList.remove("display-none")
    let elCan = document.querySelector('.canvas-container')
    elCan.classList.add("display-none")
    elCan.classList.remove("flex")
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

function onMemesClick() {
    let elGal = document.querySelector('.gallery')
    elGal.classList.remove("grid")
    elGal.classList.add("display-none")
    let elCan = document.querySelector('.canvas-container')
    elCan.classList.add("display-none")
    elCan.classList.remove("flex")
    let elMemes = document.querySelector('.saved-memes')
    elMemes.classList.add("grid")
    elMemes.classList.remove("display-none")
    onInitSavedMemes()
}