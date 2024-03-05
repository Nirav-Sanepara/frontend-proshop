import React, { useState } from "react";
import { Col, Row, Image, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import UpdateModal from "./UpdateModal";
import { removeProductFromList } from "../Slices/productSlice";
import axios from "axios";
import toast from "react-hot-toast";

const ProductRow = ({ product }) => {
  const dispatch = useDispatch();

  const [sentBtn, setSendBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const handleEdit = () => {
    setShowModal(true);
    setSendBtn(true);
  };

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`
      );
      dispatch(removeProductFromList(id));
      toast("Product removed from the list");
    } catch (error) {
      toast.error("Product removed from the list");
    }
  };

  console.log("rendring", product);

  return (
    <Row>
      <Col md={1}>
        <Image src={product.image} alt={product.name} fluid rounded />
        {console.log("image",product.image)}
      </Col>
      <Col md={7} className="p-3">
        <Link to={`/product/${product.product}`}>{product.name}</Link>
      </Col>
      <Col md={2} className="p-3">
        {product.price}
        {console.log("price",product.price)}
      </Col>
      <Col md={1}>
        <Button
          type="button"
          variant="light"
          onClick={() => handleEdit(product)}
        >
          <i className="fa-solid fa-pen-to-square"></i>
        </Button>
      </Col>
      <Col md={1}>
        <Button
          type="button"
          variant="light"
          onClick={() => handleDelete(product._id)}
        >
          <i className="fas fa-trash"></i>
        </Button>
      </Col>
      <UpdateModal
        show={showModal}
        handleClose={handleClose}
        product={product}
        editBtn={sentBtn}
      />
    </Row>
  );
};

export default React.memo(ProductRow);
