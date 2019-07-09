import { Mammal } from './mammal.js'

class Dog extends Mammal {
    constructor(pet) {
        super(pet);
        this.specialization = pet.specialization;
    }

    getSpacialInfo() {
        return {
            specialization: this.specialization,
            fur: this.fur,
            pedigree: this.pedigree,
            dockedTail: this.dockedTail,
            shortPaws: this.shortPaws
        };
    }
}

export { Dog }
