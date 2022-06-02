import React from "react";
import { Typography, Dialog } from "@mui/material";

export default function CartDialog(props) {
  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        {" "}
        <p className="text-center mb-0 mt-2">ITEMS IN YOUR CART</p>
        {props.cart.length != 0
          ? props.cart.map((item) => (
              <div className="container cartPopup p-3 mt-3">
                <Typography className="mb-1 text-dark">
                  Name: {item.name}
                </Typography>
                <Typography className="mb-1 text-dark">
                  Quantity: {item.quantity}
                </Typography>
                <button
                  className="btn btn-sm mt-1 btn-danger"
                  onClick={props.deleteFromCart}
                >
                  delete from cart
                </button>
              </div>
            ))
          : "cart empty"}
      </Dialog>
    </div>
  );
}
