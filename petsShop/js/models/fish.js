import { Pet } from './index.js'

class Fish extends Pet {
    constructor(pet) {
        super(pet);
        this.freshwater = pet.freshwater;
        this.zone = pet.zone;
    }

    getSpacialInfo() {
        return {
            freshwater: this.freshwater,
            zone: this.zone,
        };
    }
}

export { Fish };