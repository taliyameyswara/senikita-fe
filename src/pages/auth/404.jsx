import React from 'react';
import { Link } from 'react-router-dom';
import NavbarLogo from '../../components/navbar/NavbarLogo';

const NotFound = () => {
    return (
        <div className="flex flex-col h-screen bg-primary bg-opacity-5">
            <NavbarLogo />

            <div className="flex items-center justify-center flex-grow">
                <div className="p-10 text-center transition-transform transform bg-white rounded-lg shadow-2xl hover:scale-105">
                    <svg className="w-16 h-16 mx-auto text-rose-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path fillRule="evenodd" d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zM11 7a1 1 0 112 0v4a1 1 0 01-2 0V7zm0 8a1 1 0 112 0v1a1 1 0 01-2 0v-1z" clipRule="evenodd" />
                    </svg>
                    <h1 className="mt-6 text-4xl font-semibold text-gray-800">404 - Page Not Found</h1>
                    <p className="my-4 text-lg text-gray-700">Oops! The page you are looking for does not exist.</p>

                    <Link
                        className="inline-block px-6 py-3 mt-6 text-lg font-semibold text-white transition duration-300 rounded-lg shadow-md bg-rose-600 hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-opacity-75"
                        to="/"
                    >
                        Go Back Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
