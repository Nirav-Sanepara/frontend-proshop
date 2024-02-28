import React from 'react'
import { Row, Col, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useDispatch ,useSelector} from 'react-redux';
import { listProductRemove } from "../actions/productOperationActions";


export default function AllProductmicro({entity})  {
  
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.productList.products);


    const removeFromProductList = (id) => {
        dispatch(listProductRemove(id, products));
      };
      const [showModal, setShowModal] = useState(false);
      const [selectedProduct, setSelectedProduct] = useState(null);
    
      const handleClose = () => setShowModal(false);
      const handleShow = (product) => {
        setSelectedProduct(product);
        setShowModal(true);
      };    
    return (
      <div>
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
              handleShow(entity);
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
      </div>
    )
  }
