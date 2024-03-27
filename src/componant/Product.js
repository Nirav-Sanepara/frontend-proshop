import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./Rating";
import "../scss/Product.scss";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, cartlist } from "../Slices/cartSlice";
import axios from "axios";
import HeartIcon from "./HeartIcon";
import {addCartHandlerService} from "../service/product";
import IncrementDecrementBtn from "../screens/cart/cartComponent/IncrementDecrementBtn";
const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart.cartList;
  console.log(cartItems, " to check the condition ")
  const navigate = useNavigate();
  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };
  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      if (userInfo && Object.keys(userInfo).length > 0) {
        const data ={
          userId: userInfo._id,
            productId,
            quantity: 1,
        }
        const response = await addCartHandlerService(data)
        // console.log(response, 'dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        dispatch(cartlist());
        dispatch(addToCart(response?.data?.product));
        toast.success("Product added to cart");
      } else {
        navigate("/login");
      }
    } catch (error) {
      console.log("::::::::: error ", error);
    }
  };
  return (
    <Card
      className="my-3 p-3 rounded "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: "flex",
        height: "100%",
      }}
    >
      <div
        className="product-image-container"
        style={{ position: "relative", flex: "1 0 auto" }}
      >
        <Link to={`/product/${product._id}`}>
          <Card.Img
            src={product.image}
            alt={product.name}
            className="product-image"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </Link>
        <HeartIcon product={product} />
        {hovered && product.countInStock > 0 && (
          <>
            {cartItems.some((item) => item?.product?._id === product?._id) ? (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "530px",
                }}
              >
                <IncrementDecrementBtn
                 background = "black"
                  minValue={1}
                  maxValue={product?.countInStock}
                  counts={
                    cartItems.find((item) => item?.product?._id === product?._id)?.quantity || 0
                  }
                  productId={product?._id}
                />
              </div>
            ) : (
              <Button
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                }}
                onClick={() => {
                  handleAddToCart(product?._id, product?.countInStock);
                }}
                variant="dark"
                block
                className="w-100 p-1 opacity-75"
              >
                Add to Cart
              </Button>
            )}
          </>
        )}
        {hovered && product.countInStock <= 0 && (
          <Button
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
            }}
            onClick={() => {
              toast("Product Out Of Stock ", {
                style: {
                  color: "#FF2C2C",
                  background: "#F69697",
                  border: "1px solid #FF2C2C",
                },
              });
            }}
            variant="danger"
            block
            className="w-100 p-1 opacity-75"
          >
            Out of Stock
          </Button>
        )}
      </div>
      <Card.Body style={{ flex: "0 0 auto" }}>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3"></div>
          {product.rating} from {product.numReviews} review
        </Card.Text>
        <Card.Text as="div">
          <Rating value={product.rating} />
        </Card.Text>
        {product.countInStock > 0 ? (
          <Card.Text as="h3">${product.price}</Card.Text>
        ) : (
          <Card.Text as="h3">Out Of Stock </Card.Text>
        )}
      </Card.Body>
    </Card>
  );
};
export default Product