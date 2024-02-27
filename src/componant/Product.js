import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Rating from "./Rating";
import "../scss/Product.scss";
import toast from "react-hot-toast";
import { BiHeart } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { addToCart } from "../Slices/cartSlice";
import axios from "axios";

const Product = ({ product }) => {
  const navigate=useNavigate();
  const dispatch = useDispatch();

  const [hovered, setHovered] = useState(false);
  const [hoveredheart, setHoveredHeart] = useState(false);
  const handleMouseEnter = () => {
    setHovered(true);
  };
  const handleMouseLeave = () => {
    setHovered(false);
  };

  const handleMouseEnterHeart = () => {
    setHoveredHeart(true);
  };
  const handleMouseLeaveHeart = () => {
    setHoveredHeart(false);
  };


  const handleAddToCart = async (productId,quantity) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_PATH}/api/products/${productId}`,
        {
          addedInCart: true,
          addedQtyInCart: 1,
          
        }
      );
      dispatch(addToCart(response?.data?.product));
      navigate(`/cart`);
    } catch (error) {
      console.log(" error ", error);
    }
  };

  return (
    <Card
      className="my-3 p-3 rounded"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link to={`/product/${product._id}`} className="product-image">
        <div className="image-container" style={{ position: "relative" }}>
          <Card.Img src={product.image} alt={product.name} />

          <div
            className="heart-icon-container"
            onMouseEnter={handleMouseEnterHeart}
            onMouseLeave={handleMouseLeaveHeart}
          >
            {hoveredheart ? (
              <BiHeart className="heart-icon" style={{ color: "red" }} />
            ) : (
              <BiHeart className="heart-icon" />
            )}
          </div>

          {hovered && !hoveredheart && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
              }}
            >
              <Button
                onClick={() => {
                  handleAddToCart(product._id);
                  toast("product added to cart");
                }}
                variant="dark"
                as={Link}
                to={`/cart`}
                block
                className="w-100 p-1 opacity-75"
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
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
