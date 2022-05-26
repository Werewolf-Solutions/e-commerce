import React from "react";
import "../../Styles/nav-bar-styles.css";
import logo from "../../Assets/png-clipart-bakery-roast-chicken-chef-platter-graphy-chef-silhouette-food-retro-thumbnail.png";
import { useStore } from "../../Hooks/Store.jsx";
import CheckoutDialog from "../Checkout/CheckoutDialog";

import AdminNavBar from "./AdminNavBar";
import UserNavBar from "./UserNavBar";
import GuestNavBar from "./GuestNavBar";

function NavBar(props) {
  const setModal = useStore((store) => store.setModal);

  const [checkoutDialog, setCheckoutDialog] = React.useState(false)

  const handleCheckoutDialog = () => {
    setCheckoutDialog(!checkoutDialog)
  }

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
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
          <CheckoutDialog
            open={checkoutDialog}
            onClose={handleCheckoutDialog}
          />
          {props.user
          ? props.user.admin
            ? <AdminNavBar update={props.update}/>
            : <UserNavBar update={props.update}/>
          : <GuestNavBar update={props.update}/>
          }
          <ul className="navbar-nav ">
            <li className="nav-item dropdown me-3">
              <a
                class="nav-link dropdown-toggle"
               
                role="button"
                data-bs-toggle="dropdown"
              >
                Menu
              </a>
              {/* <img
                src={user}
                className="img-fluid nav-link dropdown-toggle user"
                role="button"
                data-bs-toggle="dropdown"
                alt=""
              /> */}
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#sideorders">
                    SIDE ORDERS
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#mains">
                    MAINS
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#deserts">
                    DESERTS
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#drinks">
                    DRINKS
                  </a>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <a className="nav-link">
                Items in my Cart : 2
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link">
                Total Price: $55.00
              </a>
            </li>
            {props.cart
            ? 
              <li className="nav-item">
                <button
                  onClick={handleCheckoutDialog}
                  className="nav-link text-danger checkoutButton"
                >
                  checkout
                </button>
              </li>
            : null}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;