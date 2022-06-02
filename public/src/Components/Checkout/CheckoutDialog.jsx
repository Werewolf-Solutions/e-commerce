import React from "react";
import { Dialog } from "@mui/material";
import CheckoutForm from "./CheckoutForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function CheckoutDialog(props) {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Dialog open={props.open} onClose={props.onClose}>
          <CheckoutForm
            user={props.user}
            handleSignInDialog={props.handleSignInDialog}
            cart={props.cart}
            onClose={props.onClose}
            emptyCart={props.emptyCart}
            currency={props.currency}
            totalAmount={props.totalAmount}
            update={props.update}
          />
        </Dialog>
      </ThemeProvider>
    </div>
  );
}
