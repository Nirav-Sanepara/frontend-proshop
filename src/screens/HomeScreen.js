import React, { useEffect, useState, useCallback } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Product from "../componant/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts, updateSearchHistory } from "../Slices/productSlice";
import Loader from "../componant/Loader";
import Message from "../componant/Message";
import { cartlist } from "../Slices/cartSlice";
import "../scss/Homescreen_searchbar.scss";
import SortItems from "../componant/HomeScreen/SortItems";
import { socket } from "../config/socket";
import toast from "react-hot-toast";
import RecentlyViewedProducts from "./RecentlyViewedProducts";
import Categories from "../componant/categories/Categories";
import Benefit from "../componant/Benefit";
// import { Filter } from "@mui/icons-material";
import Filter from "../componant/HomeScreen/filter/Filter"
import AdsComponent from "../componant/AdsComponent";
// socket.on('hello', (res) => {
//   toast.success(res.message)
// })
const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const productList = useSelector((state) => state.product.productList);
  const { loading, error } = productList;
  const products = productList.products;
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("priceLowToHigh");
  const [priceRange , setPriceRange] = useState([0,1000]);
  const recentlyViewedIds =
    JSON.parse(localStorage.getItem("recentlyViewed")) || [];
  useEffect(() => {
    dispatch(listProducts());
    console.log(dispatch(listProducts()),'==============================')
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }
  }, [dispatch, location.search]);
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    navigate(`?search=${searchValue}`);
  };
  const handleSortChange = (selectedOption) => {
    setSortOption(selectedOption);
  };
  const handleFilter = useCallback((selectedPriceRange) => {
    setPriceRange(selectedPriceRange);
  }, []);
  var sortedProducts=[]
 if(sortedProducts!=undefined){
   sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "priceLowToHigh":
        return a.price - b.price;
      case "priceHighToLow":
        return b.price - a.price;
      case "nameAZ":
        return a.name.localeCompare(b.name);
      case "nameZA":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });
 }
  const filteredProducts = sortedProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );
  const numProductsToShow = 10; //
  const calculateSearchBoxWidth = () => {
    const productCardWidth =
      document.querySelector(".product-card")?.offsetWidth;
    return productCardWidth ? `${productCardWidth}px` : "100%";
  };
  // useEffect(() => {
  //   dispatch(updateSearchHistory(searchTerm));
  // }, [dispatch, searchTerm]);
  // State to hold products with countInStock less than 5
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [show, setShow] = useState(true);
  useEffect(() => {
    if (products) {
      const lowStock = products.filter((pd) => pd.countInStock < 5);
      setLowStockProducts(lowStock);
    }
  }, [products]);
  return (
    <>
      {/* Display message for low stock products */}
      <Row className="mb-3">
        <Col xs={12} lg={9} md="auto">
          <Filter handleFilter={handleFilter} />
        </Col>
        <Col xs={12} lg={3} md="auto" className="mt-3">
          <SortItems onSortChange={handleSortChange} />
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs={12} lg={9} md="auto">
          <h1>Latest Products</h1>
        </Col>
        <Col xs={12} lg={3} md="auto">
          <Form.Control
            type="text"
            placeholder="Search Products"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
            style={{ width: calculateSearchBoxWidth() }}
          />
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            <Categories />
          </Row>
          <h1>Latest Products</h1>
          <Row className="mb-5">
            {filteredProducts.slice(0, numProductsToShow).map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Row>
            <Benefit />
          </Row>
          {recentlyViewedIds.length === 0 ? (
            <></>
          ) : (
            <Row>
              <RecentlyViewedProducts />
            </Row>
          )}

          <Row>

            <AdsComponent />
          </Row>
        </>
      )}
    </>
  );
};
export default HomeScreen;