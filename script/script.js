// @ts-check
'use strict';

// DOM
const cardsContainerEl = document.querySelector('#cards-container');
const API_URL = 'https://lanciweb.github.io/demo/api/pictures/';


// Setto i parametri
/** 
* @param {{id: number, title: string, date: string, url: string} } cards
*/
// Funzione per iniettare la card ad ogni giro
function cardInj(cards) {
    // Variabile di appoggio
    let cardHtml = '';
    // Ciclo for
    for (const card of cards) {
        cardHtml += `
        <div class="card" style="width: 18rem;">
            <img src="${card.url}" class="card-img-top" alt="${card.title}">
            <div class="card-body">
                <h5 class="card-title">${card.title}</h5>
                <p class="card-text">${card.date}</p>
            </div>
        </div>
        `
    }
    if (cardsContainerEl !== null){
        cardsContainerEl.innerHTML = cardHtml;
    }
}
