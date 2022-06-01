import React from "react";
import "../../Styles/edit-card-modal-styles.css";
import { Dialog } from "@mui/material";

import { updateProduct, uploadImg } from "../../apiCalls/productController";

export default function UpdateProductDialog(props) {
  const [product, setProduct] = React.useState({
    _id: props.product._id,
    name: props.product.name,
    description: props.product.description,
    category: props.product.category,
    price: props.product.price,
  });
  const [file, setFile] = React.useState();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.id]: e.target.value });
  };

  const onFileChange = (event) => {
    // Update the state
    setFile(event.target.files[0]);
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <div className="photoSection ms-2 me-2">
        <h3 className=" mt-2 mb-0 photoCopy">Change Photo:</h3>

        <div className="d-flex flex-column">
          <img src={props.product.img.path} className="edit-image" alt="" />

          <span>
            <input
              className="mt-1 ms-2 btn-sm chooseFile"
              type="file"
              name="file"
              id="file"
              onChange={onFileChange}
            />
            <button
              className="mt-1 btn-sm uploadbttn"
              onClick={() => uploadImg(file, props.product)}
            >
              Upload!
            </button>
          </span>
        </div>
      </div>

      <div className="ms-2 me-2 d-flex flex-column justify-items-center align-content-center admin-edit-card">
        <form>
          <div class="form-group ms-2 me-2">
            <label className="mt-3 mb-2 text-danger inputDish" for="DishTitle">
              Name
            </label>
            <input
              class="form-control"
              id="name"
              placeholder={props.product.name}
              onChange={handleChange}
            />
          </div>

          <div class="form-group ms-2 me-2">
            <label className="mt-2 mb-2 text-danger" for="DishDesc">
              Description
            </label>
            <input
              class="form-control"
              id="description"
              placeholder={props.product.description}
              onChange={handleChange}
            />
          </div>

          <div class="form-group ms-2 me-2">
            <label className="mt-2 mb-2 text-danger" for="Ingredients">
              Category
            </label>
            <input
              class="form-control category"
              id="category"
              placeholder={props.product.category}
              onChange={handleChange}
            />
          </div>

          <div class="form-group ms-2 me-2">
            <label className="mt-2 mb-2 text-danger" for="Price">
              Price
            </label>
            <input
              class="form-control"
              id="price"
              type="number"
              placeholder={props.product.price}
              onChange={handleChange}
            />
          </div>
        </form>
        <button
          className="mt-4 btn btn-danger"
          onClick={() => {
            updateProduct(product).then(() => props.update());
            props.onClose();
          }}
        >
          Save to update your menu
        </button>

        <p className="modalClose me-4 mt-4" onClick={props.onClose}>
          X CLOSE
        </p>
      </div>
    </Dialog>
  );
}
