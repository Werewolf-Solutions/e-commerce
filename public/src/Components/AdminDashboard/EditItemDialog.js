import React from 'react'
import {
    TextField,
    Dialog
} from '@mui/material'

export default function EditItemDialog(props) {
    return (
        <div>
            <Dialog onClose={props.onClose} open={props.open}>
                {props.itemSelected
                ? 
                    <div>
                        <TextField
                            onChange={props.onChange}
                            id="name"
                            label="Name"
                            name="name"
                            value={props.itemSelected.name}
                        />
                        <TextField
                            onChange={props.onChange}
                            id="price"
                            label="Price"
                            name="price"
                            value={props.itemSelected.price}
                        />
                        <TextField
                            onChange={props.onChange}
                            id="description"
                            label="Description"
                            name="description"
                            value={props.itemSelected.description}
                        />
                        <TextField
                            onChange={props.onChange}
                            id="category"
                            label="Category"
                            name="category"
                            value={props.itemSelected.category}
                        />
                        <button onClick={props.editItem}>edit item</button>
                        <button onClick={props.onClose}>close</button>
                    </div>
                : null
                }                
            </Dialog>
        </div>
    )
}
