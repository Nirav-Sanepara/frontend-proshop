import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import ProfileNameField from "../../componant/profile/profileField/ProfileNameField";
import ProfileEmailField from "../../componant/profile/profileField/ProfileEmailField";
import ProfilePasswordField from "../../componant/profile/profileField/ProfilePasswordField";
import { validateFormValues } from "../../componant/joi_validation/validation";
import {
  registerUserHandler,
  updateUserProfileByIdHandler,
} from "../../service/user.js";
import { addUsers, updateUser } from "../../Slices/adminSlice.js";
import { useDispatch } from "react-redux";
import { socketInstance } from "../../utils/socket.js";
const BootstrapModal = ({ isOpen, handleClose, title, userData }) => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: userData?.name || "",
      email: userData?.email || "",
      password: "",
      role: userData?.role || "user",
    },

    // validate: (values) => {
    //   const errors = validateFormValues(values, userData);
    //   return errors;
    // },

    onSubmit: async (values, { setSubmitting }) => {
      // console.log("in submit func");
      const obj = {
        name: values.name,
        email: values.email,
        password: values.password,
        role: values.role,
      };
      console.log(
        obj,
        "obj./././..............................////////////////////"
      );
      try {
        if (userData !== null) {
          // handle edit logic
          const response = await updateUserProfileByIdHandler({
            id: userData._id,
            name: obj.name,
            email: obj.email,
            password: obj.password,
          });

          dispatch(updateUser(response.data));
          toast.success("User updated successfully.");
        } else {
          // Handle add logic

          const { data } = await registerUserHandler({
            name: obj.name,
            email: obj.email,
            password: obj.password,
            role: obj.role || "merchant",
          });
         const broadcastEmit = socketInstance.emit("broadcastUserAdd", data);
         console.log(broadcastEmit,'broadcastEmit')
        const adduserBroadcast=  socketInstance.on('addUser', data => {
            console.log('New user added:', data);
            
            dispatch(addUsers(data))
        });
          console.log(adduserBroadcast,'broadcast 88888888888888888888888888888888888888888888')
          toast.success("User added successfully.");
        }
        handleClose();
      } catch (error) {
        console.error(
          "Error=====================================================================================================:",
          error
        );
        toast.error("Error occurred.");
      }
      setSubmitting(false);
    },
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
          {userData === null && <ProfilePasswordField formik={formik} />}
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
          <Button
            variant="primary"
            type="submit"
            disabled={formik.isSubmitting}
          >
            {userData !== null ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default BootstrapModal;
