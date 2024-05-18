import mealsImage from "../assets/meals.jpg";
import classes from "./Header.module.css";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <div>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCartButton onClick={props.onAddCart} />
      </header>
      <div className={classes["main-image"]}>
        <img src={mealsImage} alt="a table full of delicious food" />
      </div>
    </div>
  );
};

export default Header;
