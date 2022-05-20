import React from "react";
import { useStore } from "../Hooks/Store";
import "../Styles/log-in-modal-styles.css";

function LogInModal() {
  const setModal = useStore((store) => store.setModal);

  return (
    <div className="modalContainer ">
      <div className="modalLog">
        {/* header bar to modal */}
        <div className="logInHeading d-flex  align-items-center justify-items-center">
          <p className="logIncopy text-danger mx-auto">LOGIN / SIGN UP</p>
          <p
            className="modalClose me-4"
            onClick={() => {
              setModal("");
            }}
          >
            x
          </p>
        </div>

        <div className="flex-container d-flex">
          <div class="logIncontainer mt-3">
            <div>
              <label className="email ms-2 me-2" for="email">
                <b>Email</b>
              </label>
              <input
                className="ms-5"
                type="email"
                placeholder="Enter Email"
                name="email"
                required
              />
            </div>
            <div>
              <label className="password mt-2 ms-2 me-2" for="psw">
                <b>Password</b>
              </label>
              <input
                className="ms-5"
                type="password"
                placeholder="Enter Password"
                name="psw"
                required
              />
            </div>
            <div>
              <button className="loginButton ms-2 mt-3" type="submit">
                Login
              </button>
            </div>
            <div>
              <label>
                <input
                  className="remember ms-2 mt-3"
                  type="checkbox"
                  checked="checked"
                  name="remember"
                />{" "}
                Remember me
              </label>
            </div>
          </div>
          <div class="signUpcontainer mt-3">
            <div>
              <label className="email ms-2 me-2" for="fname">
                <b>name</b>
              </label>
              <input
                className="ms-5"
                type="text"
                placeholder="First name"
                name="fname"
                required
              />
            </div>

            <div>
              <label className="email ms-2 me-2" for="lname">
                <b>surname</b>
              </label>
              <input
                className="ms-5"
                type="text"
                placeholder="Surname"
                name="lname"
                required
              />
            </div>
            <div>
              <label className="password mt-2 ms-2 me-2" for="psw">
                <b>Password</b>
              </label>
              <input
                className="ms-5"
                type="password"
                placeholder="Enter Password"
                name="psw"
                required
              />
            </div>
            <div>
              <label className="password mt-2 ms-2 me-2" for="psw">
                <b>Password</b>
              </label>
              <input
                className="ms-5"
                type="password"
                placeholder="Repeat Password"
                name="psw"
                required
              />
            </div>
            <div>
              <button className="loginButton ms-2 mt-3" type="submit">
                Login
              </button>
            </div>
            <div>
              <label>
                <input
                  className="remember ms-2 mt-3"
                  type="checkbox"
                  checked="checked"
                  name="remember"
                />{" "}
                Remember me
              </label>
            </div>
          </div>
        </div>

        <div className="logInFooter d-flex flex-row align-items-center justify-items-center">
          <p className="logIncopy text-danger mx-auto">OR CONTINUE AS GUEST</p>
          <p
            className="modalClose me-4"
            onClick={() => {
              setModal("");
            }}
          >
            x
          </p>
        </div>
      </div>
    </div>
  );
}

export default LogInModal;
