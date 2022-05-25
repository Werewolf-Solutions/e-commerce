import AdminCards from "../Components/AdminCards";
import AdminNavBar from "../Components/AdminNavBar";
import AdminOrders from "../Components/AdminOrders";
import Footer from "../Components/Footer";

const AdminMain = (props) => {
  return (
    <>
      <AdminNavBar />
      <AdminOrders orders={props.orders}/>
      <AdminCards />
      <Footer />
    </>
  );
};

export default AdminMain;
