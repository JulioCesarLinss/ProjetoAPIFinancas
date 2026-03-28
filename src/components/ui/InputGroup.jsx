import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputGroup = ({ label, type = 'text', placeholder, isPassword = false, darkTheme = false, value, onChange, name, required = false, maxLength }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex flex-col gap-2 mb-3 w-full">
      {label && <label className="text-gray-300 font-bold text-xs ml-1 tracking-wide">{label}</label>}
      <div className="relative">
        <input
          type={isPassword && !showPassword ? 'password' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
          maxLength={maxLength}
          className={`w-full h-12 pl-6 pr-12 rounded-2xl outline-none border-none shadow-lg text-sm font-medium transition-all focus:ring-2 focus:ring-cashGreen 
            ${darkTheme ? 'bg-[#2C2C2C] text-white placeholder-gray-500' : 'bg-white text-black placeholder-gray-400'}`}
        />
        {isPassword && (
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-white transition-colors">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputGroup;