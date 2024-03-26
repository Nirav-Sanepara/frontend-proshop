import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserProfileHandler } from "../service/user";


const PublicContainer = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  // const dispatch = useDispatch();

  const [previousPath, setPreviousPath] = useState("");

  useEffect(() => {
    setPreviousPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    checkAuth();
  }, []);
  
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
                
        const user = await getUserProfileHandler()
       
 
        if (user?.data?.role === "admin") {
          navigate("/admin");
        } 
        else {
          if(location.pathname==="/login")
          {
          navigate('/');

          }
          else {

            navigate(previousPath);
          }
        }


      }
    } catch (error) {
     
      console.log("error in ROUTE", error);
    }
  };

  return (
    <>
      {children}

    </>
  );
};

export default PublicContainer;