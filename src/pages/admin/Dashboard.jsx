import React, { useState, useEffect } from 'react';

import Sidebar from '../../components/admin/partials/Sidebar'
import Header from '../../components/admin/partials/Header';
import WelcomeBanner from '../../components/admin/partials/dashboard/WelcomeBanner';

function Dashboard() {

    const [sidebarOpen, setSidebarOpen] = useState(false);
    useEffect(() => {
        document.title = 'Dashboard | Admin';
    });
    return (
        <div className="flex h-screen overflow-hidden font-inter">

            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-x-hidden overflow-y-auto bg-grey-custom">

                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main>
                    <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 max-w-9xl">

                        {/* Welcome banner */}
                        <WelcomeBanner />

                    </div>
                </main>

            </div>

        </div>
    );
}

export default Dashboard;