import React, {useEffect} from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import { Grid } from '@mui/material'
import { Typography } from '@mui/material'
import { Button } from '@mui/material'
import EditableProductCard from './EditableProductCard'
import { SettingsInputAntennaTwoTone } from '@mui/icons-material'
import AddProductDialog from '../AdminDashboard/AddProductDialog'

export default function ProductsList(props) {
    const [editable, setEditable] = React.useState(false)
    const [addProductDialog, setAddproductDialog] = React.useState(false)
    const [list, setList] = React.useState([])
    const [state, setState] = React.useState()

    const handleAddProductDialog = () => {
        setAddproductDialog(!addProductDialog)
    }

    const handleEditable = () => {
        setEditable(!editable)
    }

    const editProductList = () => {
        console.log('edit')
        console.log(state)
    }

    const handleChange = (e) => {
        setState({...state, [e.target.id]: e.target.value})
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

    const createList = () => {
        const result = props.productsList.reduce((acc, d) => {
            const found = acc.find(a => a.category === d.category)
            //const value = { category: d.category, val: d.value }
            const value = d // the element in data property
            if (!found) {
                //acc.push(...value)
                acc.push({category:d.category, products: [value]}) // not found, so need to add products property
            }
            else {
                //acc.push({ category: d.category, products: [{ value: d.value }, { name: d.name }] })
                found.products.push(value) // if found, that means products property exists, so just push new element to found.data.
            }
            return acc
        }, [])
        
        setList(result)
    }

    useEffect(() => {
        createList()
    }, [])

    return (
        <div>
            <AddProductDialog
                open={addProductDialog}
                onClose={handleAddProductDialog}
                addProductToProductsList={addProductToProductsList}
                onChange={handleChange}
            />
            {props.user && props.user.admin
            ?
            <div>
                <Button
                    onClick={handleEditable}
                >Edit</Button>
                <Button
                    onClick={handleAddProductDialog}
                >Add product</Button>
            </div>
            : null
            }
            <Grid container direction='column' spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {list.map((item, index) => (
                <Grid item container xs={2} sm={4} md={4} key={index}>
                    {index} {item.category}
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {item.products.map((product, i) => (
                        <Grid item xs={2}>
                            {editable
                            ?
                            <EditableProductCard
                                handleChange={handleChange}
                                handleEditable={handleEditable}
                                editProductList={editProductList}
                            />
                            :
                            <ProductCard
                                product={product}
                                addToCart={props.addToCart}
                            />
                            }
                        </Grid>
                        ))}
                    </Grid>
                </Grid>
            ))}
            </Grid>
        </div>
    )
}
