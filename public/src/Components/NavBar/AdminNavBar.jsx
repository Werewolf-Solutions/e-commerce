import React from 'react'
import "../../Styles/admin-nav-bar-styles.css"
import logo from "../../Assets/png-clipart-bakery-roast-chicken-chef-platter-graphy-chef-silhouette-food-retro-thumbnail.png"
import { signOut } from "../../apiCalls/userController"


export default function AdminNavBar(props) {
  return (
    <div>
        <li className="nav-item">
          <button
            className="nav-link adminNavLinks"
            onClick={() => props.handleSelected('orders')}
          >
            users orders
          </button>
        </li>
        <li className="nav-item">
          <button
            onClick={() => props.handleSelected('products')}
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
        <li className="nav-item">
            <button
            className="nav-link adminNavLinks"
            onClick={() => props.handleSelected('dashboard')}
            >
            dashboard
            </button>
        </li>
    </div>
  )
}
