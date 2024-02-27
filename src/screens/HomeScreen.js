import { React, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import Product from "../componant/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Slices/productSlice";
import Loader from "../componant/Loader";
import Message from "../componant/Message";
import {existedCartItem } from "../Slices/cartSlice";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  const { loading, error } = productList;
  const products = productList.products;
  useEffect(() => {
    dispatch(listProducts());
    dispatch(existedCartItem());
  }, [dispatch]);

 
  return (
    <>
      <h1>latest products</h1>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {products.map((pd) => (
            <Col key={pd._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={pd} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};
export default HomeScreen;
