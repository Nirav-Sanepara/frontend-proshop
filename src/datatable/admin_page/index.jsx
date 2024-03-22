//

import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import "./table.css";
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
import Scrollbar from "../components/Scrollbar";
import Iconify from "../components/Iconify";
import { useNavigate } from "react-router-dom";
import BootstrapModal from "../Form/adduser";
import { allUserDataGetApiHandler, userDeactiveHandler } from "../../service/user";
import { socketInstance } from "../../utils/socket";

export default function OrganizationContent() {
  const csvLinkRef = React.useRef(null);

  const [modalTitle, setModalTitle] = useState("");
  const [updateValue, setUpdateValue] = useState({});
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [currentOrgRow, setCurrentOrgRow] = useState({});

  // deleting state
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [page, setPage] = useState(0);
  const API = process.env.REACT_APP_API_BASE_PATH + "/api/users";
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const formateParams = Object.fromEntries(searchParams);
  const {
    organization_id: organization,
    office_id: ofcId,
    user_id: userId,
  } = formateParams;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const token = localStorage.getItem("token");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  const handleFormAdduser = () => {
    setIsModalAddOpen(true);
  };

  const handleAddUserModal = () => {
    setIsModalAddOpen(false);
  };
  // for handle delete organization
  const handleDelete = async (id) => {
    try {
      return;
    } catch (error) {
    } finally {
      setIsDeleteConfirmed(false);
    }
  };

  const [userData, setUserdata] = useState([]);

  // for trigger delete api when confirm the confirmation model
  React.useEffect(() => {
    if (isDeleteConfirmed) {
      handleDelete(deleteData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDeleteConfirmed]);

  React.useEffect(() => {
    if (ofcId) {
      setValue(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, organization]);

  const handleEvent = () => {
    setShow(!show);
    setUpdateValue({});
  };

  // for handle the confirmation modal

  //const token=localStorage.getItem("token")

  const getData = async() => {
    const data = await allUserDataGetApiHandler()
    console.log('6656565777777777777777777777777777777777',data,'data')
    socketInstance.emit('getUser',data.data)
    setUserdata(data.data)
  };

  const [userDetaile, setUserDetails] = useState(null)
  const [isEditClicked, setIsEditClicked] = useState(false)
  // const token = JSON.parse(localStorage.getItem("token"));
  const handleEditClick = (id) => {
     setIsEditClicked(true)
    const singleProduct = userData.filter((ele)=>{
      if(ele._id == id){
        userDetaile(ele)
      }
    })
    
  };
  
  const handleDeleteUser = async(id) => {
    console.log("clicked delete id", id);
    await userDeactiveHandler(id)
    getData()
  };

  useEffect(() => {
    getData();
  }, [isModalAddOpen, userData?.length]);

  const columns = [
    {
      name: "_id",
      label: "id",
      options: {
        filter: false,
        display: userData._id,

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
        display: userData.email,

        customBodyRender: (value) => (value ? value : "-"),
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        sort: true,
        display: userData.role,

        customBodyRender: (value) => (value ? value : "-"),
      },
    },

    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
        sort: true,
        // view?.state,
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
                // justifyContent: "flex-end",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Tooltip title="Edit">
                <IconButton
                  onClick={handleEditClick}
                  sx={{ marginRight: "12px" }}
                >
                  <Iconify icon={"eva:edit-fill"} />
                </IconButton>

                <BootstrapModal
                  isOpen={isModalAddOpen}
                  handleClose={handleAddUserModal}
                  title={"Add user form"}
                />
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
    // Your data and API call logic here
  };

  const options = {
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "none",
    onRowClick: (rowData) => {
      console.log(rowData, "row data from table");
      //const { id, name, password, isAdmin, isActive } = rowData
      const index = userData.findIndex((org) => org._id === rowData[0]);
      setCurrentOrgRow(userData[index]);
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
      // dispatch(handleViewColumn({ changedColumn, action })); //changed
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

  return (
    <Box>
      {!organization ? (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "24px",
            }}
          >
            <Button
              onClick={() => {
                handleFormAdduser();
                handleEvent();
                setModalTitle("Add Organization Details");
              }}
              data-toggle="modal"
              data-target="addUserModal"
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

            <BootstrapModal
              isOpen={isModalAddOpen}
              handleClose={handleAddUserModal}
              title={"Add user form"}
            />
          </Box>

          <MUIDataTable
            title={"Organizations"}
            data={userData}
            columns={columns}
            options={options}
          />
        </>
      ) : (
        <Card sx={{ p: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              padding: "0 0 12px 12px",
              borderBottom: "1px solid rgba(145, 158, 171, 0.24)",
            }}
          >
            <Typography variant="h6">{currentOrgRow?.name} Details</Typography>

            <Button
              variant="contained"
              sx={{ display: userId || ofcId ? "none" : "block" }}
              onClick={() => {
                setValue(0);
                navigate({
                  pathname: "/organization",
                });
              }}
            >
              Back
            </Button>
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="User" {...a11yProps(0)} />
              <Tab label="Office" {...a11yProps(1)} />
              {/* <Tab label="Account" {...a11yProps(2)} /> */}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {/* <UserContent organization={currentOrgRow?._id} /> */}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* <OfficeContent organization={currentOrgRow?._id} /> */}
          </TabPanel>
          <TabPanel value={value} index={2}>
            {/* <AccountTabContent organization={currentOrgRow?._id} /> */}
          </TabPanel>
        </Card>
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
