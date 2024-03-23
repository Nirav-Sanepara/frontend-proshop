import React from "react";
import { Container, Row, Col, NavDropdown } from "react-bootstrap";

export default function TopNavBar() {
  return (
    <header>
      <Container>
        <Row>
          <Col md={8}>
            <p> Free Shipping On All India Orders Over </p>{" "}
          </Col>
          <Col>
            <NavDropdown
              style={{ marginRight: "0rem" }}
              title="USD"
              id="account"
              className="dropdown-button"
            >
              <div>
                <NavDropdown.Item href="/favouriteScreen">INR</NavDropdown.Item>
                <NavDropdown.Item href="/all-products">DOLLAR</NavDropdown.Item>
              </div>
            </NavDropdown>
          </Col>
          <Col>
            <NavDropdown
              // style={{ marginRight: "0rem" }}
              title="Language"
              id="account"
              className="dropdown-button"
            >
              <div>
                <NavDropdown.Item href="/favouriteScreen">INR</NavDropdown.Item>
                <NavDropdown.Item href="/all-products">DOLLAR</NavDropdown.Item>
              </div>
            </NavDropdown>
          </Col>
        </Row>
      </Container>
    </header>
  );
}
