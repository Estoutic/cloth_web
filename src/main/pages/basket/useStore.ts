import create from "zustand";

type CartItem = {
  id: string;
  name: string;
  price: number;
  imageLink: string;
};
type CartStore = {
  cartItems: CartItem[];
  totalPrice: number;
  addToCart: (product: CartItem) => void;
  removeFromCart: (id: string) => void; 
  clearCart: () => void;
};


const useStore = create<CartStore>((set) => ({
  cartItems: [],
  totalPrice: 0,
  addToCart: (product) => {
    console.log(product);
    set((state) => {
      const itemInCartIndex = state.cartItems.findIndex(
        (item) => item.id === product.id
      );
      const newCartItems = [...state.cartItems];
      if (itemInCartIndex >= 0) {
        alert(`item ${product.id} is already in cart`);
        return state; 
      } else {
        newCartItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          imageLink: product.imageLink,
        });
        const newTotalPrice = state.totalPrice + product.price;
        console.log(`added ${product.id}`);
        return { cartItems: newCartItems, totalPrice: newTotalPrice };
      }
    });
  },
  removeFromCart: (id) => {
    set((state) => {
      const itemInCartIndex = state.cartItems.findIndex(
        (item) => item.id === id
      );
      if (itemInCartIndex >= 0) {
        const itemToRemove = state.cartItems[itemInCartIndex];
        const newCartItems = [
          ...state.cartItems.slice(0, itemInCartIndex),
          ...state.cartItems.slice(itemInCartIndex + 1),
        ];
        const newTotalPrice =
          state.totalPrice - itemToRemove.price;
        console.log(`removed ${itemToRemove.id}`);
        return { cartItems: newCartItems, totalPrice: newTotalPrice };
      } else {
        console.log(`item ${id} not in cart`);
        return state;
      }
    });
  },
  clearCart: () => {
    
    set(() => (
        {
      cartItems: [],
      totalPrice: 0,
    }));
  },
}));

export default useStore;
