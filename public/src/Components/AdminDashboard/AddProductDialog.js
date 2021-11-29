import React from 'react'
import {
    TextField,
    Dialog
} from '@mui/material'

export default function AddProductDialog(props) {
    return (
        <div>
            <Dialog onClose={props.onClose} open={props.open}>
                <TextField
                    onChange={props.onChange}
                    id="category"
                    label="Category"
                    name="category"
                />
                <TextField
                    onChange={props.onChange}
                    id="name"
                    label="Name"
                    name="name"
                />
                <TextField
                    onChange={props.onChange}
                    id="price"
                    label="Price"
                    name="price"
                />
                <TextField
                    onChange={props.onChange}
                    id="description"
                    label="Description"
                    name="description"
                />                
                <button onClick={props.addProductToProductsList}>add item</button>
                <button onClick={props.onClose}>close</button>
            </Dialog>
        </div>
    )
}
