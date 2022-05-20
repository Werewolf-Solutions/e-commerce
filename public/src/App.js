import * as React from "react";
import "./App.css";
import { ModalContainer } from "./Components/ModalContainer";
import Main from "./Pages/Main";
import { useEffect } from "react";

// Import user controller
import {
  getUser,
  signIn,
  signUp
} from './apiCalls/userController'

// Import product controller
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  ulpoadImg
} from './apiCalls/productController'

function App() {

  const [file, setFile] = React.useState()

  const onFileChange = event => {
    // Update the state
    setFile(event.target.files[0])
  }

  useEffect(() => {
    getProducts()
    // getUser()
    // signIn({email: 'admin@gmail.com', password: '1234'})
    // signIn({email: 'foo@gmail.com', password: '1234'})
  }, [])

  return (
    <>
      <div>
        <input type="file" onChange={onFileChange} name="file"/>
        <button onClick={() => console.log('call upload img function')}>
          Upload!
        </button>
      </div>
      <div className="App">
        <Main />
      </div>
      <ModalContainer />
    </>
  );
}

export default App;
