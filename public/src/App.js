import * as React from "react";
import "./App.css";
import { ModalContainer } from "./Components/ModalContainer";
import Main from "./Pages/Main";
import AdminMain from "./Pages/AdminMain";
import Footer from "./Components/Footer";
import { useEffect } from "react";

// Import user controller
import {
  getUser,
  signIn
} from "./apiCalls/userController";

// Import product controller
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./apiCalls/productController";

// Import order controller
import {
  getOrders
} from "./apiCalls/orderController";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  const [cart, setCart] = React.useState([])
  const [totalAmount, setTotalAmount] = React.useState(0)
  const [state, setState] = React.useState({
    cart: []
  })
  const [user, setUser] = React.useState('guest')
  const [products, setProducts] = React.useState()
  const [orders, setOrders] = React.useState()
  const [selected, setSelected] = React.useState('orders')

  const handleSelected = (selection) => {
    setSelected(selection)
  }

  const addToCart = (product) => {
    let new_cart = cart
    let total_amount = 0
    // add first product
    if (new_cart.length === 0) {
      product.quantity = 1
      new_cart.push(product)
    } else {
      for (let i = 0; i < new_cart.length; i++) {
        if (new_cart[i]._id === product._id) {
          console.log('product in cart, add quantity')
          // add quantity
          new_cart[i].quantity++
          break
        } else {
          // add product
          console.log('product not in cart, add product')
          product.quantity = 1
          new_cart.push(product)
          break
        }
      }
    }
    console.log(new_cart)
    new_cart.forEach(item => total_amount += item.quantity*item.price)
    setCart(new_cart)
    setTotalAmount(total_amount)
  }

  const initializeUser = async () => {
    // let email = 'admin@gmail.com'
    let email = 'foo20002@gmail.com'
    let password = '1234'
    let usr = await signIn(email, password)
    // in production get user logged in
    // let usr = await getUser()
    console.log(usr)
    setUser(usr)
    let ords = await getOrders(usr._id)
    setOrders(ords)
  }

  // function to be called every time to update user, orders, products
  const update = async () => {
    let usr = await getUser()
    console.log(usr)
    setUser(usr)
    let ords = await getOrders(usr._id)
    setOrders(ords)
    let prods = await getProducts()
    setProducts(prods)
  }

  const initializeProducts = async () => {
    let prods = await getProducts()
    setProducts(prods)
  }

  useEffect(() => {
    initializeUser()
    initializeProducts()
  }, [])

  return (
    <>
      <div>
        
      </div>
      <div className="App">
        <NavBar
          user={user}
          update={update}
          cart={cart}
          handleSelected={handleSelected}
          totalAmount={totalAmount}
        />
        {user
        ? user.admin
          ? <AdminMain
              orders={orders}
              products={products}
              update={update}
              selected={selected}
            />
          : <Main
              products={products}
              update={update}
              addToCart={addToCart}
            />
        : <Main
            products={products}
            update={update}
            addToCart={addToCart}
          />
        }
        <Footer />
      </div>
      <ModalContainer />
    </>
  );
}

export default App;
