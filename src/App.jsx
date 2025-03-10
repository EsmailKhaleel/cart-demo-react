import React from 'react';
import Header from './Components/Header';
import Shop from './Components/Shop';
import CartContextProvider from './Store/CartContextProvider';
function App() {

  return (
    <CartContextProvider>
      <Header/>
      <Shop />
    </CartContextProvider>
  )
}

export default App
