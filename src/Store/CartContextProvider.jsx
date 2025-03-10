import React, { act, createContext, useReducer } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products';
import { prefetchDNS } from 'react-dom';

export const CartContext = createContext({
  items: [],
  handleAddToCart: () => { },
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(item => item.id === action.payload);
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      // stop adding instead increase quantity
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(product => product.id === action.payload);
      if (!product) return state;
      updatedItems.push({
        id: action.payload,
        title: product.title,
        description: product.description,
        price: product.price,
        quantity: 1,
      });
    }
    return {
      items: updatedItems,
    };
  }
  if (action.type === 'UPDATE_ITEM_QUANTITY') {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(item => item.id === action.payload);
    const updatedItem = {
      ...updatedItems[updatedItemIndex]
    };
    action.isIncrement ? updatedItem.quantity += 1 : updatedItem.quantity -= 1;
    if (updatedItem.quantity < 1) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
    };
  }
  return state;
}
function CartContextProvider({ children }) {
  const [shoppingCart, shoppingCartDispatch] = useReducer(
    cartReducer,
    {
      items: [],
    }
  );

  function handleAddToCart(id) {
    shoppingCartDispatch({
      type: 'ADD_ITEM',
      payload: id
    });
  }

  function updateItemQuantity(id, isIncrement) {
    shoppingCartDispatch({
      type: 'UPDATE_ITEM_QUANTITY',
      payload: id,
      isIncrement: isIncrement
    });
  }
  console.log(shoppingCart);

  const cartCtx = {
    items: shoppingCart.items,
    handleAddToCart,
    updateItemQuantity,
  };
  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  )
}

export default CartContextProvider