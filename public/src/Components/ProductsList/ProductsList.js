import React, {useEffect} from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import { Grid } from '@mui/material'

export default function ProductsList(props) {
    return (
        <div>
            Products list<br/><br/>
            {props.categories
            ? props.categories.map(category => (
                <div key={category}>
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
