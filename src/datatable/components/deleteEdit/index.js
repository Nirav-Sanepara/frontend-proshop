import { useState } from "react";

import { Box, Tooltip, IconButton } from "@mui/material";
import {useDispatch} from 'react-redux'
import Iconify from "../Iconify";
import UpdateModal from "../../../componant/UpdateModal";
import { deleteProducthHandler } from "../../../service/product";
import { removeProduct } from "../../../Slices/merchantSlice";
import { deActiveUser } from "../../../Slices/adminSlice";
import { userDeactiveHandler } from "../../../service/user";
import BootstrapModal from "../../Form/adduser";


export default function DeleteEditeTableTooltip({ productDetails, tableMeta, compoData }) {

 const dispatch = useDispatch()
  const [showModalEdit, setShowEditForm] = useState(false);
  const [productDetailsdata,setProductDetails] =useState({})

  const handleEditClick = (id) => {
    
    for(let i=0; i<productDetails?.length; i++){
      if(productDetails[i]._id==id){
        setProductDetails(productDetails[i])
      }
  }
  setShowEditForm(true);
  };
  const handleEditClose = () => {
              
    setShowEditForm(false);
  };
  const handleDeleteUser = async(id) => {
    console.log(id, "id from delete edit");

    console.log("clicked delete id", id);
    if(compoData=='product'){
        
    const {data} = await deleteProducthHandler(id)
   
    dispatch(removeProduct(id))
    }
    else if(compoData=='user'){
        const {data}=await userDeactiveHandler(id)
        console.log(data,'deleted data')
        dispatch(deActiveUser(data.user))
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <Tooltip title="Edit" sx={{ color: "black", backgroundColor: "white" }}>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleEditClick(tableMeta.rowData[0]);
          }}
          sx={{ marginRight: "12px" }}
        >
          <Iconify icon={"eva:edit-fill"} />
        </IconButton>

        <div>
          {compoData=='product' && showModalEdit && <UpdateModal
            show={showModalEdit}
            handleClose={handleEditClose}
            product={productDetailsdata}
          />}

          {
            compoData == 'user' && showModalEdit && <BootstrapModal isOpen={showModalEdit} handleClose={handleEditClose} title='Edit user profile' userData={productDetailsdata}/>
          }
        </div>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteUser(tableMeta.rowData[0]);
          }}
          sx={{ color: "error.main" }}
        >
          <Iconify icon={"eva:trash-2-outline"} />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
