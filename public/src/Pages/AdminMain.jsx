import React from 'react'
import AdminCard from "../Components/Admin/AdminCard"
import AdminOrder from "../Components/Admin/AdminOrder"
import CreateProductDialog from '../Components/Admin/CreateProductDialog'

export default function AdminMain(props) {

  const [createProductDialog, setCreateProductDialog] = React.useState(false)
  const [selected, setSelected] = React.useState('products')

  const handleCreateProductDialog = () => {
    setCreateProductDialog(!createProductDialog)
  }


  return (
    <>
      <CreateProductDialog
        open={createProductDialog}
        onClose={handleCreateProductDialog}
        product={props.product}
        update={props.update}
      />
      {props.orders
      ?
        // props.orders.map(order => (
        //   <AdminOrder
        //     order={order}
        //     update={props.update}
        //   />
        // ))
        // {props.order.accepted ? 'accepted orders' : null}
        <AdminOrder
          order={props.orders[0]}
          update={props.update}
        />
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
