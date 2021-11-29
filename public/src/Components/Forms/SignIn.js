import React from 'react'

export default function SignIn(props) {
    return (
        <div>
            Sign in form<br/>
            <input
                id='email'
                onChange={props.handleChange}
            /><br/>
            <input
                id='password'
                onChange={props.handleChange}
            /><br/>
            <button onClick={props.signIn}>confirm sign in</button><br/>
            {"Don't have an account? just sign up -->"}
            <button onClick={() => props.handleSelected('sign-up')}>open sign up</button>
        </div>
    )
}
