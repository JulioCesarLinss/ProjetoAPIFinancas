import React from 'react';
import { Home, ArrowLeftRight, BarChart3, User } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'dashboard',    icon: <Home size={20} />,          label: 'Início'    },
    { id: 'transacoes',   icon: <ArrowLeftRight size={20} />, label: 'Transações'},
    { id: 'planejamento', icon: <BarChart3 size={20} />,      label: 'Plan.'     },
    { id: 'perfil',       icon: <User size={20} />,           label: 'Perfil'    },
  ];

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 w-full z-50"
      style={{
        padding: '0 16px 12px',
        paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
      }}
    >
      <div
        className="flex justify-between items-center px-2 py-2 rounded-2xl"
        style={{
          background: 'rgba(10,14,12,0.85)',
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          border: '1px solid rgba(255,255,255,0.07)',
          boxShadow: '0 1px 0 rgba(255,255,255,0.06) inset, 0 -20px 60px rgba(0,0,0,0.5)',
        }}
      >
        {navItems.map(item => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-300 relative flex-1"
              style={{
                color: isActive ? '#00C853' : 'rgba(255,255,255,0.3)',
                ...(isActive && {
                  background: 'rgba(0,200,83,0.1)',
                }),
              }}
            >
              {isActive && (
                <span
                  className="absolute top-1 w-4 h-0.5 rounded-full"
                  style={{ background: '#00C853', boxShadow: '0 0 6px #00C853' }}
                />
              )}
              <span
                className="transition-transform duration-300"
                style={{ transform: isActive ? 'scale(1.1)' : 'scale(1)' }}
              >
                {item.icon}
              </span>
              <span
                className="text-[9px] font-semibold uppercase tracking-wider"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
