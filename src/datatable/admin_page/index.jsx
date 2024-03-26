import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import "./table.css";
import {
  Link,
  createSearchParams,
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
import Iconify from "../components/Iconify";
import { useNavigate } from "react-router-dom";
import BootstrapModal from "../Form/adduser";
import { userDeactiveHandler } from "../../service/user";
import { useDispatch, useSelector } from "react-redux";
import { allUsersData, deActiveUser } from "../../Slices/adminSlice";
export default function OrganizationContent() {
  const csvLinkRef = React.useRef(null);

  const [modalTitle, setModalTitle] = useState("");
  const [value, setValue] = useState(0);
  const [currentOrgRow, setCurrentOrgRow] = useState({});
  const [editUser, setEditUser] = useState(null); // State to store the user being edited
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  // const [deleteData, setDeleteData] = useState(null);
  const [page, setPage] = useState(0);
  const dataInformation = useSelector( state => state.usersData.usersData )
  console.log(dataInformation,'information')
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const formateParams = Object.fromEntries(searchParams);
  const dispatch =useDispatch()
  const {
    organization_id: organization,
    office_id: ofcId,
    user_id: userId,
  } = formateParams;

  const handleFormAddUser = () => {
    setIsModalOpen(true);
    setEditUser(null); // Clear editUser state
    setModalTitle("Add Organization Details");
  };


  React.useEffect(() => {
    if (ofcId) {
      setValue(1);
    }
   
  }, [searchParams, organization]);

  const handleDeleteUser = async(id) => {
    const {data}=await userDeactiveHandler(id)
    console.log(data,'deleted data')
    dispatch(deActiveUser(data.user))
  };

  useEffect(()=>{
  dispatch(allUsersData())
  },[dispatch])
  const columns = [
    {
      name: "_id",
      label: "id",
      options: {
        filter: false,
        display:dataInformation._id,
        viewColumns: false,
        customBodyRender: (value) => (value ? value : "-"),
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (value ? value : "-"),
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
        display: dataInformation.email,
        customBodyRender: (value) => (value ? value : "-"),
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        sort: true,
        display: dataInformation.role,
        customBodyRender: (value) => (value ? value : "-"),
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (value ? value : "-"),
      },
    },
    {
      name: "isActive",
      label: "Active Status",
      options: {
        filter: true,
        sort: true,
        customBodyRender: (value) => (value ? "Yes" : "No"),
      },
    },
    {
      name: "Actions",
      label: "Actions",
      options: {
        setCellHeaderProps: (value) => ({
          className: "centeredHeaderCell",
        }),
        filter: false,
        onRowClick: false,
        empty: true,
        display: true,
        viewColumns: false,
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <Box
              sx={{
                width: "100%",
                display: "flex",
              }}
            >
              <Tooltip title="Edit">
                <IconButton
                  onClick={() => handleEditClick(tableMeta.rowData)}
                  sx={{ marginRight: "12px" }}
                >
                  <Iconify icon={"eva:edit-fill"} />
                </IconButton>
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
        },
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
      const index = dataInformation.findIndex((org) => org._id === rowData[0]);
      setCurrentOrgRow(dataInformation[index]);
      if (rowData[3] == "merchant") {
        navigate({
          pathname: `/merchant-details`,
          search: createSearchParams({
            merchant_id: `${rowData[0]}`,
          }).toString(),
        });
      } else {
        alert(`${rowData[1]} is not a merchant`);
      }
    },
    onViewColumnsChange: (changedColumn, action) => {
      // dispatch(handleViewColumn({ changedColumn, action }));
    },
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

  const handleEditClick = async (rowData) => {
    console.log("rowData", rowData);
    const user = dataInformation.find((user) => user._id === rowData[0]);
    console.log("id", user._id);
    setEditUser(user);
    setIsModalOpen(true);
  };

  return (
    <Box>
       
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "24px",
            }}
          >
            <Button
              onClick={handleFormAddUser}
              variant="contained"
              component={Link}
              to="#"
              sx={{
                backgroundColor: "#343A40",
                borderRadius: "0px",
                border: "none",
              }}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add Merchant
            </Button>
          </Box>

          <MUIDataTable
            title={"Organizations"}
            data={dataInformation}
            columns={columns}
            options={options}
          />
        </>
      
      
      {isModalOpen && (
        <BootstrapModal
          isOpen={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          title={editUser ? "Edit User Form" : "Add User Form"}
          userData={editUser}   
        />
      )}
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
