import React, { useEffect } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import "./table.css";
import { Link, createSearchParams, useSearchParams } from "react-router-dom";
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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUsers, allUsersData, deActiveUser } from "../../Slices/adminSlice";
import DeleteEditeTableTooltip from "../components/deleteEdit";
import AddnewRowTable from "../components/addTablerow";
import {socketInstance} from "../../utils/socket.js";

export default function OrganizationContent() {
  const csvLinkRef = React.useRef(null);
  const  socket = socketInstance;
  const [value, setValue] = useState(0);
  const [currentOrgRow, setCurrentOrgRow] = useState({});
 
  const [page, setPage] = useState(0);
  const dataInformation = useSelector((state) => state.usersData.usersData);
  console.log(dataInformation, "information");
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const formateParams = Object.fromEntries(searchParams);
  const dispatch = useDispatch();
  const {
    organization_id: organization,
    office_id: ofcId,
    user_id: userId,
  } = formateParams;

  

  React.useEffect(() => {
    if (ofcId) {
      setValue(1);
    }
  }, [searchParams, organization]);

    useEffect(() => {
    
       socket.on('addUser', (userData) => {
        console.log('new user', userData)
        dispatch(addUsers(userData))
      });

    }, [socket])


  useEffect(() => {
    dispatch(allUsersData());
  }, [dispatch]);
  const columns = [
    {
      name: "_id",
      label: "id",
      options: {
        filter: false,
        display: dataInformation._id,
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
            <DeleteEditeTableTooltip
              compoData="user"
              productDetails={dataInformation}
              tableMeta={tableMeta}
            />
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

  return (
    <Box>
      <>
         <AddnewRowTable compo="user" />

        <MUIDataTable
          title={"Organizations"}
          data={dataInformation}
          columns={columns}
          options={options}
        />
      </>
                
    </Box>
  );
}
