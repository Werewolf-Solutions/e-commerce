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
  ulpoadImg,
} from "./apiCalls/productController";

// Import order controller
import {
  getOrders
} from "./apiCalls/orderController";
import NavBar from "./Components/NavBar/NavBar";

function App() {
  const [file, setFile] = React.useState()
  const [cart, setCart] = React.useState()
  const [user, setUser] = React.useState('guest')
  const [products, setProducts] = React.useState()
  const [orders, setOrders] = React.useState()

  const onFileChange = (event) => {
    // Update the state
    setFile(event.target.files[0])
  }

  const initializeUser = async () => {
    // let email = 'admin@gmail.com'
    // let email = 'foo@gmail.com'
    // let password = '1234'
    // let usr = await signIn(email, password)
    // in production get user logged in
    let usr = await getUser()
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
        <input type="file" onChange={onFileChange} name="file" />
        <button onClick={() => console.log("call upload img function")}>
          Upload!
        </button>
      </div>
      <div className="App">
        <NavBar
          user={user}
          update={update}
          cart={cart}
        />
        {user
        ? user.admin
          ? <AdminMain
              orders={orders}
              products={products}
              update={update}
            />
          : <Main
              products={products}
              update={update}
            />
        : <Main
            products={products}
            update={update}
          />
        }
        <Footer />
      </div>
      <ModalContainer />
    </>
  );
}

export default App;
