// import React, { useState, useEffect } from "react";
// import { Menu } from "lucide-react";
// import { HiSun, HiMoon } from "react-icons/hi";
// import Sidebar from "./Sidebar";
// import profileImg from "../../assets/profileImg.png";

// const NavbarWithSidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle
  // const [isDarkMode, setIsDarkMode] = useState(false); // Theme toggle

  // // Effect to apply dark mode based on user preference or saved setting
  // useEffect(() => {
  //   // Check if dark mode preference exists in localStorage
  //   const savedTheme = localStorage.getItem("darkMode") === "true";
  //   setIsDarkMode(savedTheme);

  //   // Apply dark mode class to html element
  //   if (savedTheme) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, []);

  // // Update dark mode preference and apply class when toggled
  // useEffect(() => {
  //   // Save the theme preference to localStorage
  //   localStorage.setItem("darkMode", isDarkMode.toString());

  //   // Apply dark mode class to html element
  //   if (isDarkMode) {
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, [isDarkMode]);

//   return (
//     <div className="flex bg-gray-50 dark:bg-gray-900 transition-all duration-300">
//       {/* Sidebar */}
//       <Sidebar
//         isSidebarOpen={isSidebarOpen}
//         setIsSidebarOpen={setIsSidebarOpen} // Pass the correct setter
//       />

//       {/* Main Content */}
//       <div className={`flex-1 ml-${isSidebarOpen ? "64" : "16"} transition-all duration-300`}>
//         {/* Navbar */}
//         <nav className=" flex items-center justify-between h-16 px-6  shadow-md bg-blue-200 dark:bg-gray-900 border-b-4 border-gray-200 dark:border-gray-700">
//           <div className="flex items-center">
//             <button
//               onClick={() => setIsSidebarOpen(!isSidebarOpen)} // Use setIsSidebarOpen directly
//               className="p-2 hidden rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
//             >
//               <Menu className="w-6 h-6 text-gray-700 dark:text-gray-300" />
//             </button>
//           </div>
//           <div className="flex items-center gap-2">
//             <button
//               className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
//               onClick={() => setIsDarkMode((prev) => !prev)}
//             >
//               {isDarkMode ? <HiMoon className="w-6 h-6" /> : <HiSun className="w-7 h-6" />}
//             </button>
//             <img src={profileImg} alt="profile" className="w-8 h-8" />
//           </div>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default NavbarWithSidebar;




import React, { useState, useEffect } from "react";
import { Menu, Bell } from "lucide-react";
import { HiSun, HiMoon } from "react-icons/hi";
import profileImg from "../../assets/profileImg.png";
import { TbLogout2 } from "react-icons/tb";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, userRole }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown visibility

  // Theme toggle effect (same as before)
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode.toString());
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const handleLogout = () => {
    // Handle the logout logic here 
    console.log("Logging out...");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev); // Toggle dropdown visibility
  };

  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 shadow-sm border-b border-gray-100 dark:border-gray-800">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative"
        >
          <Bell className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        <button
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          onClick={() => setIsDarkMode((prev) => !prev)}
        >
          {isDarkMode ? (
            <HiMoon className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          ) : (
            <HiSun className="w-6 h-6 text-gray-600" />
          )}
        </button>

        <div className="relative flex items-center space-x-2">
          <img
            src={profileImg}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700 cursor-pointer"
            onClick={toggleDropdown} // Toggle dropdown on click
          />

          {isDropdownOpen && (
            <div className="absolute right-2 top-12 bg-white dark:bg-gray-800 border rounded-lg shadow-lg transition-all duration-300 ease-out transform opacity-100 scale-100">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-600 hover:text-blue-500 hover:font-semibold dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ease-in-out hover:scale-105"
              >
                <TbLogout2 className="w-5 h-5" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
