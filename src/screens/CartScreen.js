import {
  Col,
  ListGroup,
  Row,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  existedCartItem,
  removeFromCart,
  updateCart,
} from "../Slices/cartSlice";
import Message from "../componant/Message";
import "../scss/IncrementDecrementBtn.scss";
import axios from "axios";
import { useEffect } from "react";


const CartScreen = ({ history }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(existedCartItem());
  }, [dispatch]);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart.cartList;
  const navigate = useNavigate();
  useEffect(() => {
    // Initialize quantities state with quantities from cartItems
    const initialQuantities = {};
    cartItems.forEach((item) => {
      initialQuantities[item._id] = item.addedQtyInCart;
    });
  }, [cartItems]);

  const deleteFromCart = async (id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`,
        {
          addedInCart: false,
          addedQtyInCart: 0,
        }
      );
      dispatch(removeFromCart({ productId: id }));
    } catch (error) {
      console.log("Error in deleteFromCart", error);
    }
  };
  const handleQtyChange = async (quantity, id) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`,
        {
          addedQtyInCart: quantity,
        }
      );
      dispatch(updateCart(response?.data?.product));
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty<Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>{item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      style={{ padding: "inherit" }}
                      as="select"
                      value={item.addedQtyInCart}
                      onChange={(e) =>
                        handleQtyChange(Number(e.target.value), item._id)
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => deleteFromCart(item._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>
                Subtotal (
                {cartItems.reduce((acc, item) => acc + item.addedQtyInCart, 0)})
                items
              </h2>
              {cartItems
                .reduce(
                  (acc, item) => acc + item.addedQtyInCart * item.price,
                  0
                )
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItems.length === 0}
               
              >
                Proceed to Check Out
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};
export default CartScreen;