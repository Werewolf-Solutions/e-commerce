import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Select, FormControl, InputLabel, MenuItem } from "@mui/material";
import { Button } from "@mui/material";
import { createPaymentMethod } from "../../apiCalls/paymentController";

export default function PaymentForm(props) {
  const [state, setState] = React.useState({
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvc: "",
  });

  const [guestCard, setGuestCard] = React.useState();

  const handleChange = (e) => {
    setState({ ...state, [e.target.id]: e.target.value });
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Choose payment method
      </Typography>
      {props.user ? (
        <FormControl fullWidth>
          <InputLabel id="select-payment-method">Payment method</InputLabel>
          <Select
            labelId="select-payment-method"
            id="dselect-payment-method"
            value={props.paymentMethod}
            label="Payment method"
            onChange={props.handlePaymentMethodSelected}
          >
            <MenuItem value={"cash"}>Cash</MenuItem>
            <MenuItem value={"card"}>Card</MenuItem>
          </Select>
        </FormControl>
      ) : (
        <FormControl fullWidth>
          <InputLabel id="select-payment-method">Payment method</InputLabel>
          <Select
            labelId="select-payment-method"
            id="dselect-payment-method"
            value={props.paymentMethod}
            label="Payment method"
            onChange={props.handlePaymentMethodSelected}
          >
            <MenuItem value={"card"}>Card</MenuItem>
          </Select>
        </FormControl>
      )}
      {props.addPaymentMethod ? (
        <div>
          {props.user
          ?
            <button onClick={props.handleAddPaymentMethod}>
              close payment form
            </button>
          : null
          }
          {props.paymentMethod === "card" ? (
            <div>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cardName"
                    label="Name on card"
                    fullWidth
                    autoComplete="cc-name"
                    variant="standard"
                    value={state.cardName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cardNumber"
                    label="Card number"
                    fullWidth
                    autoComplete="cc-number"
                    variant="standard"
                    value={state.cardNumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="expMonth"
                    label="Expiry month"
                    fullWidth
                    autoComplete="cc-exp"
                    variant="standard"
                    value={state.expMonth}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="expYear"
                    label="Expiry year"
                    fullWidth
                    autoComplete="cc-exp"
                    variant="standard"
                    value={state.expYear}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    required
                    id="cvc"
                    label="CVC"
                    helperText="Last three digits on signature strip"
                    fullWidth
                    autoComplete="cc-csc"
                    variant="standard"
                    value={state.cvc}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                    color="error"
                    onClick={() => {
                      let card = {
                        number: state.cardNumber,
                        exp_month: state.expMonth,
                        exp_year: state.expYear,
                        cvc: state.cvc,
                      }
                      if (card.number) {
                        createPaymentMethod(props.paymentMethod, card).then(
                          (paymentMethod) => {
                            let pm = {
                              id: paymentMethod.id,
                              last4: paymentMethod.card.last4,
                              brand: paymentMethod.card.brand,
                              exp_month: paymentMethod.card.exp_month,
                              exp_year: paymentMethod.card.exp_year,
                            }
                            props.setCard(pm)
                            props.update()
                            props.handleAddPaymentMethod()
                          }
                        )
                      }
                    }}
                  >
                    add card
                  </Button>
                </Grid>
              </Grid>
            </div>
          ) : null}
        </div>
      ) : (
        props.user
        ?
          <button color="error" onClick={props.handleAddPaymentMethod}>
            add payment method
          </button>
        : null
      )}
      {props.user &&
      props.paymentMethod === "card" &&
      !props.addPaymentMethod ? (
        props.user.payment_methods.length != 0 ? (
          <div>
            <FormControl fullWidth>
              <InputLabel id="select-card">Choose an existing card</InputLabel>
              <Select
                labelId="select-card"
                id="dselect-card"
                value={props.card}
                label="Card"
                onChange={props.handleCardSelected}
              >
                {props.user.payment_methods.map((pm) => (
                  <MenuItem
                    key={pm.id}
                    value={pm}
                  >{`xxxx-xxxx-${pm.last4}`}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ) : null
      ) : props.card ? (
        <div>
          {`Number: xxxx-xxxx-${props.card.last4}`}
          <br />
          {`Brand: ${props.card.brand}`}
          <br />
          {`Exp month: ${props.card.exp_month}`}
          <br />
          {`Exp year: ${props.card.exp_year}`}
        </div>
      ) : null}
    </React.Fragment>
  );
}
