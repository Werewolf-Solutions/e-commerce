import { Dialog } from '@mui/material'
import React from 'react'
import SignUpForm from './SignUpForm'

export default function SignUpDialog(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
            >
                <SignUpForm
                    signUp={props.signUp}
                    handleChange={props.handleChange}
                    handleSignInDialog={props.handleSignInDialog}
                    handleSignUpDialog={props.handleSignUpDialog}
                    update={props.update}
                    onClose={props.onClose}
                />
                {/* <button onClick={() => {
                        props.handleSignInDialog()
                        props.handleSignUpDialog()
                }}>open sign in</button> */}
            </Dialog>
        </div>
    )
}
