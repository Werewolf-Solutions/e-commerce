import React from 'react'
import "../../Styles/admin-nav-bar-styles.css"
import logo from "../../Assets/png-clipart-bakery-roast-chicken-chef-platter-graphy-chef-silhouette-food-retro-thumbnail.png"
import { signOut } from "../../apiCalls/userController"


export default function AdminNavBar(props) {
  return (
    <div>
        Logout || Orders || Edit products
        <li className="nav-item">
          <button
            className="nav-link adminNavLinks"
          >
            users orders
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link adminNavLinks"
          >
            edit products
          </button>
        </li>
        <li className="nav-item">
            <button
            className="nav-link adminNavLinks"
            onClick={() => {
                signOut().then(() => props.update())
            }}
            >
            logout
            </button>
        </li>
    </div>
  )
}
