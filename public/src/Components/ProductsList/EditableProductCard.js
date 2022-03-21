import React from 'react'
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    TextField
} from '@mui/material'
import img from '../../files/pizza-margherita.jpeg'

export default function EditableProductCard(props) {
    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    title={ <TextField
                                id='name'
                                label='Name'
                                onChange={props.handleChange}
                            />}
                    subheader={ <TextField
                                    id='price'
                                    label='Price'
                                    onChange={props.handleChange}
                                />}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={img}
                    alt="Pizza margherita"
                />
                <CardContent>
                    <TextField
                        id='description'
                        label='Description'
                        onChange={props.handleChange}
                    />
                    <TextField
                        id='category'
                        label='Category'
                        onChange={props.handleChange}
                    />
                </CardContent>
                <CardActions>
                    <button onClick={() => props.editProductList(props.product)}>confirm</button>
                    <button onClick={props.handleEditable}>cancel</button>
                    <button>upload new image</button>
                </CardActions>
            </Card>
        </div>
    )
}
