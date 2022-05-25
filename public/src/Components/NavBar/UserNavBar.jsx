import React from 'react'
import { signOut } from "../../apiCalls/userController"


export default function UserNavBar(props) {
  return (
    <div>
        <li className="nav-item">
          <button
            className="nav-link adminNavLinks"
          >
            my orders
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
