import { useContext, useRef } from 'react';
import { CartContext } from '../Store/CartContextProvider';
import CartModal from './CartModal';
function Header() {
    const modal = useRef();
    const { items } = useContext(CartContext);

    function handleOpenCart() {
        modal.current.open();
    }
    let modalActions = (<button>Close</button>);
    if (items.length > 0) {
        modalActions = (<>
            <button>Close</button>
            <button>Checkout</button>
        </>);
    }
    return (
        <>
            <CartModal ref={modal} actions={modalActions}/>
            <header id="main-header">
                <div id="main-title">
                    <img src="logo.png" alt="Elegant model" />
                    <h1>Elegant Cart</h1>
                </div>
                    <button
                        onClick={handleOpenCart}
                    >Cart (<span id='badge'>{items.length}</span>)</button>
            </header>
        </>
    )
}

export default Header