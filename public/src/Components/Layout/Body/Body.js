import React from 'react'
import Cart from '../../Cart/Cart'
import Checkout from '../../Checkout/Checkout'
import SignIn from '../../Forms/SignIn'
import SignUp from '../../Forms/SignUp'
import AdminUsersOrders from '../../Orders/AdminUsersOrders'
import UserOrders from '../../Orders/UserOrders'
import AdminProductsList from '../../ProductsList/AdminProductsList'
import ProductsList from '../../ProductsList/ProductsList'

export default function Body(props) {
    if (props.selected === 'sign-in') {
        return(
            <div>
                <SignIn
                    handleChange={props.handleChange}
                    handleSelected={props.handleSelected}
                    signIn={props.signIn}
                />
            </div>
        )
    }else if (props.selected === 'sign-up') {
        return(
            <div>
                <SignUp
                    handleChange={props.handleChange}
                    handleSelected={props.handleSelected}
                    signUp={props.signUp}
                />
            </div>
        )
    } else if (props.selected === 'products-list') {
        return(
            <div>
                {props.user ? `Hello ${props.user.username}` : null}
                <ProductsList
                    addToCart={props.addToCart}
                    productsList={props.productsList}
                />
            </div>
        )
    } else if (props.selected === 'cart') {
        return(
            <div>
                <Cart
                    cart={props.cart}
                    deleteFromCart={props.deleteFromCart}
                    handleSelected={props.handleSelected}
                    checkout={props.checkout}
                />
            </div>
        )
    } else if (props.selected === 'user-orders') {
        return(
            <div>
                <UserOrders
                    user={props.user}
                />
            </div>
        )
    } else if (props.selected === 'admin-products-list') {
        return(
            <div>
                {props.user ? `Hello ${props.user.username}` : null}
                <AdminProductsList
                    updateUser={props.updateUser}
                    productsList={props.productsList}
                    updateProductsList={props.updateProductsList}
                />
            </div>
        )
    } else if (props.selected === 'admin-users-orders') {
        return(
            <div>
                <AdminUsersOrders
                    user={props.user}
                    updateUser={props.updateUser}
                />
            </div>
        )
    } else if (props.selected === 'checkout') {
        return(
            <div>
                <Checkout
                    checkout={props.checkout}
                />
            </div>
        )
    }
}
