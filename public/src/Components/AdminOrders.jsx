import React from "react";
import "../Styles/admin-orders-styles.css";

export default function AdminOrders(props) {
  return (
    <div class="admin-orders row mt-2">
      {/* orders in */}
      <div class="orders-in col-sm-4 ">
        <p className="order-status mt-3 ms-2">orders in</p>
        <p className="order-statussub ms-2  mb-2">
          Accept or Decline orders below...
        </p>
        {/* cards dynamically rendered below for each order */}
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Order number: 005</h5>
            <h5 class="card-title">Order id: {props.orders ? props.orders[0]._id : 'loading'}</h5>
            <h5 class="card-title">Time: 13.30 Date: 19/04/22</h5>
            <h5 class="card-title">Date: 19/04/22</h5>
            <p class="card-text">Shipping Method: Pick up</p>
            <p class="card-text">Payment Method: Card</p>
            <p class="card-text">Customer Name: Lorenzo the Magician</p>
            <p class="card-text">Customer Telephone: 07582 248372</p>
            <p class="card-text">
              Customer Address: 123 the Road, the Street, Birmingham. BH23 8eh
            </p>
            <p class="card-text">Order Details</p>
            <ul>
              <li>Chicken Tikka</li>
              <li>Chicken Korma</li>
              <li>Rice</li>
              <li>coke</li>
              <li>bottle of wine</li>
            </ul>
            <p class="card-text">Total Price: {props.orders ? props.orders[1].total_amount : 'loading'}</p>
            <a href="#*" class="btn btn-warning me-2">
              Decline / Refund
            </a>
            <a href="#*" class="btn btn-danger">
              Accept / start order
            </a>
          </div>
        </div>

        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Order number: 005</h5>
            <h5 class="card-title">Time: 13.30 Date: 19/04/22</h5>
            <h5 class="card-title">Date: 19/04/22</h5>
            <p class="card-text">Shipping Method: Pick up</p>
            <p class="card-text">Payment Method: Card</p>
            <p class="card-text">Customer Name: Lorenzo the Magician</p>
            <p class="card-text">Customer Telephone: 07582 248372</p>
            <p class="card-text">
              Customer Address: 123 the Road, the Street, Birmingham. BH23 8eh
            </p>
            <p class="card-text">Order Details</p>
            <ul>
              <li>Chicken Tikka</li>
              <li>Chicken Korma</li>
              <li>Rice</li>
              <li>coke</li>
              <li>bottle of wine</li>
            </ul>
            <p class="card-text">Total Price: {props.orders ? props.orders[1].total_amount : 'loading'}</p>
            <a href="#*" class="btn btn-warning me-2">
              Decline / Refund
            </a>
            <a href="#*" class="btn btn-danger">
              Accept / start order
            </a>
          </div>
        </div>

        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Order number: 005</h5>
            <h5 class="card-title">Time: 13.30 Date: 19/04/22</h5>
            <h5 class="card-title">Date: 19/04/22</h5>
            <p class="card-text">Shipping Method: Pick up</p>
            <p class="card-text">Payment Method: Card</p>
            <p class="card-text">Customer Name: Lorenzo the Magician</p>
            <p class="card-text">Customer Telephone: 07582 248372</p>
            <p class="card-text">
              Customer Address: 123 the Road, the Street, Birmingham. BH23 8eh
            </p>
            <p class="card-text">Order Details</p>
            <ul>
              <li>Chicken Tikka</li>
              <li>Chicken Korma</li>
              <li>Rice</li>
              <li>coke</li>
              <li>bottle of wine</li>
            </ul>
            <p class="card-text">Total Price: 52.87</p>
            <a href="#*" class="btn btn-warning me-2">
              Decline / Refund
            </a>
            <a href="#*" class="btn btn-danger">
              Accept / start order
            </a>
          </div>
        </div>
      </div>

      {/* orders in prep */}
      <div class="accepted-orders col-sm-4">
        <p className="order-status mt-3 ms-2">
          orders accepted / Being Prepared
        </p>
        <p className="order-statussub ms-2  mb-2">
          Orders accepted & in prep are listed below...
        </p>
        {/* cards moved from orders in to here on accept */}
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Order number: 005</h5>
            <h5 class="card-title">Time: 13.30 Date: 19/04/22</h5>
            <h5 class="card-title">Date: 19/04/22</h5>
            <p class="card-text">Shipping Method: Pick up</p>
            <p class="card-text">Payment Method: Card</p>
            <p class="card-text">Customer Name: Lorenzo the Magician</p>
            <p class="card-text">Customer Telephone: 07582 248372</p>
            <p class="card-text">
              Customer Address: 123 the Road, the Street, Birmingham. BH23 8eh
            </p>
            <p class="card-text">Order Details</p>
            <ul>
              <li>Chicken Tikka</li>
              <li>Chicken Korma</li>
              <li>Rice</li>
              <li>coke</li>
              <li>bottle of wine</li>
            </ul>
            <p class="card-text">Total Price: 52.87</p>
            <a href="*" class="btn btn-info me-2">
              Print
            </a>
            <a href="*" class="btn btn-primary">
              Completed
            </a>
          </div>
        </div>

        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Order number: 005</h5>
            <h5 class="card-title">Time: 13.30 Date: 19/04/22</h5>
            <h5 class="card-title">Date: 19/04/22</h5>
            <p class="card-text">Shipping Method: Pick up</p>
            <p class="card-text">Payment Method: Card</p>
            <p class="card-text">Customer Name: Lorenzo the Magician</p>
            <p class="card-text">Customer Telephone: 07582 248372</p>
            <p class="card-text">
              Customer Address: 123 the Road, the Street, Birmingham. BH23 8eh
            </p>
            <p class="card-text">Order Details</p>
            <ul>
              <li>Chicken Tikka</li>
              <li>Chicken Korma</li>
              <li>Rice</li>
              <li>coke</li>
              <li>bottle of wine</li>
            </ul>
            <p class="card-text">Total Price: 52.87</p>
            <a href="*" class="btn btn-info me-2">
              Print
            </a>
            <a href="*" class="btn btn-primary">
              Completed
            </a>
          </div>
        </div>

        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Order number: 005</h5>
            <h5 class="card-title">Time: 13.30 Date: 19/04/22</h5>
            <h5 class="card-title">Date: 19/04/22</h5>
            <p class="card-text">Shipping Method: Pick up</p>
            <p class="card-text">Payment Method: Card</p>
            <p class="card-text">Customer Name: Lorenzo the Magician</p>
            <p class="card-text">Customer Telephone: 07582 248372</p>
            <p class="card-text">
              Customer Address: 123 the Road, the Street, Birmingham. BH23 8eh
            </p>
            <p class="card-text">Order Details</p>
            <ul>
              <li>Chicken Tikka</li>
              <li>Chicken Korma</li>
              <li>Rice</li>
              <li>coke</li>
              <li>bottle of wine</li>
            </ul>
            <p class="card-text">Total Price: 52.87</p>
            <a href="*" class="btn btn-info me-2">
              Print
            </a>
            <a href="*" class="btn btn-primary">
              Completed
            </a>
          </div>
        </div>
      </div>

      {/* orders completed */}
      <div class="completed-orders col-sm-4">
        <p className="order-status mt-3 ms-2">orders completed</p>
        <p className="order-statussub ms-2  mb-2">
          Orders waiting for collection / delivery below...
        </p>
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Order number: 005</h5>
            <h5 class="card-title">Time: 13.30 Date: 19/04/22</h5>
            <h5 class="card-title">Date: 19/04/22</h5>
            <p class="card-text">Shipping Method: Pick up</p>
            <p class="card-text">Payment Method: Card</p>
            <p class="card-text">Customer Name: Lorenzo the Magician</p>
            <p class="card-text">Customer Telephone: 07582 248372</p>
            <p class="card-text">
              Customer Address: 123 the Road, the Street, Birmingham. BH23 8eh
            </p>
            <p class="card-text">Order Details</p>
            <ul>
              <li>Chicken Tikka</li>
              <li>Chicken Korma</li>
              <li>Rice</li>
              <li>coke</li>
              <li>bottle of wine</li>
            </ul>
            <p class="card-text">Total Price: 52.87</p>
            <a href="*" class="btn btn-success">
              Clear Order
            </a>
          </div>
        </div>

        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Order number: 005</h5>
            <h5 class="card-title">Time: 13.30 Date: 19/04/22</h5>
            <h5 class="card-title">Date: 19/04/22</h5>
            <p class="card-text">Shipping Method: Pick up</p>
            <p class="card-text">Payment Method: Card</p>
            <p class="card-text">Customer Name: Lorenzo the Magician</p>
            <p class="card-text">Customer Telephone: 07582 248372</p>
            <p class="card-text">
              Customer Address: 123 the Road, the Street, Birmingham. BH23 8eh
            </p>
            <p class="card-text">Order Details</p>
            <ul>
              <li>Chicken Tikka</li>
              <li>Chicken Korma</li>
              <li>Rice</li>
              <li>coke</li>
              <li>bottle of wine</li>
            </ul>
            <p class="card-text">Total Price: 52.87</p>
            <a href="*" class="btn btn-success">
              Clear Order
            </a>
          </div>
        </div>

        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">Order number: 005</h5>
            <h5 class="card-title">Time: 13.30 Date: 19/04/22</h5>
            <h5 class="card-title">Date: 19/04/22</h5>
            <p class="card-text">Shipping Method: Pick up</p>
            <p class="card-text">Payment Method: Card</p>
            <p class="card-text">Customer Name: Lorenzo the Magician</p>
            <p class="card-text">Customer Telephone: 07582 248372</p>
            <p class="card-text">
              Customer Address: 123 the Road, the Street, Birmingham. BH23 8eh
            </p>
            <p class="card-text">Order Details</p>
            <ul>
              <li>Chicken Tikka</li>
              <li>Chicken Korma</li>
              <li>Rice</li>
              <li>coke</li>
              <li>bottle of wine</li>
            </ul>
            <p class="card-text">Total Price: 52.87</p>
            <a href="*" class="btn btn-success">
              Clear Order
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
