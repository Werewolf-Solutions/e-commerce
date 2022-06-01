import React from 'react'
import {
    Typography,
    Dialog
} from '@mui/material'

export default function NotificationsDialog(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
            >
                {props.notifications.length != 0
                ? 
                    props.notifications.map(notification => (
                        <div>
                            <Typography>Message: {notification.msg}</Typography>
                        </div>
                    ))
                : 'no notification'
                }
            </Dialog>      
        </div>
    )
}
