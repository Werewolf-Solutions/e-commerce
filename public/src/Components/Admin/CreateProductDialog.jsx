import React from "react";
import "../../Styles/edit-card-modal-styles.css";
import { Dialog } from "@mui/material";

import { createProduct, uploadImg } from "../../apiCalls/productController";

export default function CreateProductDialog(props) {
  const [product, setProduct] = React.useState({
    name: "",
    description: "",
    category: "",
    price: "",
  });
  const [file, setFile] = React.useState();
  const [img, setImg] = React.useState();

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.id]: e.target.value });
  };

  const onFileChange = (event) => {
    // Update the state
    setFile(event.target.files[0]);
    let image = URL.createObjectURL(event.target.files[0]);
    setImg(image);
  };

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <div className="photoSection ms-2 me-2">
        <h5 className=" mt-2 mb-0 photoCopy text-center">
          Add Photo and text for this card:
        </h5>

        <div class="container">
          <div class="row">
            <img src={img} className="edit-image col-sm ms-2" alt="" />
            <div class="col-sm">
              <input type="file" id="imgupload" onChange={onFileChange} />
              <label for="imgupload">
                {" "}
                <button
                  className="mt-1 mb-2 ms-2 btn-sm btn btn-info chooseimagebttn"
                  id="OpenImgUpload"
                >
                  choose
                </button>
              </label>

              {/* <button
                className="mt-1 mb-2 ms-2 btn-sm btn btn-danger uploadbttn"
                onClick={() => uploadImg(file, props.product)}
              >
                Upload!
              </button> */}
            </div>
            <div class="col-sm"> </div>
          </div>
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
              placeholder="Put name here"
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
              placeholder="Put description here"
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
              placeholder="Put category here"
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
              placeholder="Price"
              onChange={handleChange}
            />
          </div>
        </form>
        <button
          className="ms-2 me-2 mt-4 btn btn-danger"
          onClick={() => {
            createProduct(product).then((prod) => {
              // console.log(prod)
              uploadImg(file, prod).then(() => props.update());
            });
            props.onClose();
          }}
        >
          Confirm
        </button>

        <p className="ms-2 modalClose me-4 mt-4" onClick={props.onClose}>
          X CLOSE
        </p>
      </div>
      {/* old create */}
      {/* <div className="card-box mt-5 d-flex flex-column justify-items-center align-content-center admin-edit-card">
        <div className="card-thumbnail">
          <img src={img} className="img-fluid edit-image" alt="" />
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
              placeholder="Put name here"
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
              placeholder="Put description here"
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
              placeholder="Put category here"
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
              type="number"
              placeholder="Price dynamically placed here"
              onChange={handleChange}
            />
          </div>
        </form>
        <button
          className="mt-4 btn btn-danger"
          onClick={() => {
            createProduct(product).then((prod) => {
              console.log(prod);
              uploadImg(file, prod).then(() => props.update());
            });
            props.onClose();
          }}
        >
          Confirm
        </button>

        <p className="modalClose me-4 mt-4" onClick={props.onClose}>
          X CLOSE
        </p>
      </div> */}
    </Dialog>
  );
}
