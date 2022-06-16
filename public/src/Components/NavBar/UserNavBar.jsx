import * as React from "react";
import logo from "../../Assets/png-clipart-bakery-roast-chicken-chef-platter-graphy-chef-silhouette-food-retro-thumbnail.png";
import CheckoutDialog from "../Checkout/CheckoutDialog";
import { signOut } from "../../apiCalls/userController";
import CartDialog from "../CartDialog";
import cart from "../../Assets/icons8-buying-96.png";
import "../../Styles/nav-bar-styles.css";

import {ShoppingCart} from '@mui/icons-material'

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
        <div
          className="collapse navbar-collapse justify-content-end"
          id="collapsibleNavbar"
        >
          {/* my orders */}
          <li className="nav-item">
            <a
              className="nav-link text-danger checkoutButton"
              onClick={() => props.handleSelected("orders")}
            >
              orders
            </a>
          </li>
          {/* products */}
          <li className="nav-item">
            <a
              className="nav-link text-danger checkoutButton"
              onClick={() => props.handleSelected("products")}
            >
              products
            </a>
          </li>

          {/* items in my cart */}
          <li className="nav-item">
            <a
              className="nav-link text-danger checkoutButton"
              onClick={handleCartDialog}
            >
              Cart {props.cart.length} | £{props.totalAmount}
            </a>
          </li>
          {/* total price */}
          <li className="nav-item">
            {props.cart.length !== 0 ? (
              <button
                onClick={handleCheckoutDialog}
                className="nav-link text-danger checkoutButton"
              >
                checkout
              </button>
            ) : null}
          </li>
          {/* logout */}
          <li className="nav-item">
            <a
              className="nav-link adminNavLinks text-danger"
              onClick={() => {
                signOut().then(() => {
                  props.update()
                  props.handleSelected("products")
                })
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
            emptyCart={props.emptyCart}
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
