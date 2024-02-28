import React, { useEffect, useState } from "react";
import { Col, Row, Image, ListGroup, Card, Button, Form } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Rating from "../componant/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetail } from "../Slices/productSlice";
import Message from "../componant/Message";
import Loader from "../componant/Loader";
import axios from "axios";
import { addToCart } from "../Slices/cartSlice";

const ProductScreen = ({ match }) => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.product.productDetail);
  const { loading, error, product } = productDetail;
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;
  const location = useLocation();
  const matchId = location.pathname.split("/")[2];
  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(listProductDetail(matchId));
  }, [dispatch, matchId]);

  const addCartHandler = async (userId, productId, quantity) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/users/addTocart`,
        {
          userId,
          productId,
          quantity,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(addToCart(response?.data?.product));
      navigate("/cart");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  if (!token) {
    navigate("/login");
    return null; 
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.image} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>{product.name}</h2>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>Description: {product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    onClick={() => addCartHandler(userInfo._id, matchId, qty)}
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
