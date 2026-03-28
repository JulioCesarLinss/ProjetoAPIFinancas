import React from 'react';
import { Home, ArrowLeftRight, BarChart3, User, LogOut } from 'lucide-react';
import Logo from './Logo';
import UserAvatar from '../ui/UserAvatar';

const Sidebar = ({ activeTab, setActiveTab, onLogout, user, transactions = [] }) => {
  const income  = transactions.filter(t => t.tipo === 'income').reduce((acc, curr) => acc + parseFloat(curr.valor), 0);
  const expense = transactions.filter(t => t.tipo === 'expense').reduce((acc, curr) => acc + parseFloat(curr.valor), 0);
  const balance = income - expense;
  const isPositive = balance >= 0;

  return (
    <div
      className="hidden md:flex flex-col w-64 h-screen glass-heavy fixed left-0 top-0 z-50"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* ── Logo ─────────────────────────────── */}
      <div className="px-6 pt-6 pb-2">
        <Logo small />
      </div>

      {/* ── Thin divider ─────────────────────── */}
      <div className="mx-6 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-4" />

      {/* ── User Chip ────────────────────────── */}
      <div className="mx-4 mb-6 animate-in fade-in slide-in-from-left-4 duration-700">
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <UserAvatar user={user} size="w-9 h-9" textSize="text-xs" />
          <div className="overflow-hidden flex-1 min-w-0">
            <p
              className="text-white text-sm font-semibold truncate"
              style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.01em' }}
            >
              {user.name || 'Usuário'}
            </p>
            <p
              className="text-xs truncate mt-0.5 font-medium tabular-nums"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '11px',
                color: isPositive ? '#00C853' : '#ef4444',
              }}
            >
              {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </p>
          </div>
        </div>
      </div>

      {/* ── Navigation ───────────────────────── */}
      <nav className="flex-1 flex flex-col gap-2 px-4">
        {/* Seção Principal */}
        <p
          className="text-[10px] font-semibold uppercase tracking-widest text-white/20 px-3 mt-2 mb-1"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Principal
        </p>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`nav-item flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full text-left transition-all duration-300 ${
            activeTab === 'dashboard'
              ? 'bg-gradient-to-r from-[rgba(0,200,83,0.15)] to-[rgba(0,200,83,0.05)] border border-[rgba(0,200,83,0.2)] text-white'
              : 'text-white/60 hover:text-white hover:bg-[rgba(255,255,255,0.03)]'
          }`}
        >
          <Home size={18} className={activeTab === 'dashboard' ? 'text-cashGreen' : ''} />
          <span className="flex-1">Visão Geral</span>
          {activeTab === 'dashboard' && <div className="w-1.5 h-1.5 rounded-full bg-cashGreen" />}
        </button>

        {/* Seção de Gerenciamento */}
        <p
          className="text-[10px] font-semibold uppercase tracking-widest text-white/20 px-3 mt-4 mb-1"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Gerenciar
        </p>
        {[
          { id: 'transacoes', label: 'Transações', icon: <ArrowLeftRight size={18} /> },
          { id: 'planejamento', label: 'Planejamento', icon: <BarChart3 size={18} /> },
        ].map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full text-left transition-all duration-300 ${
                isActive
                  ? 'bg-[rgba(0,200,83,0.1)] text-white'
                  : 'text-white/60 hover:text-white hover:bg-[rgba(255,255,255,0.03)]'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
              {isActive && <div className="w-1 h-4 rounded-full bg-cashGreen ml-auto" />}
            </button>
          );
        })}

        {/* Seção de Conta */}
        <p
          className="text-[10px] font-semibold uppercase tracking-widest text-white/20 px-3 mt-4 mb-1"
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          Conta
        </p>
        <button
          onClick={() => setActiveTab('perfil')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium w-full text-left transition-all duration-300 ${
            activeTab === 'perfil'
              ? 'bg-[rgba(0,200,83,0.1)] text-white'
              : 'text-white/60 hover:text-white hover:bg-[rgba(255,255,255,0.03)]'
          }`}
        >
          {<User size={18} />}
          <span>Meu Perfil</span>
          {activeTab === 'perfil' && <div className="w-1 h-4 rounded-full bg-cashGreen ml-auto" />}
        </button>
      </nav>

      {/* ── Bottom: logout ────────────── */}
      <div className="mx-4 mb-4">
        <button
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm font-medium transition-all duration-200"
          style={{
            color: 'rgba(239,68,68,0.6)',
            border: '1px solid rgba(239,68,68,0.1)',
            background: 'transparent',
            fontFamily: "'Space Grotesk', sans-serif",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#ef4444';
            e.currentTarget.style.background = 'rgba(239,68,68,0.06)';
            e.currentTarget.style.borderColor = 'rgba(239,68,68,0.25)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'rgba(239,68,68,0.6)';
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(239,68,68,0.1)';
          }}
        >
          <LogOut size={16} />
          Sair da conta
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
