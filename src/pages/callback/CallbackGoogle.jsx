import React, { useEffect, useContext } from 'react';
import { UserContext } from "../../context/UserContext";
import { useProfileUserApi } from "../../api/user/ProfileUserApi";
import { useNavigate } from "react-router-dom";
import FullPageLoader from '../../components/loading/FullPageLoader';

const CallbackGoogle = () => {
    const { login } = useContext(UserContext);
    const { fetchProfileUser } = useProfileUserApi();
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);

        const token = params.get('jwt_token');
        localStorage.setItem('token', token);

        const response = fetchProfileUser();
        login(response.data);

        if (response.data.role === 1) {
            navigate("/dashboard");
        } else {
            navigate("/");
        }
    }, []);
    return (
        <FullPageLoader />
    )
}

export default CallbackGoogle