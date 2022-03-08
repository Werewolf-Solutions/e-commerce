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
        email: props.user ? props.user.email : '',
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

    const handleNext = async () => {
        // Address form

        // if there's not a shipping method don't go next
        if (!shippingMethod && activeStep === 0) {
            // TODO: error pop up
            console.log('Select a shipping method first')
            // if shipping method is delivery & there's no user signed in
        } else if (shippingMethod === 'delivery' && !props.user && activeStep === 0) {
            // TODO: if user exists sign in
            // TODO: if user doesn't exist sign up and sign in
            // TODO: handle errors
            // TODO: if required fields are empty send error
            // sign up user
            if (state.email != '' && state.password != '' && state.password2 != '') {
                // TODO: sign up with user's details or call /users/edit-user
                console.log('Try sign in and if not existing sign up')
                console.log(state)
                let {
                    email,
                    password,
                    password2,
                    firstName,
                    lastName,
                    address1,
                    address2,
                    city,
                    region,
                    postcode,
                    country
                } = state

                // sign up
                let response = axios.post('/users/sign-up', {email, password, password2}).then((res) => {
                    console.log(res)
                    axios.post('/users/sign-in', {email, password}).then((r) => {
                        console.log(r)
                        editUser()
                        return {msg: 'Done'}
                    })
                })
                console.log(response)

                // sign in


                // edit user


                // setActiveStep(activeStep + 1)
            } else {
                console.log('Fill all fields')
            }
            // if shipping method is delivery & user signed in
        } else if (shippingMethod === 'delivery' && props.user && activeStep === 0) {
            // edit user signed in
            // TODO: edit only if user's details are different from DB ones
            editUser()
            setActiveStep(activeStep + 1)
            // if shipping method is pick-up & there's no user signed in
        } else if (shippingMethod === 'pick-up' && !props.user && activeStep === 0) {
            // sign up user
            if (state.email != '' && state.password != '' && state.password2 != '') {
                console.log('Try sign in and if not existing sign up')
                console.log(state)
                let {email, password, password2} = state

                // sign up
                axios.post('/users/sign-up', {email, password, password2}).then(async (res) => {
                    // FIXME: talk to back end to change errors handling or wait for new update. b007 && f011
                    if (res.data.errors) {
                        console.log(res.data.errors[0].msg)
                        // If user email already exists
                        if (res.data.errors[0].msg === 'Email already exists') {
                            let r = await axios.post('/users/sign-in', {email, password})
                            props.updateUser()
                            setActiveStep(activeStep + 1)
                        }
                    } else {
                        console.log(res.data)
                        if (res.data.msg === 'User added!') {
                            let r = await axios.post('/users/sign-in', {email, password})
                            props.updateUser()
                            setActiveStep(activeStep + 1)
                        }
                    }
                })
            } else {
                console.log('Fill all fields')
            }
            // if shipping method is pick-up & user signed in
        } else if (shippingMethod === 'pick-up' && props.user && activeStep === 0) {
            // edit user signed in
            // TODO: edit only if user's details are different from DB ones
            // editUser()
            setActiveStep(activeStep + 1)
        }
        // Payment form
        // FIXME: handle better create payment intent / method and go next step
        if (activeStep === 1 && props.user) {
            console.log(addPaymentMethod)
            let new_card = {
                number: state.cardNumber,
                exp_month: state.expMonth,
                exp_year: state.expYear,
                cvc: state.cvc
            }
            console.log(paymentMethod)
            console.log(new_card)
            console.log(card)

            // if a payment method is selected
            if (paymentMethod) {
                // if payment method === cash
                if (paymentMethod === 'cash') {
                    console.log('Payment selected = cash. Go next.')
                    setActiveStep(activeStep + 1)
                }
                // if payment method === card
                if (paymentMethod === 'card') {
                    // if there's no card selected
                    if (!card && !new_card) {
                        // TODO: pop up message
                        console.log('Please choose an existing payment method or add new one.')
                    }
                    // if there's a card selected
                    if (card) {
                        console.log('Card selected. Create payment intent. Go next.')
                        // TODO: create payment intent
                        createPaymentIntent()
                        setActiveStep(activeStep + 1)
                    }
                    // if using a new card create new payment method
                    // then create payment intent
                    if (new_card) {
                        console.log('Create payment method')
                        createPaymentMethod()
                        .then(() => createPaymentIntent()
                        .then(() => setActiveStep(activeStep + 1)))
                    }
                }
            } else {
                console.log('Please select a payment method')
            }
        }

        if (activeStep === steps.length - 1 && props.user) {
            console.log(`active step === steps.length -1 = ${steps.length - 1}`)
            confirmPaymentIntent()
            props.onClose()
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
        handleAddPaymentMethod()
        props.updateUser()
    }

    const createPaymentIntent = async () => {
        console.log('create payment intent')
        console.log(card)
        console.log(props.cart.total_cart)
        let res = await axios.post('/users/create-payment-intent', {payment_method: card, total_cart: props.cart.total_cart*100, cart: props.cart})
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
                    createPaymentMethod={createPaymentMethod}
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