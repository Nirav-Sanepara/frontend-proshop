// AllProductForm.js
import React, { useState } from "react";
import { Row, Col, ListGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { listProductRemove } from "../actions/productOperationActions";
import UpdateModal from "./UpdateModal";
import FilterOffCanvas from "../componant/FilterOffCanvas";
import ProductItem from "./AllProductmicro";
export default function AllProductForm() {
  
  
  const dispatch = useDispatch();
  

  const products = useSelector((state) => state.product.productList.products);

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleClose = () => setShowModal(false);
  const handleShow = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const removeFromProductList = (id) => {
    dispatch(listProductRemove(id, products));
  };

  return (
    <div>
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
                  handleShow({});
                }}
              >
                Add Product
              </Button>
            </Col>
          </Row>

          <ListGroup variant="flush">
            {products.map((entity) => (
              <ProductItem
                key={entity._id}
                entity={entity}
                handleShow={handleShow}
                removeFromProductList={removeFromProductList}
              />
            ))}
          </ListGroup>
        </Col>
      </Row>
      <UpdateModal
        show={showModal}
        handleClose={handleClose}
        product={selectedProduct}
      />
    </div>
  );
}
