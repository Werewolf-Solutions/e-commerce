import React from "react";
import "../Styles/card-styles.css";
import curry from "../Assets/pexels-asit-naskar-9809033.jpeg";

function Cards(props) {
  return (
    <div className="container ">
      <div className="row">
        {/* side orders section header */}
        <div className="col-12">
          <h2 id="sideorders" className=" cardMenuHeader mt-4 mb-4 ms-4">
            SIDE ORDERS
          </h2>
        </div>
        {/* side orders cards */}

        {props.products ? props.products.map(product => (
            <div className="col-md-6 col-lg-4">
              <div className="card-box ms-3 me-3">
                <div className="card-thumbnail">
                  <img src={curry} className="img-fluid" alt="" />
                </div>
                <h3>
                  <a href="*" className="mt-2 text-danger">
                    {product.name}
                  </a>
                </h3>
                <p className="text-secondary">
                  {product.description}
                </p>
                <p className="text-secondary">
                  Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
                  Garlic, Ginger paste, Lemon juice
                </p>
                <h3 className="price text-danger">PRICE: {product.price}</h3>

                <div className="btn-group" role="group" aria-label="Basic example">
                  <div className="dropdown">
                    <button
                      className="btn btn-sm btn-danger float-right dropdown-toggle me-1"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      QUANTITY
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
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
                  </div>

                  <a href="*" className="btn btn-sm btn-danger float-right">
                    ADD TO CART
                  </a>
                </div>
              </div>
            </div>
        )): 'loading'}


        <div className="col-md-6 col-lg-4">
          <div className="card-box ms-3 me-3">
            <div className="card-thumbnail">
              <img src={curry} className="img-fluid" alt="" />
            </div>
            <h3>
              <a href="*" className="mt-2 text-danger">
                CHICKEN TIKKA
              </a>
            </h3>
            <p className="text-secondary">
              Chicken tikka masala, dish consisting of marinated boneless
              chicken pieces that are cooked in a tandoor and then served in a
              subtly spiced tomato-cream sauce.
            </p>
            <p className="text-secondary">
              Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
              Garlic, Ginger paste, Lemon juice
            </p>
            <h3 className="price text-danger">PRICE: $4,021</h3>

            <div className="btn-group" role="group" aria-label="Basic example">
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-danger float-right dropdown-toggle me-1"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  QUANTITY
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
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
              </div>

              <a href="*" className="btn btn-sm btn-danger float-right">
                ADD TO CART
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card-box ms-3 me-3">
            <div className="card-thumbnail">
              <img src={curry} className="img-fluid" alt="" />
            </div>
            <h3>
              <a href="*" className="mt-2 text-danger">
                CHICKEN TIKKA
              </a>
            </h3>
            <p className="text-secondary">
              Chicken tikka masala, dish consisting of marinated boneless
              chicken pieces that are cooked in a tandoor and then served in a
              subtly spiced tomato-cream sauce.
            </p>
            <p className="text-secondary">
              Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
              Garlic, Ginger paste, Lemon juice
            </p>
            <h3 className="price text-danger">PRICE: $4,021</h3>

            <div className="btn-group" role="group" aria-label="Basic example">
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-danger float-right dropdown-toggle me-1"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  QUANTITY
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
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
              </div>

              <a href="*" className="btn btn-sm btn-danger float-right">
                ADD TO CART
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card-box ms-3 me-3">
            <div className="card-thumbnail">
              <img src={curry} className="img-fluid" alt="" />
            </div>
            <h3>
              <a href="*" className="mt-2 text-danger">
                CHICKEN TIKKA
              </a>
            </h3>
            <p className="text-secondary">
              Chicken tikka masala, dish consisting of marinated boneless
              chicken pieces that are cooked in a tandoor and then served in a
              subtly spiced tomato-cream sauce.
            </p>
            <p className="text-secondary">
              Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
              Garlic, Ginger paste, Lemon juice
            </p>
            <h3 className="price text-danger">PRICE: $4,021</h3>

            <div className="btn-group" role="group" aria-label="Basic example">
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-danger float-right dropdown-toggle me-1"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  QUANTITY
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
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
              </div>

              <a href="*" className="btn btn-sm btn-danger float-right">
                ADD TO CART
              </a>
            </div>
          </div>
        </div>
        {/* main curry section header */}
        <div className="col-12">
          <h2 id="mains" className=" cardMenuHeader mt-4 mb-4 ms-4">
            CURRY MAIN DISHES
          </h2>
        </div>
        {/* curry cards */}
        <div className="col-md-6 col-lg-4">
          <div className="card-box ms-3 me-3">
            <div className="card-thumbnail">
              <img src={curry} className="img-fluid" alt="" />
            </div>
            <h3>
              <a href="*" className="mt-2 text-danger">
                CHICKEN TIKKA
              </a>
            </h3>
            <p className="text-secondary">
              Chicken tikka masala, dish consisting of marinated boneless
              chicken pieces that are cooked in a tandoor and then served in a
              subtly spiced tomato-cream sauce.
            </p>
            <p className="text-secondary">
              Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
              Garlic, Ginger paste, Lemon juice
            </p>
            <h3 className="price text-danger">PRICE: $4,021</h3>

            <div className="btn-group" role="group" aria-label="Basic example">
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-danger float-right dropdown-toggle me-1"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  QUANTITY
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
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
              </div>

              <a href="*" className="btn btn-sm btn-danger float-right">
                ADD TO CART
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card-box ms-3 me-3">
            <div className="card-thumbnail">
              <img src={curry} className="img-fluid" alt="" />
            </div>
            <h3>
              <a href="*" className="mt-2 text-danger">
                CHICKEN TIKKA
              </a>
            </h3>
            <p className="text-secondary">
              Chicken tikka masala, dish consisting of marinated boneless
              chicken pieces that are cooked in a tandoor and then served in a
              subtly spiced tomato-cream sauce.
            </p>
            <p className="text-secondary">
              Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
              Garlic, Ginger paste, Lemon juice
            </p>
            <h3 className="price text-danger">PRICE: $4,021</h3>

            <div className="btn-group" role="group" aria-label="Basic example">
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-danger float-right dropdown-toggle me-1"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  QUANTITY
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
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
              </div>

              <a href="*" className="btn btn-sm btn-danger float-right">
                ADD TO CART
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card-box ms-3 me-3">
            <div className="card-thumbnail">
              <img src={curry} className="img-fluid" alt="" />
            </div>
            <h3>
              <a href="*" className="mt-2 text-danger">
                CHICKEN TIKKA
              </a>
            </h3>
            <p className="text-secondary">
              Chicken tikka masala, dish consisting of marinated boneless
              chicken pieces that are cooked in a tandoor and then served in a
              subtly spiced tomato-cream sauce.
            </p>
            <p className="text-secondary">
              Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
              Garlic, Ginger paste, Lemon juice
            </p>
            <h3 className="price text-danger">PRICE: $4,021</h3>

            <div className="btn-group" role="group" aria-label="Basic example">
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-danger float-right dropdown-toggle me-1"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  QUANTITY
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
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
              </div>

              <a href="*" className="btn btn-sm btn-danger float-right">
                ADD TO CART
              </a>
            </div>
          </div>
        </div>
        {/* desert section header */}
        <div className="col-12">
          <h2 id="deserts" className=" cardMenuHeader mt-4 mb-4 ms-4">
            DESERTS
          </h2>
        </div>
        {/* desert cards */}
        <div className="col-md-6 col-lg-4">
          <div className="card-box ms-3 me-3">
            <div className="card-thumbnail">
              <img src={curry} className="img-fluid" alt="" />
            </div>
            <h3>
              <a href="*" className="mt-2 text-danger">
                CHICKEN TIKKA
              </a>
            </h3>
            <p className="text-secondary">
              Chicken tikka masala, dish consisting of marinated boneless
              chicken pieces that are cooked in a tandoor and then served in a
              subtly spiced tomato-cream sauce.
            </p>
            <p className="text-secondary">
              Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
              Garlic, Ginger paste, Lemon juice
            </p>
            <h3 className="price text-danger">PRICE: $4,021</h3>

            <div className="btn-group" role="group" aria-label="Basic example">
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-danger float-right dropdown-toggle me-1"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  QUANTITY
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
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
              </div>

              <a href="*" className="btn btn-sm btn-danger float-right">
                ADD TO CART
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card-box ms-3 me-3">
            <div className="card-thumbnail">
              <img src={curry} className="img-fluid" alt="" />
            </div>
            <h3>
              <a href="*" className="mt-2 text-danger">
                CHICKEN TIKKA
              </a>
            </h3>
            <p className="text-secondary">
              Chicken tikka masala, dish consisting of marinated boneless
              chicken pieces that are cooked in a tandoor and then served in a
              subtly spiced tomato-cream sauce.
            </p>
            <p className="text-secondary">
              Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
              Garlic, Ginger paste, Lemon juice
            </p>
            <h3 className="price text-danger">PRICE: $4,021</h3>

            <div className="btn-group" role="group" aria-label="Basic example">
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-danger float-right dropdown-toggle me-1"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  QUANTITY
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
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
              </div>

              <a href="*" className="btn btn-sm btn-danger float-right">
                ADD TO CART
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card-box ms-3 me-3">
            <div className="card-thumbnail">
              <img src={curry} className="img-fluid" alt="" />
            </div>
            <h3>
              <a href="*" className="mt-2 text-danger">
                CHICKEN TIKKA
              </a>
            </h3>
            <p className="text-secondary">
              Chicken tikka masala, dish consisting of marinated boneless
              chicken pieces that are cooked in a tandoor and then served in a
              subtly spiced tomato-cream sauce.
            </p>
            <p className="text-secondary">
              Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
              Garlic, Ginger paste, Lemon juice
            </p>
            <h3 className="price text-danger">PRICE: $4,021</h3>

            <div className="btn-group" role="group" aria-label="Basic example">
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-danger float-right dropdown-toggle me-1"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  QUANTITY
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
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
              </div>

              <a href="*" className="btn btn-sm btn-danger float-right">
                ADD TO CART
              </a>
            </div>
          </div>
        </div>
        {/* drinks section header */}
        <div className="col-12">
          <h2 id="drinks" className=" cardMenuHeader mt-4 mb-4 ms-4">
            DRINKS
          </h2>
        </div>
        {/* drinks cards */}
        <div className="col-md-6 col-lg-4">
          <div className="card-box ms-3 me-3">
            <div className="card-thumbnail">
              <img src={curry} className="img-fluid" alt="" />
            </div>
            <h3>
              <a href="*" className="mt-2 text-danger">
                CHICKEN TIKKA
              </a>
            </h3>
            <p className="text-secondary">
              Chicken tikka masala, dish consisting of marinated boneless
              chicken pieces that are cooked in a tandoor and then served in a
              subtly spiced tomato-cream sauce.
            </p>
            <p className="text-secondary">
              Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
              Garlic, Ginger paste, Lemon juice
            </p>
            <h3 className="price text-danger">PRICE: $4,021</h3>

            <div className="btn-group" role="group" aria-label="Basic example">
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-danger float-right dropdown-toggle me-1"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  QUANTITY
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
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
              </div>

              <a href="*" className="btn btn-sm btn-danger float-right">
                ADD TO CART
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card-box ms-3 me-3">
            <div className="card-thumbnail">
              <img src={curry} className="img-fluid" alt="" />
            </div>
            <h3>
              <a href="*" className="mt-2 text-danger">
                CHICKEN TIKKA
              </a>
            </h3>
            <p className="text-secondary">
              Chicken tikka masala, dish consisting of marinated boneless
              chicken pieces that are cooked in a tandoor and then served in a
              subtly spiced tomato-cream sauce.
            </p>
            <p className="text-secondary">
              Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
              Garlic, Ginger paste, Lemon juice
            </p>
            <h3 className="price text-danger">PRICE: $4,021</h3>

            <div className="btn-group" role="group" aria-label="Basic example">
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-danger float-right dropdown-toggle me-1"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  QUANTITY
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
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
              </div>

              <a href="*" className="btn btn-sm btn-danger float-right">
                ADD TO CART
              </a>
            </div>
          </div>
        </div>
        <div className="col-md-6 col-lg-4">
          <div className="card-box ms-3 me-3">
            <div className="card-thumbnail">
              <img src={curry} className="img-fluid" alt="" />
            </div>
            <h3>
              <a href="*" className="mt-2 text-danger">
                CHICKEN TIKKA
              </a>
            </h3>
            <p className="text-secondary">
              Chicken tikka masala, dish consisting of marinated boneless
              chicken pieces that are cooked in a tandoor and then served in a
              subtly spiced tomato-cream sauce.
            </p>
            <p className="text-secondary">
              Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
              Garlic, Ginger paste, Lemon juice
            </p>
            <h3 className="price text-danger">PRICE: $4,021</h3>

            <div className="btn-group" role="group" aria-label="Basic example">
              <div className="dropdown">
                <button
                  className="btn btn-sm btn-danger float-right dropdown-toggle me-1"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  QUANTITY
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
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
              </div>

              <a href="*" className="btn btn-sm btn-danger float-right">
                ADD TO CART
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
