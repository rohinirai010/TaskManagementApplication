import React from "react";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../components/Dashboard/Dashboard";

const Trading = ({}) => {
  const userRole = 'admin';
  return (
    <MainLayout>
      <Dashboard userRole={userRole} />
    </MainLayout>
  );
};

export default Trading;
