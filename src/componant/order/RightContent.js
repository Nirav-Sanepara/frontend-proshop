// RightContent.js
import React from "react";
import { Col, Row } from "react-bootstrap";
import FeedbackIcons from "./FeedbackIcons";
import TrackingHistory from "./TrackingHistory";

const RightContent = ({
  modalContent,
  handleFeedbackClick,
  feedbackIcons,
  activeStep,
  delivery,
  day,
  date,
  month,
  year,
  updatedDate,
  updatedDay,
  updatedMonth,
  updatedYear,
}) => {
  return (
    
    <div>
      <Row className="p-4">
        <span className="bold pt-3" style={{ fontSize: "0.7rem" }}>
          Tracking No. :
        </span>
        <span className="lead" style={{ fontSize: "1.1rem" }}>
          #{modalContent?.orderId}
        </span>
      </Row>
      <hr></hr>
      <Row className="p-4">
        <Col md={7}>
          <span className="bold pt-3" style={{ fontSize: "0.8rem" }}>
            your order is
          </span>
          <br></br>
          <span className="lead" style={{ fontSize: "2rem" }}>
            {delivery ? "Delivery" : "Dispatched"}
          </span>
          <br></br>
          <span className="lead" style={{ fontSize: "0.8rem" }}>
            as on {date} {month} {year}, {day}
          </span>
          <br></br>
          <span className="lead py-2" style={{ fontSize: "0.9rem" }}>
            Last Updated on {updatedDate} {updatedMonth} {updatedYear} ,{" "}
            {updatedDay}
          </span>
        </Col>
        <Col md={5} style={{ backgroundColor: "#F5F5F5" }} className="p-3">
          <div>
            <a href="/" style={{ fontSize: "0.8rem" }}>
              <i className="fa fa-cart-arrow-down pe-2" aria-hidden="true"></i>{" "}
              Return Order{" "}
            </a>
            <br></br>
            <a href="/" style={{ fontSize: "0.8rem" }}>
              <i className="fa fa-exchange pe-2" aria-hidden="true"></i>{" "}
              Exchange Item{" "}
            </a>
            <hr></hr>
            <span style={{ fontSize: "0.7rem" }}>For Delivery Queries</span>
            <br></br>
            <span style={{ fontSize: "0.7rem" }}>
              <a href="/" className="link-primary">
                Contact Us
              </a>
            </span>
          </div>
        </Col>
      </Row>

      <hr />
      <Row className="px-3 pt-3">
        <span className="lead" style={{ fontSize: "0.9rem" }}>
          Tracking History
        </span>
        <TrackingHistory activeStep={activeStep} />
      </Row>
    </div>
  );
};

export default RightContent;
