import React, {useEffect} from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import { Grid } from '@mui/material'

export default function ProductsList(props) {
    const [categories, setCategories] = React.useState([])
    const groupByCategory = arr => {
        const hash = Object.create(null),
        result = []
        arr.forEach(el => {
            if (!hash[el.category]) {
                hash[el.category] = []
                result.push(hash[el.category])
            }
            hash[el.category].push(el)
        })
        return result
    }

    const getCategories = () => {
        let result = []
        props.productsList.forEach(product => {
            if (result.length === 0) {
                result.push(product.category)
            } else if (result[result.length -1] != product .category) {
                result.push(product.category)
            }
        })
        return result
    }

    useEffect(() => {
        // let categories = groupByCategory(props.productsList)
        let categories = getCategories()
        setCategories(categories)
        // console.log(categories)
    }, [])
    return (
        <div>
            Products list<br/><br/>
            {categories
            ? categories.map(category => (
                <div>
                    {category}
                    <Grid container>
                        {props.productsList
                        ? props.productsList.map((product) => (
                            product.category === category
                            ?   <div key={product._id}>
                                    <ProductCard
                                        product={product}
                                        addToCart={props.addToCart}
                                    /><br/>
                                </div>
                            : null))
                        : null
                        }
                    </Grid>
                </div>
            ))
            : null}
        </div>
    )
}
