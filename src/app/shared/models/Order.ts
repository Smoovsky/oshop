import { Cart } from './Cart';
export class Order {
    datePlaced: number;
    items: any[];

    constructor(public userId: string, public shipping: any, cart: Cart) {
        this.datePlaced = Date.now();
        this.items = cart.itemsArray;
    }
}
