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
        <div class="myCard card rounded-0 p-3" style="width: 18rem;" data-url="${card.url}">
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

/** 
* @param {string} url // l'url deve essere una stringa
*/
// Funzione per aprire una immagine in overlay
function runOverlay(url){
    let overlayEl = '';
    overlayEl = `
    <button id="closeOverlayBtn" class="btn btn-secondary">Chiudi</button>
    <img src="${url}" alt="">
    `;

    // Mostro il div dell'overlay e inietto l'immagine
    imgOverlay?.classList.remove('d-none');
    imgOverlay.innerHTML = overlayEl;
    noScroll?.classList.add('noScroll');

    // Creo listener qui, altrimenti nel DOM mi riporta null
    // non essistendo ancora il btn in quel momento
    const closeOverlayBtn = document.querySelector('#closeOverlayBtn')
    closeOverlayBtn?.addEventListener('click', () => {
    imgOverlay.innerHTML='';
    imgOverlay?.classList.add('d-none');
    noScroll?.classList.remove('noScroll');
    }
);
};