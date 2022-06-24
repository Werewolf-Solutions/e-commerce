import * as React from "react"
import logo from "../../Assets/brand.png"
import CheckoutDialog from "../Checkout/CheckoutDialog"
import { signOut } from "../../apiCalls/userController"
import CartDialog from "../CartDialog"
import "../../Styles/nav-bar-styles.css"

import {ShoppingCart} from '@mui/icons-material'

export default function GuestNavBar(props) {

	const [checkoutDialog, setCheckoutDialog] = React.useState(false)

	const [cartDialog, setCartDialog] = React.useState(false)

	const handleCartDialog = () => {
		setCartDialog(!cartDialog)
	}

	const handleCheckoutDialog = () => {
		setCheckoutDialog(!checkoutDialog)
	}

	return (
		<nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top p-3">
		<div className="container-fluid align-items-end">
			<img src={logo} className="img-fluid logo" alt="" />
			<div
				className="collapse navbar-collapse justify-content-end"
				id="collapsibleNavbar"
			>
				{/* my orders */}
				<li className="nav-item">
					<a
						className="nav-link text checkoutButton"
						onClick={() => props.handleSelected("orders")}
					>
						orders
					</a>
				</li>
				{/* products */}
				<li className="nav-item">
					<a
						className="nav-link text checkoutButton"
						onClick={() => props.handleSelected("products")}
					>
						products
					</a>
				</li>

				{/* items in my cart */}
				<li className="nav-item">
					<a
						className="nav-link text checkoutButton"
						onClick={handleCartDialog}
					>
						Cart {props.totalItems} | £{props.totalAmount}
					</a>
				</li>
				{/* total price */}
				<li className="nav-item">
					{props.cart.length !== 0 ? (
					<button
						onClick={handleCheckoutDialog}
						className="nav-link text checkoutButton"
					>
						checkout
					</button>
					) : null}
				</li>
				{/* login */}
				<li className="nav-item">
					<a
						className="nav-link adminNavLinks text-danger"
						onClick={props.handleSignInDialog}
					>
						login
					</a>
				</li>
				<CheckoutDialog
					open={checkoutDialog}
					onClose={handleCheckoutDialog}
					user={props.user}
					cart={props.cart}
					totalAmount={props.totalAmount}
					update={props.update}
					emptyCart={props.emptyCart}
				/>
				<CartDialog
					open={cartDialog}
					onClose={handleCartDialog}
					cart={props.cart}
					deleteFromCart={props.deleteFromCart}
				/>
				{/* what should be in here end */}
			</div>
		</div>
		</nav>
	)
}