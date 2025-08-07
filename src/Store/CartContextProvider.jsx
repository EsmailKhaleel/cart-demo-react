import { createContext, useReducer } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products';

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext({
  items: [],
  products: [],
  handleAddToCart: () => { },
});

function cartReducer(state, action) {
  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(item => item.id === action.payload);
    const existingCartItem = updatedItems[existingCartItemIndex];

    const updatedProducts = [...state.products];
    const productIndex = updatedProducts.findIndex(product => product.id === action.payload);

    if (existingCartItem) {
      // stop adding instead increase quantity
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
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
    const updatedProducts = [...state.products];
    const updatedItemIndex = updatedItems.findIndex(item => item.id === action.payload);
    const productIndex = updatedProducts.findIndex(product => product.id === action.payload);
    const updatedItem = {
      ...updatedItems[updatedItemIndex]
    };
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
  console.log(shoppingCart);

  const cartCtx = {
    items: shoppingCart.items,
    products: shoppingCart.products,
    handleAddToCart,
    updateItemQuantity,
  };
  return (
    <CartContext.Provider value={cartCtx}>{children}</CartContext.Provider>
  )
}

export default CartContextProvider