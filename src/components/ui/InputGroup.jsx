import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const InputGroup = ({
  label,
  type = 'text',
  placeholder,
  isPassword = false,
  darkTheme = false,
  value,
  onChange,
  name,
  required = false,
  maxLength,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col gap-1.5 mb-3 w-full">
      {label && (
        <label
          className="text-[11px] font-semibold uppercase tracking-widest ml-1"
          style={{
            color: 'rgba(255,255,255,0.35)',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={isPassword && !showPassword ? 'password' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
          maxLength={maxLength}
          className="w-full h-12 pl-5 pr-12 rounded-2xl text-sm font-medium transition-all duration-200 outline-none"
          style={{
            background: darkTheme
              ? 'rgba(255,255,255,0.04)'
              : 'rgba(255,255,255,0.92)',
            border: darkTheme
              ? '1px solid rgba(255,255,255,0.07)'
              : '1px solid rgba(0,0,0,0.08)',
            color: darkTheme ? '#e8ede9' : '#111',
            backdropFilter: darkTheme ? 'blur(10px)' : 'none',
            WebkitBackdropFilter: darkTheme ? 'blur(10px)' : 'none',
            boxShadow: darkTheme
              ? '0 1px 0 rgba(255,255,255,0.04) inset, 0 4px 20px rgba(0,0,0,0.2)'
              : '0 1px 0 rgba(255,255,255,0.8) inset, 0 2px 8px rgba(0,0,0,0.06)',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
          onFocus={e => {
            if (darkTheme) {
              e.target.style.borderColor = 'rgba(0,200,83,0.35)';
              e.target.style.boxShadow = '0 0 0 3px rgba(0,200,83,0.08), 0 1px 0 rgba(255,255,255,0.04) inset';
              e.target.style.background = 'rgba(0,200,83,0.05)';
            } else {
              e.target.style.boxShadow = '0 0 0 3px rgba(0,200,83,0.15), 0 1px 0 rgba(255,255,255,0.8) inset';
              e.target.style.borderColor = 'rgba(0,200,83,0.4)';
            }
          }}
          onBlur={e => {
            if (darkTheme) {
              e.target.style.borderColor = 'rgba(255,255,255,0.07)';
              e.target.style.boxShadow = '0 1px 0 rgba(255,255,255,0.04) inset, 0 4px 20px rgba(0,0,0,0.2)';
              e.target.style.background = 'rgba(255,255,255,0.04)';
            } else {
              e.target.style.boxShadow = '0 1px 0 rgba(255,255,255,0.8) inset, 0 2px 8px rgba(0,0,0,0.06)';
              e.target.style.borderColor = 'rgba(0,0,0,0.08)';
            }
          }}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 transition-opacity duration-200"
            style={{ color: 'rgba(255,255,255,0.25)', opacity: 0.7 }}
            onMouseEnter={e => { e.currentTarget.style.opacity = 1; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = 0.7; }}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputGroup;
