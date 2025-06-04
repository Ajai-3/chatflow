import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, screenLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (!screenLoading && isAuthenticated) {
      navigate("/", { replace: true }); 
    }
  }, [isAuthenticated, screenLoading, navigate]);

  useEffect(() => {
    const handlePopState = () => {
      if (!screenLoading && isAuthenticated) {
        navigate("/", { replace: true });
      }
    };


    window.addEventListener("popstate", handlePopState);

    if (
      !screenLoading &&
      isAuthenticated &&
      (location.pathname === "/login" || location.pathname === "/signup")
    ) {
      navigate("/", { replace: true });
    }

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [location.pathname, isAuthenticated, screenLoading, navigate]);

  // if (screenLoading) {
  //   return (
  //     <div className="min-h-screen bg-base-100 flex items-center justify-center">
  //       <div className="loading loading-spinner loading-lg text-primary"></div>
  //     </div>
  //   );
  // }

  if (isAuthenticated) {
    return null;
  }

  return children;
};

export default PublicRoute;
