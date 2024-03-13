import React, { useState } from "react";
import { Button, Row, Modal, Form } from "react-bootstrap";
import "./reviewModal.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import FeedbackIcons from "./FeedbackIcons";

export default function ReviewModal({ show, onHide, modalContent }) {
  const [review, setReview] = useState("");
  const [rate , setRate] = useState("");

  const pull_data = (data) => [
    setRate(data)
  ];

  //console.log(getRating(),'ratinggggggggggggggggggggggggggg')

  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;

  const handleReviewSubmit = async () => {
    console.log("Submitting review:", review);

    try {
      const { data } = await axios.patch(
        `${process.env.REACT_APP_API_BASE_PATH}/api/products/addReview/${modalContent.productId}`,
        {
          name: userInfo.name,
          rating: rate,
          comment: review,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      onHide();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="reviewForm">
          <Form.Label>Enter your review:</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </Form.Group>
        <FeedbackIcons
          handleFeedbackClick={pull_data}
          modalContent={modalContent}
          // Updated prop name here
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleReviewSubmit}>
          Submit Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
