import React from "react";
import { Dialog } from "@mui/material";
import SignInForm from "./SignInForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function SignInDialog(props) {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Dialog open={props.open} onClose={props.onClose}>
          <SignInForm
            signIn={props.signIn}
            handleChange={props.handleChange}
            handleSignInDialog={props.handleSignInDialog}
            handleSignUpDialog={props.handleSignUpDialog}
            update={props.update}
            onClose={props.onClose}
          />
        </Dialog>
      </ThemeProvider>
    </div>
  );
}
