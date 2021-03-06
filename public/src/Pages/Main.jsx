import React, {useState, useEffect} from "react"
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material'
import HeroImage from "../Components/HeroImage"
import Card from "../Components/Card"
import UserOrders from "../Components/Orders/UserOrders"
import { getOrders } from "../apiCalls/orderController"
import OrderBody from "../Components/Admin/OrderBody"
import "../Styles/admin-orders-styles.css"
import "../Styles/admin-cards.css"
import "../Styles/card-styles.css"

function Main(props) {

	const [guestOrders, setGuestOrders] = React.useState([])
	const [email, setEmail] = React.useState([])
	const [isMobile, setIsMobile] = useState(false)

	const getGuestOrders = async () => {
		// TODO: sort/filter orders
		let orderedBy = {email: email}
		let {orders} = await getOrders(orderedBy)
		setGuestOrders(orders)
	}

	const handleChange = (e) => {
		setEmail(e.target.value)
	}

	useEffect(() => {
		if (window.innerWidth <= 500) {
			setIsMobile(true)
		}
	}, [])

	if (props.selected === "orders") {
		if (props.orders && props.user) {
			if (isMobile) {
				return(
					<div class="container"><br/>
						<FormControl>
                            <InputLabel id="demo-simple-select-label">Orders</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={props.ordersSelected}
                                label="Orders"
                                onChange={props.handleOrdersSelected}
                            >
                                <MenuItem value={'preparing-order'}>Accepted orders</MenuItem>
                                <MenuItem value={'order-ready'}>Orders ready</MenuItem>
                                <MenuItem value={'order-completed'}>Completed orders</MenuItem>
                                <MenuItem value={'to-be-accepted'}>To be accepted</MenuItem>
                                <MenuItem value={'refunded'}>Refunded</MenuItem>
                                <MenuItem value={'all'}>All</MenuItem>
                            </Select>
                        </FormControl>
                        {props.orders.length != 0
                        ?
                            props.orders.map(order => (
                                <div class="row orders-in">
                                    <div class="col-sm">
                                        <OrderBody order={order} />
                                    </div>
                                </div>
                            ))
                        : null
                        }
					</div>
				)
			} else {
				return(
					<div class="user-orders row mt-2 orders">
					<div class="orders-in column">
						<p className="order-status mt-3 ms-4">Active orders</p>
						<p className="order-statussub ms-4 mb-2">
						Orders to be accepted below...
						</p>
						{props.ordersIn.map(order => (
						<div class="card mb-3 ms-3 me-3 col-sm">
							<div class="card-body">
							    <UserOrders order={order} />
							</div>
						</div>
						))}
					</div>
					<div class="accepted-orders column">
						<p className="order-status mt-3 ms-4">orders accepted</p>
						<p className="order-statussub ms-4  mb-2">
						Orders accepted below...
						</p>
						{props.acceptedOrders.map(order => (
						<div class="card mb-3 ms-3 me-3 col-sm">
							<div class="card-body">
							    <UserOrders order={order} />
							</div>
						</div>
						))}
					</div>
					<div class="completed-orders column">
						<p className="order-status mt-3 ms-4">all orders</p>
						<p className="order-statussub ms-4  mb-2">
						All orders are listed below ...
						</p>
						{props.orders.map(order => (
						<div class="card mb-3 ms-3 me-3 col-sm">
							<div class="card-body">
							    <UserOrders order={order} />
							</div>
						</div>
						))}
					</div>
					</div>
				)
			}
		} else if (!props.user) {
		return(
			<div className="orders">
                <div className="orders-in">
                    <br/><p className="order-status mt-3 ms-4">Search order</p>
                    <p className="order-status sub ms-4 mb-2">
                        Enter email below
                    </p>
                    <input onChange={handleChange}></input>
                    <a onClick={getGuestOrders}>search</a>
                    <div class="row justify-content-center">
						{guestOrders.length != 0
						? 
							guestOrders.map(order => (
							<div class="order-card ">
								<div>
									<OrderBody order={order} />
								</div>
							</div>
							))
						: null
						}
                    </div>
                </div>
			</div>
		)
		}
	}
	

	if (props.selected === "products") {
		if (props.products) {
		return(
		<div>
			<HeroImage />
			{props.products.map((category) => (
			<div>
                <div className="card-text">
                    <h2 id={category.category} className="cardMenuHeader mt-4 mb-4 ms-4r">
                        {category.category}
                    </h2>
                </div>
				<div className="container">
					<div className="row justify-content-center">
						{category.products.map((prod) => (
							<Card
								product={prod}
								update={props.update}
								addToCart={props.addToCart}
								deleteFromCart={props.deleteFromCart}
							/>
						))}
					</div>
				</div>
			</div>
			))}
		</div>)
		}
	}

}

export default Main
