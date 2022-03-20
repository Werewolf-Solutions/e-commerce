import React from 'react'
import { Dialog } from '@mui/material'
import { Typography } from '@mui/material'
import { TextField } from '@mui/material'
import { Button } from '@mui/material'

export default function MessagesDialog(props) {
    const [message, setMessage] = React.useState()
    const handleChange = (e) => {
        setMessage(e.target.value)
    }

    const sendMessage = async () => {
        console.log(message)
        // TODO: call endpoint
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
