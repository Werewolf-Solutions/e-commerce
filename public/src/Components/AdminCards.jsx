import "../Styles/admin-cards.css";
import curry from "../Assets/pexels-asit-naskar-9809033.jpeg";

const AdminCards = () => {
  return (
    <div className="container ">
      <div className="row">
        {/* side orders section header */}
        <div className="col-12">
          <h2 id="sideorders" className=" cardMenuHeader mt-4 mb-4 ms-4">
            SIDE ORDERS
          </h2>
          <a href="#*" class="btn btn-info ms-3 btn-sm">
            Edit Section
          </a>
        </div>
        {/* side orders cards */}
        <div className="col-md-6 col-lg-4">
          <div className="card-box">
            <div className="card-thumbnail">
              <a href="#*" class="btn btn-info mb-4 btn-sm">
                Edit Photo
              </a>
              <img src={curry} className="img-fluid" alt="" />
            </div>
            <h3>
              <a href="*" className="mt-4 text-danger">
                CHICKEN TIKKA
              </a>
              <a href="#*" class="btn btn-info ms-3 mt-4 btn-sm">
                Edit Title
              </a>
            </h3>
            <p className="text-secondary">
              Chicken tikka masala, dish consisting of marinated boneless
              chicken pieces that are cooked in a tandoor and then served in a
              subtly spiced tomato-cream sauce.
            </p>
            <a href="#*" class="btn btn-info mb-4 btn-sm">
              Edit Description 1
            </a>
            <p className="text-secondary">
              Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
              Garlic, Ginger paste, Lemon juice
            </p>
            <a href="#*" class="btn btn-info mb-4">
              Edit Description 2
            </a>
            <h3 className="price text-danger">PRICE: $4,021</h3>
            <a href="#*" class="btn btn-info mb-4 btn-sm">
              Edit Price
            </a>
          </div>
        </div>

        {/* main curry section header */}
        <div className="col-12">
          <h2 id="mains" className=" cardMenuHeader mt-4 mb-4 ms-4">
            CURRY MAIN DISHES
          </h2>
          <a href="#*" class="btn btn-info ms-3 btn-sm">
            Edit Section
          </a>
        </div>
        {/* curry cards */}
        <div className="col-md-6 col-lg-4">
          <div className="card-box">
            <div className="card-thumbnail">
              <a href="#*" class="btn btn-info mb-4 btn-sm">
                Edit Photo
              </a>
              <img src={curry} className="img-fluid" alt="" />
            </div>
            <h3>
              <a href="*" className="mt-4 text-danger">
                CHICKEN TIKKA
              </a>
              <a href="#*" class="btn btn-info ms-3 mt-4 btn-sm">
                Edit Title
              </a>
            </h3>
            <p className="text-secondary">
              Chicken tikka masala, dish consisting of marinated boneless
              chicken pieces that are cooked in a tandoor and then served in a
              subtly spiced tomato-cream sauce.
            </p>
            <a href="#*" class="btn btn-info mb-4 btn-sm">
              Edit Description 1
            </a>
            <p className="text-secondary">
              Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
              Garlic, Ginger paste, Lemon juice
            </p>
            <a href="#*" class="btn btn-info mb-4">
              Edit Description 2
            </a>
            <h3 className="price text-danger">PRICE: $4,021</h3>
            <a href="#*" class="btn btn-info mb-4 btn-sm">
              Edit Price
            </a>
          </div>
        </div>
        {/* desert section header */}
        <div className="col-12">
          <h2 id="deserts" className=" cardMenuHeader mt-4 mb-4 ms-4">
            DESERTS
          </h2>
          <a href="#*" class="btn btn-info ms-3 btn-sm">
            Edit Section
          </a>
        </div>
        {/* desert cards */}
        <div className="col-md-6 col-lg-4">
          <div className="card-box">
            <div className="card-thumbnail">
              <a href="#*" class="btn btn-info mb-4 btn-sm">
                Edit Photo
              </a>
              <img src={curry} className="img-fluid" alt="" />
            </div>
            <h3>
              <a href="*" className="mt-4 text-danger">
                CHICKEN TIKKA
              </a>
              <a href="#*" class="btn btn-info ms-3 mt-4 btn-sm">
                Edit Title
              </a>
            </h3>
            <p className="text-secondary">
              Chicken tikka masala, dish consisting of marinated boneless
              chicken pieces that are cooked in a tandoor and then served in a
              subtly spiced tomato-cream sauce.
            </p>
            <a href="#*" class="btn btn-info mb-4 btn-sm">
              Edit Description 1
            </a>
            <p className="text-secondary">
              Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
              Garlic, Ginger paste, Lemon juice
            </p>
            <a href="#*" class="btn btn-info mb-4">
              Edit Description 2
            </a>
            <h3 className="price text-danger">PRICE: $4,021</h3>
            <a href="#*" class="btn btn-info mb-4 btn-sm">
              Edit Price
            </a>
          </div>
        </div>
        {/* drinks section header */}
        <div className="col-12">
          <h2 id="drinks" className=" cardMenuHeader mt-4 mb-4 ms-4">
            DRINKS
          </h2>
          <a href="#*" class="btn btn-info ms-3 btn-sm">
            Edit Section
          </a>
        </div>
        {/* drinks cards */}
        <div className="col-md-6 col-lg-4">
          <div className="card-box">
            <div className="card-thumbnail">
              <a href="#*" class="btn btn-info mb-4 btn-sm">
                Edit Photo
              </a>
              <img src={curry} className="img-fluid" alt="" />
            </div>
            <h3>
              <a href="*" className="mt-4 text-danger">
                CHICKEN TIKKA
              </a>
              <a href="#*" class="btn btn-info ms-3 mt-4 btn-sm">
                Edit Title
              </a>
            </h3>
            <p className="text-secondary">
              Chicken tikka masala, dish consisting of marinated boneless
              chicken pieces that are cooked in a tandoor and then served in a
              subtly spiced tomato-cream sauce.
            </p>
            <a href="#*" class="btn btn-info mb-4 btn-sm">
              Edit Description 1
            </a>
            <p className="text-secondary">
              Main ingredients: Chicken, Chili pepper, Yoghurt, Garlic sauce,
              Garlic, Ginger paste, Lemon juice
            </p>
            <a href="#*" class="btn btn-info mb-4">
              Edit Description 2
            </a>
            <h3 className="price text-danger">PRICE: $4,021</h3>
            <a href="#*" class="btn btn-info mb-4 btn-sm">
              Edit Price
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCards;
