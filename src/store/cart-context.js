import { createContext, useReducer } from "react";

export const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
});

const defaultCartState = { items: [], totalAmount: 0 };

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // const existingItem = state.items.find((item) => item.id === action.item.id);
    // if (existingItem) {
    //   const updatedItem = {
    //     ...existingItem,
    //     amount: Number(existingItem.amount + action.item.amount),
    //   };
    //   const updatedItems = state.items.filter(
    //     (item) => item.id !== action.item.id
    //   );
    //   const newItems = updatedItems
    //     .concat(updatedItem)
    //     .sort((a, b) => a.id - b.id);

    //   return { items: newItems, totalAmount: Number(updatedTotalAmount) };
    // } else {
    //   const updatedItems = state.items.concat(action.item);
    //   return { items: updatedItems, totalAmount: Number(updatedTotalAmount) };
    // }

    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingItem = state.items[existingItemIndex];
    let updatedItems;
    if (existingItem) {
      let updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }
    return { items: updatedItems, totalAmount: updatedTotalAmount };
  }
  if (action.type === "REMOVE") {
    const existingItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingItem = state.items[existingItemIndex];

    const updatedTotalAmount = state.totalAmount - existingItem.price;

    let updatedItems;
    if (existingItem.amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingItemIndex] = updatedItem;
    }

    return { items: updatedItems, totalAmount: Math.abs(updatedTotalAmount) };
  }
  return defaultCartState;
};

const CartContextProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const onAddItemToCart = (item) => {
    dispatchCartAction({ type: "ADD", item });
  };

  const onRemoveItemFromCart = (id) => {
    dispatchCartAction({ type: "REMOVE", id });
  };

  const cartValue = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: onAddItemToCart,
    removeItem: onRemoveItemFromCart,
  };

  return (
    <CartContext.Provider value={cartValue}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartContextProvider;
