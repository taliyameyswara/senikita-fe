// Buat komponen Spinner
import React from "react";

const Spinner = () => {
    return (
        <div className="flex items-center justify-center h-[calc(100vh-500px)]">
            <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-primary"></div>
        </div>
    );
};

export default Spinner;
