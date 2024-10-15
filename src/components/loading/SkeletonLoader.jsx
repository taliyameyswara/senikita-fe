import React from 'react';

const SkeletonLoader = ({ count = 8 }) => {
    return (
        <div className="container px-6 py-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: count }, (_, index) => (
                    <div key={index} className="p-4 animate-pulse">
                        <div className="h-48 bg-gray-200 rounded-lg"></div> {/* Placeholder for image */}
                        <div className="mt-2">
                            <div className="w-3/4 h-4 mb-2 bg-gray-300 rounded"></div> {/* Placeholder for title */}
                            <div className="w-1/2 h-3 bg-gray-300 rounded"></div> {/* Placeholder for category */}
                            <div className="w-1/4 h-3 mt-2 bg-gray-300 rounded"></div> {/* Placeholder for price */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SkeletonLoader;
