import { useState } from "react";
import Header from "./components/Header";
import Meals from "./components/meals/Meals";
import Cart from "./components/cart/Cart";
import CartContextProvider from "./store/cart-context";

function App() {
  const [cartIsShown, setIsCartShown] = useState(false);

  const showCartHandler = () => {
    setIsCartShown(true);
  };

  const hideCartHandler = () => {
    setIsCartShown(false);
  };

  return (
    <CartContextProvider>
      {cartIsShown && <Cart onHideCart={hideCartHandler} />}
      <Header onAddCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartContextProvider>
  );
}

export default App;
