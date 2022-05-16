import React from 'react'
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    TextField
} from '@mui/material'
import axios from 'axios'
import img from '../../files/pizza-margherita.jpeg'

export default function EditableProductCard(props) {
    const [file, setFile] = React.useState()

    const uploadImg = async () => {
        let prod = props.product
        // Create an object of formData
        const formData = new FormData()

        // Details of the uploaded file
        console.log(file)

        // Update the formData object
        formData.append("file", file, file.name)

        // Request made to the backend api
        // Send formData object
        // let res = await axios.post("/users/upload-img",
        //     {product: props.product, file, formData})
        let res = await axios.post("/users/upload-img", formData)
        console.log(res.data)
        let {img} = res.data
        prod.img = img
        console.log(prod)
        let response = await axios.post('/users/update-product', {product: prod})
        console.log(response.data)
    }

    const onFileChange = event => {
        // Update the state
        // setFile(URL.createObjectURL(event.target.files[0]))
        setFile(event.target.files[0])
    }
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
                    image={props.product.img.path}
                    alt={props.product.name}
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
                    <button onClick={() => props.deleteProduct(props.product)}>delete</button>
                    <button onClick={props.handleEditable}>cancel</button>
                    <div>
                        <input type="file" onChange={onFileChange} name="file"/>
                        <button onClick={uploadImg}>
                            Upload!
                        </button>
                    </div>
                </CardActions>
            </Card>
        </div>
    )
}
