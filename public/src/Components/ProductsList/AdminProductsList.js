import React from 'react'
import { TextField } from '@mui/material'
import AddProductDialog from '../AdminDashboard/AddProductDialog'
import axios from 'axios'

export default function AdminProductsList(props) {
    const [editProduct, setEditProduct] = React.useState(false)
    const [addProductDialog, setAddproductDialog] = React.useState(false)
    const [state, setState] = React.useState()

    const handleEditProduct = () => {
        setEditProduct(!editProduct)
    }

    const handleAddProductDialog = () => {
        setAddproductDialog(!addProductDialog)
    }

    const editProductList = async (item) => {
        console.log('edit product')
        let {category, name, price, description} = state
        let product = {_id:item._id, category, name, price, description}
        let res = await axios.post('/users/edit-item-in-products-list', {product})
        console.log(res.data)
        props.updateProductsList()
    }

    const addProductToProductsList = async () => {
        console.log('add product')
        let product = {
            name: state.name,
            category: state.category,
            description: state.description,
            price: state.price
        }
        let res = await axios.post('/users/add-item-to-products-list', {product})
        console.log(res.data)
        props.updateProductsList()
        handleAddProductDialog()
    }

    const deleteProductFromProductsList = async (product) => {
        let res = await axios.post('/users/delete-item-from-products-list', {product})
        console.log(res.data)
        props.updateProductsList()
    }

    const handleChange = (e) => {
        setState({...state, [e.target.id]: e.target.value})
    }

    return (
        <div>
            <AddProductDialog
                open={addProductDialog}
                onClose={handleAddProductDialog}
                addProductToProductsList={addProductToProductsList}
                onChange={handleChange}
            />
            Admin products list<br/>
            {props.productsList
            ?  editProduct
                ? props.productsList.map((product) => (
                    <div key={product._id}>
                        <TextField
                            id='category'
                            label='Category'
                            onChange={handleChange}
                        /><br/>
                        <TextField
                            id='name'
                            label='Name'
                            onChange={handleChange}
                        /><br/>
                        <TextField
                            id='price'
                            label='Price'
                            onChange={handleChange}
                        /><br/>
                        <TextField
                            id='description'
                            label='Description'
                            onChange={handleChange}
                        /><br/>
                        Category: {product.category}<br/>
                        Name: {product.name}<br/>
                        Price: {product.price}<br/>
                        Description: {product.description}<br/>
                        <button onClick={() => editProductList(product)}>edit</button>
                        <button onClick={handleEditProduct}>cancel</button>
                    </div>))
                : props.productsList.map((product) => (
                <div key={product._id}>
                    Category: {product.category}<br/>
                    Name: {product.name}<br/>
                    Price: {product.price}<br/>
                    Description: {product.description}<br/>
                    <button onClick={handleEditProduct}>edit product</button>
                    <button onClick={() => deleteProductFromProductsList(product)}>delete product</button><br/>
                </div>))
            : null}
            <button onClick={handleAddProductDialog}>add product</button>
        </div>
    )
}
