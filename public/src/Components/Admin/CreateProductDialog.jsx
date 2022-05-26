import React from 'react'
import "../../Styles/edit-card-modal-styles.css";
import { Dialog } from "@mui/material";

import {
  createProduct,
  uploadImg,
} from '../../apiCalls/productController'

export default function CreateProductDialog(props) {
  const [product, setProduct] = React.useState({
    name: '',
    description: '',
    category: '',
    price: '',
  })
  const [file, setFile] = React.useState()

  const handleChange = (e) => {
    setProduct({...product, [e.target.id]: e.target.value})
  }
  
  const onFileChange = (event) => {
    // Update the state
    setFile(event.target.files[0])
  }
  
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
    >
        <div className="card-box mt-5 d-flex flex-column justify-items-center align-content-center admin-edit-card">
          <div className="card-thumbnail">
            <img src={file} className="img-fluid edit-image" alt="" />
            Upload Photo:
            <input
              className="ms-2 me-2 chooseFile"
              type="file"
              name="file"
              id="file"
              onChange={onFileChange}
            />
          </div>
          <form>
            <div class="form-group">
              <label className="mt-3 mb-2 text-danger inputDish" for="DishTitle">
                Name
              </label>
              <input
                class="form-control"
                id="name"
                placeholder="Name dynamically placed here"
                onChange={handleChange}
              />
            </div>

            <div class="form-group">
              <label className="mt-2 mb-2 text-danger" for="DishDesc">
                Description
              </label>
              <input
                class="form-control"
                id="description"
                placeholder="Description dynamically placed here"
                onChange={handleChange}
              />
            </div>

            <div class="form-group">
              <label className="mt-2 mb-2 text-danger" for="Ingredients">
                Category
              </label>
              <input
                class="form-control category"
                id="category"
                placeholder="Category dynamically placed here"
                onChange={handleChange}
              />
            </div>

            <div class="form-group">
              <label className="mt-2 mb-2 text-danger" for="Price">
                Price
              </label>
              <input
                class="form-control"
                id="price"
                placeholder="Price dynamically placed here"
                onChange={handleChange}
              />
            </div>
          </form>
          <button
            className="mt-4 btn btn-danger"
            onClick={() => {
              createProduct(product).then((prod) => {
                console.log(prod)
                uploadImg(file, prod)
                props.update()
              })
              props.onClose()
            }}
          >
            Confirm
          </button>

          <p
            className="modalClose me-4 mt-4"
            onClick={props.onClose}
          >
            X CLOSE
          </p>
        </div>
    </Dialog>
  );
}
