import AdminCards from "../Components/AdminCards";
import AdminOrders from "../Components/AdminOrders";

const AdminMain = (props) => {
  return (
    <>
      <AdminOrders
        orders={props.orders}
        update={props.update}
      />
      <AdminCards
        products={props.products}
        update={props.update}
      />
    </>
  );
};

export default AdminMain;
