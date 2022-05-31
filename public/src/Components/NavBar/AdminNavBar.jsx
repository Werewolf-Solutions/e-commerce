import React from "react";
import "../../Styles/admin-nav-bar-styles.css";
import logo from "../../Assets/png-clipart-bakery-roast-chicken-chef-platter-graphy-chef-silhouette-food-retro-thumbnail.png";
import { signOut } from "../../apiCalls/userController";

export default function AdminNavBar(props) {
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
          {/* what should be in here start */}
          <li className="nav-item">
            <a
              className="nav-link adminNavLinks"
              onClick={() => props.handleSelected("orders")}
            >
              users orders
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => props.handleSelected("products")}
              className="nav-link adminNavLinks"
            >
              edit products
            </a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link adminNavLinks"
              onClick={() => props.handleSelected("dashboard")}
            >
              dashboard
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
