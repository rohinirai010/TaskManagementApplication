import React, { useState, useCallback, useEffect } from "react";
import Input from "../../Common/Input";
import Button from "../../Common/Button";
import { PiInfoFill } from "react-icons/pi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmailVerify = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60); // Timer for resend
  const [canResend, setCanResend] = useState(false); // To manage resend button visibility
  const maxAttempts = 3;

  // Retrieve email/phone from localStorage
  const emailPhone = localStorage.getItem("emailPhone");

  // Timer function to manage resend countdown
  const startBlockTimer = useCallback(() => {
    setIsBlocked(true);
    setError("Too many attempts. Please try again in 1 minute.");

    // Reset after 1 minute
    setTimeout(() => {
      setIsBlocked(false);
      setAttempts(0);
      setError("");
    }, 60000);
  }, []);

  // Start the countdown for resend code button
  useEffect(() => {
    if (remainingTime === 0) return;

    const timer = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setCanResend(true); // Enable resend button after 60 seconds
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);

  // Function to generate a random 6-digit code and store it in localStorage
  const generateVerificationCode = () => {
    const code = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit code
    localStorage.setItem("verificationCode", code); // Store the generated code in localStorage
    return code;
  };

  // Handle code input change
  const handleCodeChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit to 6 digits
    if (/^\d*$/.test(value) && value.length <= 6) {
      setVerificationCode(value);
      setError("");
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isBlocked) return;

    // Get the verification code from localStorage
    const storedCode = localStorage.getItem("verificationCode");

    if (verificationCode.length !== 6) {
      setError("Please enter a 6-digit code");
      return;
    }

    setAttempts((prev) => {
      const newAttempts = prev + 1;
      if (newAttempts >= maxAttempts) {
        startBlockTimer();
      }
      return newAttempts;
    });

    // Check if the entered code matches the stored code
    if (verificationCode === storedCode) {
      // If the code is correct, navigate to the next page
      window.location.href = "/create-password"; // You can change this to navigate to your next page
    } else {
      setError("Incorrect code. Please try again.");
    }
  };

  // Handle resend code logic
  const handleResendCode = () => {
    // Start a new 60-second timer after requesting a new code
    setRemainingTime(60);
    setCanResend(false);

    // Generate a new verification code and store it in localStorage
    const code = generateVerificationCode();

    // Display the code in a Toastify message
    toast.success(`Your verification code is: ${code}`, {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 5000, // Hide after 5 seconds
    });
  };

  // Show the verification code on page load (when navigating from RegisterForm)
  useEffect(() => {
    // Check if there's a verification code in localStorage and display it
    const storedCode = localStorage.getItem("verificationCode");
    if (storedCode) {
      toast.success(`Your verification code is: ${storedCode}`, {
        autoClose: 5000, // Hide after 5 seconds
      });
    } else {
      // Generate and show a new code if none exists in localStorage
      const code = generateVerificationCode();
      toast.success(`Your verification code is: ${code}`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 5000, // Hide after 5 seconds
      });
    }
  }, []); // Only run on mount

  return (
    <div className="flex flex-col gap-[1rem] items-center justify-center min-h-screen px-4 sm:px-0 py-[2rem] bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-sm p-6 sm:p-8 bg-white shadow-lg border-2 border-blue-100 rounded-2xl dark:bg-gray-800 dark:border-gray-700">
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
            <h1 className="text-blue-600 text-2xl font-bold dark:text-blue-400">TaskFlow</h1>
          </div>

          <h1 className="text-3xl font-semibold text-left text-gray-800 dark:text-white">
            Verify your email
          </h1>
          <p className="text-sm font-medium text-left text-gray-600 dark:text-gray-300">
            A 6-digit code has been sent to <br /> {emailPhone}.
            Please enter it within the next 30 minutes.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Input
              label="Verification Code"
              placeholder=""
              name="verificationCode"
              value={verificationCode}
              onChange={handleCodeChange}
              disabled={isBlocked}
              error={error}
            />
            {error && <p className="mt-2 text-sm text-red-500 dark:text-red-400">{error}</p>}

            {!canResend ? (
              <div className="absolute right-2 top-[68%] transform -translate-y-1/2 flex items-center gap-1">
                <span className="text-sm text-gray-400 dark:text-gray-500">Code sent</span>
                <button type="button" className="text-gray-400 dark:text-gray-500 relative group">
                  <PiInfoFill />
                  <div className="absolute top-[1.8rem] mb-2 left-[-4.5rem] transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 dark:bg-gray-700 text-white text-xs rounded-md w-[12rem] px-3 py-1 z-10">
                    You can request a new code in{" "}
                    <span className="text-blue-400 font-bold text-lg">
                      {remainingTime}{" "}
                    </span>{" "}
                    seconds. The code will expire in 30 minutes.
                  </div>
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="absolute right-2 top-[68%] transform -translate-y-1/2 text-sm text-blue-600 hover:text-blue-500 font-semibold dark:text-blue-400 dark:hover:text-blue-300"
                onClick={handleResendCode}
              >
                Resend Code
              </button>
            )}
          </div>
          <a href="/create-password">
            <Button
              variant="primary"
              className="w-full text-center mt-[1.5rem] bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              type="submit"
              disabled={isBlocked || verificationCode.length !== 6}
              style={{
                opacity: isBlocked || verificationCode.length !== 6 ? 0.5 : 1,
                cursor: isBlocked || verificationCode.length !== 6 ? "not-allowed" : "pointer",
              }}
            >
              Next
            </Button>
          </a>
        </form>
        <div className="text-center mt-4">
          <a
            href="/register"
            className="text-blue-600 hover:text-blue-500 font-semibold text-sm dark:text-blue-400 dark:hover:text-blue-300"
          >
            Didn't receive the code?
          </a>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EmailVerify;