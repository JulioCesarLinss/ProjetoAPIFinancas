import React from 'react';
import logoImg from '../../assets/logo.png'; 

const Logo = ({ small = false }) => (
  <div className={`flex items-center ${small ? 'justify-start pl-2 py-2' : 'justify-center mb-4'} animate-in fade-in duration-700`}>
    <img 
      src={logoImg} 
      alt="Logo Cash+" 
      className={`${small ? 'h-20 w-auto' : 'w-72 h-auto'} object-contain drop-shadow-lg transition-all duration-300`}
    />
  </div>
);

export default Logo;