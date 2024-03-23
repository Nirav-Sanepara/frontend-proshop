import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import Product from "../componant/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Slices/productSlice";
import Loader from "../componant/Loader";
import Message from "../componant/Message";
import "../scss/Homescreen_searchbar.scss";
import Example from "../componant/HomeScreen/Filter";
import SortItems from "../componant/HomeScreen/SortItems";
import { socket } from "../config/socket";
import toast from "react-hot-toast";
import RecentlyViewedProducts from "./RecentlyViewedProducts";
import Categories from "../componant/categories/Categories";
import Benefit from "../componant/Benefit";
import TopNavBar from "../componant/TopNavBar";

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

  const recentlyViewedIds =
    JSON.parse(localStorage.getItem("recentlyViewed")) || [];

  useEffect(() => {
    dispatch(listProducts());

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

  const sortedProducts = [...products].sort((a, b) => {
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

  const filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Determine the number of products to display
  const numProductsToShow = 10; // You can change this number as needed

  return (
    <>
  
      <div className="d-flex align-items-center justify-content-between mb-3">
        <Example />

        <div className="d-flex align-items-center m-2 justify-content-between  search-container">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Search Products"
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
              style={{ width: "800px" }}
            />
          </Form.Group>
        </div>
        <SortItems onSortChange={handleSortChange} />
      </div>

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
        </>
      )}
    </>
  );
};

export default HomeScreen;
