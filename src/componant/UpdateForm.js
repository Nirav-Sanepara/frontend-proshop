import React, { useState } from "react";
import { useFormik } from "formik";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateProduct } from "../Slices/productSlice";
import axios from "axios";
import { useEffect } from "react";

const validate = (values) => {
  const errors = {};
  if (!values.productName) {
    errors.productName = "Required";
  }
  if (!values.productPrice) {
    errors.productPrice = "Required";
  } else if (values.productPrice <= 0) {
    errors.productPrice = "Price must be a positive number";
  }
  if (!values.productCategory) {
    errors.productCategory = "Required";
  }
  if (!values.userId) {
    errors.userId = "Required";
  }
  if (!values.productBrandName) {
    errors.productBrandName = "Required";
  }
  return errors;
};
function UpdateForm({ handleClose, product }) {
  const dispatch = useDispatch();
  const [imgUrl, setImgUrl] = useState("");
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      productName: product?.name || "",
      productPrice: product?.price || "",
      productImage: product?.image || "",
      productCategory: product?.category || "",
      productDescription: product?.description || "",
      userId: product?._id || "",
      productBrandName: product?.brand || "",
      productCountInStock: product?.countInStock || "",
    },
    validate,
    onSubmit: async (values) => {
      const obj = {
        name: values.productName,
        price: values.productPrice,
        image: values.productImage,
        category: values.productCategory,
        description: values.productDescription,
        _id: values.userId,
        brand: values.productBrandName,
        countInStock: values.productCountInStock,
      };

      // const fetchProducts = async () => {
      //   try {
      //     const response = await axios.get(
      //       `${process.env.REACT_APP_API_BASE_PATH}/api/products`
      //     );
      //     dispatch(updateProduct(response));
      //   } catch (error) {
      //     console.log("error", error);
      //   }
      // };

      const updateProductbyid = async (id) => {
        try {
          const data = await axios.put(`${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`, obj);
            console.log(data, " data posting ")
        } catch (error)
        {
          console.log("error",error)
        }
      };

      dispatch(updateProduct(obj));
      updateProductbyid(obj._id);
      // fetchProducts();
      handleClose();
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="p-5">
        <div className="form-group">
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            name="productName"
            className="form-control border border-dark rounded"
            {...formik.getFieldProps("productName")}
          />
          {formik.errors.productName && formik.touched.productName && (
            <div className="text-danger">{formik.errors.productName}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="productPrice">Price:</label>
          <input
            type="number"
            min="0"
            id="productPrice"
            name="productPrice"
            className="form-control border border-dark rounded"
            {...formik.getFieldProps("productPrice")}
          />
          {formik.errors.productPrice && formik.touched.productPrice && (
            <div className="text-danger">{formik.errors.productPrice}</div>
          )}
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
              const reader = new FileReader();
              reader.readAsDataURL(image);
              reader.onload = () => {
                setImgUrl(reader.result);
              };
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
            <option value="electronics">Camera</option>
            <option value="clothing">Laptops</option>
            <option value="home">Mobile Phone</option>
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
          <label htmlFor="userId">User ID:</label>
          <input
            type="text"
            id="userId"
            name="userId"
            className="form-control border border-dark rounded"
            {...formik.getFieldProps("userId")}
          />
          {formik.errors.userId && formik.touched.userId ? (
            <div className="text-danger">{formik.errors.userId}</div>
          ) : null}
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
          {formik.errors.productBrandName && formik.touched.productBrandName ? (
            <div className="text-danger">{formik.errors.productBrandName}</div>
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
          Update Product
        </Button>
      </form>
    </div>
  );
}
export default UpdateForm;
