
class Pet {
    constructor(pet) {
        this.breed = pet.breed;
        this.price = pet.price;
        this.quantity = pet.quantity;
        this.age = pet.age;
        this.color = pet.color;
        this.rapacity = pet.rapacity;
        this.type = pet.type;
        this.id = pet.id;
        this.gender = pet.gender;
        this.url = pet.url;
        this.quantityPetsInCart = pet.quantityPetsInCart;
   }

    addToCart() {
        if (this.quantity > 0) {
            this.quantityPetsInCart += 1;
            this.quantity -= 1;
        }

        this.saveToStorage();
    }

    removeFromCart() {
        if (this.quantityPetsInCart > 0) {
            this.quantityPetsInCart -= 1;
            this.quantity += 1;
        }

        this.saveToStorage();
    }

    removeAllFromCart() {
        if (this.quantityPetsInCart > 0) {
            this.quantityPetsInCart = 0;
        }

        this.saveToStorage();
    }

    saveToStorage() {
        const pets = JSON.parse(localStorage.getItem('pets')).map(pet => {
            if (pet.id === this.id) {
                return this;
            }

            return pet;
        });

        localStorage.setItem('pets', JSON.stringify(pets));
    }
}

export { Pet };
