import { useContext } from 'react';
import Product from './Product.jsx'
import { CartContext } from '../Store/CartContextProvider.jsx';

function Shop() {
  const { handleAddToCart, items, products } = useContext(CartContext);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add('drag-over');
  };

  const handleDragLeave = (event) => {
    event.currentTarget.classList.remove('drag-over');
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove('drag-over');

    try {
      const productData = JSON.parse(event.dataTransfer.getData('application/json'));
      handleAddToCart(productData.id);
    } catch (error) {
      console.error('Error dropping item:', error);
    }
  };
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
        <section
          id="dropwrapper"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {items.length === 0 ? (
            <p className="drop-placeholder">Drop products here</p>
          ) : (
            <ul className="dropped-items-list">
              {items.map(item => (
                <li key={item.id} className="dropped-item">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="dropped-item-image"
                    onError={(e) => {
                      e.target.src = '/logo.png';
                      e.target.alt = 'Image not available';
                    }}
                  />
                  <div className="dropped-item-info">
                    <h4>{item.title}</h4>
                    <div className="dropped-item-details">
                      <span>${item.price}</span>
                      <span className="dropped-quantity">×{item.quantity}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <div className="dropped-total">
            <h3>Total Amount: $
              <span>{items.reduce((sum, item) =>
                sum + (item.price * item.quantity), 0).toFixed(2)}
              </span>
            </h3>
          </div>
        </section>
      </section>
    </section>
  )
}

export default Shop