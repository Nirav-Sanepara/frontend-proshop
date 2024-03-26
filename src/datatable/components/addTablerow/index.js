import { useState } from "react";
import {Box, Button} from '@mui/material'
import Iconify from "../Iconify";
import UpdateModal from "../../../componant/UpdateModal";
export default function AddnewRowTable({compo}) {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    console.log('clicked add button')
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "24px",
      }}
    >
      <Button
        onClick={
          handleShow

        }
        variant="contained"
        // component={Link}
        to="#"
        className="m-2 border border-light float-right"
        sx={{
          backgroundColor: "#343A40",
          borderRadius: "0px",
          border: "none",
        }}
        startIcon={<Iconify icon="eva:plus-fill" />}
      >
        Add Product
      </Button>
      { compo=='product' && show &&
        <UpdateModal show={show} handleClose={handleClose} product={null} />
      }
    </Box>
  );
}
