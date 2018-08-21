import { Cart } from './Cart';
export class Order {
    dataPlaced: number;
    items: any[];

    constructor(public userId: string, public shipping: any, cart: Cart) {
        this.dataPlaced = Date.now();
        this.items = cart.itemsArray;
    }
}
