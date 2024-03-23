import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, ListGroup, Image, Row  } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../componant/Message";
import Loader from "../componant/Loader";
import { getOrderDetails } from "../Slices/OrderSlice";
import OrderModalComponent from "../componant/order/OrderModalComponent";

const OrderScreen = () => {
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.order.orderDetails);
  const { error, loading, orders } = orderDetails;
  const userInfo = useSelector((state) => state.user.userDetails.userInfo);

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const [feedbackIcons, setFeedbackIcons] = useState({
    bad: false,
    dissatisfied: false,
    satisfied: false,
    satisfiedAlt: false,
    verySatisfied: false,
  });

  useEffect(() => {
    dispatch(getOrderDetails(userInfo._id));
  }, []);

  const openModal = (content) => {
    setModalContent(content);
    setShowModal(true);
  };

  // console.log(orders, " the order inside thing s ");
  // // console.log(orders[0].createdAt, " date ")
  console.log(modalContent, " the content inside modal ");
  var orderDate = new Date(Date.parse(modalContent.orderedDate));

  function getWeekDay(date) {
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[date.getDay()];
  }

  function getYearMonth(date) {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[date.getMonth()];
  }

  var day = getWeekDay(orderDate);
  var date = orderDate.getDate();
  var month = getYearMonth(orderDate);
  var year = orderDate.getFullYear();

  var updateDate = new Date(Date.parse(modalContent.updatedDatee));

  var updatedDay = getWeekDay(updateDate);
  var updatedDate = updateDate.getDate();
  var updatedMonth = getYearMonth(updateDate);
  var updatedYear = updateDate.getFullYear();

  const handleFeedbackClick = async(icon) => {
    const resetIcons = {
      bad: false,
      dissatisfied: false,
      satisfied: false,
      satisfiedAlt: false,
      verySatisfied: false,
    };

    const updatedFeedbackIcons = { ...resetIcons, [icon]: true };
    setFeedbackIcons(updatedFeedbackIcons);
  
  };

  const [activeStep, setActiveStep] = React.useState(0);
  const [delivery, setDelivered] = useState(false);

  if (modalContent?.delivery) {
    setDelivered(true);
  }

  useEffect(() => {
    if (orders && orders.length > 0) {
      const dispatchDate = new Date(modalContent.orderedDate);
      const deliveryStatus = modalContent?.delivery;
      const currentDate = new Date();

      if (currentDate > dispatchDate) {
        setActiveStep(1);
      }

      if (deliveryStatus) {
        setActiveStep(2);
      }
    }
  }, [orders]);

  const shippingAddress = JSON.parse(localStorage.getItem("shippingAddress"));

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <Row>
        <Col>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2> Order Details</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress?.address},
                {shippingAddress?.city},
                {shippingAddress?.postalCode},
                {shippingAddress?.country},
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {orders?.length === 0 ? (
                <Message>Your order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {orders.map((item,index) => {
                    return (
                      <ListGroup.Item key={index} >
                        <Row>
                          <Col md={8}>
                            {item.orderItems !== undefined &&
                              item.orderItems.map((ele, ind) => (
                                <Row  onClick={() =>
                                  openModal({
                                    name: ele.name,
                                    shippingAddress:
                                    item?.shippingAddress,
                                    orderId: item?._id,
                                    orderedDate: item?.createdAt,
                                    updatedDatee: item?.updatedAt,
                                    delivery: item?.isDelivered, 
                                    productId: ele?._id,  })
                                }>
                                  <Col md={2}>
                                    <Image
                                      src={ele.image}
                                      alt={ele.name}
                                      fluid
                                      rounded
                                    />
                                  </Col>
                                  <Col md={10}>
                                    <Link
                                      to="#"
                                     
                                    >
                                      {ele.name}
                                    </Link>
                                  </Col>
                                </Row>
                              ))}
                          </Col>
                          <Col>{item.paymentMethod}</Col>
                          <Col>${item.totalPrice}</Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <OrderModalComponent
        showModal={showModal}
        setShowModal={setShowModal}
        modalContent={modalContent}
        userInfo={userInfo}
        handleFeedbackClick={handleFeedbackClick}
        feedbackIcons={feedbackIcons}
        activeStep={activeStep}
        delivery={delivery}
        date = {date}
        month = {month}
        day = {day}
        year = {year}
        updatedDate={updatedDate}
        updatedDay={updatedDay}
        updatedMonth={updatedMonth}
        updatedYear={updatedYear}
      />
    
    </div>
  );
};

export default OrderScreen;
