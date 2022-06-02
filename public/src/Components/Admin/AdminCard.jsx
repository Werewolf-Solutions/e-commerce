import React from "react";
import "../../Styles/admin-cards.css";
import { useStore } from "../../Hooks/Store";
import curry from "../../Assets/pexels-asit-naskar-9809033.jpeg";
import UpdateProductDialog from "./UpdateProductDialog";
import { deleteProduct } from "../../apiCalls/productController";

export default function AdminCard(props) {
  const setModal = useStore((store) => store.setModal);

  const [updateProductDialog, setUpdateProductDialog] = React.useState(false);

  const handleUpdateProductDialog = () => {
    setUpdateProductDialog(!updateProductDialog);
  };

  const [createProductDialog, setCreateProductDialog] = React.useState(false);

  const handleCreateProductDialog = () => {
    setCreateProductDialog(!createProductDialog);
  };

  return (
    <div className="container ">
      <UpdateProductDialog
        open={updateProductDialog}
        onClose={handleUpdateProductDialog}
        product={props.product}
        update={props.update}
      />

      <div className="row">
        {/* side orders section header */}
        <div className="col-12">
          <h2 id="sideorders" className=" cardMenuHeader mt-4 mb-4 ms-4">
            SIDE ORDERS
          </h2>
          <a href="#*" class="btn btn-info ms-3 btn-sm">
            Edit Section header
          </a>
          <button
            class="btn btn-sm ms-2 btn-warning"
            onClick={() => {
              console.log("createProductDialog");
              handleCreateProductDialog();
            }}
          >
            create new product for this section
          </button>
        </div>
        {/* side orders cards */}
        <div className="col-md-6 col-lg-4">
          <div className="card-box ms-3 me-3 mb-3">
            <div className="card-thumbnail">
              <button
                onClick={() => {
                  console.log("updateProductDialog");
                  handleUpdateProductDialog();
                  // setModal("EditCardModal");
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
              <img src={props.product.img.path} className="img-fluid" alt="" />
            </div>
            <h3>
              <a href="*" className="mt-4 text-danger">
                {props.product.name}
              </a>
            </h3>
            <p className="text-secondary">{props.product.description}</p>
            <h3 className="price text-danger">PRICE: {props.product.price}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
