import { useContext } from 'react'
import { CartContext } from '../Store/CartContextProvider';

function Product({ id, image, title, price, description, stock }) {

  const { handleAddToCart } = useContext(CartContext);
  const handleDragStart = (event) => {
    if (stock === 0) {
      event.preventDefault();
      return;
    }
    const baseUrl = window.location.origin;
    const productData = {
      id,
      image: `${baseUrl}${image}`,
      title,
      price,
      description,
      stock
    };
    event.dataTransfer.setData('application/json', JSON.stringify(productData));
    event.target.classList.add('dragging');
    console.log(`${baseUrl}${image}`);
  };

  const handleDragEnd = (event) => {
    event.target.classList.remove('dragging');
    console.log('Drag ended for product:', title);
  };
  const outOfStockClass = stock === 0 ? 'out-of-stock' : '';
  return (
    <article
      className={`product ${outOfStockClass}`}
      draggable={stock > 0}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="product">
        <div className="product-img-container">
          <img src={image} alt={title} />
        </div>
        <div className="product-content">
          <h3 className="product-title">{title}</h3>
          <p className="product-description">{description}</p>
          <p className="product-price">${price}</p>
          <div className='product-actions'>
            <p className="stock">
              {stock > 0 ? `Stock: ${stock}` : 'Out of Stock'}
            </p>
            <button
              onClick={() => handleAddToCart(id)}
              disabled={stock === 0}
            >Add to Cart</button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default Product