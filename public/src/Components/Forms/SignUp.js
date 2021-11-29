import React from 'react'

export default function SignUp(props) {
    return (
        <div>
            Sign up form<br/>
            <input
                id='email'
                onChange={props.handleChange}
            /><br/>
            <input
                id='password'
                onChange={props.handleChange}
            /><br/>
            <input
                id='password2'
                onChange={props.handleChange}
            /><br/>
            <button onClick={props.signUp}>confirm sign up</button><br/>
            {"Already have an account? just sign in -->"}
            <button onClick={() => props.handleSelected('sign-in')}> open sign in</button>
        </div>
    )
}
