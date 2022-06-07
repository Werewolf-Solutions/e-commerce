import React from "react";
import { Grid, TextField, Dialog } from "@mui/material";
import { Button } from "@mui/material";
import { updateUser } from "../../apiCalls/userController";

export default function DeliveryForm(props) {
  const [address, setAddress] = React.useState();

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.id]: e.target.value });
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <Grid item>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <TextField
                required
                id="number"
                name="number"
                label="Number"
                fullWidth
                autoComplete="shipping address-number"
                variant="standard"
                // value={address.number}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={10}>
              <TextField
                required
                id="line1"
                name="line1"
                label="Address line 1"
                fullWidth
                autoComplete="shipping address-line1"
                variant="standard"
                // value={address.line1}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="line2"
                name="line2"
                label="Address line 2"
                fullWidth
                autoComplete="shipping address-line2"
                variant="standard"
                // value={address.line2}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="shipping address-city"
                variant="standard"
                // value={address.city}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                id="region"
                name="region"
                label="Region"
                fullWidth
                variant="standard"
                // value={address.region}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="postcode"
                name="postcode"
                label="Postcode"
                fullWidth
                autoComplete="shipping postal-code"
                variant="standard"
                // value={address.postcode}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="country"
                name="country"
                label="Country"
                fullWidth
                autoComplete="shipping country"
                variant="standard"
                // value={address.country}
                onChange={handleChange}
              />
            </Grid>
            <Grid item>
              <Button
                color="error"
                onClick={() => {
                  let user = props.user;
                  user.address = address;
                  updateUser(address).then(() => props.update());
                  props.onClose();
                }}
              >
                change address
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}
