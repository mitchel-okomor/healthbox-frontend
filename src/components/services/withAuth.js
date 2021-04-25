import React, { useEffect, useState, useContext } from "react";
import checkLogin from "../helpers/checkLogin";
import history from "./history";
import { myContext } from "../../App";

const withAuth = (AuthComponent) => {
  const AuthWrapped = () => {
    const { state } = useContext(myContext);
    const { user } = state;

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      //check if it's still authenticated
      const isConfirmed = checkLogin();

      if (!isConfirmed || !user || user.length < 1) {
        history.push("/login");
        window.location.reload();
      } else {
        setIsAuthenticated(true);
      }
    }, [user]);

    if (isAuthenticated) {
      return (
        /* component that is currently being wrapper(App.js) */
        <AuthComponent />
      );
    } else {
      return null;
    }
  };

  return AuthWrapped;
};
export default withAuth;
