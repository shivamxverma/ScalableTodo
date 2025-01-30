import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('token'); 
    // console.log(JSON.stringify(isAuthenticated));

    return isAuthenticated ? (
        <>{children}</>
    ) : (
        <Navigate to="/signin" replace />
    );
};
PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;