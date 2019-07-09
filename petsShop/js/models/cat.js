import {Mammal} from './mammal.js'

class Cat extends Mammal {
    constructor(pet) {
        super(pet);
        this.hangingEars = pet.hangingEars;
    }

    getSpacialInfo() {
        return {
            hangingEars: this.hangingEars,
            fur: this.fur,
            pedigree: this.pedigree,
            dockedTail: this.dockedTail,
            shortPaws: this.shortPaws,
        };
    }
}

export {Cat};