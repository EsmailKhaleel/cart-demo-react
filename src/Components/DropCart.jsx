import { useContext } from "react";
import { CartContext } from "../Store/CartContextProvider";
import { useDragAndDrop } from "../hooks/useDragAndDrop";
import DropCartItem from "./DropCartItem";
import DropZoneIcon from "./DropZoneIcon";

function DroppedCart() {
    const { items, handleAddToCart, clearCart, cartTotal } = useContext(CartContext);
    const { handleDragOver, handleDragLeave, handleDrop, isDragOver } = useDragAndDrop(
        (productData) => handleAddToCart(productData.id)
    );


    return (
        <section
            id="dropwrapper"
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {items.length === 0 ? <DropZoneIcon isDragOver={isDragOver} /> :
                <ul className="dropped-items-list">
                    {items.map(item => (
                        <DropCartItem key={item.id} item={item} />
                    ))}
                </ul>
            }
            {items.length > 0 &&
                <div className="dropped-total">
                    <h3>Total Amount: $
                        <span>{cartTotal}</span>
                    </h3>
                    <button className="clear-button" onClick={clearCart}>Clear Cart</button>
                </div>
            }
        </section>
    );
}

export default DroppedCart