import React from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from './Utils';

function PrivateRoute({ children }) {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/');
        }
    }, [navigate]);

    return isAuthenticated() ? children : null;
}

export default PrivateRoute