//
import UserDataEditForm from "../Form";
import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import {
  Link,
  createSearchParams,
  useLocation,
  useSearchParams,
} from "react-router-dom";
// material
import {
  Card,
  Button,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Tabs,
  Tab,
} from "@mui/material";
import MUIDataTable from "mui-datatables";
import { useDispatch } from "react-redux";

// components
// import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";



import { useNavigate } from "react-router-dom";


import UpdateModal from "../../componant/allProductScreenCompo/AddEditModal";
import { getProfileOfUserByParameterId } from "../../service/user";
import axios from "axios";

// import { setParams } from "src/utils/setParams";

export default function AdminViewMerchant() {
  const csvLinkRef = React.useRef(null);
  const [value, setValue] = useState(0);
  const [page, setPage] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const formateParams = Object.fromEntries(searchParams);
 
  const [productsData, setProductsData] = useState([]);
  const [name, setName] = useState("");
  
  var merchant_id = location.search;
  merchant_id = merchant_id.split("=");
  const {
    organization_id: organization,
    office_id: ofcId,
    user_id: userId,
  } = formateParams;

  const userDetailsData = async() =>{
        const user = await getProfileOfUserByParameterId(merchant_id[1])
        console.log(user,'admin view merchant page')
        setName(user.data.name)
        // console.log(user, 'user data from admin view merchant page')
  }

  const getData = async () => {
    // const { data } = await getProfileOfUserByParameterId(merchant_id[1])
    const token = localStorage.getItem("token");
    try{
      const {data} = await axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/products/all/products/${merchant_id[1]}`,{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        }
      })
      console.log(data,'adminView page data')
      setProductsData(data)
    }
   
    catch(err){
      console.log('error from adminview merchant page', err)
    }
  };

  useEffect(() => {
    getData();
    userDetailsData();
  }, []);

  React.useEffect(() => {
    if (ofcId) {
      setValue(1);
    }
  }, [searchParams, organization]);

  const columns = [
    {
      name: "_id",
      label: "id",
      options: {
        filter: false,
        display: productsData._id,

        viewColumns: false,
        customBodyRender: (value) => value,
      },
    },
    {
      name: "image",
      label: "Product",
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({
          style: { width: "150px", marginRight: "15px" },
        }),

        customBodyRender: (value) => {
          return (
            <Box sx={{ width: "150px", marginRight: "15px" }}>
              <img
                style={{ width: "150px", marginRight: "15px" }}
                src={value}
              />
            </Box>
          );
        },
      },
    },
    {
      name: "name",
      label: "Product Name",
      display: true,
      options: {
        filter: false,
        sort: true,

        customBodyRender: (value) => (value ? value : "-"),
      },
    },
    {
      name: "isActive",
      label: "Active",
      display: true,
      options: {
        filter: false,
        sort: true,

        customBodyRender: (value) => (value ? "Yes" : "No"),
      },
    },

    {
      name: "price",
      label: "Price",
      display: true,
      options: {
        filter: true,
        sort: true,
        // view?.state,
        customBodyRender: (value) => value,
      },
    },
  ];

  const handlePageChange = (action, page) => {
    if (action === "changePage") {
      setPage(page);
    }
  };

  const handleDownload = () => {
    if (csvLinkRef.current) {
      csvLinkRef.current.link.click();
    }
  };

  const options = {
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "none",
    onRowClick: (rowData) => {
      navigate(`/product/${rowData[0]}`);
    },

    onViewColumnsChange: (changedColumn, action) => {},
    page: page,
    onTableChange: (action, tableState) => {
      handlePageChange(action, tableState.page);
    },
    setRowProps: (row) => {
      return { style: { height: "75px" } };
    },
    onDownload: (buildHead, buildBody, columns, data) => {
      handleDownload();
      return false;
    },
  };

  return (
    <Box>
      
        <>

          <Box>
            <h2> {name}'s product details </h2>
          </Box>
          
          <MUIDataTable
            title={"Organizations"}
            data={productsData}
            columns={columns}
            options={options}
          />

        </>
       
    </Box>
  );
}

