import { Pet } from './index.js'

class Bird extends Pet {
    constructor(pet) {
        super(pet);
        this.canFly = pet.canFly;
        this.canSpeak = pet.canSpeak;
    }

    getSpacialInfo() {
        return {
            canFly: this.canFly,
            canSpeak: this.canSpeak,
        };
    }
}

export { Bird };
