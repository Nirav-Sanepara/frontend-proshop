import React, { useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { listProducts } from "../Slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Message from "../componant/Message";
import Loader from "../componant/Loader";
import FilterOffCanvas from "../componant/FilterOffCanvas";
import { cartlist } from "../Slices/cartSlice";
import AllProductForm from "../componant/AllProductForm";
import UpdateModal from "../componant/UpdateModal";

const AllProductsScreen = () => {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.product.productList);
  const [addbtn, setAddBtn] = useState(false);
  const { loading, error, products } = item;

  const cartItems = useSelector((state) => state.cart.cartList.cartItems);

  useEffect(() => {
    // dispatch(existedCartItem());
    // dispatch(cartlist());
    dispatch(listProducts());
  }, [dispatch]);

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  return (
    <Row>
      <Col>
        <Row className="align-items-center ">
          <Col md={4}>
            <FilterOffCanvas />
          </Col>
          <Col md={4}>
            <h1>All Products</h1>
          </Col>
          <Col md={4}>
            <Button
              type="button"
              variant="dark"
              className="m-2 border border-light float-right"
              onClick={() => {
                handleShow();
                setAddBtn(true);
                setSelectedProduct({});
              }}
            >
              Add Product
            </Button>
          </Col>
        </Row>

        {loading ? (
          <Loader />
        ) : error && products.length === 0 ? (
          <Message>There is no product.</Message>
        ) : (
          <div>
            <AllProductForm />
          </div>
        )}
        <UpdateModal
          addBtn={addbtn}
          show={showModal}
          handleClose={handleClose}
        />
      </Col>
    </Row>
  );
};

export default React.memo(AllProductsScreen);
