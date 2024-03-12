import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import {
  MoodBad as MoodBadIcon,
  SentimentDissatisfied as SentimentDissatisfiedIcon,
  SentimentSatisfied as SentimentSatisfiedIcon,
  SentimentSatisfiedAlt as SentimentSatisfiedAltIcon,
  SentimentVerySatisfied as SentimentVerySatisfiedIcon,
} from "@mui/icons-material";

const FeedbackIcons = ({ handleFeedbackClick }) => {
  const [rating, setRating] = useState(null);

  const handleRatingClick = (number) => {
    setRating(number);
    handleFeedbackClick(number);
  };

  return (
    <div>
      <Row className="me-5 mt-2">
        <Col md={1}>
          <MoodBadIcon
            fontSize="large"
            style={{ fill: rating === 1 ? "black" : "grey" }}
            onClick={() => handleRatingClick(1)}
          />
          <span className="lead ps-2" style={{ fontSize: "0.7rem" }}>
            Bad
          </span>
        </Col>
        <Col md={1}>
          <SentimentDissatisfiedIcon
            fontSize="large"
            style={{ fill: rating === 2 ? "black" : "grey" }}
            onClick={() => handleRatingClick(2)}
          />
          <span className="lead ps-2" style={{ fontSize: "0.7rem" }}>
            Ok
          </span>
        </Col>
        <Col md={1}>
          <SentimentSatisfiedIcon
            fontSize="large"
            style={{ fill: rating === 3 ? "black" : "grey" }}
            onClick={() => handleRatingClick(3)}
          />
          <span className="lead ps-1" style={{ fontSize: "0.7rem" }}>
            Avg
          </span>
        </Col>
        <Col md={1}>
          <SentimentSatisfiedAltIcon
            fontSize="large"
            style={{ fill: rating === 4 ? "black" : "grey" }}
            onClick={() => handleRatingClick(4)}
          />
          <span className="lead ps-1" style={{ fontSize: "0.7rem" }}>
            Good
          </span>
        </Col>
        <Col md={1}>
          <SentimentVerySatisfiedIcon
            fontSize="large"
            style={{ fill: rating === 5 ? "black" : "grey" }}
            onClick={() => handleRatingClick(5)}
          />
          <span className="lead ps-1" style={{ fontSize: "0.7rem" }}>
            Best
          </span>
        </Col>
      </Row>
    </div>
  );
};

export default FeedbackIcons;
