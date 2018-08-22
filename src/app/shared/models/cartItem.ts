import { Product } from './product';

export class CartItem {
    constructor(public product, public quantity) {
    }

    get totalPrice() {
        return this.product.price * this.quantity;
    }
}
