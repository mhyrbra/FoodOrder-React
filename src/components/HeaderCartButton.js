import { useState, useEffect } from "react";
import { useContext } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import classes from "./HeaderCartButton.module.css";
import { CartContext } from "../store/cart-context";
const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartContext = useContext(CartContext);
  const { items } = cartContext;
  const numberOfCartItems = items.reduce((currNum, item) => {
    return currNum + item.amount;
  }, 0);

  useEffect(() => {
    if (items.length === 0) return;
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button
      className={`${classes.button} ${btnIsHighlighted ? classes.bump : ""}`}
      onClick={props.onClick}
    >
      <span className={classes.icon}>
        <AiOutlineShoppingCart size={22} />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
