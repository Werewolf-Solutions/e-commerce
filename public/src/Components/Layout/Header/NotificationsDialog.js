import { Typography } from '@mui/material'
import { Dialog } from '@mui/material'
import React from 'react'

export default function NotificationsDialog(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
            >
                {props.notifications ? props.notifications.map(notification => (
                    <Typography>
                        {notification}
                    </Typography>
                )) : 'there is nothing new'}
            </Dialog>
        </div>
    )
}
