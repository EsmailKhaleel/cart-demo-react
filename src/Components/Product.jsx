import React, { useContext } from 'react'
import { CartContext } from '../Store/CartContextProvider';
function Product({ id, image, title, price, description }) {

  const { handleAddToCart } = useContext(CartContext);

  return (
    <article className="product">
      <img src={image} alt={title} />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className='product-price'>${price}</p>
          <p>{description}</p>
        </div>
        <p className='product-actions'>
          <button  onClick={() => handleAddToCart(id)}>Add to Cart</button>
        </p>
      </div>
    </article>
  )
}

export default Product