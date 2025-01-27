import React from "react";
import RegisterForm from "../components/Auth/Register/RegisterForm";
const Register = () => {
  return (
    <div className="flex flex-col gap-[1rem] items-center justify-center min-h-screen px-4 sm:px-0 py-[2rem] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-sm p-6 sm:p-8 bg-white border-2 border-blue-100 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-700">
        <div className="mb-8 flex flex-col text-start justify-start gap-4">
          <div className="flex flex-row items-center justify-start gap-2">
            <svg
              className="w-8 h-8 text-blue-600 dark:text-blue-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
            <h1 className="text-blue-600 text-xl font-bold dark:text-blue-400">TaskFlow</h1>
          </div>
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white ">Join TaskFlow Today</h1>
        </div>
        <RegisterForm />
      </div>
      <div className="text-center flex flex-row gap-2">
        <a href="/register" className="text-blue-600 hover:text-blue-500 font-semibold text-sm dark:text-blue-400 dark:hover:text-blue-300">
          Sign up as an organization <span className="text-gray-600 dark:text-gray-400">or </span>
        </a>
        <a href="/login" className="text-blue-600 hover:text-blue-500 font-semibold text-sm dark:text-blue-400 dark:hover:text-blue-300">
          Log in
        </a>
      </div>
    </div>
  );
};
export default Register;