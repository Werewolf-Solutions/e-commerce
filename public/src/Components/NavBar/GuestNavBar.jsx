import React from 'react'
import SignInDialog from "../SignIn/SignInDialog"

export default function GuestNavBar(props) {

    const [signInDialog, setSignInDialog] = React.useState(false)

    const handleSignInDialog = () => {
        setSignInDialog(!signInDialog)
    }

    return (
        <div>
            <SignInDialog
                open={signInDialog}
                onClose={handleSignInDialog}
                update={props.update}
            />
            Login
            Register
            <li className="nav-item dropdown dropleft me-3">
                <button
                clbuttonss="nav-link dropdown-toggle"
                
                role="button"
                data-bs-toggle="dropdown"
                onClick={handleSignInDialog}
                >
                Login
                </button>
            </li>
        </div>
    )
}
