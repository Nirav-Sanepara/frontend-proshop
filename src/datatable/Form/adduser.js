import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "axios";
import toast from "react-hot-toast";
import ProfileNameField from "../../componant/profile/ProfileNameField";
import ProfileEmailField from "../../componant/profile/ProfileEmailField";
import ProfilePasswordField from "../../componant/profile/ProfilePasswordField";

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = "Name is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6) {
    errors.password = "Password must be at least 6 characters long";
  }
  
  return errors;
};

const BootstrapModal = ({ isOpen, handleClose, title, userData, isEditing }) => {
  console.log(isEditing,'isEdite value')
  const formik = useFormik({
    initialValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      password: "",
      role: userData?.role || "user"
    },
    validate,
    // console.log(object)
    onSubmit: async (values, { setSubmitting }) => {
      console.log('in submit func')
      const obj = {
        name: values.name,
        email:values.email,
        password:values.password,
        role:values.role
      };
      console.log(obj,'object')
      try {
        console.log("oooo",userData)
        if (isEditing) {
          console.log("false2222222222222222222",isEditing)
          const token = localStorage.getItem("token");
          // Handle edit logic
          const response = await axios.put(`${process.env.REACT_APP_API_BASE_PATH}/api/users/${userData._id}`, 
           obj,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          toast.success('User updated successfully.');

        } else {
          const token = localStorage.getItem("token");
          // Handle add logic
          console.log("addddddddddddddddddddddddddd")
          const response = await axios.post(`${process.env.REACT_APP_API_BASE_PATH}/api/users`, 
          obj,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          toast.success('User added successfully.');
        }
        handleClose();
      } catch (error) {
        console.error("Error:", error);
        toast.error('Error occurred.');
      }
      setSubmitting(false);
    }
  });



  return (
    <Modal show={isOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <ProfileNameField formik={formik} />
          <ProfileEmailField formik={formik} />
          <ProfilePasswordField formik={formik} />
          <Form.Group className="mb-3" controlId="formBasicRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              name="role"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.role}
            >
              <option value="user">User</option>
              <option value="merchant">Merchant</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
            {isEditing ? 'Update' : 'Add'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default BootstrapModal;
