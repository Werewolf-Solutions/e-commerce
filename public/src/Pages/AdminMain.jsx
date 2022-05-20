import AdminCards from "../Components/AdminCards";
import AdminNavBar from "../Components/AdminNavBar";
import AdminOrders from "../Components/AdminOrders";
import Footer from "../Components/Footer";

const AdminMain = () => {
  return (
    <>
      <AdminNavBar />
      <AdminOrders />
      <AdminCards />
      <Footer />
    </>
  );
};

export default AdminMain;
