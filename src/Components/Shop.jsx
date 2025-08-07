import { useContext } from 'react';
import Product from './Product.jsx'
import { CartContext } from '../Store/CartContextProvider.jsx';
import DropCart from './DropCart.jsx';

function Shop() {
  const { products } = useContext(CartContext);

  return (
    <section id="shop">
      <h2>Elegant Clothing For Everyone</h2>
      <section id="products-cart-wrapper">

        <ul id="products">
          {products.map((product) => (
            <li key={product.id}>
              <Product {...product} />
            </li>
          ))}
        </ul>
        <DropCart />
      </section>
    </section>
  )
}

export default Shop