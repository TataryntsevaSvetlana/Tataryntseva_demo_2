import { Cat, Dog, Fish, Bird } from './index.js';

function petFactory(pet) {
    switch (pet.type) {
        case 'cat': {
            return new Cat(pet);
        }
        case 'dog': {
            return new Dog(pet);
        }
        case 'fish': {
            return new Fish(pet);
        }
        case 'bird': {
            return new Bird(pet);
        }

        default: {
            console.error('unsupported pet type')
        }
    }
}

export { petFactory };