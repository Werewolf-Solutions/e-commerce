import React from 'react'
import SignInDialog from "../SignIn/SignInDialog"
import SignUpDialog from "../SignUp/SignUpDialog"

export default function GuestNavBar(props) {

    const [signInDialog, setSignInDialog] = React.useState(false)
    const [signUpDialog, setSignUpDialog] = React.useState(false)

    const handleSignInDialog = () => {
        setSignInDialog(!signInDialog)
    }

    const handleSignUpDialog = () => {
        setSignUpDialog(!signUpDialog)
    }

    return (
        <div>
            <SignInDialog
                open={signInDialog}
                onClose={handleSignInDialog}
                update={props.update}
                handleSignUpDialog={handleSignUpDialog}
            />
            <SignUpDialog
                open={signUpDialog}
                onClose={handleSignUpDialog}
                update={props.update}
                handleSignInDialog={handleSignInDialog}
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
