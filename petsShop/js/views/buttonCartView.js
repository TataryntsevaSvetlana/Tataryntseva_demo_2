class ButtonCartView {
    constructor(petCollection) {
        this.petCollection = petCollection;
        this.el = document.querySelector('.controls');

        this.showQuantityItemInCart();
        this.init();
    }

    init() {
        document.querySelector('.buttonCart').addEventListener('click', () => this.showCartView());
    }

    showQuantityItemInCart() {
        const quantityItemInCart = this.petCollection.getQuantityInCart();

        if (quantityItemInCart) {
            return document.querySelector('.quantityItemsInCart').innerHTML = `${quantityItemInCart}`;
        } else {
            return document.querySelector('.quantityItemsInCart').innerHTML = '0';
        }
    }
}

export { ButtonCartView };