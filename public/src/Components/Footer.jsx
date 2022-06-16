import React from "react"
import SignInDialog from "./SignIn/SignInDialog"
import SignUpDialog from "./SignUp/SignUpDialog"
import { signOut } from "../apiCalls/userController"
import "../Styles/footer-styles.css"

export default function Footer(props) {

    const [signInDialog, setSignInDialog] = React.useState(false)
    const [signUpDialog, setSignUpDialog] = React.useState(false)

    const handleSignInDialog = () => {
        setSignInDialog(!signInDialog)
    }

    const handleSignUpDialog = () => {
        setSignUpDialog(!signUpDialog)
    }

    return (
        <div class="container">
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
            <div class="row footer">
                <div class="col">
                    <a
                        className="nav-link text-danger cartText"
                        onClick={() => props.handleSelected("orders")}
                    >
                        orders
                    </a>
                </div>
                <div class="col">
                    <a
                        className="nav-link text-danger cartText"
                        onClick={() => props.handleSelected("products")}
                    >
                        products
                    </a>
                </div>
                <div class="col">
                    {props.user
                    ?
                        <a
                            className="nav-link text-danger cartText"
                            onClick={() => {
                                signOut().then(() => {
                                    props.update()
                                    props.handleSelected("products")
                                })
                            }}
                        >
                            LOGOUT
                        </a>
                    :
                        <a
                            className="nav-link text-danger cartText"
                            onClick={handleSignInDialog}
                        >
                            LOGIN
                        </a>
                    }
                </div>
            </div>
        </div>
    )
}
