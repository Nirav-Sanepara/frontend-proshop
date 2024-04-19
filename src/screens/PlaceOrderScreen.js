import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Col, ListGroup, Image, Card, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../componant/Message";
import CheckOutSteps from "../componant/CheckOutSteps";
import { cartlist, removeFromCart } from "../Slices/cartSlice";
import toast from "react-hot-toast";
import { removeProductFromCartHandler } from "../service/product";
import { completeOrderHandler, createOrderHandler } from "../service/order";
const PlaceOrderScreen = ({ history }) => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userDetails.userInfo);
  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));
  const paymentMethod = JSON.parse(localStorage.getItem("paymentMethod"));
  const orderedProduct = useSelector((state) => state.cart.cartList);
  const { cartItems } = orderedProduct;
  const orderDetails = useSelector((state) => state.order.orderDetails);
  const { error, loading, orders } = orderDetails;
  const [orderID, setOrderID] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    // dispatch(existedCartItem());
    dispatch(cartlist());
  }, [dispatch]);
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };
  const itemsPrice = addDecimal(
    cartItems.reduce(
      (acc, item) => acc + item?.product?.price * item?.quantity,
      0
    )
  );
  const shippingPrice = addDecimal(itemsPrice > 100 ? 100 : 0);
  const taxPrice = addDecimal(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice =
    Number(itemsPrice) + Number(shippingPrice) + Number(taxPrice);
  const deleteFromCart = async (productId) => {
    console.log(productId, " the quantity to deduct ; ");
    try {
      const token = localStorage.getItem("token");
      const response = await removeProductFromCartHandler( { userId: userInfo._id, productId })
      dispatch(removeFromCart({ productId: productId }));
      console.log(cartItems.quantity, " the quantity to deduct ; ");
    } catch (error) {
      console.log("Error coming from place order screen :", error);
    }
  };
  const dataa = [];
  const productData = cartItems.filter((ele) => {
    dataa.push({ ...ele.product, quantity: ele.quantity });
    return ele.product;
  });
  const placeOrderHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const order = await completeOrderHandler({
        cartItems: dataa,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      })
      cartItems.forEach(async (item) => {
        deleteFromCart(item?.product?._id);
      });
      toast(" Products ordered successfully ");
        navigate(`/order`);
    } catch (error) {
      toast(" Error in placing ordering ");
      console.log(" error ", error);
    }
  };
  const createOrder = async () => {
    const token = localStorage.getItem("token");
    console.log("token", token);
    try {
      const response = await createOrderHandler(totalPrice)
      console.log("response from pay", response);
      setOrderID(response.data.order_id);
    } catch (error) {
      console.error(error);
    }
  };
  const handlePayment = async () => {
    if (orderID) {
      const options = {
        key: "rzp_test_SKCq7lMIkCvIWp",
        amount: totalPrice * 100,
        currency: "INR",
        name: "stellare bijoux",
        description: "Test Transaction",
        image: "",
        order_id: orderID,
        prefill: {
          name: "",
          email: "",
          contact: "",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#454545",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    }
  };
  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shopping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress && (
                  <div>
                    {shippingAddress.address}, {shippingAddress.city},
                    {shippingAddress.postalCode}, {shippingAddress.country}
                  </div>
                )}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment</h2>
              <p>
                <strong>Method:</strong>
                {paymentMethod && paymentMethod}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cartItems.map((item) => {
                    return (
                      <ListGroup.Item key={item?.product?._id}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item?.product?.image}
                              alt={item?.product?.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item?.product?.name}
                            </Link>
                          </Col>
                          <Col>
                            {item?.quantity} x {item?.product?.price} = $
                            {(item?.quantity * item?.product?.price).toFixed(2)}
                          </Col>
                          <Col>
                            <Button
                              type="button"
                              variant="light"
                              onClick={() => {
                                deleteFromCart(item?.product?._id);
                              }}
                            >
                              <i className="fas fa-trash"></i>
                            </Button>
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <hr />
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                {error && <Message variant="danger">{error}</Message>}
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems === 0}
                  onClick={() => {
                    placeOrderHandler();
                  }}
                >
                  Place Order
                </Button>
                <Button
                  type="button"
                  onClick={createOrder}
                  className="mt-2 btn-block"
                >
                  Create Order
                </Button>
                {orderID && (
                  <Button
                    type="button"
                    onClick={handlePayment}
                    className="mt-2 btn-block"
                  >
                    Proceed to Payment
                  </Button>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default PlaceOrderScreen;