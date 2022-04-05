import React from 'react'
import {
    TextField,
    Button
} from '@mui/material'
import axios from 'axios'
import EditableAccount from './EditableAccount'
import AddPyamentMethodDialog from '../Checkout/AddPyamentMethodDialog'
import OrderDialog from './OrderDialog'

export default function Account(props) {
    console.log(props.user)
    const [editableAccountDialog, setEditableAccountDialog] = React.useState(false)
    const [addPaymentMethodDialog, setAddPaymentMethodDialog] = React.useState(false)
    const [orderDialog, setOrderDialog] = React.useState(false)
    const [card, setCard] = React.useState()
    const [order, setOrder] = React.useState()

    const handleEditableAccountDialog = () => {
        setEditableAccountDialog(!editableAccountDialog)
    }

    const handleAddPaymentMethod = () => {
        setAddPaymentMethodDialog(!addPaymentMethodDialog)
    }

    const handleChange = (e) => {
        setCard({...card, [e.target.id]: e.target.value})
    }

    const deleteAccount = async () => {
        let res = await axios.get('/users/delete-user')
        console.log(res.data)
        props.updateUser()
    }

    const addPaymentMethod = async () => {
        console.log('add payment method')
        console.log(card)
        let {
            type,
            card_number,
            exp_month,
            exp_year,
            cvc
        } = card
        let new_card= {
            number: card_number,
            exp_month,
            exp_year,
            cvc,
        }
        // TODO: /add-payment-method, {type, card}
        let res = await axios.post('/users/add-payment-method', {type, card: new_card})
        console.log(res.data)
        props.updateUser()
        handleAddPaymentMethod()
    }

    const deletePaymentMethod = async (pm) => {
        console.log(pm)
        console.log(props.user.customer_id)
        // TODO: delete card: /delete-card, {cus_1234, card_1234}
        let res = await axios.post('/users/detach-payment-method', {payment_method: pm.id})
        console.log(res.data)
        props.updateUser()
    }

    const handlePaymentTypeSelection = (e) => {
        console.log(e.target)
        setCard({...card, type: e.target.value})
    }

    const confirmPaymentIntent = async (pi) => {
        console.log(pi)
        // TODO: /confirm-payment-intent, {payment_intent_id: pi.id}
        let res = await axios.post('/users/confirm-payment-intent', {payment_intent: pi.id})
        console.log(res.data)
        props.updateUser()
    }

    const handleOrderDialog = () => {
        let orders = props.orders
        for (let i = 0; i < orders.length; i++) {
            let payment_intents = props.user.payment_intents
            for (let j = 0; j < payment_intents.length; j++) {
                if (orders[i].payment_intent.id === payment_intents[j].id) {
                    setOrder(orders[i])
                    console.log(orders[i])
                }
            }
        }
        setOrderDialog(!orderDialog)
    }

    return (
        <div>
            <EditableAccount
                user={props.user}
                open={editableAccountDialog}
                onClose={handleEditableAccountDialog}
                updateUser={props.updateUser}
            />
            <AddPyamentMethodDialog
                open={addPaymentMethodDialog}
                onClose={handleAddPaymentMethod}
                addPaymentMethod={addPaymentMethod}
                handleChange={handleChange}
                handlePaymentTypeSelection={handlePaymentTypeSelection}
                card={card}
            />
            <OrderDialog
                open={orderDialog}
                onClose={handleOrderDialog}
                order={order}
            />
            Username: {props.user ? props.user.username : null}<br/>
            Email: {props.user ? props.user.email : null}<br/><br/>
            Address:<br/>
            -City: {props.user.address.city}<br/>
            -Country: {props.user.address.country}<br/>
            -Line 1: {props.user.address.line1}<br/>
            -Number: {props.user.address.number}<br/>
            -Postcode: {props.user.address.postcode}<br/>
            -Region: {props.user.address.region}<br/><br/>
            Payment Methods: {props.user.payment_methods.map((pm, index) =>
                <div>
                    -{index+1}: {pm.brand}, {`xxxx-xxxx-${pm.last4}`}
                    <Button onClick={() => deletePaymentMethod(pm)}>delete payment method</Button>
                </div>
            )}<br/>
            <Button onClick={handleAddPaymentMethod}>add payment method</Button><br/><br/>
            Payment Intents: {props.user.payment_intents.map((pi, index) =>
                <div>
                    -{index+1}: {pi.status} <Button onClick={handleOrderDialog}>see order</Button>
                    {pi.status === 'requires_confirmation'
                    ? <Button onClick={() => confirmPaymentIntent(pi)}>confirm payment intent</Button>
                    : null
                    }
                </div>
            )}<br/><br/>
            <button onClick={deleteAccount}>delete account</button>
            <button onClick={handleEditableAccountDialog}>edit account</button>
        </div>
    )
}
