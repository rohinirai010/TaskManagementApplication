import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Navbar/Sidebar";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const userRole = 'admin';

  return (
    <div className="flex h-screen">
      {/* Pass the state and setter function to the Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        userRole={userRole}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-hidden">
      <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          userRole={userRole}
        />
        <div
          className={`flex-1 h-[calc(250vh-4rem)] bg-gray-50 dark:bg-[#0B0E11] p-2 sm:p-4 transition-all duration-300 overflow-auto ${
            isSidebarOpen
              ? "ml-64" // Open sidebar (larger screens)
              : "ml-16 lg:ml-64" // Closed sidebar on smaller screens, open on lg and above
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
