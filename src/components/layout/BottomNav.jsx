import React from 'react';
import { Home, ArrowLeftRight, BarChart3, User } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Início' },
    { id: 'transacoes', icon: <ArrowLeftRight size={20} />, label: 'Transações' },
    { id: 'planejamento', icon: <BarChart3 size={20} />, label: 'Plan.' },
    { id: 'perfil', icon: <User size={20} />, label: 'Perfil' },
  ];
  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-[#1E1E1E] border-t border-gray-800 px-6 py-3 flex justify-between items-center z-50">
      {navItems.map((item) => (
        <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex flex-col items-center gap-1 transition-all duration-300 ${activeTab === item.id ? 'text-cashGreen scale-110' : 'text-gray-500 hover:text-gray-300'}`}>
          {item.icon}
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;