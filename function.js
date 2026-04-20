// @ts-check
'use strict';

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

/** 
* @param {{title: string, date: string, url: string}[] } formElement
*/
function getNewCard(formElement) {
    // Passa il tag <form> come argomento
    const formData = new FormData(formElement);
    return {
        date: String(formData.get('date')),
        title: String(formData.get('title')),
        url: imgUrl
    };
}
