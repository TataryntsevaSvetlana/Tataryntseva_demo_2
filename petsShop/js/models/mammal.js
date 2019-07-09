import { Pet } from './index.js'

class Mammal extends Pet {
    constructor(pet) {
        super(pet);
        this.fur = pet.fur;
        this.pedigree = pet.pedigree;
        this.dockedTail = pet.dockedTail;
        this.shortPaws = pet.shortPaws;
    }
}

export { Mammal };