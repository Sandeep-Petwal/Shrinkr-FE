
import React from 'react';

const Button = ({ 
  children, 
  type = 'button', 
  variant = 'primary', 
  onClick, 
  fullWidth = false,
  disabled = false,
  className = '',
}) => {
  const baseClasses = "px-4 py-2 rounded-md font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    dark: "bg-dark text-white hover:bg-opacity-90 focus:ring-gray-500"
  };
  
  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer";
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
