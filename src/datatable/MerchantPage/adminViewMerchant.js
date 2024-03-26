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

// import { setParams } from "src/utils/setParams";

export default function AdminViewMerchant() {
  const csvLinkRef = React.useRef(null);
  const [value, setValue] = useState(0);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [page, setPage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const formateParams = Object.fromEntries(searchParams);
  const [addbtn, setAddBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
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
       
        setName(user?.data?.name)
        console.log(user, 'user data from admin view merchant page')
  }

  const getData = async () => {
    const { data } = await getProfileOfUserByParameterId(merchant_id[1])
       setProductsData(data);
  };

  const [sentBtn, setSendBtn] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);

  const handleDelete = async (id) => {
    try {
    } catch (error) {
    } finally {
      setIsDeleteConfirmed(false);
    }
  };

  useEffect(() => {
    getData();
  }, [showModal, showModalEdit, sentBtn]);

  useEffect(() => {
    userDetailsData();
  }, []);

  React.useEffect(() => {
    if (isDeleteConfirmed) {
      handleDelete(deleteData);
    }
  }, [isDeleteConfirmed]);

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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "24px",
            }}
          >
            <Button
              onClick={() => {
                handleShow();
                setAddBtn(true);
                setSelectedProduct({});
              }}
              variant="contained"
              component={Link}
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
            <UpdateModal
              addBtn={addbtn}
              show={showModal}
              handleClose={handleClose}
            />
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

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className="userDataList" sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
