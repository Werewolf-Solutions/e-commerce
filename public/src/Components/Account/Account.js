import React from 'react'
import axios from 'axios'

export default function Account(props) {
    const deleteAccount = async () => {
        let res = await axios.get('/users/delete-user')
        console.log(res.data)
    }
    return (
        <div>
            Username: {props.user ? props.user.username : null}<br/>
            <button onClick={deleteAccount}>delete account</button>
            <button>edit account</button>
        </div>
    )
}
