import React from "react";
import { useStore } from "../Hooks/Store";
import "../Styles/check-out-modal-styles.css";
import cart from "../Assets/icons8-cart-64.png";

function CheckOutModal() {
  const setModal = useStore((store) => store.setModal);

  return (
    <div className="modalContainer ">
      <div className="modalCheck d-flex flex-column">
        {/* header bar to modal */}
        <div className="totalHeading d-flex flex-row align-items-center justify-items-center">
          <img className="p-1 mx-auto cart" src={cart} alt="cart" />

          <p className="totalcopy text-danger mx-auto">Total Price: $55.67</p>

          {/* radio buttons */}
          <div>
            <label class="container">
              Credit Card
              <input type="radio" checked="checked" name="radio" />
              <span class="checkmark"></span>
            </label>
            <label class="container">
              Cash on Delivery
              <input type="radio" name="radio" />
              <span class="checkmark"></span>
            </label>
            <label class="container">
              Cash On Pickup
              <input type="radio" name="radio" />
              <span class="checkmark"></span>
            </label>
          </div>

          {/* radio buttons */}

          <button
            type="button"
            className="paymentButton btn btn-danger m-3 mx-auto"
          >
            Confirm
          </button>

          <p
            className="modalClose me-4"
            onClick={() => {
              setModal("");
            }}
          >
            x
          </p>
        </div>
        {/* modal content header 1 */}
        <div className="menuHeading d-flex">
          <h2 className="menuName ms-3 mt-3">side orders</h2>
        </div>
        {/* modal content for content header 1 */}
        <ul className="listItems d-flex flex-column mt-3">
          <li>list of items | quantity | price</li>
          <li>list of items | quantity | price</li>
          <li>list of items | quantity | price</li>
          <li>list of items | quantity | price</li>
        </ul>
        {/* modal content header 2 */}
        <div className="menuHeading d-flex justify-content-start">
          <h2 className="menuName ms-3 mt-3">main dishes</h2>
        </div>
        {/* modal content for content header 2 */}
        <ul className="listItems d-flex flex-column mt-3">
          <li>list of items | quantity | price</li>
          <li>list of items | quantity | price</li>
          <li>list of items | quantity | price</li>
          <li>list of items | quantity | price</li>
        </ul>
        {/* modal content header 3 */}
        <div className="menuHeading d-flex justify-content-start">
          <h2 className="menuName ms-3 mt-3">desert</h2>
        </div>
        {/* modal content for content header 3 */}
        <ul className="listItems d-flex flex-column mt-3">
          <li>list of items | quantity | price</li>
          <li>list of items | quantity | price</li>
          <li>list of items | quantity | price</li>
          <li>list of items | quantity | price</li>
        </ul>
        {/* modal content header 4 */}
        <div className="menuHeading d-flex justify-content-start">
          <h2 className="menuName ms-3 mt-3">drinks</h2>
        </div>
        {/* modal content for content header 4 */}
        <ul className="listItems d-flex flex-column mt-3">
          <li>list of items | quantity | price</li>
          <li>list of items | quantity | price</li>
          <li>list of items | quantity | price</li>
          <li>list of items | quantity | price</li>
        </ul>
        {/* footer bar - same as header bar to modal */}
        <div className="totalHeading d-flex flex-row align-items-center">
          <img className="p-1 mx-auto cart" src={cart} alt="cart" />
          <p className="totalcopy text-danger mx-auto">total price: $55.67</p>

          <button
            type="button"
            className="paymentButton btn btn-danger m-3 mx-auto"
          >
            payment
          </button>

          <p
            className="modalClose me-4"
            onClick={() => {
              setModal("");
            }}
          >
            x
          </p>
        </div>
      </div>
    </div>
  );
}

export default CheckOutModal;
