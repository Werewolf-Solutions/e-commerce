import React from 'react'
import {
    Dialog,
    DialogActions,
    TextField,
    Button
} from '@mui/material'
import axios from 'axios'

const getDifferent = (obj1, obj2) => {
    const obj1Values = Object.values(obj1)
    const obj2Values = Object.values(obj2)

    const obj1Keys = Object.keys(obj1)
    const obj2Keys = Object.keys(obj2)
    
    let new_obj = []
    
    for (let i = 0; i < obj1Values.length; i++) {
        for (let j = 0; j < obj2Values.length; j++) {
            if (i === j) {
                if (obj1Values[i] != obj2Values[j]) {
                    let key = obj1Keys[i]
                    let obj = {}
                    obj[key] = obj1Values[i]
                    new_obj.push(obj)
                }
            }
        }
    }
    return new_obj
}

export default function EditableAccount(props) {
    const [address, setAddress] = React.useState(props.user.address)
    const [state, setState] = React.useState({
        username: props.user.username,
        email: props.user.email
    })

    const handleChange = (e) => {
        setAddress({...address, [e.target.id]: e.target.value})
        setState({...state, [e.target.id]: e.target.value})
    }

    const editUser = async () => {
        let obj = getDifferent(address, props.user.address)
        let account = {}
        for (let i = 0; i < obj.length; i++) {
            const objValue = Object.values(obj[i])[0]

            const objKey = Object.keys(obj[i])[0]

            account[objKey] = objValue
        }
        if (state.username != props.user.username) {
            account.username = state.username
        }
        if (state.email != props.user.email) {
            account.email = state.email
        }
        if (Object.keys(account) != 0) {
            console.log(account)
            let res = await axios.post('/users/edit-user', account)
            console.log(res.data)
            props.updateUser()
        }
    }

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
            >
                <TextField
                    id="username"
                    onChange={handleChange}
                    label="username"
                    value={state.username}
                />
                <TextField
                    id="email"
                    onChange={handleChange}
                    label="email"
                    value={state.email}
                />
                <TextField
                    id="city"
                    onChange={handleChange}
                    label="city"
                    value={address.city}
                />
                <TextField
                    id="country"
                    onChange={handleChange}
                    label="Country"
                    value={address.country}
                />
                <TextField
                    id="line1"
                    onChange={handleChange}
                    label="Line 1"
                    value={address.line1}
                />
                <TextField
                    id="number"
                    onChange={handleChange}
                    label="Number"
                    value={address.number}
                />
                <TextField
                    id="postcode"
                    onChange={handleChange}
                    label="Postcode"
                    value={address.postcode}
                />
                <TextField
                    id="region"
                    onChange={handleChange}
                    label="Region"
                    value={address.region}
                />
                <DialogActions>
                    <Button onClick={editUser}>confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
