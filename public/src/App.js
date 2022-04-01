import React, {useEffect} from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Grid } from '@mui/material'
import axios from 'axios'
import './App.css'
import Header from './Components/Layout/Header/Header'
import Body from './Components/Layout/Body/Body'
import Footer from './Components/Layout/Footer/Footer'
import SignInDialog from './Components/Forms/SignInDialog'
import SignUpDialog from './Components/Forms/SignUpDialog'

import { io } from 'socket.io-client'

import {user_demo} from './js/user_demo'
import {admin_demo} from './js/admin_demo'
import { Paper } from '@mui/material'

const socket = io('http://localhost:5000', {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
})

function App() {
  const [state, setState] = React.useState({
    user: null
  })
  const [orders, setOrders] = React.useState()
  const [theme, setTheme] = React.useState('dark')
  const [currency, setCurrency] = React.useState('GBP')
  const [demo, setDemo] = React.useState('live-account')
  const [productsList, setProductsList] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [cart, setCart] = React.useState([])
  const [selected, setSelected] = React.useState('products')
  const [menuList, setMenuList] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [signUpDialog, setSignUpDialog] = React.useState(false)
  const [signInDialog, setSignInDialog] = React.useState(false)
  const [chat, setChat] = React.useState([])
  const [newOrders, setNewOrders] = React.useState([])
  const [notifications, setNotifications] = React.useState([])

  const myTheme = createTheme({
    palette: {
      mode: theme === 'dark'
      ? 'dark'
      : 'light'
    },
  })

  const handleSignInDialog = () => {
    setSignInDialog(!signInDialog)
  }

  const handleSignUpDialog = () => {
    setSignUpDialog(!signUpDialog)
  }

  const handleMenuList = (e) => {
    setMenuList(!menuList)
    setAnchorEl(e.currentTarget)
  }

  const handleSelected = (elm) => {
    setSelected(elm)
    setMenuList(false)
  }

  const createList = (productsList) => {
    let result = productsList.reduce((acc, d) => {
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

  const updateProductsList = async () => {
    let res = await axios.get('/users/update-products-list')
    let categories = getCategories(res.data.products)
    let list = createList(res.data.products)
    console.log(list)
    setCategories(categories)
    setProductsList(list)
  }

  const updateUserOrders = async () => {
    let res = await axios.get('/user/orders')
    console.log(res.data)
    setOrders(res.data.orders)
  }

  const updateUser = async () => {
    if (demo === 'user-demo') {
      setState({...state, user: user_demo})
    } else if (demo === 'admin-demo') {
      setState({...state, user: admin_demo})
    } else {
      let res = await axios.get('/users/')
      console.log(res.data)
      // updateUserOrders()
      setOrders(res.data.orders)
      setState({...state, user: res.data.user})
    }
  }

  const signIn = async () => {
    let { email, password } = state
    let res = await axios.post('/users/sign-in', {email, password})
    let { user } = res.data
    console.log(user)
    if (user) {
      setState({...state, user:user})
      handleSignInDialog()
      setMenuList(false)
    }
  }

  const signUp = async () => {
    let { email, password, password2 } = state
    let res = await axios.post('/users/sign-up', {email, password, password2})
    let { user } = res.data
    if (user) {
      setState({...state, user:user})
      handleSignUpDialog()
      setMenuList(false)
    }
  }

  const signOut = async () => {
    let res = await axios.get('/users/sign-out')
    setState({user:null})
    setSelected('products')
    setMenuList(false)
  }

  const handleChange = (e) => {
    setState({...state, [e.target.id]: e.target.value})
  }

  const addToCart = async (item) => {
    let a = cart.slice()
    console.log(item)
    if (a.length === 0 || !item.quantity) {
      item.quantity = 1
      a.push(item)
    } else {
      for (let i = 0; i < a.length; i++) {
        console.log(i, a[i]._id === item._id)
        if (a[i]._id === item._id) {
          a[i].quantity++
        }
      }
    }
    let total_cart = totalAmountCart(a)
    a.total_cart = total_cart
    setCart(a)
  }

  const deleteFromCart = (item) => {
    let a = cart.slice()
    for (let i = 0; i < a.length; i++) {
      if (a[i]._id === item._id) {
        if (a[i].quantity === 1) {
          a[i].quantity = 0
          a.splice(cart.indexOf(item),1)
        } else if (a[i].quantity > 1) {
          a[i].quantity = a[i].quantity - 1
        }
      }
    }
    let total_cart = totalAmountCart(a)
    a.total_cart = total_cart
    setCart(a)
  }

  const totalAmountCart = (cart) => {
    let total_cart = 0
    cart.forEach(item => total_cart = total_cart + (item.quantity * item.price))
    return total_cart
  }

  const emptyCart = () => {
    setCart([])
  }

  const getCategories = (productsList) => {
    let result = []
    productsList.forEach(product => {
        if (result.length === 0) {
            result.push(product.category)
        } else if (result[result.length -1] != product .category) {
            result.push(product.category)
        }
    })
    return result
  }

  const handleDemo = (e) => {
    setDemo(e.target.value)
  }

  const handleCurrency = (e) => {
    // TODO: change amount based on currency, ex: GBP -> USD
    setCurrency(e.target.value)
  }

  const handleTheme = (e) => {
    setTheme(e.target.value)
  }

  useEffect(() => {
    updateProductsList()
    updateUser()
    socket.on('new_order', ({order}) => {
      console.log('new order')
      console.log(order)
      setNotifications([...notifications, 'new order'])
      setNewOrders([...newOrders, order])
    })

    socket.on('message', ({sentBy, text}) => {
      setNotifications([...notifications, 'new message'])
      setChat([...chat, {sentBy, text}])
    })
  }, [demo, selected])

  return (
    <div >
      <ThemeProvider theme={myTheme}>

        <SignInDialog
          open={signInDialog}
          handleChange={handleChange}
          onClose={handleSignInDialog}
          handleSignInDialog={handleSignInDialog}
          handleSignUpDialog={handleSignUpDialog}
          signIn={signIn}
        />
        <SignUpDialog
          open={signUpDialog}
          handleChange={handleChange}
          onClose={handleSignUpDialog}
          handleSignInDialog={handleSignInDialog}
          handleSignUpDialog={handleSignUpDialog}
          signUp={signUp}
        />
        <Paper>
          <Grid container direction='column'>
            <Grid item>
              <Header
                user={state.user}
                signOut={signOut}
                handleSelected={handleSelected}
                handleMenuList={handleMenuList}
                anchorEl={anchorEl}
                menuList={menuList}
                handleSignInDialog={handleSignInDialog}
                handleSignUpDialog={handleSignUpDialog}
                updateUser={updateUser}
                cart={cart}
                emptyCart={emptyCart}
                handleDemo={handleDemo}
                demo={demo}
                currency={currency}
                handleCurrency={handleCurrency}
                theme={theme}
                handleTheme={handleTheme}
                notifications={notifications}
              />

            </Grid>
            <Grid item>
              <Body
                productsList={productsList}
                categories={categories}
                selected={selected}
                handleChange={handleChange}          
                user={state.user}
                cart={cart}
                addToCart={addToCart}
                deleteFromCart={deleteFromCart}
                handleSelected={handleSelected}
                updateUser={updateUser}
                updateProductsList={updateProductsList}
                handleSignInDialog={handleSignInDialog}
                currency={currency}
                orders={orders}
                chat={chat}
                newOrders={newOrders}
              />
              
            </Grid>
            <Grid item>
              <Footer
                handleSelected={handleSelected}
              />
              
            </Grid>
          </Grid>
        </Paper>
      </ThemeProvider>
    </div>
  )
}

export default App