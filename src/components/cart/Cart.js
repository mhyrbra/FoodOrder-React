import { useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { CartContext } from "../../store/cart-context";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);

  const hasItems = cartCtx.items.length > 0;

  const addToCartHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const removeFromCartHandler = (id) => {
    cartCtx.removeItem(id);
  };

  return (
    <Modal onClick={props.onHideCart}>
      <ul className={classes["cart-items"]}>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onAdd={addToCartHandler.bind(null, item)}
            onRemove={removeFromCartHandler.bind(null, item.id)}
          />
        ))}
      </ul>
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{`$${cartCtx.totalAmount.toFixed(2)}`}</span>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onHideCart} className={classes["button-alt"]}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
