// @ts-check
'use strict';

// DOM
const cardsContainerEl = document.querySelector('#cards-container');
const API_URL = 'https://lanciweb.github.io/demo/api/pictures/';
const loadingMsgEl = document.querySelector('#loadingMsg');
const errorMsgEl = document.querySelector('#errorMsg');
const form = document.querySelector('#form');

// Ricezione immagine e conversione a URL temporaneo
/** @type {?HTMLInputElement} */
const imgInputEl = document.querySelector('#img')
let imgUrl = ''
if (imgInputEl !== null) {
    imgInputEl.addEventListener('change', (event) => {
        if (imgInputEl.files !== null && imgInputEl.files.length > 0) {
            const image = imgInputEl.files[0];
            const imageUrlTemp = URL.createObjectURL(image);
            imgUrl = imageUrlTemp
            console.log(imgUrl);
        }
    })
}


// Fetch
if (loadingMsgEl !== null && errorMsgEl) {
    // Rendo visibile il messaggio
    loadingMsgEl.classList.remove('d-none');
    // Inizio il codice asincrono di promesse
    fetch(API_URL)
        .then(response => {
            return response.json();
        })
        .then(json => {
            cardInj(json);
        })
        .catch(error => {
            console.error(Error);
            errorMsgEl.classList.remove('d-none');
        })
        .finally(() => {
            loadingMsgEl.classList.add('d-none');
        })
};


// Listener
if (form !== null) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const newCard = getNewCard(form);
        const newCardHtml = `
        <div class="myCard card rounded-0 p-3" style="width: 18rem;">
            <img src="./img/pin.svg" class="myPin" alt="">
            <img src="${imgUrl}" class="card-img-top rounded-0" alt="${newCard.title}">
            <div class="card-body p-0 mt-3">
                <p class="card-text">${newCard.date}</p>
                <p class="card-title">${newCard.title}</p>
            </div>
        </div>
        `;
        cardsContainerEl?.insertAdjacentHTML('afterbegin', newCardHtml)
        form.reset();
    });
}

cardsContainerEl?.addEventListener('click', function(event){
    // Listener sul genitore
    const clickedEl = event.target;

    const cardParent = clickedEl.closest('.myCard');

    // Estraggo il determinato url della card
    if (cardParent){
        const imgUrl = cardParent.dataset.url;
        console.log(imgUrl);
        
        // Se imgUrl è presente, runna la funzione che apre l'immagine in overlay
        if (imgUrl){
            runOverlay(imgUrl);
        }
    }
})