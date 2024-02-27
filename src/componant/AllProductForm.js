import React, { useMemo } from "react";
import { Row, Col, ListGroup, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { listProductRemove } from "../actions/productOperationActions";
import UpdateModal from "./UpdateModal";
import FilterOffCanvas from "../componant/FilterOffCanvas"

export default function AllProductForm() {
  const dispatch = useDispatch();

  const item = useSelector((state) => 
   state.product.productList
  );

  const { products } = item;

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const removeFromProductList = (id) => {
    dispatch(listProductRemove(id, products));
  };

  const [selectedProduct, setSelectedProduct] = useState(null);

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
                handleShow();
                setSelectedProduct({});
              }}
            >
              Add Product
            </Button>
          </Col>
        </Row>

      <ListGroup variant="flush">
        {products?.map((entity) => (
          <ListGroup.Item key={entity._id}>
            {console.log("rerendring", entity)}
            <Row>
              <Col md={1}>
                <Image src={entity.image} alt={entity.name} fluid rounded />
              </Col>
              <Col md={7} className="p-3">
                <Link to={`/product/${entity.product}`}>{entity.name}</Link>
              </Col>
              <Col md={2} className="p-3">
                {entity.price}
              </Col>
              <Col md={1}>
                <Button
                  type="button"
                  variant="light"
                  onClick={() => {
                    handleShow();
                    setSelectedProduct(entity);
                  }}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </Button>
              </Col>
              <Col md={1}>
                <Button
                  type="button"
                  variant="light"
                  onClick={() => removeFromProductList(entity._id)}
                >
                  <i className="fas fa-trash"></i>
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
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
