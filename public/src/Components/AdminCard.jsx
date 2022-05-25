import "../Styles/admin-cards.css";
import { useStore } from "../Hooks/Store";
import curry from "../Assets/pexels-asit-naskar-9809033.jpeg";

export default function AdminCard(props) {
  const setModal = useStore((store) => store.setModal)
  return (
    <div className="container ">
      <div className="row">
        {/* side orders section header */}
        <div className="col-12">
          <h2 id="sideorders" className=" cardMenuHeader mt-4 mb-4 ms-4">
            SIDE ORDERS
          </h2>
          <a href="#*" class="btn btn-info ms-3 btn-sm">
            Edit Section header
          </a>
          <a
            href="#*"
            class="btn btn-info ms-3 btn-sm"
            onClick={() => {
              console.log("createProductDialog");
              setModal("EditCardModal");
            }}
          >
            add to menu
          </a>
        </div>
        {/* side orders cards */}
        <div className="col-md-6 col-lg-4">
          <div className="card-box ms-3 me-3">
            <div className="card-thumbnail">
              <button
                onClick={() => {
                  console.log("updateProductDialog");
                  setModal("EditCardModal");
                }}
                className="btn btn-danger mb-3"
              >
                Edit Card
              </button>
              <img src={curry} className="img-fluid" alt="" />
            </div>
            <h3>
              <a href="*" className="mt-4 text-danger">
                {props.product.name}
              </a>
            </h3>
            <p className="text-secondary">
              {props.product.description}
            </p>
            <h3 className="price text-danger">PRICE: {props.product.price}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
