import { CartItem } from './cartItem';
export interface Cart {
    items: {
        [key: string]: CartItem
    };
}
