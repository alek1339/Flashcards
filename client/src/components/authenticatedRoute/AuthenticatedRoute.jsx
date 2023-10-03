
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import PropTypes from "prop-types";

const AuthenticatedRoute = ({children}) => {
    const user = useSelector((state) => state.auth.user);
    let location = useLocation();

    useEffect(() => {
        if(!user) {
           window.location.href = "/login";
        }
    }, [user, location]);

 return children
};

AuthenticatedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthenticatedRoute;
