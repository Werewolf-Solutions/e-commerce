import React from "react";
import logo from "../../Assets/png-clipart-bakery-roast-chicken-chef-platter-graphy-chef-silhouette-food-retro-thumbnail.png";

import { signOut } from "../../apiCalls/userController";

export default function UserNavBar(props) {
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
          <li className="nav-item">
            <a
              className="nav-link adminNavLinks"
              onClick={() => props.handleSelected("user-orders")}
            >
              my orders
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link adminNavLinks"
              onClick={() => props.handleSelected("products")}
            >
              products
            </a>
          </li>
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
          {/* what should be in here end */}
        </div>
      </div>
    </nav>
  );
}
