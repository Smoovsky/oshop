import { CartItem } from './cartItem';
export class Cart {
    itemsArray;

    constructor(public items) {
        for (const productId in items) {
            if (items.hasOwnProperty(productId)) {
                this.itemsArray.push(items[productId]);
            }
        }
    }
    get totalItemsCount() {
        let count = 0;
        for (const item in this.items) {
            if (this.items.hasOwnProperty(item)) {
              count += this.items[item].quantity;
            }
        }
        return count;
    }
    get productIds() {
        return Object.keys(this.items);
    }
}
