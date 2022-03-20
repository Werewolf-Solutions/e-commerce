import { Grid } from '@mui/material'
import { Typography } from '@mui/material'
import { Dialog } from '@mui/material'
import React from 'react'

export default function ItemsDialog(props) {
    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.onClose}
            >
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {props.items.length != 0
                    ? props.items.map(item => (
                        <Grid item xs={8}>
                            <Typography variant="body2">
                                Category: {item.category}<br/>
                            </Typography>
                            <Typography variant="body2">
                                Name: {item.name}<br/>
                            </Typography>
                            <Typography variant="body2">
                                Price: {item.price}<br/>
                            </Typography>
                            <Typography variant="body2">
                                Description: {item.description}<br/>
                            </Typography>
                            <Typography variant="body2">
                                Quantity: {item.quantity}
                            </Typography>
                        </Grid>
                    ))
                    : 'Loading'
                    }
                </Grid>
            </Dialog>
        </div>
    )
}
