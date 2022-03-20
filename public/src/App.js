import React, {useEffect} from 'react'
import axios from 'axios'
import './App.css'
import Header from './Components/Layout/Header/Header'
import Body from './Components/Layout/Body/Body'
import Footer from './Components/Layout/Footer/Footer'
import SignInDialog from './Components/Forms/SignInDialog'
import SignUpDialog from './Components/Forms/SignUpDialog'

import {user_demo} from './js/user_demo'

function App() {
  const [state, setState] = React.useState({
    user: null
  })
  const [currency, setCurrency] = React.useState('GBP')
  const [demo, setDemo] = React.useState(false)
  const [productsList, setProductsList] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [cart, setCart] = React.useState([])
  const [selected, setSelected] = React.useState('products-list')
  const [menuList, setMenuList] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [signUpDialog, setSignUpDialog] = React.useState(false)
  const [signInDialog, setSignInDialog] = React.useState(false)

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

  const updateProductsList = async () => {
    let res = await axios.get('/users/update-products-list')
    let categories = getCategories(res.data.productsList)
    setCategories(categories)
    setProductsList(res.data.productsList)
  }

  const updateUser = async () => {
    if (demo) {
      setState({...state, user: user_demo})
    } else {
      let res = await axios.get('/users/')
      console.log(res.data)
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
    setSelected('products-list')
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

  const handleDemoOnOff = () => {
    setDemo(!demo)
  }

  const handleCurrency = (e) => {
    setCurrency(e.target.value)
  }

  useEffect(() => {
    updateProductsList()
    updateUser()
  }, [demo])

  return (
    <div className="App">
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
        handleDemoOnOff={handleDemoOnOff}
        demo={demo}
        currency={currency}
        handleCurrency={handleCurrency}
      />
      <div className="Body">
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
        />
      </div>
      <Footer
        handleSelected={handleSelected}
      />
    </div>
  )
}

export default App