import React, { useState } from "react";
import Input from "../../Common/Input";
import Button from "../../Common/Button";
import { Check, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validations, setValidations] = useState({
    length: false,
    number: false,
    uppercase: false,
  });
  const [showNewPassword, setShowNewPassword] = useState(true); //  New Password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(true); //  Confirm Password visibility
  const navigate = useNavigate(); // Initialize useNavigate hook

  const validatePassword = (value) => {
    setValidations({
      length: value.length >= 8 && value.length <= 128,
      number: /\d/.test(value),
      uppercase: /[A-Z]/.test(value),
    });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const isPasswordValid = Object.values(validations).every(Boolean);
  const passwordsMatch = password === confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (isPasswordValid && passwordsMatch) {
      // Store the password in localStorage or update the backend
      localStorage.setItem("password", password);

      // Navigate to the homepage after successful reset
      navigate("/"); // Or use navigate("/login") if you want to redirect to a login page
    }
  };

  return (
    <div className="flex flex-col gap-[1rem] items-center justify-center px-4 sm:px-0 py-[2rem] bg-white">
      <div className="w-full max-w-sm p-6 sm:p-8 border-2 border-gray-200 rounded-3xl">
        <div className="mb-8 flex flex-col text-center gap-4">
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
            <h1 className="text-blue-600 text-2xl font-bold dark:text-blue-400">
              TaskFlow
            </h1>
          </div>
          <h1 className="text-3xl font-semibold text-left text-[#202630]">
            Reset Password
          </h1>
        </div>

        <div className="space-y-6">
          {/* New Password Input */}
          <div className="relative">
            <Input
              label="New Password"
              type={showNewPassword ? "password" : "text"} // Toggle visibility for new password
              placeholder=""
              name="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-gray-500"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
            <div className="mt-2 space-y-1">
              <div
                className={`flex items-center text-sm ${
                  validations.length ? "text-green-500" : "text-gray-500"
                }`}
              >
                <Check
                  size={16}
                  className={`mr-2 ${
                    validations.length ? "opacity-100" : "opacity-50"
                  }`}
                />
                8 to 128 characters
              </div>
              <div
                className={`flex items-center text-sm ${
                  validations.number ? "text-green-500" : "text-gray-500"
                }`}
              >
                <Check
                  size={16}
                  className={`mr-2 ${
                    validations.number ? "opacity-100" : "opacity-50"
                  }`}
                />
                At least 1 number
              </div>
              <div
                className={`flex items-center text-sm ${
                  validations.uppercase ? "text-green-500" : "text-gray-500"
                }`}
              >
                <Check
                  size={16}
                  className={`mr-2 ${
                    validations.uppercase ? "opacity-100" : "opacity-50"
                  }`}
                />
                At least 1 upper case letter
              </div>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <Input
              label="Confirm Password"
              type={showConfirmPassword ? "password" : "text"} // Toggle visibility for confirm password
              placeholder=""
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <button
              type="button"
              className="absolute right-3 top-8 text-gray-500"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <Button
            variant="primary"
            className="w-full text-center"
            type="submit"
            onClick={handleSubmit} // Handle the submit logic
            disabled={!isPasswordValid || !passwordsMatch}
            style={{
              opacity: isPasswordValid && passwordsMatch ? 1 : 0.5,
              cursor:
                isPasswordValid && passwordsMatch ? "pointer" : "not-allowed",
            }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
