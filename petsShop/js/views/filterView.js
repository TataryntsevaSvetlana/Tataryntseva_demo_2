import {translations} from "../json/index.js";

class FilterView {
    constructor() {
        this.el = document.querySelector('.filter');
        this.petsCategories = ['cat', 'dog', 'fish', 'bird'];
        this.colorsCategories = ['red', 'ginger', 'black', 'white',
            'blue', 'green', 'yellow', 'silver',
            'multicolored', 'body'];
        this.genderCategories = ['male', 'female'];
        this.furCategories = ['short', 'long', 'bald'];

        this.detailsCategories = ['rapacity', 'dockedTail', 'shortPaws', 'hangingEars', 'freshwater', 'canFly', 'canSpeak'];

        this.categories = [
            ...this.colorsCategories,
            ...this.genderCategories,
            ...this.detailsCategories,
        ];

        this.selectedFilters = [];

        this.init();
    }

    init() {
        this.el.addEventListener('click', (e) => {

            if (e.target.classList.contains('searchButton')) {
                this.search(e.target.parentElement.children[0].value);
            } else {
                const category = e.target.dataset.category;
                const categoryValue = e.target.dataset.value;

                if (category && categoryValue)  {
                    if (category !== 'details') {
                        this.filterCategories(e, category, categoryValue);
                    } else {
                        this.filterDetailsCategories(e, categoryValue, categoryValue);
                    }
                }
            }
        });
    }

    search(value){
        this.selectedFilters = this.selectedFilters.filter(f => f.category !== 'breed');
        this.handlerFilter([{category: 'breed', categoryValue: value}]);
    }

    filterCategories(e, category, categoryValue) {
        const wasCheckedBeforeClick = e.target.children[0].checked;
        const isCheckedAfterClick = !wasCheckedBeforeClick;

        if (isCheckedAfterClick) { // в ивент таргет чект попадает состояние до клика
            this.selectedFilters.push({ category, categoryValue });
        } else {
            this.selectedFilters = this.selectedFilters
                .filter(c => {
                   return !(c.category === category && c.categoryValue === categoryValue);
                });
        }

        this.handlerFilter(this.selectedFilters);
    }

    filterDetailsCategories(e, category) {
        const wasCheckedBeforeClick = e.target.children[0].checked;
        const isCheckedAfterClick = !wasCheckedBeforeClick;

        if (isCheckedAfterClick) { // в ивент таргет чект попадает состояние до клика
            this.selectedFilters.push({ category, categoryValue: true });
        } else {
            this.selectedFilters = this.selectedFilters
                .filter(c => {
                    return !(c.category === category && c.categoryValue === true);
                });
        }
        this.handlerFilter(this.selectedFilters);
    }

    renderCategories(categories, categoryName) {
        return categories.reduce((acc, value) => {
           return acc + `<label data-category="${categoryName}" data-value="${value}">
                            <input type="checkbox"> ${translations[value][this.lang]}
                        </label>`
        }, '')
    }

    render() {
        this.el.innerHTML = `
            <div class="searchBox">
                <input class="searchInput" type="text">  
                <button class="button searchButton">&#128269;</button> 
            </div>
            <div class="categoriesBox">
                <form action="#">
                <fieldset>
                    <legend>${translations.type[this.lang]}</legend>
                    ${this.renderCategories(this.petsCategories, 'type')}       
                </fieldset>       
                <fieldset>
                    <legend>${translations.color[this.lang]}</legend>
                    ${this.renderCategories(this.colorsCategories, 'color')}                           
                </fieldset>    
                <fieldset>
                    <legend>${translations.gender[this.lang]}</legend>
                    ${this.renderCategories(this.genderCategories, 'gender')}       
                </fieldset>
                 <fieldset>
                    <legend>${translations.fur[this.lang]}</legend>
                    ${this.renderCategories(this.furCategories, 'fur')}       
                </fieldset>
                <fieldset>
                    <legend>${translations.details[this.lang]}</legend>
                      ${this.renderCategories(this.detailsCategories, 'details')}                                 
                </fieldset>       
                </form> 
            </div>
        `;

        document.querySelector('.wrapper').classList.add('hidden');
    }

}

export {FilterView};