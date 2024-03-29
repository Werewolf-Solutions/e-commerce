import * as React from "react";
import "./App.css";
import Main from "./Pages/Main";
import AdminMain from "./Pages/AdminMain";
import Footer from "./Components/Footer";
import { useEffect, useState } from "react";

// Import user controller
import { getUser, signIn } from "./apiCalls/userController";

// Import product controller
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "./apiCalls/productController";

// Import order controller
import { getOrders } from "./apiCalls/orderController";
import NavBar from "./Components/NavBar/NavBar";

import { SocketContext, socket } from "./service/socket";

function App() {
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [user, setUser] = useState();
  const [products, setProducts] = useState();
  const [orders, setOrders] = useState([]);
  const [selected, setSelected] = useState("products");
  const [ordersSelected, setOrdersSelected] = useState("all");

  const [acceptedOrders, setAcceptedOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [ordersIn, setOrdersIn] = useState([]);

  const handleSelected = (selection) => {
    setSelected(selection);
  };

  const addToCart = (product) => {
    let new_cart = cart;
    let total_amount = 0;
    let total_items = 0;
    let new_product = true;
    // check if it's in cart
    for (let i = 0; i < new_cart.length; i++) {
      if (new_cart[i]._id === product._id) {
        new_product = false;
        break;
      }
    }
    // add first product
    if (new_cart.length === 0 || new_product) {
      // console.log("product not in cart, add product")
      product.quantity = 1;
      new_cart.push(product);
    } else {
      for (let i = 0; i < new_cart.length; i++) {
        if (new_cart[i]._id === product._id) {
          // console.log("product in cart, add quantity")
          // add quantity
          new_cart[i].quantity++;
          break;
        }
      }
    }
    // console.log(new_cart)
    new_cart.forEach((item) => (total_amount += item.quantity * item.price));
    new_cart.forEach((item) => (total_items += item.quantity));
    // console.log(total_items)
    setTotalItems(total_items);
    setCart(new_cart);
    setTotalAmount(total_amount);
  };

  const deleteFromCart = (product) => {
    let total_amount = 0;
    let total_items = 0;
    let a = cart.slice();
    for (let i = 0; i < a.length; i++) {
      if (a[i]._id === product._id) {
        if (a[i].quantity === 1) {
          a[i].quantity = 0;
          a.splice(cart.indexOf(product), 1);
        } else if (a[i].quantity > 1) {
          a[i].quantity = a[i].quantity - 1;
        }
      }
    }
    a.forEach((item) => (total_amount += item.quantity * item.price));
    a.forEach((item) => (total_items += item.quantity));
    setCart(a);
    setTotalAmount(total_amount);
    setTotalItems(total_items);
  };

  const initializeUser = async () => {
    // let email = "admin@gmail.com"
    // let email = "foo@gmail.com"
    // let password = "1234"
    // let usr = await signIn(email, password)
    // in production get user logged in
    let usr = await getUser();
    // console.log(usr)
    setUser(usr);
    let res = await getOrders(usr._id);
    // console.log(res)
    initializeAdminOrders(res.orders);
    setOrders(res.orders);
  };

  // function to be called every time to update user, orders, products
  const update = async () => {
    let usr = await getUser();
    setUser(usr);
    let res = await getOrders(usr._id);
    // console.log(res.orders)
    initializeAdminOrders(res.orders);
    setOrders(res.orders);
    initializeProducts();
  };

  const initializeProducts = async () => {
    let p = await getProducts();
    let prods = await createList(p);
    setProducts(prods);
  };

  const initializeAdminOrders = (orders) => {
    let accepted = [];
    let ordsIn = [];
    let completed = [];
    let refunded = [];
    let active = [];
    // console.log('initialize orders')
    // console.log(orders)
    if (orders) {
      for (let i = 0; i < orders.length; i++) {
        // console.log(`
        // id: ${orders[i]._id}
        // Accepted ${orders[i].accepted}
        // Ready: ${orders[i].ready}
        // Completed: ${orders[i].completed}
        // Status: ${orders[i].status}`)

        // orders in - paid or pay at pick up || first column
        if (
          !orders[i].completed &&
          !orders[i].accepted &&
          orders[i].payment_intent.status === "succeeded" &&
          orders[i].status != "refunded"
        ) {
          ordsIn.push(orders[i]);
        }

        // orders accepted - in preparation || second column
        if (
          orders[i].accepted &&
          !orders[i].ready &&
          !orders[i].completed &&
          orders[i].status != "refunded"
        ) {
          accepted.push(orders[i]);
        }

        // orders completed - ready to be collected or delivered || third column
        if (
          orders[i].ready &&
          !orders[i].completed &&
          orders[i].status != "refunded"
        ) {
          completed.push(orders[i]);
        }
      }
      // console.log(accepted)
      // console.log(completed)
      // console.log(ordsIn)
      setAcceptedOrders(accepted);
      setCompletedOrders(completed);
      setOrdersIn(ordsIn);
    }
  };

  const handleOrdersSelected = (e) => {
    setOrdersSelected(e.target.value);
    initializeOrdersSelected(e.target.value);
  };

  const initializeOrdersSelected = async (status) => {
    let ords = [];
    let res = await getOrders(user._id);
    if (res.orders) {
      for (let i = 0; i < res.orders.length; i++) {
        // orders selected it res.orders[i].status === e.target.value
        if (res.orders[i].status === status) {
          ords.push(res.orders[i]);
        }
      }
      if (status === "all") {
        ords = res.orders;
      }
      setOrders(ords);
    }
  };

  const createList = (list) => {
    let result = list.reduce((acc, d) => {
      const found = acc.find((a) => a.category === d.category);
      //const value = { category: d.category, val: d.value }
      const value = d; // the element in data property
      if (!found) {
        //acc.push(...value)
        acc.push({ category: d.category, products: [value] }); // not found, so need to add products property
      } else {
        //acc.push({ category: d.category, products: [{ value: d.value }, { name: d.name }] })
        found.products.push(value); // if found, that means products property exists, so just push new element to found.data.
      }
      return acc;
    }, []);
    return result;
  };

  const emptyCart = () => {
    setCart([]);
    setTotalAmount(0);
    setTotalItems(0);
  };

  useEffect(() => {
    initializeUser();
    initializeProducts();

    socket.on("new_order", ({ order }) => {
      // console.log('new order')
      // console.log(order)
      // setNotifications([...notifications, 'new order'])
      // setNewOrders([...newOrders, order])
      update();
    });

    socket.on("order_update", ({ order }) => {
      // console.log('order update')
      // console.log(order)
      // setNotifications([...notifications, 'order update'])
      // setNewOrders([...newOrders, order])
      update();
    });
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <div className="App">
        <NavBar
          user={user}
          cart={cart}
          totalAmount={totalAmount}
          totalItems={totalItems}
          update={update}
          handleSelected={handleSelected}
          deleteFromCart={deleteFromCart}
          emptyCart={emptyCart}
        />
        {user && user.admin ? (
          <AdminMain
            acceptedOrders={acceptedOrders}
            ordersIn={ordersIn}
            completedOrders={completedOrders}
            orders={orders}
            products={products}
            update={update}
            selected={selected}
            handleSelected={handleSelected}
            ordersSelected={ordersSelected}
            handleOrdersSelected={handleOrdersSelected}
          />
        ) : (
          <Main
            products={products}
            user={user}
            orders={orders}
            update={update}
            addToCart={addToCart}
            deleteFromCart={deleteFromCart}
            selected={selected}
            acceptedOrders={acceptedOrders}
            ordersIn={ordersIn}
            completedOrders={completedOrders}
            handleSelected={handleSelected}
            ordersSelected={ordersSelected}
            handleOrdersSelected={handleOrdersSelected}
          />
        )}
        <Footer user={user} update={update} handleSelected={handleSelected} />
      </div>
    </SocketContext.Provider>
  );
}

export default App;
