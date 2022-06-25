import React from "react"
import "../../Styles/nav-bar-styles.css"
import logo from "../../Assets/brand.png"
import CheckoutDialog from "../Checkout/CheckoutDialog"

import AdminNavBar from "./AdminNavBar"
import UserNavBar from "./UserNavBar"
import GuestNavBar from "./GuestNavBar"
import SignInDialog from "../SignIn/SignInDialog"
import SignUpDialog from "../SignUp/SignUpDialog"
import CartDialog from "../CartDialog"
import { signOut } from "../../apiCalls/userController"
import CreateProductDialog from "../Admin/CreateProductDialog"

function NavBar(props) {
  const [checkoutDialog, setCheckoutDialog] = React.useState(false)
  const [cartDialog, setCartDialog] = React.useState(false)
  const [createProductDialog, setCreateProductDialog] = React.useState(false)

  const handleCreateProductDialog = () => {
    setCreateProductDialog(!createProductDialog)
  }

  const handleCartDialog = () => {
    setCartDialog(!cartDialog)
  }

  const handleCheckoutDialog = () => {
    setCheckoutDialog(!checkoutDialog)
  }

  // console.log(props.cart.length)
  // console.log(props.totalAmount)

  const [signInDialog, setSignInDialog] = React.useState(false)
  const [signUpDialog, setSignUpDialog] = React.useState(false)

  const handleSignInDialog = () => {
    setSignInDialog(!signInDialog)
  }

  const handleSignUpDialog = () => {
    setSignUpDialog(!signUpDialog)
  }

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
      <div className="container-fluid align-items-end">
        <img src={logo} className="img-fluid logo" alt="" />
        {props.user && props.user.admin
        ?
          <li className="nav-item">
            <a
              onClick={() => {
                console.log("createProductDialog");
                props.handleSelected("orders-history")
              }}
              className="nav-link cartText text"
            >
              orders history
            </a>
          </li>
        :
          <li className="nav-item">
            <a
              className="nav-link cartText text"
              onClick={handleCartDialog}
            >
              Cart {props.totalItems} | £{props.totalAmount}
            </a>
          </li>
        }
        {props.cart.length !== 0 ? (
          <li className="nav-item">
            <a
              className="nav-link text checkoutText"
              onClick={handleCheckoutDialog}
            >
              Checkout
            </a>
          </li>
        ) : null}
        {props.user && props.user.admin
        ?
          <li className="nav-item">
            <a
              onClick={() => {
                console.log("createProductDialog")
                handleCreateProductDialog()
              }}
              className="nav-link text checkoutText"
            >
              add product
            </a>
          </li>
        : null
        }
        {/* {props.user
        ?
          <li className="nav-item">
            <a
              className="nav-link text cartText"
              onClick={() => {
                signOut().then(() => {
                  props.update()
                  props.handleSelected("products")
                })
              }}
            >
              LOGOUT
            </a>
          </li>
        :
          <li className="nav-item">
            <a
              className="nav-link text cartText"
              onClick={handleSignInDialog}
            >
              LOGIN
            </a>
          </li>
        } */}
        <div
          className="collapse navbar-collapse justify-content-end"
          id="collapsibleNavbar"
        >
          {props.user ? (
            props.user.admin ? (
              <AdminNavBar
                update={props.update}
                handleSelected={props.handleSelected}
              />
            ) : (
              <UserNavBar
                update={props.update}
                handleSelected={props.handleSelected}
                cart={props.cart}
                user={props.user}
                totalAmount={props.totalAmount}
                deleteFromCart={props.deleteFromCart}
                emptyCart={props.emptyCart}
                totalItems={props.totalItems}
              />
            )
          ) : (
            <GuestNavBar
              update={props.update}
              handleSelected={props.handleSelected}
              cart={props.cart}
              totalAmount={props.totalAmount}
              deleteFromCart={props.deleteFromCart}
              emptyCart={props.emptyCart}
              handleSignInDialog={handleSignInDialog}
              totalItems={props.totalItems}
            />
          )}
          <div>
            <SignInDialog
              open={signInDialog}
              onClose={handleSignInDialog}
              update={props.update}
              handleSignUpDialog={handleSignUpDialog}
            />
            <SignUpDialog
              open={signUpDialog}
              onClose={handleSignUpDialog}
              update={props.update}
              handleSignInDialog={handleSignInDialog}
            />
            <CheckoutDialog
              open={checkoutDialog}
              onClose={handleCheckoutDialog}
              user={props.user}
              cart={props.cart}
              totalAmount={props.totalAmount}
              update={props.update}
              emptyCart={props.emptyCart}
            />
            <CartDialog
              open={cartDialog}
              onClose={handleCartDialog}
              cart={props.cart}
              deleteFromCart={props.deleteFromCart}
            />
            <CreateProductDialog
              open={createProductDialog}
              onClose={handleCreateProductDialog}
              product={props.product}
              update={props.update}
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
