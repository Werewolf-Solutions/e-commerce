import React from 'react'
import axios from 'axios'
import ProductsList from '../ProductsList/ProductsList'
import AddItemDialog from './AddItemDialog'
import EditItemDialog from './EditItemDialog'

export default function AdminDashboard(props) {
    const [addItemDialog, setAddItemDialog] = React.useState(false)
    const [editItemDialog, setEditItemDialog] = React.useState(false)
    const [itemSelected, setItemSelected] = React.useState()
    const [state, setState] = React.useState()

    const addItem = async () => {
        let item = {
            name: state.name,
            price: state.price,
            description: state.description,
            category: state.category
        }
        let res = await axios.post('/users/add-item-to-products-list', item)
        console.log(res.data)
        props.updateProductsList()
        handleAddItemDialog()
    }

    const editItem = async () => {
        let item = {
            _id: itemSelected._id,
            name: state.name ? state.name : itemSelected.name,
            price: state.price ? state.price : itemSelected.price,
            description: state.description ? state.description : itemSelected.description,
            category: state.category ? state.category : itemSelected.category
        }
        let res = await axios.post('/users/edit-item-in-products-list', item)
        console.log(res.data)
        props.updateProductsList()
        handleEditItemDialog()
    }

    const deleteItem = async (item) => {
        let res = await axios.post('/users/delete-item-from-products-list', {item})
        console.log(res.data)
        props.updateProductsList()
    }

    const addCategory = () => {
        console.log('Add category')
    }

    const handleAddItemDialog = () => {
        setAddItemDialog(!addItemDialog)
    }

    const handleEditItemDialog = (item) => {
        setEditItemDialog(!editItemDialog)
        setItemSelected(item)
    }

    const handleChange = (e) => {
        setState({...state, [e.target.id]: e.target.value})
    }
    return (
        <div>
            <AddItemDialog
                open={addItemDialog}
                onClose={handleAddItemDialog}
                addItem={addItem}
                onChange={handleChange}
            />
            <EditItemDialog
                open={editItemDialog}
                itemSelected={itemSelected}
                onClose={handleEditItemDialog}
                editItem={editItem}
                onChange={handleChange}
            />
            Admin dashboard
            {props.productsList.map((product) => (
                <div key={product._id}>
                    Category: {product.category}<br/>
                    Name: {product.name}<br/>
                    Price: {product.price}<br/>
                    Description: {product.description}<br/>
                    <button onClick={() => handleEditItemDialog(product)}>edit item</button>
                    <button onClick={() => deleteItem(product)}>delete item</button>
                </div>
            ))}
            <br/>
            <button onClick={handleAddItemDialog}>add new item</button>
            <button onClick={addCategory}>add category</button>
        </div>
    )
}
