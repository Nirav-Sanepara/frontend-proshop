// ProductItem.js
import React from "react";
import { ListGroup } from "react-bootstrap";
import AllProductmicro from "./AllProductmicro(1)";

const ProductItem = ({ entity }) => {
  return (
    <ListGroup.Item key={entity._id}>
      <AllProductmicro/>
    </ListGroup.Item>
  );
};

export default ProductItem;
