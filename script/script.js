// @ts-check
'use strict';

// DOM
const cardsContainerEl = document.querySelector('#cards-container');
const API_URL = 'https://lanciweb.github.io/demo/api/pictures/';
const loadingMsgEl = document.querySelector('#loadingMsg');
const errorMsgEl = document.querySelector('#errorMsg');

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
    if (cardsContainerEl !== null){
        cardsContainerEl.innerHTML = cardHtml;
    }
}

// Fetch
if (loadingMsgEl !== null && errorMsgEl){
    // Rendo visibile il messaggio
    loadingMsgEl.classList.remove('d-none');
    // Inizio il codice asincrono di promesse
    fetch (API_URL)
        .then(response=>{
            return response.json();
        })
        .then(json =>{
            cardInj(json);
        })
        .catch(error =>{
            console.error(Error);
            errorMsgEl.classList.remove('d-none');
        })
        .finally(() => {
            loadingMsgEl.classList.add('d-none');
        })        
};