import { translations } from "../json/index.js";

class PetListView {
    constructor(petsCollection) {
        this.petsCollection = petsCollection;
        this.el = document.querySelector('.cards');
        this.init();
    }

    init() {
        this.el.addEventListener('click', (e) => {
            if (e.target.classList.contains('buttonMore')) {
                const id = e.target.dataset.id;
                const petModel = this.petsCollection.getPetById(id);

                this.showPopUp(petModel);
            }
        })
    }

    render() {
        const petsModels = this.petsCollection.getPetsModels()
            .filter(pet => pet.display !== false);
        this.el.innerHTML = petsModels.reduce((acc, petModel) => acc + this.renderOneCard(petModel), '');
    }

    renderOneCard(petModel){
        let classList = "card";
        if (petModel.quantity === 0) {
            classList += ' inactiveCard'
        }

        return `
            <div class="${classList}">
                <div class="imgCard">
                    <img src=${petModel.url} class="img">
                </div>
                <h6 class="textCard">${translations.type[this.lang]}: ${translations[petModel.type][this.lang]}</h6>
                <h6 class="textCard">${translations.breed[this.lang]}: ${translations[petModel.breed][this.lang]}</h6>
                <h6 class="textCard">${translations.price[this.lang]}: ${petModel.price} ${translations.hrn[this.lang]}</h6>
                <button data-id=${petModel.id} class="button buttonMore">${translations.MORE[this.lang]}</button>
            </div>`
    };
}

export { PetListView };



 