
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import PropTypes from "prop-types";

const AuthenticatedRoute = ({children}) => {
    const user = useSelector((state) => state.auth.user);
    const state = useSelector((state) => state);
    let location = useLocation();

    useEffect(() => {
        console.log(state);
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
