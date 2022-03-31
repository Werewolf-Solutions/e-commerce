import React, {useEffect} from 'react'
import { Dialog } from '@mui/material'
import { Typography } from '@mui/material'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'

import { io } from 'socket.io-client'

import axios from 'axios'

const socket = io('http://localhost:5000', {
    withCredentials: true,
    extraHeaders: {
        "my-custom-header": "abcd"
    }
})


export default function MessagesDialog(props) {
    const [chat, setChat] = React.useState([])
    const [message, setMessage] = React.useState()

    useEffect(() => {
        socket.on('message', ({message}) => {
            setChat(message)
        })
    })

    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = async () => {
        console.log(message)
        console.log(props.order)
        // TODO: call endpoint
        let res = await axios.post('/users/send-msg', {message, order_id: props.order._id})
        socket.emit('message', {message})
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
                <Typography>{chat}</Typography>
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
