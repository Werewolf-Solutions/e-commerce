import * as React from "react";
import "./App.css";
import { ModalContainer } from "./Components/ModalContainer";
import Main from "./Pages/Main";
import AdminMain from "./Pages/AdminMain";
import Footer from "./Components/Footer";
import { useEffect } from "react";
import { io } from 'socket.io-client'

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

const socket = io()

function App() {
  const [cart, setCart] = React.useState([])
  const [totalAmount, setTotalAmount] = React.useState(0)
  const [notifications, setNotifications] = React.useState([])
  const [user, setUser] = React.useState()
  const [products, setProducts] = React.useState()
  const [orders, setOrders] = React.useState()
  const [selected, setSelected] = React.useState('products')

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
    let email = 'admin@gmail.com'
    // let email = 'foo@gmail.com'
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
    initializeProducts()
  }

  const initializeProducts = async () => {
    let prods = await getProducts()
    let p = createList(prods)
    setProducts(p)
  }

  const createList = (products) => {
    let result = products.reduce((acc, d) => {
      const found = acc.find(a => a.category === d.category)
      //const value = { category: d.category, val: d.value }
      const value = d // the element in data property
      if (!found) {
        //acc.push(...value)
        acc.push({category:d.category, products: [value]}) // not found, so need to add products property
      }
      else {
        //acc.push({ category: d.category, products: [{ value: d.value }, { name: d.name }] })
        found.products.push(value) // if found, that means products property exists, so just push new element to found.data.
      }
      return acc
    }, [])
    return result
  }

  const emptyCart = () => {
    setCart([])
    setTotalAmount(0)
  }

  useEffect(() => {
    initializeUser()
    initializeProducts()

    socket.on('new_order', ({order}) => {
      console.log('new order')
      console.log(order)
      setNotifications([...notifications, {msg: 'new order', body: order}])
      update()
    })

    socket.on('order_update', ({order}) => {
      console.log('order update')
      console.log(order)
      setNotifications([...notifications, {msg: 'order update', body: order}])
      update()
    })


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
          emptyCart={emptyCart}
          notifications={notifications}
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
              user={user}
              orders={orders}
              update={update}
              addToCart={addToCart}
              selected={selected}
            />
        : <Main
            products={products}
            orders={orders}
            user={user}
            update={update}
            addToCart={addToCart}
            selected={selected}
          />
        }
        <Footer />
      </div>
      <ModalContainer />
    </>
  );
}

export default App;
