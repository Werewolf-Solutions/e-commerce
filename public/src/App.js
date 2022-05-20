import * as React from "react";
import "./App.css";
import { ModalContainer } from "./Components/ModalContainer";
import Main from "./Pages/Main";

function App() {
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
