import React, { useContext } from 'react';
import { CartContext } from '../Store/CartContextProvider';

function Cart() {
  const { items, updateItemQuantity } = useContext(CartContext);
  const totalPrice = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2);
  console.log(totalPrice);
  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 &&(
      <ul id="cart-items">
        {items.map(item => {
          const formattedPrice = `$${item.price}`;
          return (<li key={item.id}>
            <div>
              <div>{item.title}</div>
              <span> {formattedPrice}</span>
            </div>
            <div className="cart-item-actions">
              <button onClick={() => updateItemQuantity(item.id, false)}>
                -
              </button>
              <span>{item.quantity}</span>
              <button onClick={() => updateItemQuantity(item.id, true)}>
                +
              </button>
            </div>
          </li>
          );
        })}
      </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>$ {totalPrice}</strong>
      </p>
    </div>
  )
}

export default Cart