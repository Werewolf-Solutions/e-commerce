import React from "react";
import { useStore } from "../Hooks/Store";
import "../Styles/edit-card-modal-styles.css";
import curry from "../Assets/pexels-asit-naskar-9809033.jpeg";

function EditCardModal() {
  const setModal = useStore((store) => store.setModal);

  return (
    <div className="modalContainer">
      <div className="card-box mt-5 d-flex flex-column justify-items-center align-content-center admin-edit-card">
        <div className="card-thumbnail">
          <img src={curry} className="img-fluid edit-image" alt="" />
          <button className="mt-4 ms-4 btn btn-info btn-sm changePhotoBtn">
            Change Photo:
            <input
              className="ms-2 me-2 chooseFile"
              type="file"
              name="my_file"
              id="my-file"
            />
          </button>
        </div>
        <form>
          <div class="form-group">
            <label className="mt-3 mb-2 text-danger inputDish" for="DishTitle">
              Dish title
            </label>
            <input
              type="email"
              class="form-control"
              id="DishTitle"
              aria-describedby="emailHelp"
              placeholder="Dish title dynamically placed here"
            />
          </div>

          <div class="form-group">
            <label className="mt-2 mb-2 text-danger" for="DishDesc">
              Dish description
            </label>
            <input
              type="email"
              class="form-control"
              id="DishDesc"
              aria-describedby="emailHelp"
              placeholder="Dish description dynamically placed here"
            />
          </div>

          <div class="form-group">
            <label className="mt-2 mb-2 text-danger" for="Ingredients">
              Ingredients
            </label>
            <input
              type="email"
              class="form-control ingredients"
              id="Ingredients"
              aria-describedby="emailHelp"
              placeholder="Ingredients dynamically placed here"
            />
          </div>

          <div class="form-group">
            <label className="mt-2 mb-2 text-danger" for="Price">
              Price
            </label>
            <input
              type="email"
              class="form-control"
              id="Price"
              aria-describedby="emailHelp"
              placeholder="Price dynamically placed here"
            />
          </div>
        </form>
        <button className="mt-4 btn btn-danger">
          Save to update your menu
        </button>

        <p
          className="modalClose me-4 mt-4"
          onClick={() => {
            setModal("");
          }}
        >
          X CLOSE
        </p>
      </div>
    </div>
  );
}

export default EditCardModal;
