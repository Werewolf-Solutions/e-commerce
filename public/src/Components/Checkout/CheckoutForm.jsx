import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";

import {
  createPaymentIntent,
  confirmPaymentIntent,
} from "../../apiCalls/paymentController";

// import { io } from 'socket.io-client'

import axios from "axios";
import { createOrder } from "../../apiCalls/orderController";

// const socket = io()

const steps = ["Shipping address", "Payment details", "Review your order"];

const theme = createTheme();

export default function CheckoutForm(props) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [state, setState] = React.useState({
    email: "",
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    number: "",
    city: "",
    region: "",
    postcode: "",
    country: "",
  });
  const [card, setCard] = React.useState();
  const [paymentIntent, setPaymentIntent] = React.useState();
  const [addPaymentMethod, setAddPaymentMethod] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState();
  const [shippingMethod, setShippingMethod] = React.useState();

  const handleShippingMethodSelect = (e) => {
    setShippingMethod(e.target.value);
  };

  const handlePaymentMethodSelected = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleAddPaymentMethod = () => {
    setAddPaymentMethod(!addPaymentMethod);
    setPaymentMethod("card");
  };

  const handleCardSelected = (e) => {
    console.log(e.target.value);
    setCard(e.target.value);
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  const handleNext = async () => {
    // Address form

    // if there's not a shipping method don't go next
    if (!shippingMethod && activeStep === 0) {
      // TODO: error pop up
      console.log("Select a shipping method first");
      // if shipping method is delivery & there's no user signed in
    } else if (
      shippingMethod === "delivery" &&
      !props.user &&
      activeStep === 0
    ) {
      // TODO: if user exists sign in
      // TODO: if user doesn't exist sign up and sign in
      // TODO: handle errors
      // TODO: if required fields are empty send error
      // sign up user
      if (
        state.email != "" &&
        state.password != "" &&
        state.password2 != "" &&
        state.address1 != "" &&
        state.address2 != "" &&
        state.postcode != "" &&
        state.city != "" &&
        state.country != "" &&
        state.number != ""
      ) {
        // TODO: sign up with user's details or call /users/edit-user
        console.log("Try sign in and if not existing sign up");
        console.log(state);

        // sign up
      } else {
        console.log("Fill all fields");
      }
      // if shipping method is delivery & user signed in
    } else if (
      shippingMethod === "delivery" &&
      props.user &&
      activeStep === 0
    ) {
      setActiveStep(activeStep + 1);
      // if shipping method is pick-up & there's no user signed in
    } else if (
      shippingMethod === "pick-up" &&
      !props.user &&
      activeStep === 0
    ) {
      setActiveStep(activeStep + 1);
      // sign up user
      if (state.email != "" && state.password != "" && state.password2 != "") {
        console.log("Try sign in and if not existing sign up");
        console.log(state);

        // sign up && update user
      } else {
        console.log("Fill all fields");
      }
      // if shipping method is pick-up & user signed in
    } else if (shippingMethod === "pick-up" && props.user && activeStep === 0) {
      // edit user signed in
      // TODO: edit only if user's details are different from DB ones
      // updateUser()
      setActiveStep(activeStep + 1);
    }
    // Payment form
    // FIXME: handle better create payment intent / method and go next step
    if (activeStep === 1 && props.user) {
      console.log(addPaymentMethod);
      console.log(paymentMethod);
      console.log(card);

      // if a payment method is selected
      if (paymentMethod) {
        // if payment method === cash
        if (paymentMethod === "cash") {
          console.log("Payment selected = cash. Go next.");
          setActiveStep(activeStep + 1);
        }
        // if payment method === card
        if (paymentMethod === "card" && card) {
          // if there's no card selected
          if (!card && !addPaymentMethod) {
            // TODO: pop up message
            console.log(
              "Please choose an existing payment method or add new one."
            );
          }
          // if there's a card selected
          if (card) {
            console.log("Card selected. Create payment intent. Go next.");
            // TODO: create payment intent
            if (!paymentIntent) {
              let payment_intent = {
                total_amount: props.totalAmount,
                currency: "gbp",
                payment_method: card,
                customer: props.user.customer_id,
                cart: props.cart,
              };
              let pi = await createPaymentIntent(payment_intent);
              console.log(pi);
              setPaymentIntent(pi);
            }
            setActiveStep(activeStep + 1);
          }
          // if using a new card create new payment method
          // then create payment intent
          if (addPaymentMethod && !paymentIntent) {
            console.log("Create payment method");
            // createPaymentMethod()
            // .then(() => createPaymentIntent()
            // .then(() => setActiveStep(activeStep + 1)))
          }
        }
      } else {
        console.log("Please select a payment method");
      }
      // guest
    } else if (activeStep === 1 && !props.user && card) {
      console.log("guest payment form => create payment intent");
      let payment_intent = {
        total_amount: props.totalAmount,
        currency: "gbp",
        payment_method: card,
        // customer: 'user.customer_id', // optional
        cart: props.cart,
      };
      let pi = await createPaymentIntent(payment_intent);
      console.log(pi);
      setPaymentIntent(pi);
      setActiveStep(activeStep + 1);
    }

    if (activeStep === steps.length - 1 && props.user) {
      console.log(`active step === steps.length -1 = ${steps.length - 1}`);
      console.log(paymentIntent);
      if (paymentMethod === "card") {
        confirmPaymentIntent(paymentIntent);
        // let order = {
        //     orderedBy: props.user._id,
        //     payment_method: card,
        //     address: props.user.address,
        //     payment_intent: {
        //         status: 'succeeded',
        //         card: card
        //     },
        //     shipping_method: shippingMethod,
        //     items: props.cart,
        //     total_cart: props.cart.total_cart
        // }
        // socket.emit('new_order', {order})
      } else if (paymentMethod === "cash") {
        console.log("Add order to admin and user");
        // TODO: save order to user and admin
        let order = {
          orderedBy: props.user._id,
          address: props.user.address,
          items: props.cart,
          payment_intent: {
            status: "succeeded",
            payment_method: "cash",
          },
          shipping_method: shippingMethod,
          total_amount: props.totalAmount,
        };
        console.log(order);
        createOrder(order);
        // socket.emit('new_order', {order})
      }
      // props.emptyCart()
      // props.updateProductsList()
      setActiveStep(activeStep + 1);
    } else if (activeStep === steps.length - 1 && !props.user) {
      console.log("guest review order => confirm payment intent");
      confirmPaymentIntent(paymentIntent);
      setActiveStep(activeStep + 1);
      props.update();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <AddressForm
            user={props.user}
            handleSignInDialog={props.handleSignInDialog}
            handleChange={handleChange}
            state={state}
            shippingMethod={shippingMethod}
            handleShippingMethodSelect={handleShippingMethodSelect}
            update={props.update}
          />
        );
      case 1:
        return (
          <PaymentForm
            user={props.user}
            handleChange={handleChange}
            state={state}
            card={card}
            setCard={setCard}
            update={props.update}
            handleCardSelected={handleCardSelected}
            handleAddPaymentMethod={handleAddPaymentMethod}
            addPaymentMethod={addPaymentMethod}
            paymentMethod={paymentMethod}
            handlePaymentMethodSelected={handlePaymentMethodSelected}
          />
        );
      case 2:
        return (
          <Review
            state={state}
            handleChange={handleChange}
            cart={props.cart}
            card={card}
            paymentMethod={paymentMethod}
            shippingMethod={shippingMethod}
            currency={props.currency}
            user={props.user}
            update={props.update}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  };

  useEffect(() => {
    console.log(state);
    // socket.on('new_order', ({order}) => {
    //     // setChat([...chat, {order}])
    //     console.log('new order')
    //     console.log(order)
    // })
  }, []);

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper
        variant="outlined"
        sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
      >
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
              <button onClick={props.onClose}>close</button>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
                  {activeStep === steps.length - 1 ? "Place order" : "Next"}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </React.Fragment>
      </Paper>
    </Container>
  );
}
