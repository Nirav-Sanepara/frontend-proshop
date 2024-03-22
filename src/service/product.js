import axios from "axios"

const token = localStorage.getItem("token");

const addCartHandlerService = async(data) => {
  console.log(data, 'from services')
  // const dispatch = useDispatch()
  return await axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/users/addTocart`,
        {
          userId: data.userId,
          productId: data.productId,
          quantity: data.quantity || 1,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      // dispatch(addToCart(response?.data?.product));
      // return response             d32e4bed59f340a1bd75adce25415d64
}

const GetProducthandler = async() =>{
    // const productList = useSelector(state => state)
    // const { productList } = useSelector(state => state.product)
    let products = []
    try {
        // if (productList.products.length === 0) {
          const { data } = token
            ? await axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/products`, {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
              })
            : await axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/products`);
          products = data;
          localStorage.setItem("products", JSON.stringify(products));
        // } else {
        //   products = productList.products;
        // }
        return products;
      } catch (error) {
        throw error;
      }
}

const deleteProducthHandler = (id) =>{
  return axios.delete(`${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`)
}

const updateProductHandler = ({id,obj}) => {
  return axios.put(`${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`, obj, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
}

const updateContInStockProductHandler = ({id,quantity}) =>{
   return  axios.patch(`${process.env.REACT_APP_API_BASE_PATH}/api/products/updateCount/${id}`,{quantity},{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
   })
}

const updateProductReviewHandler = ({id,name,comment}) => {
  return  axios.patch(`${process.env.REACT_APP_API_BASE_PATH}/api/products/addReview/${id}`,{name,comment},{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
   })
}

const ratingProductHandler = ({id,rating}) =>{
  return axios.patch(`${process.env.REACT_APP_API_BASE_PATH}/api/products/rating/${id}`,{rating},{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
   })
}

const productActiveStatusHandler = (id) => {
  return axios.patch(`${process.env.REACT_APP_API_BASE_PATH}/api/products/${id}`,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
   })
}

const getProductByUsersId = () => {
  return axios.get(`${process.env.REACT_APP_API_BASE_PATH}/api/products/all/products`,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
   })
}

const addProductHandlerService = (obj) =>{
  // addProduct
  return axios.post(`${process.env.REACT_APP_API_BASE_PATH}/api/products/add`,obj,{
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
}

const removeProductFromCartHandler = ({userId, productId}) => {
 return axios.post(
    `${process.env.REACT_APP_API_BASE_PATH}/api/users/removecart`,
    { userId, productId},
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

const updateCartQuantityHandler = ({userId,
  productId,
  newQuantity}) => {
  return axios.post(
    `${process.env.REACT_APP_API_BASE_PATH}/api/users/updateqty`,
    {userId, productId, newQuantity },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

const addToWishlistProductHandler = ({productId,userId}) =>{
  return axios.post(
    `${process.env.REACT_APP_API_BASE_PATH}/api/users/addTofavourite`,
    {
      productId,
      userId
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

const removeWishlistProductHandler = ({ productId, userId}) =>{
  return axios.post(
    `${process.env.REACT_APP_API_BASE_PATH}/api/users/removeFav`,
    { productId, userId },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

const displayCartListHandler = () =>{
 return axios.get(
    `${process.env.REACT_APP_API_BASE_PATH}/api/users/cartlist`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

export {
    GetProducthandler,
    addCartHandlerService,
    deleteProducthHandler,
    updateProductHandler,
    updateContInStockProductHandler,
    updateProductReviewHandler,
    ratingProductHandler,
    productActiveStatusHandler,
    getProductByUsersId,
    addProductHandlerService,
    removeProductFromCartHandler,
    updateCartQuantityHandler,
    addToWishlistProductHandler,
    removeWishlistProductHandler,
    displayCartListHandler
}
