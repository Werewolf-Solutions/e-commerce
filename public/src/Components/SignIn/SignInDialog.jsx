import React from 'react'
import {
    Dialog
} from '@mui/material'
import SignInForm from './SignInForm'


export default function SignInDialog(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
            >
                <SignInForm
                    signIn={props.signIn}
                    handleChange={props.handleChange}
                    handleSignInDialog={props.handleSignInDialog}
                    handleSignUpDialog={props.handleSignUpDialog}
                    update={props.update}
                    onClose={props.onClose}
                />
            </Dialog>
        </div>
    )
}