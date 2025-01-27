import React, { useState, useEffect } from "react";
import { Clock, CheckSquare, AlertTriangle, List } from "lucide-react";
import DashboardTable from "./DashboardTable";
import EmployeeTasksTable from "./EmployeeTaskTable";
import TodayTaskEmployeeTable from "./TodayTaskEmployeeTable";
import AdminTaskAssignmentTable from "./AdminTaskAssignmentTable";

// TaskCard Component
const TaskCard = ({ icon, title, count, color }) => (
  <div
    className={`p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md flex items-center space-x-4 ${color}`}
  >
    {icon}
    <div>
      <h3 className="text-gray-500 dark:text-gray-300">{title}</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  </div>
);

// Timer Component for Pending Tasks
const PendingTaskTimer = ({ pendingTasks, color }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className={`p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md flex items-center space-x-4 ${color}`}
    >
      <Clock className="text-red-400" />
      <div>
        <h3 className="text-gray-500 dark:text-gray-300">Pending Tasks Time</h3>
        <p className="text-2xl font-bold">{formatTime(time)}</p>
        <p className="text-sm text-gray-400">Active Tasks: {pendingTasks}</p>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ userRole }) => {
  // Simulated task data (in a real app, this would come from an API or state management)
  const totalTasks = 25;
  const pendingTasks = 10;
  const completedTasks = 15;
  const overdueTasks = 3;

  return (
    <div className="py-2 sm:py-6 px-2 sm:px-4 min-h-screen bg-blue-50 rounded-xl dark:bg-[#0B0E11] w-full">
      {userRole === "admin" ? (
        <h1 className="text-2xl sm:text-3xl text-center sm:text-left font-medium text-gray-800 dark:text-white mb-6">
          Admin Dashboard
        </h1>
      ) : userRole === "employee" ? (
        <h1 className="text-3xl font-medium text-gray-800 dark:text-white mb-6">
          Employee Dashboard
        </h1>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-[1.5rem]  sm:mb-[3rem]">
        {userRole === "admin" ? (
          // Admin Cards (Unchanged)
          <>
            <TaskCard
              icon={<List className="text-blue-500" />}
              title="Total Tasks"
              count={totalTasks}
              color="border-l-4 border-blue-500"
            />
            <TaskCard
              icon={<AlertTriangle className="text-yellow-500" />}
              title="Pending Tasks"
              count={pendingTasks}
              color="border-l-4 border-yellow-500"
            />
            <TaskCard
              icon={<CheckSquare className="text-green-500" />}
              title="Completed Tasks"
              count={completedTasks}
              color="border-l-4 border-green-500"
            />
          </>
        ) : userRole === "employee" ? (
          // Employee-specific Task Cards
          <>
            <TaskCard
              icon={<List className="text-blue-500" />}
              title="Total Tasks"
              count={totalTasks}
              color="border-l-4 border-blue-500"
            />
            <TaskCard
              icon={<AlertTriangle className="text-yellow-500" />}
              title="Pending Tasks"
              count={pendingTasks}
              color="border-l-4 border-yellow-500"
            />
            <TaskCard
              icon={<CheckSquare className="text-green-500" />}
              title="Completed Tasks"
              count={completedTasks}
              color="border-l-4 border-green-500"
            />
            {/* Pending Task Timer for Employee */}
            <PendingTaskTimer
              pendingTasks={pendingTasks}
              color="border-l-4 border-red-400"
            />
          </>
        ) : null}
      </div>

      {userRole === "admin" ? (
        <>
          <DashboardTable />
          <AdminTaskAssignmentTable />
        </>
      ) : userRole === "employee" ? (
        <>
          <TodayTaskEmployeeTable />
          <EmployeeTasksTable />
        </>
      ) : null}
    </div>
  );
};

export default Dashboard;
