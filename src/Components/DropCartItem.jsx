function DropCartItem({ item }) {
    return (
        <li className="dropped-item">
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
    );
}

export default DropCartItem;
