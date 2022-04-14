'use strict'

let gImg

function onInit() {
    createImgs()
    renderGallery()
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