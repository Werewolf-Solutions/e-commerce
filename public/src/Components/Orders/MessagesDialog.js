import React from 'react'
import { Dialog } from '@mui/material'
import { Typography } from '@mui/material'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'
import axios from 'axios'

export default function MessagesDialog(props) {
    const [message, setMessage] = React.useState()
    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = async () => {
        console.log(message)
        console.log(props.order)
        // TODO: call endpoint
        let res = await axios.post('/users/send-msg', {message, order_id: props.order._id})
        console.log(res.data)
        props.updateUser()
        setMessage('')
    }
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
            >
                {props.messages.length != 0
                ? props.messages.map(message => (
                    <Typography>{message.text}</Typography>
                ))
                : 'No messages'
                }
                <TextField
                    id='message'
                    value={message}
                    onChange={handleChange}
                />
                <Button
                    onClick={sendMessage}
                >Send</Button>
            </Dialog>
        </div>
    )
}
