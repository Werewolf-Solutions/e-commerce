import React from 'react'
import { signOut } from "../../apiCalls/userController"


export default function UserNavBar(props) {
  return (
    <div>
        Logout || Orders
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
