import React from "react";
import logo from "../../Assets/png-clipart-bakery-roast-chicken-chef-platter-graphy-chef-silhouette-food-retro-thumbnail.png";
import CheckoutDialog from "../Checkout/CheckoutDialog";
import { signOut } from "../../apiCalls/userController";
import CartDialog from "../CartDialog";
import cart from "../../Assets/icons8-buying-96.png";
import "../../Styles/nav-bar-styles.css";

export default function UserNavBar(props) {
  const [checkoutDialog, setCheckoutDialog] = React.useState(false);

  const [cartDialog, setCartDialog] = React.useState(false);

  const handleCartDialog = () => {
    setCartDialog(!cartDialog);
  };

  const handleCheckoutDialog = () => {
    setCheckoutDialog(!checkoutDialog);
  };

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top p-3">
      <div className="container-fluid align-items-end">
        <img src={logo} className="img-fluid logo" alt="" />
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="collapsibleNavbar"
        >
          {/* my orders */}
          <li className="nav-item">
            <a
              className="nav-link adminNavLinks"
              onClick={() => props.handleSelected("user-orders")}
            >
              my orders
            </a>
          </li>
          {/* products */}
          <li className="nav-item">
            <a
              className="nav-link adminNavLinks"
              onClick={() => props.handleSelected("products")}
            >
              products
            </a>
          </li>

          {/* items in my cart */}
          <li className="nav-item">
            <a className="nav-link">Items in my Cart : {props.cart.length}</a>
          </li>
          {/* cart icon */}
          <li className="nav-item me-3">
            <img
              className="cartIcon"
              onClick={handleCartDialog}
              src={cart}
              alt=""
            />
          </li>
          {/* total price */}
          <li className="nav-item">
            {/* cart item dialog */}
            {props.cart.length !== 0 ? (
              <button
                onClick={handleCheckoutDialog}
                className="nav-link text-danger checkoutButton"
              >
                checkout
              </button>
            ) : null}
          </li>

          {/* total price */}
          <li className="nav-item">
            <a className="nav-link">Total Price: {props.totalAmount}</a>
          </li>

          {/* logout */}
          <li className="nav-item">
            <a
              className="nav-link adminNavLinks text-danger"
              onClick={() => {
                signOut().then(() => props.update());
              }}
            >
              logout
            </a>
          </li>
          <CheckoutDialog
            open={checkoutDialog}
            onClose={handleCheckoutDialog}
            user={props.user}
            cart={props.cart}
            totalAmount={props.totalAmount}
            update={props.update}
          />
          <CartDialog
            open={cartDialog}
            onClose={handleCartDialog}
            cart={props.cart}
            deleteFromCart={props.deleteFromCart}
          />
          {/* what should be in here end */}
        </div>
      </div>
    </nav>
  );
}
