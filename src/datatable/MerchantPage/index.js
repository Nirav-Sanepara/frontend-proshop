

import React, { useEffect } from "react";
import { useState } from "react";

import {
  
   useSearchParams,
} from "react-router-dom";
// material
import {
  
  Box,
  Switch,
} from "@mui/material";
import MUIDataTable from "mui-datatables";

import './merchant.css'
import { useNavigate } from 'react-router-dom';

import { productActiveStatusHandler } from "../../service/product";
import DeleteEditeTableTooltip from "../components/deleteEdit";
import AddnewRowTable from "../components/addTablerow";
import { useDispatch, useSelector } from "react-redux";
import { activeDeactiveProduct, merchantsProductlist } from "../../Slices/merchantSlice";

export default function MerchantPageProductDetails({ props }) {
  const csvLinkRef = React.useRef(null);
  // const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
  const [deleteData, setDeleteData] = useState(null);
  const [page, setPage] = useState(0);

  const navigate = useNavigate()
  // const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const formateParams = Object.fromEntries(searchParams);

  const dispatch = useDispatch()

  const displayProductlist  = useSelector(state => state.merchant.merchantSProduct)

  console.log(displayProductlist,'merchant page')
  
  const {
    organization_id: organization,
    office_id: ofcId,
    user_id: userId,
  } = formateParams;

  const [isClicked, setIsClicked] = useState(false)
  
  const handleActiveStatus = async (id) => {
  
    const data = await productActiveStatusHandler(id)
    dispatch(activeDeactiveProduct(data.data.isExists ));
     
     setIsClicked(!isClicked)
  }


  const handleDelete = async (id) => {
    try {
     
    } catch (error) {
    } finally {
      setIsDeleteConfirmed(false);
    }
  };
  
  useEffect(() => {
    dispatch(merchantsProductlist())
  }, [dispatch]);

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
        display: displayProductlist._id,

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
        setCellProps: () => ({ style: { width: "150px" } }),

        customBodyRender: (value) => {
          return (
            <Box>
              <img src={value} />
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

        customBodyRender: (value, rowData) => {
           console.log(rowData,'switch data ----------------------------------------')
          return (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Switch
                className="switch-button"
                checked={value}
                onChange={() => {
                  handleActiveStatus(rowData.rowData[0]);
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Box>
          );
        },
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
    {
      name: "countInStock",
      label: "Stock",
      display: true,
      options: {
        filter: true,
        sort: true,
        // view?.state,
        customBodyRender: (value) => (value.toString()),
      },
    },
    {
      name: "countInStock",
      label: "Order Product",
      display: true,
      options: {
        filter: true,
        sort: true,
        // view?.state,
        customBodyRender: (value) => (
          <span style={{ color: value > 5 ? 'inherit' : 'red' }}>
            {value > 5 ? '-' :value<5 && value>0? `left product ${value}`:"Stock Empty"}
          </span>
        ),
      },
    },
    {
      name: "Actions",
      label: "Actions",
      options: {
        onRowClick: false,
        setCellHeaderProps: (value) => ({
          className: "centeredHeaderCell",
        }),
        filter: false,
        empty: true,
        display: true,
        viewColumns: false,
        customBodyRender: (value, tableMeta, updateValue) => {
           
          return (
            
            <DeleteEditeTableTooltip productDetails={displayProductlist} tableMeta={tableMeta} compoData='product'/>
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
      navigate(`/product/${rowData[0]}`)
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
          <AddnewRowTable compo='product'/>

          <MUIDataTable
            title={"Organizations"}
            data={displayProductlist}
            columns={columns}
            options={options}
          />
        </>
      

    </Box>
  );
}

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`simple-tabpanel-${index}`}
//       aria-labelledby={`simple-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box className="userDataList" sx={{ p: 3 }}>
//           {children}
//         </Box>
//       )}
//     </div>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };


