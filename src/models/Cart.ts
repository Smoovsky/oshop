import { CartItem } from './cartItem';
export class Cart {
    itemsArray = [];
    items;

    constructor(cart) {
        const items = (cart && cart.items) ? cart.items : {};
        this.items = items;

        for (const productId in items) {
            if (items.hasOwnProperty(productId)) {
                const item = items[productId];
                this.itemsArray.push(new CartItem(item.product, item.quantity));
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

    get totalPrice() {
        let sum = 0;
        for (const item in this.itemsArray) {
            if (this.itemsArray.hasOwnProperty(item)) {
                sum += this.itemsArray[item].totalPrice;
            }
        }
        return sum;
    }
    // get productIds() {
    //     return Object.keys(this.items);
    // }


    getQuantity(product) {
        const item = this.items[product.key];
        return item ? item.quantity : 0;
    }
}
