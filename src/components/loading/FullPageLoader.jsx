import React from 'react';

const FullPageLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-75">
            <div className="w-16 h-16 border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
        </div>
    );
};

export default FullPageLoader;
