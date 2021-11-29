import React, {useEffect} from 'react'
import axios from 'axios'
import './App.css'
import Header from './Components/Layout/Header/Header'
import Body from './Components/Layout/Body/Body'
import Footer from './Components/Layout/Footer/Footer'

function App() {
  const [state, setState] = React.useState({
    user: null,
  })
  const [productsList, setProductsList] = React.useState([])
  const [cart, setCart] = React.useState([])
  const [selected, setSelected] = React.useState('products-list')
  const [menuList, setMenuList] = React.useState(false)

  const handleMenuList = () => {
    setMenuList(!menuList)
  }

  const handleSelected = (elm) => {
    setSelected(elm)
    setMenuList(false)
  }

  const updateProductsList = async () => {
    let res = await axios.get('/users/update-products-list')
    setProductsList(res.data.productsList)
  }

  const updateUser = async () => {
    let res = await axios.get('/users/')
    console.log(res.data)
    setState({...state, user: res.data.user})
  }

  const signIn = async () => {
    let { email, password } = state
    let res = await axios.post('/users/sign-in', {email, password})
    let { user } = res.data
    if (user) {
      setState({...state, user:user})
      if (user.admin) {
        setSelected('admin-products-list')
      } else {
        setSelected('products-list')
      }
    }
  }

  const signUp = async () => {
    let { email, password, password2 } = state
    let res = await axios.post('/users/sign-up', {email, password, password2})
    let { user } = res.data
    if (user) {
      setState({...state, user:user})
      if (user.admin) {
        setSelected('admin-products-list')
      } else {
        setSelected('products-list')
      }
    }
  }

  const signOut = async () => {
    let res = await axios.get('/users/sign-out')
    setState({user:null})
    setSelected('products-list')
    setMenuList(!menuList)
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
    setCart(a)
  }

  const emptyCart = () => {
    setCart([])
  }

  const checkout = async () => {
    console.log(cart)
    // if user logged in
    if (state.user) {
      // /checkout
      console.log('user logged in ---> /checkout')
      let res = await axios.post('/users/checkout', {cart})
      console.log(res.data)
      updateUser()
    } else {
      // open sign in / sign up
      console.log('user logged out or not existing -----> sign in/up')
      setSelected('sign-in')
    }
  }

  useEffect(() => {
    updateProductsList()
  }, [])

  return (
    <div className="App">
      <Header
        user={state.user}
        signOut={signOut}
        handleSelected={handleSelected}
        handleMenuList={handleMenuList}
        menuList={menuList}
      />
      <div className="Body">
        <Body
          productsList={productsList}
          selected={selected}
          handleChange={handleChange}
          signIn={signIn}
          signUp={signUp}
          user={state.user}
          cart={cart}
          addToCart={addToCart}
          deleteFromCart={deleteFromCart}
          handleSelected={handleSelected}
          checkout={checkout}
          updateUser={updateUser}
          updateProductsList={updateProductsList}
        />
      </div>
      <Footer
        handleSelected={handleSelected}
      />
    </div>
  )
}

export default App