import React from "react";
import "../Styles/card-styles.css";

export default function Card(props) {
  return (
    // <div className="col-md-6 col-lg-4">
    <div className="card-box ms-3 me-3 col-sm-1 col-md-6 col-lg-4">
      <div className="card-thumbnail">
        <img src={props.product.img.path} className="card-image-top" alt="" />
      </div>
      <h3>
        <a href="*" className="mt-2 text-danger">
          {props.product.name}
        </a>
      </h3>
      <p className="text-secondary">{props.product.description}</p>
      <h3 className="price text-danger">PRICE: {props.product.price}</h3>

      <div className="btn-group" role="group" aria-label="Basic example">
        {/* <div className="dropdown">
          <button
            className="btn btn-sm btn-danger float-right dropdown-toggle me-1"
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            QUANTITY
          </button>
          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <li>
              <a className="dropdown-item" href="www.google.com">
                1
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="www.google.com">
                2
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="www.google.com">
                3
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="www.google.com">
                4
              </a>
            </li>
          </ul>
        </div> */}

        <a
          className="btn btn-sm btn-danger float-right"
          onClick={() => props.addToCart(props.product)}
        >
          ADD TO CART
        </a>
        {/* TODO: show delete from cart only if product is in cart*/}
        {/* <a
          className="btn btn-sm btn-danger float-right"
          onClick={() => props.deleteFromCart(props.product)}
        >
          DELETE FROM CART
        </a> */}
      </div>
    </div>
  );
}
