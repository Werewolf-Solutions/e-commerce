import { Dialog } from '@mui/material'
import React from 'react'
import SignUp from './SignUp'

export default function SignUpDialog(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
            >
                <SignUp
                    signUp={props.signUp}
                    handleChange={props.handleChange}
                    handleSignInDialog={props.handleSignInDialog}
                    handleSignUpDialog={props.handleSignUpDialog}
                />
                {/* <button onClick={() => {
                        props.handleSignInDialog()
                        props.handleSignUpDialog()
                }}>open sign in</button> */}
            </Dialog>
        </div>
    )
}
