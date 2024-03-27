import axios from "axios";

const token = localStorage.getItem("token");

const returnOrderHandler = ({id, orderId, return_status,reason,return_date}) =>{
   return axios.put(
        `${process.env.REACT_APP_API_BASE_PATH}/api/orders/return/${id}`,
        {
          orderId,
          return_status,
          reason,
          return_date,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
}

const createOrderHandler = (totalPrice) => { 
    return axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/orders/create-order`, { totalPrice },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
}

const completeOrderHandler = ({
    cartItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  }) => {
    return axios.post(
        `${process.env.REACT_APP_API_BASE_PATH}/api/orders`,
        {
          cartItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
}

const getOrderByUserId = (id) => {
   return  axios.get(
        `${process.env.REACT_APP_API_BASE_PATH}/api/orders/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
}

export {
    returnOrderHandler,
    createOrderHandler,
    completeOrderHandler,
    getOrderByUserId,
    
}