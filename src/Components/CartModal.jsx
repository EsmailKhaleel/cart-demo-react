import React, { forwardRef, useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom';
import Cart from './Cart';
const CartModal = forwardRef(function (props, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      }
    }
  });

  return createPortal(
    <dialog ref={dialog} id='modal-dialog'>
      <h2>Cart</h2>
      <Cart />
      <form method="dialog" id="modal-actions">
        {props.actions}
      </form>
    </dialog>
    , document.getElementById('modal')
  );
});

export default CartModal