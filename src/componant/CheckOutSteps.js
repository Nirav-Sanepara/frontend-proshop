import React, { useEffect } from "react";
import { Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loggedUserDetails } from "../Slices/userSlice";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    dispatch(loggedUserDetails());
  }, [dispatch]);

  useEffect(() => {
    if (step2) {
      setActiveStep(0);
    }
    if (step3) {
      setActiveStep(1);
    }
  }, []);

  return (
    <Stepper orientation="horizontal" activeStep={activeStep}>
      <Step key={0}  sx={{color:"black"}}>
        <StepLabel>
          {userInfo && Object.keys(userInfo).length > 0 && (
            <Nav.Item className="me-0">
              {step1 ? (
                <Nav.Link href="/shipping" className="me-0">
                  Shipping
                </Nav.Link>
              ) : (
                <Nav.Link href="/login" className="me-0">
                  Sign In
                </Nav.Link>
              )}
            </Nav.Item>
          )}
        </StepLabel>
      </Step>
      <Step key={1}>
        <StepLabel>
          <Nav>
            <Nav.Item className="me-0">
              {step2 ? (
                <Nav.Link
                  href="/payment"
                  className={
                    window.location.pathname === "/payment" ? "active" : ""
                  }
                >
                  Payment
                </Nav.Link>
              ) : (
                <Nav.Link to="/payment" disabled className="me-0">
                  Payment
                </Nav.Link>
              )}
            </Nav.Item>
          </Nav>
        </StepLabel>
      </Step>
      <Step key={2}>
        <StepLabel>
          <Nav>
            <Nav.Item className="me-0">
              {step3 ? (
                <Nav.Link href="/placeorder" className="me-0">
                  Place Order
                </Nav.Link>
              ) : (
                <Nav.Link to="/placeorder" disabled className="me-0">
                  Place Order
                </Nav.Link>
              )}
            </Nav.Item>
          </Nav>
        </StepLabel>
      </Step>
    </Stepper>
  );
};

export default CheckOutSteps;
