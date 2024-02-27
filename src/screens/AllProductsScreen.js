import { React, useEffect, useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import { listProducts } from "../Slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Message from "../componant/Message";
import Loader from "../componant/Loader";
import { existedCartItem } from "../Slices/cartSlice";
import AllProductForm from "../componant/AllProductForm";

export default function AllProductsScreen() {
  const dispatch = useDispatch();
  const item = useSelector((state) => state.product.productList);
  const { loading, error, products } = item;

  useEffect(() => {
    dispatch(existedCartItem());
    dispatch(listProducts());
  }, [dispatch]);


  return (
    <Row>
      <Col>
        {loading ? (
          <Loader />
        ) : error && products.length === 0 ? (
          <Message>There is no product.</Message>
        ) : (
          <>
            <AllProductForm />
            
          </>
        )}
      </Col>
    </Row>
  );
}
