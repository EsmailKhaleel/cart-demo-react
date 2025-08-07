import { useContext } from 'react';
import { CartContext } from '../Store/CartContextProvider';

function Cart() {
  const { items, updateItemQuantity, products } = useContext(CartContext);
  const totalPrice = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0).toFixed(2);
  return (
    <div id="cart">
      {items.length === 0 && <p>No items in cart!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map(item => {
            const formattedPrice = `$${item.price}`;
            const product = products.find(p => p.id === item.id);
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
                <button
                  disabled={product.stock === 0}
                  onClick={() => updateItemQuantity(item.id, true)}
                >
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