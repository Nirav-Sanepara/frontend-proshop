import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import "../scss/Product.scss";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Slices/cartSlice";
import axios from "axios";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  const dispatch = useDispatch();
  const [hovered, setHovered] = useState(false);
  const userLogin = useSelector((state) => state.user.userDetails);
  const { userInfo } = userLogin;

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/users/addTocart`,
        {
          userId: userInfo._id,
          productId,
          quantity: 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response?.data?.product, " to know the plm ");
      dispatch(addToCart(response?.data?.product));
      toast.success("Product added to cart");
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
        {hovered && (
          <Button
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
            }}
            onClick={() => {
              handleAddToCart(product._id);
            }}
            variant="dark"
            as={Link}
            block
            className="w-100 p-1 opacity-75"
          >
            Add to Cart
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
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">${product.price}</Card.Text>
      </Card.Body>
    </Card>
  );
};
export default Product;
