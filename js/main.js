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