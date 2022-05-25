import "../Styles/admin-cards.css";
import { useStore } from "../Hooks/Store";
import curry from "../Assets/pexels-asit-naskar-9809033.jpeg";

const AdminCards = () => {
  const setModal = useStore((store) => store.setModal);
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
              console.log("edit button clicked test");
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
                  console.log("edit button clicked test");
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
                CHICKEN TIKKA
              </a>
            </h3>
            <p className="text-secondary">
              Chicken tikka masala, dish consisting of marinated boneless
              chicken pieces that are cooked in a tandoor and then served in a
              subtly spiced tomato-cream sauce.
            </p>

            <p className="text-secondary">
              Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
              Garlic, Ginger paste, Lemon juice
            </p>

            <h3 className="price text-danger">PRICE: $4,021</h3>
          </div>
        </div>
        {/* main curry section header */}
        <div className="col-12">
          <h2 id="mains" className=" cardMenuHeader mt-4 mb-4 ms-4">
            CURRY MAIN DISHES
          </h2>
          <a href="#*" class="btn btn-info ms-3 btn-sm">
            Edit Section header
          </a>
          <a
            href="#*"
            class="btn btn-info ms-3 btn-sm"
            onClick={() => {
              console.log("edit button clicked test");
              setModal("EditCardModal");
            }}
          >
            add to menu
          </a>
        </div>
        {/* curry cards */}
        <div className="col-md-6 col-lg-4">
          <div className="card-box ms-3 me-3">
            <div className="card-thumbnail">
              <button
                onClick={() => {
                  console.log("edit button clicked test");
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
                CHICKEN TIKKA
              </a>
            </h3>
            <p className="text-secondary">
              Chicken tikka masala, dish consisting of marinated boneless
              chicken pieces that are cooked in a tandoor and then served in a
              subtly spiced tomato-cream sauce.
            </p>

            <p className="text-secondary">
              Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
              Garlic, Ginger paste, Lemon juice
            </p>

            <h3 className="price text-danger">PRICE: $4,021</h3>
          </div>
        </div>
        {/* desert section header */}
        <div className="col-12">
          <h2 id="deserts" className=" cardMenuHeader mt-4 mb-4 ms-4">
            DESERTS
          </h2>
          <a href="#*" class="btn btn-info ms-3 btn-sm">
            Edit Section header
          </a>
          <a
            href="#*"
            class="btn btn-info ms-3 btn-sm"
            onClick={() => {
              console.log("edit button clicked test");
              setModal("EditCardModal");
            }}
          >
            add to menu
          </a>
        </div>
        {/* desert cards */}
        <div className="col-md-6 col-lg-4">
          <div className="card-box ms-3 me-3">
            <div className="card-thumbnail">
              <button
                onClick={() => {
                  console.log("edit button clicked test");
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
                CHICKEN TIKKA
              </a>
            </h3>
            <p className="text-secondary">
              Chicken tikka masala, dish consisting of marinated boneless
              chicken pieces that are cooked in a tandoor and then served in a
              subtly spiced tomato-cream sauce.
            </p>

            <p className="text-secondary">
              Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
              Garlic, Ginger paste, Lemon juice
            </p>

            <h3 className="price text-danger">PRICE: $4,021</h3>
          </div>
        </div>
        {/* drinks section header */}
        <div className="col-12">
          <h2 id="drinks" className=" cardMenuHeader mt-4 mb-4 ms-4">
            DRINKS
          </h2>
          <a href="#*" class="btn btn-info ms-3 btn-sm">
            Edit Section header
          </a>
          <a
            href="#*"
            class="btn btn-info ms-3 btn-sm"
            onClick={() => {
              console.log("edit button clicked test");
              setModal("EditCardModal");
            }}
          >
            add to menu
          </a>
        </div>
        {/* drinks cards */}
        <div className="col-md-6 col-lg-4">
          <div className="card-box ms-3 me-3">
            <div className="card-thumbnail">
              <button
                onClick={() => {
                  console.log("edit button clicked test");
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
                CHICKEN TIKKA
              </a>
            </h3>
            <p className="text-secondary">
              Chicken tikka masala, dish consisting of marinated boneless
              chicken pieces that are cooked in a tandoor and then served in a
              subtly spiced tomato-cream sauce.
            </p>

            <p className="text-secondary">
              Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
              Garlic, Ginger paste, Lemon juice
            </p>

            <h3 className="price text-danger">PRICE: $4,021</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCards;
