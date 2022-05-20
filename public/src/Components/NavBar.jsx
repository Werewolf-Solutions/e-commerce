import React from "react";
import "../Styles/nav-bar-styles.css";
import logo from "../Assets/png-clipart-bakery-roast-chicken-chef-platter-graphy-chef-silhouette-food-retro-thumbnail.png";
import { useStore } from "../Hooks/Store.jsx";

function NavBar() {
  const setModal = useStore((store) => store.setModal);

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
          <ul className="navbar-nav ">
            <li className="nav-item dropdown me-3">
              <a
                class="nav-link dropdown-toggle"
                href="www.google.com"
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
              <a className="nav-link" href="www.google.com">
                Items in my Cart : 2
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="www.google.com">
                Total Price: $55.00
              </a>
            </li>
            <li className="nav-item">
              <button
                onClick={() => {
                  console.log("checkout button clicked test");
                  setModal("CheckOutModal");
                }}
                className="nav-link text-danger checkoutButton"
              >
                checkout
              </button>
            </li>

            <li className="nav-item dropdown dropleft me-3">
              <a
                class="nav-link dropdown-toggle"
                href="www.google.com"
                role="button"
                data-bs-toggle="dropdown"
                onClick={() => {
                  console.log("login button clicked test");
                  setModal("LogInModal");
                }}
              >
                Login
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
                  <button
                    onClick={() => {
                      console.log("log in button clicked test");
                      setModal("LogInModal");
                    }}
                    className="dropdown-item"
                  >
                    Login
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      console.log("log in button clicked test");
                      setModal("LogInModal");
                    }}
                    className="dropdown-item"
                  >
                    Register
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      console.log("log in button clicked test");
                      setModal("LogInModal");
                    }}
                    className="dropdown-item"
                  >
                    Guest
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;