import {translations} from "../json/index.js";

class PopUpView {
    constructor() {
        this.el = document.querySelector('.popUpInfo');

        this.init();
    }

    init() {
        this.el.addEventListener('click', (e) => {
            if (e.target.classList.contains('buttonAddToCart')) {
                const id = e.target.dataset.id;

                this.handleAdd(id);
            }
        });

        document.querySelector('.wrapper').addEventListener('click', () => {
            this.closePopUp();
        })
    }

    closePopUp() {
        this.el.classList.add('hidden');
        document.querySelector('.wrapper').classList.add('hidden');
    }

    renderAdditionalInfo(petModel) {
        const specialInfo = petModel.getSpacialInfo();

        switch (petModel.type) {
            case 'dog': {
                return `<p class="textParagraph">${translations.specialization[this.lang]}: ${translations[specialInfo.specialization][this.lang]}</p>
                        <p class="textParagraph">${translations.fur[this.lang]}: ${translations[specialInfo.fur][this.lang]}</p>
                        <p class="textParagraph">${translations.pedigree[this.lang]}: ${translations[specialInfo.pedigree][this.lang]}</p>
                        <p class="textParagraph">${translations.dockedTail[this.lang]}: ${translations[specialInfo.dockedTail][this.lang]}</p>
                        <p class="textParagraph">${translations.shortPaws[this.lang]}: ${translations[specialInfo.shortPaws][this.lang]}</p>`}

            case 'cat': {
                return `<p class="textParagraph">${translations.hangingEars[this.lang]}: ${translations[specialInfo.hangingEars][this.lang]}</p>
                        <p class="textParagraph">${translations.fur[this.lang]}: ${translations[specialInfo.fur][this.lang]}</p>
                        <p class="textParagraph">${translations.pedigree[this.lang]}: ${translations[specialInfo.pedigree][this.lang]}</p>
                        <p class="textParagraph">${translations.dockedTail[this.lang]}: ${translations[specialInfo.dockedTail][this.lang]}</p>
                        <p class="textParagraph">${translations.shortPaws[this.lang]}: ${translations[specialInfo.shortPaws][this.lang]}</p>`}

            case 'fish': {
                return `<p class="textParagraph">${translations.freshwater[this.lang]}: ${translations[specialInfo.freshwater][this.lang]}</p>
                        <p class="textParagraph">${translations.zone[this.lang]}: ${translations[specialInfo.zone][this.lang]}</p>`}

            case 'bird': {
                return `<p class="textParagraph">${translations.canFly[this.lang]}: ${translations[specialInfo.canFly][this.lang]}</p>
                        <p class="textParagraph">${translations.canSpeak[this.lang]}: ${translations[specialInfo.canSpeak][this.lang]}</p>`}

            default: {
                console.error('unsupported pet type');
            }
        }
    }

    renderPopUp(petModel) {
        this.el.classList.remove('hidden');
        document.querySelector('.wrapper').classList.remove('hidden');

        let addButtonClassList = 'button buttonAddToCart';

        if (petModel.quantity === 0) {
            addButtonClassList += ' buttonDisabled'
        }

        this.el.innerHTML = `
            <div>
                <img src=${petModel.url} class="img imgPopUp">
            </div>
            <div class="description">
                <p class="textParagraph">${translations.type[this.lang]}: ${translations[petModel.type][this.lang]}</p>
                <p class="textParagraph">${translations.breed[this.lang]}: ${translations[petModel.breed][this.lang]}</p>
                <p class="textParagraph">${translations.age[this.lang]}: ${petModel.age} ${translations.year[this.lang]}</p>
                <p class="textParagraph">${translations.quantity[this.lang]}: ${petModel.quantity} ${translations.item[this.lang]}</p>
                <p class="textParagraph">${translations.price[this.lang]}: ${petModel.price} ${translations.hrn[this.lang]}</p>
                <p class="textParagraph">${translations.color[this.lang]}: ${translations[petModel.color][this.lang]}</p>
                <p class="textParagraph">${translations.rapacity[this.lang]}: ${translations[petModel.rapacity][this.lang]}</p>
                <p class="textParagraph">${translations.gender[this.lang]}: ${translations[petModel.gender][this.lang]}</p>
                ${this.renderAdditionalInfo(petModel)}
            </div>
            <div class="buttonBlock">
                <button data-id=${petModel.id} class="${addButtonClassList}">${translations['ADD TO CART'][this.lang]}</button>
            </div>
       `;
    }
}

export { PopUpView };