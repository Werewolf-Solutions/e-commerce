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

  return <></>;
}
