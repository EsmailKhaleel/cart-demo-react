import { createContext, useReducer } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products';

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext({
  items: [],
  products: [],
  handleAddToCart: () => { },
  clearCart: () => { },
  cartTotal: '0.00',
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(item => item.id === action.payload);
    const existingCartItem = updatedItems[existingCartItemIndex];

    const updatedProducts = [...state.products];
    const productIndex = updatedProducts.findIndex(product => product.id === action.payload);

    // stop adding instead increase quantity
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      // update quantity
      updatedItems[existingCartItemIndex] = updatedItem;
      // update stock
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        stock: updatedProducts[productIndex].stock - 1
      };
    } else {
      const product = state.products.find(product => product.id === action.payload);
      if (!product) return state;
      updatedItems.push({
        id: action.payload,
        title: product.title,
        description: product.description,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
      updatedProducts[productIndex] = {
        ...updatedProducts[productIndex],
        stock: updatedProducts[productIndex].stock - 1
      };
    }
    return {
      items: updatedItems,
      products: updatedProducts,
    };
  }
  if (action.type === 'UPDATE_ITEM_QUANTITY') {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(item => item.id === action.payload);
    const updatedItem = {
      ...updatedItems[updatedItemIndex]
    };

    const updatedProducts = [...state.products];
    const productIndex = updatedProducts.findIndex(product => product.id === action.payload);

    action.isIncrement ?
      updatedItem.quantity += 1
      : updatedItem.quantity -= 1;
    updatedProducts[productIndex] = {
      ...updatedProducts[productIndex],
      stock: updatedProducts[productIndex].stock + (action.isIncrement ? -1 : 1)
    };
    if (updatedItem.quantity < 1) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      products: updatedProducts,
    };
  }
  if (action.type === 'CLEAR_CART') {
    return {
      items: [],
      products: DUMMY_PRODUCTS,
    };
  }
  return state;
}
function CartContextProvider({ children }) {
  const [shoppingCart, shoppingCartDispatch] = useReducer(
    cartReducer,
    {
      items: [],
      products: DUMMY_PRODUCTS
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

  function clearCart() {
    shoppingCartDispatch({
      type: 'CLEAR_CART'
    });
  }

  const cartCtx = {
    items: shoppingCart.items,
    products: shoppingCart.products,
    handleAddToCart,
    updateItemQuantity,
    clearCart,
    cartTotal: shoppingCart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)
  };
  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  )
}

export default CartContextProvider