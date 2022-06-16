import React from "react";
import SignInDialog from "../SignIn/SignInDialog";
import SignUpDialog from "../SignUp/SignUpDialog";
import "../../Styles/nav-bar-styles.css";

export default function GuestNavBar(props) {
  const [signInDialog, setSignInDialog] = React.useState(false);
  const [signUpDialog, setSignUpDialog] = React.useState(false);

  const handleSignInDialog = () => {
    setSignInDialog(!signInDialog);
  };

  const handleSignUpDialog = () => {
    setSignUpDialog(!signUpDialog);
  };

  return
    <>
      <nav
        class="navbar navbar-expand-md navbar-light pt-5 pb-4 d-none d-sm-block d-md-none fixed-bottom"
      >
        <div class="container-xxl">
          <a class="navbar-brand" href="#intro">
            <span class="text-secondary fw-bold">
              <i class="bi bi-book-half"></i>
              Net Ninja Pro - the Book
            </span>
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#main-nav"
            aria-controls="main-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div
            class="collapse navbar-collapse justify-content-end align-center"
            id="main-nav"
          >
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="#topics">About The Book</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#reviews">Reviews</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#contact">Get in Touch</a>
              </li>
              <li class="nav-item d-md-none">
                <a class="nav-link" href="#pricing">Pricing</a>
              </li>
              <li class="nav-item ms-2 d-none d-md-inline">
                <a class="btn btn-secondary" href="#pricing">buy now</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>;
}
