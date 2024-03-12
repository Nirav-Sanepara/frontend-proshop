import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Rating from "../componant/Rating";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetail } from "../Slices/productSlice";
import Message from "../componant/Message";
import Loader from "../componant/Loader";
import axios from "axios";
import { addToCart, existedCartItem } from "../Slices/cartSlice";
import toast from "react-hot-toast";
import Avatar1 from "../componant/avatar/avatar-1.jpg";

const ProductScreen = ({ match }) => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.product.productDetail);
  const { loading, error, product } = productDetail;
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;
  const location = useLocation();
  const match_Id = location.pathname.split("/");
  const token = localStorage.getItem("token");

  useEffect(() => {
    // dispatch(existedCartItem())
    dispatch(listProductDetail(match_Id[2]));
  }, [match]);

  const addCartHandler = async (userId, productId, quantity, stock) => {
    console.log(
      "userId, productId, quantity, stock",
      userId,
      productId,
      quantity,
      stock
    );
    try {
      const token = localStorage.getItem("token");
      if (stock >= quantity) {
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
      } else {
        toast("Product Out Of Stock ", {
          style: {
            color: "red",
            background: "#f69697",
            border: "1px solid red",
          },
        });
      }
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

          <Col md={6}>
            <Row>
              <Col md={6}>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h2>{product.name}</h2>
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </ListGroup.Item>
                  <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
                  <ListGroup.Item>
                    Description: {product.description}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col md={6}>
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
                            {product.countInStock > 0
                              ? "In Stock"
                              : "Out of Stock"}
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
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </Form.Control>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    )}
                    <ListGroup.Item>
                      <Button
                        className="btn-block"
                        type="button"
                        onClick={() =>
                          addCartHandler(
                            userInfo._id,
                            match_Id[2],
                            qty,
                            product.countInStock
                          )
                        }
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h3> Top Reviews </h3>
                <Row>
                  <ListGroup variant="flush">
                    {product.reviews.map((review, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={2} className="ps-5">
                            <img
                              src={Avatar1}
                              className="rounded-circle"
                              alt=""
                              style={{ width: "50px", height: "50px" }} // Adjust the width and height as needed
                            />
                          </Col>
                          <Col>
                            {review.name}
                            <Rating className="ps-5" value={review?.rating} />
                            {review.comment}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
