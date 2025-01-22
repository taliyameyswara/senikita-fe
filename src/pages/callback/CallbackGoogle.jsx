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
        async function handleLogin() {
            const params = new URLSearchParams(window.location.search);
            const token = params.get('jwt_token');
            localStorage.setItem('token', token);

            try {
                const response = await fetchProfileUser();
                console.log(response);
                login(response);

                if (response.role === 1) {
                    navigate("/dashboard");
                } else {
                    navigate("/");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        }

        handleLogin();
    }, [fetchProfileUser, login, navigate]); // Adding dependencies for hooks

    return <FullPageLoader />;
}

export default CallbackGoogle;
