import React, {useEffect} from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Paper from '@mui/material/Paper'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import Review from './Review'
import axios from 'axios'

const steps = ['Shipping address', 'Payment details', 'Review your order']

// function getStepContent(step) {
//     switch (step) {
//         case 0:
//         return (
//             <AddressForm
//                 user={props.user}
//             />)
//         case 1:
//         return (<PaymentForm />)
//         case 2:
//         return (<Review />)
//         default:
//         throw new Error('Unknown step')
//     }
// }

const theme = createTheme()

export default function CheckoutForm(props) {
    const [activeStep, setActiveStep] = React.useState(0)
    const [state, setState] = React.useState({
        firstName: props.user ? props.user.firstName : '',
        lastName: props.user ? props.user.lastName : '',
        address1: props.user ? props.user.address.line1 : '',
        address2: '',
        number: '',
        city: '',
        region: '',
        postcode: '',
        country: '',
        cardName: '',
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvc: '',
    })
    const [card, setCard] = React.useState('')
    const [paymentIntent, setPaymentIntent] = React.useState('')
    const [addPaymentMethod, setAddPaymentMethod] = React.useState(false)
    const [paymentMethod, setPaymentMethod] = React.useState('')
    const [shippingMethod, setShippingMethod] = React.useState('')

    const handleShippingMethodSelect = (e) => {
        setShippingMethod(e.target.value)
    }

    const handlePaymentMethodSelected = (e) => {
        setPaymentMethod(e.target.value)
    }

    const handleAddPaymentMethod = () => {
        setAddPaymentMethod(!addPaymentMethod)
    }

    const handleCardSelected = (e) => {
        setCard(e.target.value)
    }

    const handleChange = (e) => {
        setState({...state, [e.target.id]: e.target.value})
    }

    const handleNext = () => {
        if (!shippingMethod && activeStep === 0) {
            console.log('Select a shipping method first')
        } else {
            setActiveStep(activeStep + 1)
        }
        if (activeStep === 0 && props.user) {
            editUser()
        }
        if (activeStep === 1 && props.user) {
            if (addPaymentMethod) {
                createPaymentMethod().then(() => createPaymentIntent())
            } else {
                createPaymentIntent()
            }
        }
        if (activeStep === steps.length - 1 && props.user) {
            confirmPaymentIntent()
        }
    }

    const handleBack = () => {
        setActiveStep(activeStep - 1)
    }

    const editUser = async () => {
        console.log('edit user')
        console.log(state)
        let {
            firstName,
            lastName,
            address1,
            address2,
            city,
            region,
            country,
            postcode,
            number
        } = state
        let res = await axios.post('/users/edit-user', {
            firstName,
            lastName,
            address1,
            address2,
            city,
            region,
            country,
            postcode,
            number
        })
        console.log(res.data)
        props.updateUser()
    }

    const createPaymentMethod = async () => {
        let new_card = {
            number: state.cardNumber,
            exp_month: state.expMonth,
            exp_year: state.expYear,
            cvc: state.cvc
        }
        console.log(paymentMethod)
        console.log(new_card)
        let res = await axios.post('/users/add-payment-method', {type: paymentMethod, card: new_card})
        console.log(res.data)
        setCard(res.data.paymentMethod)
    }

    const createPaymentIntent = async () => {
        console.log('create payment intent')
        console.log(card)
        console.log(props.cart.total_cart)
        let res = await axios.post('/users/create-payment-intent', {payment_method: card, total_cart: props.cart.total_cart*100})
        console.log(res.data)
        if (res.data.paymentIntent) {
            setPaymentIntent(res.data.paymentIntent)
        }
    }

    const confirmPaymentIntent = async () => {
        console.log('Place order')
        let res = await axios.post('/users/confirm-payment-intent', {payment_intent: paymentIntent})
        console.log(res.data)
    }

    const getStepContent = (step) => {
        switch (step) {
            case 0:
            return (
                <AddressForm
                    user={props.user}
                    handleSignInDialog={props.handleSignInDialog}
                    handleChange={handleChange}
                    state={state}
                    editUser={editUser}
                    shippingMethod={shippingMethod}
                    handleShippingMethodSelect={handleShippingMethodSelect}
                />)
            case 1:
            return (
                <PaymentForm
                    user={props.user}
                    handleChange={handleChange}
                    state={state}
                    card={card}
                    handleCardSelected={handleCardSelected}
                    handleAddPaymentMethod={handleAddPaymentMethod}
                    addPaymentMethod={addPaymentMethod}
                    paymentMethod={paymentMethod}
                    handlePaymentMethodSelected={handlePaymentMethodSelected}
                />)
            case 2:
            return (
                <Review
                    state={state}
                    handleChange={handleChange}
                    cart={props.cart}                    
                />)
            default:
            throw new Error('Unknown step')
        }
    }

    useEffect(() => {
        console.log(state)
    }, [])

    return (
        <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
            <Typography component="h1" variant="h4" align="center">
                Checkout
            </Typography>
            <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                </Step>
                ))}
            </Stepper>
            <React.Fragment>
                {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography variant="h5" gutterBottom>
                        Thank you for your order.
                    </Typography>
                    <Typography variant="subtitle1">
                        Your order number is #2001539. We have emailed your order
                        confirmation, and will send you an update when your order has
                        shipped.
                    </Typography>
                </React.Fragment>
                ) : (
                <React.Fragment>
                    {getStepContent(activeStep)}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {activeStep !== 0 && (
                        <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                            Back
                        </Button>
                    )}

                    <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 3, ml: 1 }}
                    >
                        {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                    </Button>
                    </Box>
                </React.Fragment>
                )}
            </React.Fragment>
            </Paper>
        </Container>
        </ThemeProvider>
    )
}