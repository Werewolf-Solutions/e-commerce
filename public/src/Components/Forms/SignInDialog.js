import React from 'react'
import {
    Dialog
} from '@mui/material'
import SignIn from './SignIn'


export default function SignInDialog(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
            >
                <SignIn
                    signIn={props.signIn}
                    handleChange={props.handleChange}
                    handleSignInDialog={props.handleSignInDialog}
                    handleSignUpDialog={props.handleSignUpDialog}
                />                
                {/* <button onClick={() => {
                    props.handleSignInDialog()
                    props.handleSignUpDialog()
                }}>open sign up</button> */}
            </Dialog>
        </div>
    )
}
