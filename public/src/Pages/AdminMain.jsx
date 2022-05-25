import AdminCard from "../Components/AdminCard"
import AdminOrder from "../Components/AdminOrder"

export default function AdminMain(props) {
  return (
    <>
    {props.orders
    ?
      props.orders.map(order => (
        <AdminOrder
          order={order}
          update={props.update}
        />
      ))
    : 'loading'
    }
      {props.products
      ? 
        props.products.map(product => (
          <AdminCard
            product={product}
            update={props.update}
          />))
      : 'loading'
      }
    </>
  );
};
