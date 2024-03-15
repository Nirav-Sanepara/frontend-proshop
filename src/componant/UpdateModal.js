import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "../scss/Modal.scss";
import axios from "axios";
import { updateProduct } from "../Slices/productSlice";
import toast from "react-hot-toast";
import { addProductFromList } from "../Slices/productSlice";
import { io } from "socket.io-client";

const validate = (values) => {
  const errors = {};
  if (!values.productName) {
    errors.productName = "Required";
  }
  if (!values.productPrice) {
    errors.productPrice = "Required";
  } else if (Number(values.productPrice) <= 0) {
    errors.productPrice = "Price must be a positive number";
  }
  if (!values.productCategory) {
    errors.productCategory = "Required";
  }
  if (!values.productBrandName) {
    errors.productBrandName = "Required";
  }
  return errors;
};
const UpdateModal = ({ show, handleClose, product, addBtn, editBtn }) => {
  const dispatch = useDispatch();
  const [imgurl, setImgurl] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const compressImage = async (imageFile) => {
    const imageUrl = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
  
          canvas.toBlob((blob) => {
            resolve(URL.createObjectURL(blob));
          }, "image/jpeg", 0.7);
        };
      };
    });
  
    setImgurl(imageUrl);
  };
  

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      productName: product?.name || "",
      productPrice: product?.price || "",
      productImage: product?.image || "",
      productCategory: product ? product.category : "",
      productDescription: product ? product.description : "",
      productBrandName: product ? product.brand : "",
      productCountInStock: product ? product.countInStock : "",
    },
    validate,
    onSubmit: async (values) => {
      const obj = {
        name: values.productName,
        price: values.productPrice,
        image: imgurl ? imgurl : product.image,
        category: values.productCategory,
        description: values.productDescription,
        brand: values.productBrandName,
        countInStock: values.productCountInStock,
      };
      if (addBtn) {
        try {
          const { data } = await axios.post(
            `${process.env.REACT_APP_API_BASE_PATH}/api/products/add`,
            obj
          );
          dispatch(addProductFromList(data));
        } catch (error) {
          console.log("error", error);
        }
        handleClose();
      }
      if (editBtn) {
        const updateProductbyid = async (id) => {
          console.log(id, " to check the id  ");
          try {
            const data = await axios.put(
              `${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`,
              obj
            );
            console.log("data", data);
            dispatch(updateProduct(data?.data?.product));
            toast.success("Product updated successfully");
          } catch (error) {
            toast.error("Updation failed ", {
              style: {
                borderRadius: "10px",
                background: "#FF3232",
                color: "#fff",
              },
            });
          }
        };
        updateProductbyid(product?._id);
        handleClose();
      }
    },
  });

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
      }}
      className="modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {product?._id ? "UPDATE PRODUCT DETAILS" : "ADD PRODUCT DETAILS"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit} className="p-5">
          <div className="form-group">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={formik.values.productName}
              initialValues={formik.values.productName}
              className="form-control border border-dark rounded"
              {...formik.getFieldProps("productName")}
            />
            {formik.errors.productName && formik.touched.productName ? (
              <div className="text-danger">{formik.errors.productName}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="productPrice">Price:</label>
            <input
              min="0"
              type="text"
              id="productPrice"
              value={formik.values.productPrice}
              name="productPrice"
              className="form-control border border-dark rounded"
              {...formik.getFieldProps("productPrice")}
            />
            {formik.errors.productPrice && formik.touched.productPrice ? (
              <div className="text-danger">{formik.errors.productPrice}</div>
            ) : null}
          </div>

          <div className="form-group">
            <label htmlFor="image">Add Image:</label>
            <input
              type="file"
              id="productImage"
              name="productImage"
              className="p-3 border border-dark rounded form-control-file"
              onChange={(e) => {
                const image = e.target.files[0];
                formik.setFieldValue("image", image);
                compressImage(image);
              }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="productCategory">Category:</label>
            <select
              id="productCategory"
              name="productCategory"
              className="form-control border border-dark rounded p-2"
              style={{ padding: "inherit" }}
              {...formik.getFieldProps("productCategory")}
            >
              <option value="">Category</option>
              <option value="camera">Camera</option>
              <option value="laptops">Laptops</option>
              <option value="phone">Mobile Phone</option>
              <option value=''><button>+</button>Add Category</option>
            </select>
            {formik.errors.productCategory && formik.touched.productCategory ? (
              <div className="text-danger">{formik.errors.productCategory}</div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="productdescription">Description:</label>
            <textarea
              id="productdescription"
              name="productdescription"
              className="form-control border border-dark rounded"
              rows="4"
              {...formik.getFieldProps("productDescription")}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="productBrandName">Brand Name:</label>
            <input
              type="text"
              id="productBrandName"
              name="productBrandName"
              className="form-control border border-dark rounded"
              {...formik.getFieldProps("productBrandName")}
            />
            {formik.errors.productBrandName &&
            formik.touched.productBrandName ? (
              <div className="text-danger">
                {formik.errors.productBrandName}
              </div>
            ) : null}
          </div>
          <div className="form-group">
            <label htmlFor="productCountInStock">Count in Stock:</label>
            <input
              type="number"
              min="0"
              id="productCountInStock"
              name="productCountInStock"
              className="form-control border border-dark rounded"
              {...formik.getFieldProps("productCountInStock")}
            />
          </div>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {product?._id ? "Update Product" : "Add Product"}
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
};
export default UpdateModal;
