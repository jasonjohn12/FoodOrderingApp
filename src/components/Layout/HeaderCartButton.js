import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [highlightButton, setHightlightButton] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;
  useEffect(() => {
    if (items.length === 0) return;
    setHightlightButton(true);
    const timer = setTimeout(() => {
      setHightlightButton(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const numberOfCartItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);
  const btnClasses = `${classes.button} ${highlightButton ? classes.bump : ""}`;
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCartButton;
