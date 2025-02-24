import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset"; // ✅ Tambahkan type button
}

const Button = ({ children, onClick, disabled, className, type = "button" }: ButtonProps) => {
  return (
    <button
      type={type} // ✅ Pastikan button memiliki type
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
