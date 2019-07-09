import {translations} from "../json/index.js";

class CheckoutView {
    constructor(petsCollection) {
        this.el = document.querySelector('.popUpCheckout');
        this.petsCollection = petsCollection;

        this.init();
        this.isFormValid = false;
    }

    init() {
        this.el.addEventListener('click', (e) => {
            if (e.target.classList.contains('buttonCheckout')) {
                e.preventDefault();
                this.handleSubmit();
            }
        });

        document.querySelector('.wrapper').addEventListener('click', () => {
            this.closePopUp();
        });

        this.el.addEventListener('change', (e) => {
            if (e.target.classList.contains('email')) {
                this.validateEmail(e.target.value);
            }

            if (e.target.classList.contains('name')) {
                this.validateName(e.target.value);
            }
            if (e.target.classList.contains('telephone')) {
                this.validatePhone(e.target.value);
            }
        })
    }

    handleSubmit() {
        if (this.isFormValid) {
            this.saveToLocalStorage();
            this.checkout();
            this.closePopUp();
        } else {
            this.el.querySelector('.error').classList.toggle('hidden');
        }
    }

    saveToLocalStorage() {
        const email = this.el.querySelector('.email').value;
        const name = this.el.querySelector('.name').value;
        const phone = this.el.querySelector('.telephone').value;
        const totalPrice = this.petsCollection.getTotalPrice();
        const petsQuantity = this.petsCollection.getPetsInCart().length;
        const time = new Date();
        const orders = JSON.parse(localStorage.getItem('orders')) || [];

        localStorage.setItem('orders', JSON.stringify(orders.concat({
            email,
            name,
            phone,
            totalPrice,
            petsQuantity,
            time,
        })));
    }

    validateName(value) {
        const reg = /^[a-z]+\s?[a-z]+$/i;
        const isValid = reg.test(value);
        if (!isValid) {
            this.el.querySelector('.name').style.color = "red";
            this.isFormValid = false;
        } else {
            this.el.querySelector('.name').style.color = "black";
            this.isFormValid = true;
        }
    }

    validatePhone(value) {
        const reg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
        const isValid = reg.test(value);
        if (!isValid) {
            this.el.querySelector('.telephone').style.color = "red";
            this.isFormValid = false;
        } else {
            this.el.querySelector('.telephone').style.color = "black";
            this.isFormValid = true;
        }
    }

    validateEmail(value) {
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/i;
        const isValid = reg.test(value);
        if (!isValid) {
            this.el.querySelector('.email').style.color = "red";
            this.isFormValid = false;
        } else {
            this.el.querySelector('.email').style.color = "black";
            this.isFormValid = true;
        }
    }

    closePopUp() {
        this.el.classList.add('hidden');
        document.querySelector('.wrapper').classList.add('hidden');
    }

    getUserValue() {
        const orders = JSON.parse(localStorage.getItem('orders')) || [{}];
        const {
            email,
            name,
            phone
        } = orders[orders.length - 1];

        return { email, name, phone };
    }

    render() {
        this.el.classList.remove('hidden');
        document.querySelector('.wrapper').classList.remove('hidden');
        const user = this.getUserValue();


        this.el.innerHTML = `
            <form class="orderForm" action="#">
               <h5 class="hidden error">Invalid Form</h5>
                <div class="row">
                    <div>
                        <label for="email">${translations.Email[this.lang]}:</label> 
                        <input value="${user.email || ''}" class="u-full-width email" type="email" placeholder="test@mailbox.com" id="email" autofocus>                    
                    </div>
                </div>
                <div class="row">
                    <div>
                        <label for="name">${translations.Name[this.lang]}:</label>
                        <input value="${user.name || ''}" class="u-full-width name" type="text" placeholder="Svetlana" id="name" required>
                    </div>
                </div>
                <div class="row">
                    <div>
                        <label for="phone">${translations.Phone[this.lang]}:</label>
                        <input value="${user.phone || ''}" class="u-full-width telephone" type="tel" placeholder="8(050)361-43-32" id="phone" required>
                    </div>
                </div>
                <div class="textParagraph">${translations.SUM[this.lang]}: ${this.petsCollection.getTotalPrice()} ${translations.hrn[this.lang]}</div>
                <button class="button buttonCheckout" type="submit" value="Submit">${translations.CHECKOUT[this.lang]}</button>
            </form>
       `;
    }
}

export { CheckoutView };
