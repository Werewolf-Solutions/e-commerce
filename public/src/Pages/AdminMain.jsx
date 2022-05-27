import React from 'react'
import AdminCard from "../Components/Admin/AdminCard"
import AdminOrder from "../Components/Admin/AdminOrder"
import CreateProductDialog from '../Components/Admin/CreateProductDialog'
import AcceptedOrder from '../Components/Orders/AcceptedOrder'
import ReadyOrder from '../Components/Orders/ReadyOrder'

export default function AdminMain(props) {

  const [createProductDialog, setCreateProductDialog] = React.useState(false)

  const handleCreateProductDialog = () => {
    setCreateProductDialog(!createProductDialog)
  }

  if (props.orders) {
    props.orders.forEach(order => console.log(!order.completed 
      && order.payment_intent.status == 'succeeded'
      && order.payment_intent.status != 'refunded'))
  }

  return (
    <>
      <CreateProductDialog
        open={createProductDialog}
        onClose={handleCreateProductDialog}
        product={props.product}
        update={props.update}
      />
      {props.selected === 'orders'
      ?
        props.orders
        ?
          props.orders.map(order => (
            order.accepted
            && !order.ready
            && !order.completed
            && order.payment_intent.status != 'refunded'
            ?
              // orders in preparation || middle column
              <AcceptedOrder
                order={order}
                update={props.update}
              />
            : order.ready
              && !order.completed
              && order.payment_intent.status != 'refunded'
              ?
                // orders ready to be colected or delivered || last column
                <ReadyOrder
                  order={order}
                  update={props.update}
                />
                // orders in - paid or pay at pick up || first column
              : !order.completed 
                && order.payment_intent.status == 'succeeded'
                && order.payment_intent.status != 'refunded'
                ?
                  <AdminOrder
                    order={order}
                    update={props.update}
                  />
                : null
          ))
        : 'loading'
      :
        props.products
        ? 
          props.products.map(product => (
            <AdminCard
              product={product}
              update={props.update}
            />))
        : 'loading'
      }
      <a
        href="#*"
        class="btn btn-info ms-3 btn-sm"
        onClick={() => {
          console.log("createProductDialog");
          handleCreateProductDialog()
        }}
      >
        create product
      </a>
    </>
  );
};
