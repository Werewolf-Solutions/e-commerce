import React from "react";
import { Typography, Dialog } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import "../Styles/cart-dialog-styles.css";

export default function CartDialog(props) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Dialog open={props.open} onClose={props.onClose}>
          {" "}
          <Container
            component="main"
            maxWidth="sm"
            className="p-3 loginContainer cartContainer"
          >
            <p className="text-center mb-0 mt-2 bg-danger text-white p-2">
              <u className="">ITEMS IN YOUR CART</u>
            </p>
            {props.cart.length != 0
              ? props.cart.map((product) => (
                  <div className="container cartPopup p-3 mt-3">
                    <Typography className="mb-1 text-light">
                      Name: {product.name}
                    </Typography>
                    <Typography className="mb-1 text-light">
                      Quantity: {product.quantity}
                    </Typography>
                    <button
                      className="btn btn-sm mt-1 mb-2 btn-danger"
                      onClick={() => props.deleteFromCart(product)}
                    >
                      delete from cart
                    </button>
                  </div>
                ))
              : "cart empty"}
          </Container>
        </Dialog>
      </ThemeProvider>
    </div>
  );
}
