// @ts-check
'use strict';

// DOM
const cardsContainerEl = document.querySelector('#cards-container');
const API_URL = 'https://lanciweb.github.io/demo/api/pictures/';
const loadingMsgEl = document.querySelector('#loadingMsg');
const errorMsgEl = document.querySelector('#errorMsg');
const form = document.querySelector('#form');

// Setto i parametri
/** 
* @param {{id: number, title: string, date: string, url: string}[] } cards
*/
// Funzione per iniettare la card ad ogni giro
function cardInj(cards) {
    // Variabile di appoggio
    let cardHtml = '';
    // Ciclo for
    for (const card of cards) {
        cardHtml += `
        <div class="myCard card rounded-0 p-3" style="width: 18rem;">
            <img src="./img/pin.svg" class="myPin" alt="">
            <img src="${card.url}" class="card-img-top rounded-0" alt="${card.title}">
            <div class="card-body p-0 mt-3">
                <p class="card-text">${card.date}</p>
                <p class="card-title">${card.title}</p>
            </div>
        </div>
        `
    }
    if (cardsContainerEl !== null) {
        cardsContainerEl.innerHTML = cardHtml;
    }
}

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


/** 
* @param {{title: string, date: string, url: string}[] } formElement
*/
function getNewCard(formElement) {
    // Passa il tag <form> come argomento
    const formData = new FormData(formElement);
    return {
        date: formData.get('date'),
        title: formData.get('title'),
        url: imgUrl
    };
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
            <img src="${imgUrl}" class="card-img-top rounded-0" alt="${form.title}">
            <div class="card-body p-0 mt-3">
                <p class="card-text">${form.date}</p>
                <p class="card-title">${form.title}</p>
            </div>
        </div>
        `;
        cardsContainerEl?.insertAdjacentHTML('afterbegin', newCardHtml)
        form.reset();
    });
}