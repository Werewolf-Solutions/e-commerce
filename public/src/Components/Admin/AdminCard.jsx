import React from "react";
import "../../Styles/admin-cards.css";

import UpdateProductDialog from "./UpdateProductDialog";
import CreateProductDialog from "./CreateProductDialog";

import { deleteProduct } from "../../apiCalls/productController";

export default function AdminCard(props) {
  const [updateProductDialog, setUpdateProductDialog] = React.useState(false);
  const [createProductDialog, setCreateProductDialog] = React.useState(false);

  const handleUpdateProductDialog = () => {
    setUpdateProductDialog(!updateProductDialog);
  };

  const handleCreateProductDialog = () => {
    setCreateProductDialog(!createProductDialog);
  };

  return (
    <>
      <UpdateProductDialog
        open={updateProductDialog}
        onClose={handleUpdateProductDialog}
        product={props.product}
        update={props.update}
      />
      <CreateProductDialog
        open={createProductDialog}
        onClose={handleCreateProductDialog}
        product={props.product}
        update={props.update}
      />

      {/* side orders section header */}

      {/* side orders cards */}

      <div className="card-box ms-3 me-3 mb-3">
        <div className="card-thumbnail">
          <button
            onClick={() => {
              // console.log("updateProductDialog")
              handleUpdateProductDialog()
            }}
            className="btn btn-danger mb-3 me-3"
          >
            Edit product
          </button>
          <button
            onClick={() => {
              deleteProduct(props.product).then(() => props.update());
            }}
            className="btn btn-danger mb-3"
          >
            Delete product
          </button>
          <img
            src={props.product.img.path}
            className="admin-card-image-top"
            alt=""
          />
        </div>
        <h3>
          <a className="mt-4 text-danger">
            {props.product.name}
          </a>
        </h3>
        <p className="text-secondary">{props.product.description}</p>
        <h3 className="price text-danger">PRICE: £ {props.product.price}</h3>
      </div>
    </>
  );
}
