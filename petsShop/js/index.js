import {PetsCollection} from './collections/petsCollection.js';
import {PetListView} from './views/petListView.js';
import {PopUpView} from './views/popUpView.js';
import {TranslatorDropDownView} from "./views/translationDropdownView.js";
import {CheckoutView} from "./views/checkoutView.js";
import {CartView} from "./views/cartView.js";
import {ButtonCartView} from "./views/buttonCartView.js";
import {FilterView} from "./views/filterView.js";

class Controller {
    init() {
        const initialLang = 'en';

        this.petsCollection = new PetsCollection();
        this.petsCollection.fetchData();

        this.initTranslatorDropDownView(initialLang);
        this.initPetListView(initialLang);
        this.initPopUpView(initialLang);
        this.initCartView(initialLang);
        this.initButtonCartView(initialLang);
        this.initFilterView(initialLang);
        this.initCheckoutView(initialLang);
    }

    initPetListView(initialLang) {
        this.petListView = new PetListView(this.petsCollection);
        this.petListView.showPopUp = this.showPopUp.bind(this);
        this.petListView.lang = initialLang;
        this.petListView.render();
    }

    initPopUpView(initialLang) {
        this.popUpView = new PopUpView();
        this.popUpView.lang = initialLang;
        this.popUpView.handleAdd = this.handleAdd.bind(this);
    }

    initCartView(initialLang) {
        this.cartView = new CartView(this.petsCollection);
        this.cartView.lang = initialLang;
        this.cartView.addToCart = this.addToCart.bind(this);
        this.cartView.removeFromCart = this.removeFromCart.bind(this);
        this.cartView.showOrderForm = this.showOrderForm.bind(this);
        this.cartView.removeAllFromCart = this.removeAllFromCart.bind(this);
    }

    initButtonCartView(initialLang) {
        this.buttonCartView = new ButtonCartView(this.petsCollection);
        this.buttonCartView.lang = initialLang;
        this.buttonCartView.showCartView = this.showCartView.bind(this);
    }

    initTranslatorDropDownView() {
        this.translatorDropDownView = new TranslatorDropDownView();
        this.translatorDropDownView.changeLang = this.changeLang.bind(this);
        this.translatorDropDownView.render();
    }

    initFilterView(initialLang) {
        this.filterView = new FilterView();
        this.filterView.lang = initialLang;
        this.filterView.render();
        this.filterView.handlerFilter = this.handlerFilter.bind(this);
    }

    initCheckoutView(initialLang) {
        this.checkoutView = new CheckoutView(this.petsCollection);
        this.checkoutView.lang = initialLang;
        this.checkoutView.showOrderForm = this.showOrderForm.bind(this);
        this.checkoutView.checkout = this.checkout.bind(this);
    }

    showPopUp(petModel) {
        this.popUpView.renderPopUp(petModel);
    }

    showCartView() {
        this.buttonCartView.showQuantityItemInCart();
        this.cartView.render();
    }

    addToCart(petModel) {
        petModel.addToCart();
        this.buttonCartView.showQuantityItemInCart();
        this.cartView.render();
    }

    removeFromCart(petModel) {
        petModel.removeFromCart();
        this.buttonCartView.showQuantityItemInCart();
        this.cartView.render(petModel);
    }

    removeAllFromCart() {
        this.petsCollection.removeAllFromCart();
        this.buttonCartView.showQuantityItemInCart();
        this.cartView.render();
        this.petListView.render();
    }

    handleAdd(petId) {
        const petModel = this.petsCollection.getPetById(petId);
        petModel.addToCart();
        this.buttonCartView.showQuantityItemInCart();
        this.petListView.render();
        this.popUpView.renderPopUp(petModel);
    }

    showOrderForm() {
        this.cartView.closeCart();
        this.checkoutView.render();
    }

    checkout() {
        this.petsCollection.checkout();
        this.buttonCartView.showQuantityItemInCart();
        this.petListView.render();
    }

    handlerFilter(selectedFilters) {
        this.petsCollection.filterPets(selectedFilters);
        this.petListView.render();
    }

    changeLang(lang) {
        this.petListView.lang = lang;
        this.checkoutView.lang = lang;
        this.cartView.lang  = lang;
        this.popUpView.lang = lang;
        this.filterView.lang = lang;

        this.petListView.render();
        this.filterView.render();
    }
}


document.querySelector('.buttonStart').addEventListener('click', () => {
    document.querySelector('.startView').classList.add('hidden');
    const controller = new Controller();
    controller.init();
});
