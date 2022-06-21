import React from "react";
import "../../Styles/admin-nav-bar-styles.css";
import logo from "../../Assets/png-clipart-bakery-roast-chicken-chef-platter-graphy-chef-silhouette-food-retro-thumbnail.png";
import { signOut } from "../../apiCalls/userController";

import CreateProductDialog from "../../Components/Admin/CreateProductDialog";
import "../../Styles/admin-cards.css";

export default function AdminNavBar(props) {
  const [createProductDialog, setCreateProductDialog] = React.useState(false);

  const handleCreateProductDialog = () => {
    setCreateProductDialog(!createProductDialog);
  };

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark fixed-top">
      <CreateProductDialog
        open={createProductDialog}
        onClose={handleCreateProductDialog}
        product={props.product}
        update={props.update}
      />
      <div className="container-fluid align-items-end">
        <img src={logo} className="img-fluid logo" alt="" />
        <div
          className="collapse navbar-collapse justify-content-end"
          id="collapsibleNavbar"
        >
          {/* what should be in here start */}
          <li className="nav-item">
            <a
              className="nav-link adminNavLinks"
              onClick={() => props.handleSelected("orders")}
            >
              orders
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => {
                console.log("createProductDialog");
                handleCreateProductDialog();
              }}
              className="nav-link adminNavLinks"
            >
              add product
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => props.handleSelected("products")}
              className="nav-link adminNavLinks"
            >
              products
            </a>
          </li>

          <li className="nav-item">
            <a
              className="nav-link adminNavLinks"
              onClick={() => props.handleSelected("orders-history")}
            >
              orders history
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link adminNavLinks text-danger"
              onClick={() => {
                signOut().then(() => {
                  props.update()
                  props.handleSelected("products")
                });
              }}
            >
              logout
            </a>
          </li>
          {/* what should be in here end */}
        </div>
      </div>
    </nav>
  );
}

{
  /* <button
class="btn btn-sm ms-2 btn-warning"
onClick={() => {
  console.log("createProductDialog");
  handleCreateProductDialog();
}}
>
create new product
</button> */
}
