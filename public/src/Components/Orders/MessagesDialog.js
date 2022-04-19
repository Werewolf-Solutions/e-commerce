import React, {useEffect} from 'react'
import { Dialog } from '@mui/material'
import { Typography } from '@mui/material'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'

import { io } from 'socket.io-client'

import axios from 'axios'

const socket = io()


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
        socket.emit('message', {sentBy: props.user.username, text:message})
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
                ?
                <div>
                    {props.messages.map((msg) => (
                        <div>
                            <Typography>{msg.username}:</Typography>
                            <Typography>{msg.text}</Typography>
                        </div>
                    ))}
                </div>
                : 'No old messages'
                }
                {props.chat.length != 0
                ? props.chat.map((msg) => (
                    <div>
                        <Typography>{msg.sentBy}:</Typography>
                        <Typography>{msg.text}</Typography>
                    </div>
                ))
                : null
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
