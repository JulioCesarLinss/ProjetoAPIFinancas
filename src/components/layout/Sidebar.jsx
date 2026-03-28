import React from 'react';
import { Home, ArrowLeftRight, BarChart3, User, LogOut } from 'lucide-react';
import Logo from './Logo';
import UserAvatar from '../ui/UserAvatar';

const Sidebar = ({ activeTab, setActiveTab, onLogout, user, transactions = [] }) => {
  const income = transactions.filter(t => t.tipo === 'income').reduce((acc, curr) => acc + parseFloat(curr.valor), 0);
  const expense = transactions.filter(t => t.tipo === 'expense').reduce((acc, curr) => acc + parseFloat(curr.valor), 0);
  const balance = income - expense;
  
  const navItems = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Visão Geral' },
    { id: 'transacoes', icon: <ArrowLeftRight size={20} />, label: 'Transações' },
    { id: 'planejamento', icon: <BarChart3 size={20} />, label: 'Planejamento' },
    { id: 'perfil', icon: <User size={20} />, label: 'Meu Perfil' },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 h-screen bg-[#0F0F0F] border-r border-gray-800 p-6 fixed left-0 top-0">
      <div className="mb-10 pl-2"><Logo small /></div>
      <div className="mb-8 flex items-center gap-3 px-2 animate-in fade-in slide-in-from-left-4 duration-700">
         <UserAvatar user={user} size="w-10 h-10" />
         <div className="overflow-hidden"><p className="text-white text-sm font-bold truncate">{user.name}</p><p className="text-gray-500 text-xs truncate">Saldo: {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p></div>
      </div>
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <button key={item.id} onClick={() => setActiveTab(item.id)} className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm ${activeTab === item.id ? 'bg-cashGreen/10 text-cashGreen font-bold translate-x-2' : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white hover:translate-x-1'}`}>
            {item.icon}{item.label}
          </button>
        ))}
      </nav>
      <button onClick={onLogout} className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/10 rounded-xl text-sm font-bold mt-auto transition-colors"><LogOut size={20} />Sair</button>
    </div>
  );
};

export default Sidebar;