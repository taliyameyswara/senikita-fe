// src/components/FullPageLoader.jsx
import React from 'react';

const FullPageLoader = () => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="w-10 h-10 border-4 rounded-full border-primary border-t-transparent animate-spin"></div>
        </div>
    );
};

export default FullPageLoader;
