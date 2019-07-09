import { pets } from '../json/index.js';
import { petFactory } from "../models/index.js";


class PetsCollection {
    fetchData() {
        let loadedPets = JSON.parse(localStorage.getItem('pets'));
        if (!loadedPets) {
            localStorage.setItem('pets', JSON.stringify(pets));
            loadedPets = pets;
        }

        this.petsModels = loadedPets.map(pet => petFactory(pet));
    }

    getPetsModels() {
        return this.petsModels;
    }

    getPetById(id) {
        return this.petsModels.find(pet => pet.id === Number(id));
    }

    getPetsInCart() {
        return this.petsModels.filter(pet => pet.quantityPetsInCart > 0);
    }

    getTotalPrice() {
        return this.petsModels.reduce((acc, pet) => acc + (pet.price * pet.quantityPetsInCart), 0);
    }

    getQuantityInCart() {
        return this.petsModels.reduce((acc, pet) => acc + pet.quantityPetsInCart, 0);
    }

    checkout() {
        this.petsModels.forEach(pet => {
            pet.quantityPetsInCart = 0;
        });

        localStorage.setItem('pets', JSON.stringify(this.petsModels));
    }
    removeAllFromCart() {
        this.petsModels.forEach(pet => {
            pet.quantity = pet.quantity + pet.quantityPetsInCart;
            pet.quantityPetsInCart = 0;
        });

        localStorage.setItem('pets', JSON.stringify(this.petsModels));
    }

    filterPets(categories) {
        if (categories.length === 0) {
            this.petsModels.forEach(pet => {
                pet.display = true;
            });
        } else {
            this.petsModels.forEach(pet => {
                const matches = categories.some(c => {
                    if (c.category === 'breed') {
                        const petCategory = pet[c.category].toLowerCase();
                        const search = c.categoryValue.toLowerCase();
                        return petCategory.includes(search);
                    }
                    return pet[c.category] === c.categoryValue;
                });

                pet.display = matches;
            });
        }
    }

}

export { PetsCollection };