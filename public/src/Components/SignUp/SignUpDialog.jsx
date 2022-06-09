import { Dialog } from "@mui/material";
import React from "react";
import SignUpForm from "./SignUpForm";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function SignUpDialog(props) {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <Dialog open={props.open} onClose={props.onClose}>
          <SignUpForm
            signUp={props.signUp}
            handleChange={props.handleChange}
            handleSignInDialog={props.handleSignInDialog}
            handleSignUpDialog={props.handleSignUpDialog}
            update={props.update}
            onClose={props.onClose}
          />
          {/* <button onClick={() => {
                        props.handleSignInDialog()
                        props.handleSignUpDialog()
                }}>open sign in</button> */}
        </Dialog>
      </ThemeProvider>
    </div>
  );
}
