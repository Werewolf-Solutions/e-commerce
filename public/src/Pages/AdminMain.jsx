import React, {useEffect, useState} from "react"
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material'
import { updateCategory } from "../apiCalls/productController"
import AdminCard from "../Components/Admin/AdminCard"
import AdminOrder from "../Components/Admin/AdminOrder"
import CreateProductDialog from "../Components/Admin/CreateProductDialog"
import OrdersHistory from "../Components/Admin/OrdersHistory"
import AcceptedOrder from "../Components/Orders/AcceptedOrder"
import ReadyOrder from "../Components/Orders/ReadyOrder"
import OrderBody from "../Components/Admin/OrderBody"
import "../Styles/admin-orders-styles.css"
import "../Styles/admin-cards.css"

export default function AdminMain(props) {
    const [createProductDialog, setCreateProductDialog] = useState(false)
    const [updateCategoryInput, setUpdateCategoryInput] = useState(false)
    const [newCategory, setNewCategory] = useState()
	const [isMobile, setIsMobile] = useState(false)

    const handleCreateProductDialog = () => {
        setCreateProductDialog(!createProductDialog)
    }

    const handleUpdateCategoryInput = () => {
        setUpdateCategoryInput(!updateCategoryInput)
    }
    
    const handleChange = (e) => {
        setNewCategory(e.target.value)
    }

    // console.log(props.order)

    useEffect(() => {
        if (window.innerWidth <= 500) {
            setIsMobile(true)
        }
    }, [])

    if (props.selected === 'products') {
        if (props.products) {
        return (
            <div className="products">
            <CreateProductDialog
                open={createProductDialog}
                onClose={handleCreateProductDialog}
                product={props.product}
                update={props.update}
            />
            {props.products.map((category) => (
                <div>
                    <div className="card-text">
                        <h2 id="sideorders" className="cardMenuHeader mt-4 mb-4 ms-4">
                            {category.category}
                        </h2>
                        {updateCategoryInput
                        ?
                            <div>
                                <input onChange={handleChange}></input>
                                <a
                                    onClick={
                                        () => updateCategory(category.category, newCategory).then(() => {
                                            props.update()
                                            handleUpdateCategoryInput()
                                        })
                                    }
                                    class="btn btn-info ms-3 btn-sm"
                                >Confirm</a>
                                <a
                                    onClick={handleUpdateCategoryInput}
                                    class="btn btn-info ms-3 btn-sm"
                                >Cancel</a>
                            </div>
                        :
                            <a
                                onClick={handleUpdateCategoryInput}
                                class="btn btn-info ms-3 btn-sm"
                            >Edit category</a>
                        }
                    </div>
                    <div className="row justify-content-center">
                        {category.products.map((prod) => (
                            <AdminCard product={prod} update={props.update} />
                        ))}
                    </div>
                </div>
            ))}
            </div>
        )
        } else {
        return 'loading'
        }
    }

    if (props.selected === 'orders') {
        if (isMobile) {
            return(
                <div className="container"><br/>
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
                        props.ordersSelected === 'to-be-accepted'
                        ?
                            <div class="row orders-in">
                                <div class="col-sm">
                                {props.ordersIn.map(order => (
                                    <div class="card mb-3 ms-3 me-3">
                                        <div class="card-body">
                                            <AdminOrder order={order} update={props.update} />
                                        </div>
                                    </div>
                                ))}
                                </div>
                            </div>
                        : props.ordersSelected === 'preparing-order'
                            ?
                                <div class="row orders-in">
                                    <div class="col-sm">
                                    {props.acceptedOrders.map(order => (
                                        <div class="card mb-3 ms-3 me-3">
                                        <div class="card-body">
                                            <AcceptedOrder order={order} update={props.update} />
                                        </div>
                                        </div>
                                    ))}
                                    </div>
                                </div>
                            : props.ordersSelected === 'order-completed'
                                ?
                                    <div class="row orders-in">
                                        <div class="col-sm">
                                        {props.completedOrders.map(order => (
                                            <div class="card mb-3 ms-3 me-3">
                                            <div class="card-body">
                                                <ReadyOrder order={order} update={props.update} />
                                            </div>
                                            </div>
                                        ))}
                                        </div>
                                    </div>
                                : props.ordersSelected === 'all'
                                    ?
                                        props.orders.map(order => (
                                            <div class="row orders-in">
                                                <div class="col-sm">
                                                    <OrderBody order={order} />
                                                </div>
                                            </div>
                                        ))
                                    : null
                    : null
                    }
                </div>
            )
        } else {
            return (
                <div class="admin-orders row mt-2 orders">
                    <div class="orders-in column">
                    <p className="order-status mt-3 ms-4">orders in</p>
                    <p className="order-statussub ms-4  mb-2">
                        Accept or Decline orders below...
                    </p>
                    {props.ordersIn.map(order => (
                        <div class="card mb-3 ms-3 me-3">
                        <div class="card-body">
                            <AdminOrder order={order} update={props.update} />
                        </div>
                        </div>
                    ))}
                    </div>
                    <div class="accepted-orders column">
                    <p className="order-status mt-3 ms-4">orders accepted</p>
                    <p className="order-statussub ms-4  mb-2">
                        Prepare orders below
                    </p>
                    {props.acceptedOrders.map(order => (
                        <div class="card mb-3 ms-3 me-3">
                        <div class="card-body">
                            <AcceptedOrder order={order} update={props.update} />
                        </div>
                        </div>
                    ))}
                    </div>
                    <div class="completed-orders column">
                    <p className="order-status mt-3 ms-4">orders completed</p>
                    <p className="order-statussub ms-4  mb-2">
                        Orders waiting for collection / delivery below...
                    </p>
                    {props.completedOrders.map(order => (
                        <div class="card mb-3 ms-3 me-3">
                        <div class="card-body">
                            <ReadyOrder order={order} update={props.update} />
                        </div>
                        </div>
                    ))}
                    </div>
                </div>
            )
        }
    }

    if (props.selected === "orders-history") {
        return (
            <div className="orders">
                <p className="order-status mt-3 ms-4">orders history</p>
                <div className="orders-in">
                    <div class="row justify-content-center">
                    {props.orders.map((order) =>
                        order.accepted && order.ready && order.completed ? (
                            <div class="order-card">
                                <div>
                                    <OrdersHistory order={order} update={props.update} />
                                </div>
                            </div>
                        ) : null
                    )}
                    </div>
                </div>
			</div>
        )
    }
}
