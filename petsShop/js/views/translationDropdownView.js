class TranslatorDropDownView {
    constructor() {
        this.el = document.querySelector('.translation');
        this.el.addEventListener('change', (e) => {
            this.changeLang(e.target.value);
        });
    }


    render() {
        this.el.innerHTML = `
            <select>
                <option value="en">en</option>
                <option value="ru">ru</option>
                <option value="ua">ua</option>
            </select>
        `
    }
}

export { TranslatorDropDownView };