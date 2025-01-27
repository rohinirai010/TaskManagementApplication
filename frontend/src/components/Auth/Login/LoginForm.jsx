import React, { useState } from "react";
import Input from "../../Common/Input";
import Button from "../../Common/Button";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  // State to hold form values and error messages
  const [formData, setFormData] = useState({
    emailOrPhone: "",
  });
  const [errors, setErrors] = useState({
    emailOrPhone: "",
  });

  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Validate input fields
  const validate = () => {
    const newErrors = {};
    const emailOrPhone = formData.emailOrPhone;

    // Check if email or phone is empty
    if (!emailOrPhone) {
      newErrors.emailOrPhone = "Email or phone number is required";
    } else if (
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(emailOrPhone) &&
      !/^\d+$/.test(emailOrPhone)
    ) {
      // Check for invalid email or phone format
      newErrors.emailOrPhone = "Invalid email or phone number format";
    }

    setErrors(newErrors);
    return newErrors;
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the input
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // Store email/phone in localStorage for later use
      localStorage.setItem("emailPhone", formData.emailOrPhone);

      // Navigate to EnterPassword page
      navigate("/enter-password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input
        label="Email/Phone number"
        placeholder="Email/Phone (without country code)"
        name="emailOrPhone"
        value={formData.emailOrPhone}
        onChange={handleChange}
        error={errors.emailOrPhone}
      />
      <Button variant="primary" className="w-full text-center" type="submit">
        Next
      </Button>
    </form>
  );
};

export default LoginForm;
