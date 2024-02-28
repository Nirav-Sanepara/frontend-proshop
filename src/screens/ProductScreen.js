import { React, useEffect, useState } from "react";
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
import { addToCart } from "../Slices/cartSlice";

const ProductScreen = ({ match }) => {
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetail = useSelector((state) => state.product.productDetail);
  const productList = useSelector((state) => state.product.productList);
  const { loading, error } = productDetail;
  const product = productDetail.product;
  const products = productList.products;

  const location = useLocation();
  const match_id = location.pathname.split("/");
  useEffect(() => {
    dispatch(listProductDetail(match_id[2]));
  }, [match]);

  const addCartHandler = async (productId) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_PATH}/api/products/${productId}`,
        {
          addedInCart: true,
          addedQtyInCart: qty,
        }
        );
        {console.log("fdhf",response)}
      navigate(`/cart`);
      dispatch(addToCart(response?.data?.product));
    } catch (error) {
      console.log("::::::::: error ", error);
    }
  };

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
              <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description : ${product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <Row>
                    <Col>price :</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>status :</Col>
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
                    onClick={() => addCartHandler(match_id[2])}
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
