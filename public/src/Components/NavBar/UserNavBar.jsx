import React from 'react'
import { signOut } from "../../apiCalls/userController"


export default function UserNavBar(props) {
  return (
    <div>
        <li className="nav-item">
          <button
            className="nav-link adminNavLinks"
            onClick={() => props.handleSelected('user-orders')}
          >
            my orders
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link adminNavLinks"
            onClick={() => props.handleSelected('products')}
          >
            products
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
