import * as React from "react";
import "./App.css";
import { ModalContainer } from "./Components/ModalContainer";
import Main from "./Pages/Main";
import { useEffect } from "react";

import {
  getUser,
  signIn,
  signUp
} from './apiCalls/userController'

function App() {

  useEffect(() => {
    // getUser()
    // signIn({email: 'admin@gmail.com', password: '1234'})
    // signIn({email: 'foo@gmail.com', password: '1234'})
  }, [])

  return (
    <>
      <div className="App">
        <Main />
      </div>
      <ModalContainer />
    </>
  );
}

export default App;
