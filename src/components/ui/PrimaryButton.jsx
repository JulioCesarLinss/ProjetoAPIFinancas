import React from 'react';

const PrimaryButton = ({ label, icon, onClick, variant = 'primary', fullWidth = true, type = "button" }) => (
  <button
    onClick={onClick}
    type={type}
    className={`${fullWidth ? 'w-full' : 'px-8'} h-12 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all duration-300 active:scale-95
      ${variant === 'primary' ? 'btn-liquid' : 'bg-[#2C2C2C] text-cashGreen border border-cashGreen hover:bg-opacity-80'}`}
  >
    {label}
    {icon}
  </button>
);

export default PrimaryButton;