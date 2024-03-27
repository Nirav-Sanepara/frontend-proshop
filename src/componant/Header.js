import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, NavDropdown, Badge } from "react-bootstrap";
import { removeUser, loggedUserDetails } from "../Slices/userSlice";
import CustomOffcanvas from "../screens/cart/cartComponent/OffCanvas"
import "../scss/Header.scss";
import { useNavigate } from "react-router-dom";
import { cartlist, existedCartItem } from "../Slices/cartSlice";
import { useTranslation } from "react-i18next";
import TopNavBar from "./TopNavBar";

const Header = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;
  const cartItems = useSelector((state) => state.cart.cartList.cartItems);
  const cartItemsCount = cartItems.length;
  const [show, setShow] = useState(false);
  const { t, i18n } = useTranslation("global");

  // console.log(userInfo.role, " user info role -----------------");

  useEffect(() => {
    dispatch(loggedUserDetails());
  }, [dispatch]);

  // Effect for dispatching cartlist() when userInfo changes
  useEffect(() => {
    console.log("userInfo", userInfo);
    if (userInfo && Object.keys(userInfo).length > 0) {
      dispatch(cartlist());
    }
  }, [dispatch, userInfo]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(removeUser());
    navigate("/login");
    localStorage.clear();
  };
  return (
    <header>
    <TopNavBar/>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
        <Navbar.Brand className="col-md-2" href="/">
        {t("header.brandName")}
     
      </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="col-md-10 justify-content-end"
          >
            <Nav className="ms-auto">
              <Nav.Link href="/mainscreen">{t("header.home")}</Nav.Link>
              <NavDropdown
                style={{ marginRight: "0rem" }}
                title={t("header.account")}
                id="account"
                className="dropdown-button"
              >
                <div>
                  {userInfo?.role === "admin" && (
                    <NavDropdown.Item href="/all-products">
                    {t("header.allProducts")}
                    </NavDropdown.Item>
                  )}
                  <NavDropdown.Item href="/favouriteScreen">
                  {t("header.favourite")}
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/all-products">
                  {t("header.allProducts")}
                </NavDropdown.Item>
                <NavDropdown.Item href="/order">{t("header.orders")}</NavDropdown.Item>
                <NavDropdown.Item href="/cart">{t("header.cart")}</NavDropdown.Item>
                <NavDropdown.Item href="/profile">{t("header.profile")}</NavDropdown.Item>
                <NavDropdown.Item href="/contact">
                  {t("header.contactUs")}
                </NavDropdown.Item>
                </div>
              </NavDropdown>
              {userInfo && Object.keys(userInfo).length > 0 ? (
                <Nav>
                  <NavDropdown title={userInfo.name} id="username">
                    <NavDropdown.Item onClick={handleLogout}>
                    {t("header.signout")}
                    </NavDropdown.Item>
                  </NavDropdown>

                  {userInfo?.role === "admin" ? (
                    <>
                     <Nav.Link href="all-products"> {t("header.allProducts")}</Nav.Link>
                    <Nav.Link href="/admin">{t("header.admin")}</Nav.Link>
                    </>
                    
                  ) : userInfo?.role === "merchant" ? (
                    <>
                      <Nav.Link href="/merchant">{t("header.merchant")}</Nav.Link>
                     
                    </>
                  ) : (
                    <Nav.Link onClick={() => setShow(true)}>
                      <i className="fa fa-shopping-cart pe-2 position-relative">
                        {cartItemsCount === 0 ? (
                          <></>
                        ) : (
                          <Badge
                            pill
                            bg="secondary"
                            className="position-absolute top-2 start-100 translate-middle"
                          >
                            {cartItemsCount}
                          </Badge>
                        )}
                      </i>
                    </Nav.Link>
                  )}
                </Nav>
              ) : (
                <Nav.Link href="/login">
                  <i className="fas fa-user"></i>{t("header.signin")}
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <CustomOffcanvas show={show} handleClose={() => setShow(false)} />
    </header>
  );
};

export default Header;
