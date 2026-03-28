import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Clock, Check, ArrowUpRight } from 'lucide-react';
import ExpensePieChart from '../components/charts/ExpensePieChart';
import UserAvatar from '../components/ui/UserAvatar';
import { formatDate, parseDate } from '../utils/formatters';

/* ── small helpers ──────────────────────────────────────────────── */
const MonoValue = ({ children, className = '' }) => (
  <span
    className={className}
    style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}
  >
    {children}
  </span>
);

const SectionLabel = ({ children }) => (
  <p
    className="text-[11px] font-semibold uppercase tracking-widest mb-4 px-1"
    style={{ color: 'rgba(255,255,255,0.25)', fontFamily: "'Space Grotesk', sans-serif" }}
  >
    {children}
  </p>
);

/* ── component ──────────────────────────────────────────────────── */
const Dashboard = ({ user, transactions, userCategories, reminders = [], onPayReminder }) => {
  const [chartPeriod, setChartPeriod] = useState('mes');

  const income  = transactions.filter(t => t.tipo === 'income').reduce((a, c) => a + parseFloat(c.valor), 0);
  const expense = transactions.filter(t => t.tipo === 'expense').reduce((a, c) => a + parseFloat(c.valor), 0);
  const balance = income - expense;
  const isPositive = balance >= 0;

  const sortedReminders = [...reminders].sort(
    (a, b) => parseDate(a.dataVencimento) - parseDate(b.dataVencimento)
  );

  return (
    <div className="pb-28 md:pb-8 px-5 md:px-0 pt-6 md:pt-0">

      {/* ── Mobile hero ─────────────────────────────────────────── */}
      <div
        className="md:hidden rounded-3xl p-6 mb-6 animate-in slide-in-from-bottom-4 duration-500 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(0,200,83,0.12) 0%, rgba(0,200,83,0.04) 50%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(32px) saturate(180%)',
          WebkitBackdropFilter: 'blur(32px) saturate(180%)',
          border: '1px solid rgba(0,200,83,0.18)',
          boxShadow: '0 1px 0 rgba(0,200,83,0.25) inset, 0 24px 60px rgba(0,0,0,0.5)',
        }}
      >
        {/* top line shimmer */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(0,200,83,0.5), transparent)' }}
        />

        <div className="flex items-center gap-3 mb-6">
          <UserAvatar user={user} size="w-11 h-11" textSize="text-sm" />
          <div>
            <p className="text-white/40 text-[11px] font-medium">Olá de volta,</p>
            <p className="text-white font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {user.name}
            </p>
          </div>
        </div>

        <div>
          <p className="text-white/30 text-[11px] font-medium uppercase tracking-wider mb-1">Saldo disponível</p>
          <MonoValue
            className={`text-3xl font-semibold ${isPositive ? 'text-white' : 'text-red-400'}`}
          >
            {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </MonoValue>
        </div>

        <div className="flex gap-3 mt-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: 'rgba(0,200,83,0.12)', border: '1px solid rgba(0,200,83,0.2)' }}>
            <TrendingUp size={12} className="text-green-400" />
            <MonoValue className="text-green-400 text-xs font-semibold">
              {income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </MonoValue>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}>
            <TrendingDown size={12} className="text-red-400" />
            <MonoValue className="text-red-400 text-xs font-semibold">
              {expense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </MonoValue>
          </div>
        </div>
      </div>

      {/* ── Desktop header ──────────────────────────────────────── */}
      <div className="hidden md:flex justify-between items-end mb-8 animate-in fade-in duration-500">
        <div>
          <h1
            className="text-3xl font-bold text-white mb-1"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}
          >
            Visão Geral
          </h1>
          <p className="text-white/35 text-sm">
            Bem-vindo de volta,{' '}
            <span className="text-white/60 font-medium">{user.name}</span>
          </p>
        </div>
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <UserAvatar user={user} size="w-8 h-8" showBorder={false} />
          <span className="text-white/50 text-sm pr-1">{user.email}</span>
        </div>
      </div>

      {/* ── Main grid ───────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Hero balance card — desktop */}
        <div
          className="hidden md:flex flex-col justify-between card-hero p-6 rounded-2xl h-64 animate-in zoom-in-95 duration-500 delay-100"
          style={{ boxShadow: '0 1px 0 rgba(0,200,83,0.3) inset, 0 30px 80px rgba(0,0,0,0.5)' }}
        >
          <div>
            <p
              className="text-[11px] uppercase tracking-widest font-semibold mb-3"
              style={{ color: 'rgba(0,200,83,0.7)', fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Saldo disponível
            </p>
            <MonoValue
              className={`text-4xl font-bold ${isPositive ? 'text-white' : 'text-red-400'}`}
            >
              {balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </MonoValue>
          </div>

          <div>
            <div
              className="h-px w-full mb-4"
              style={{ background: 'linear-gradient(90deg, rgba(0,200,83,0.3), transparent)' }}
            />
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-white/25 uppercase tracking-wider font-medium">Entradas</span>
                <MonoValue className="text-green-400 text-sm font-semibold">
                  + {income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </MonoValue>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-white/25 uppercase tracking-wider font-medium">Saídas</span>
                <MonoValue className="text-red-400 text-sm font-semibold">
                  − {expense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </MonoValue>
              </div>
            </div>
          </div>
        </div>

        {/* Expense chart */}
        <div
          className="card-hero p-5 rounded-2xl md:col-span-2 h-auto md:h-64 flex flex-col animate-in zoom-in-95 duration-500 delay-200"
          style={{ boxShadow: '0 1px 0 rgba(0,200,83,0.3) inset, 0 30px 80px rgba(0,0,0,0.5)' }}
        >
          <div className="flex justify-between items-center mb-3">
            <span
              className="text-white font-semibold text-sm"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Resumo de Gastos
            </span>
            <div
              className="flex p-1 rounded-xl gap-0.5"
              style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              {['semana', 'mes', 'ano'].map(period => (
                <button
                  key={period}
                  onClick={() => setChartPeriod(period)}
                  className="px-3 py-1 rounded-lg text-[10px] uppercase font-bold transition-all duration-200"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    letterSpacing: '0.06em',
                    ...(chartPeriod === period
                      ? {
                          background: '#00C853',
                          color: '#021a0b',
                          boxShadow: '0 2px 8px rgba(0,200,83,0.4)',
                        }
                      : { color: 'rgba(255,255,255,0.3)' }),
                  }}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <ExpensePieChart transactions={transactions} period={chartPeriod} userCategories={userCategories} />
          </div>
        </div>

        {/* Recent transactions */}
        <div className="col-span-1 md:col-span-2 animate-in slide-in-from-bottom-8 duration-500 delay-300">
          <SectionLabel>Últimas movimentações</SectionLabel>
          <div className="flex flex-col gap-3">
            {transactions.length === 0 ? (
              <div
                className="card-hero p-10 text-center rounded-2xl"
                style={{
                  border: '1px solid rgba(0,200,83,0.2)',
                  color: 'rgba(255,255,255,0.2)',
                  fontSize: '13px',
                  boxShadow: '0 1px 0 rgba(0,200,83,0.3) inset, 0 30px 80px rgba(0,0,0,0.5)',
                }}
              >
                Nenhuma movimentação registrada.
              </div>
            ) : (
              transactions.slice(0, 4).map(t => (
                <div
                  key={t.id}
                  className="glass flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group cursor-default"
                  style={{ '--hover-border': 'rgba(255,255,255,0.1)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateX(3px)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                      style={{
                        background: t.tipo === 'expense'
                          ? 'rgba(239,68,68,0.1)'
                          : 'rgba(0,200,83,0.1)',
                        border: `1px solid ${t.tipo === 'expense' ? 'rgba(239,68,68,0.2)' : 'rgba(0,200,83,0.2)'}`,
                        color: t.tipo === 'expense' ? '#ef4444' : '#00C853',
                      }}
                    >
                      {t.tipo === 'expense' ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
                    </div>
                    <div>
                      <p
                        className="text-white text-sm font-semibold"
                        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                      >
                        {t.descricao}
                      </p>
                      <p className="text-white/30 text-[11px] mt-0.5">
                        {t.nomeCategoria || 'Geral'} · {formatDate(t.data)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <MonoValue
                      className={`text-sm font-semibold ${t.tipo === 'expense' ? 'text-white/80' : 'text-green-400'}`}
                    >
                      {t.tipo === 'expense' ? '−' : '+'} R$ {parseFloat(t.valor).toFixed(2)}
                    </MonoValue>
                    <ArrowUpRight
                      size={14}
                      className="text-white/0 group-hover:text-white/20 transition-colors"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Reminders */}
        <div className="col-span-1 animate-in slide-in-from-bottom-8 duration-500 delay-400">
          <SectionLabel>Contas Próximas</SectionLabel>
          <div className="flex flex-col gap-3">
            {sortedReminders.length === 0 ? (
              <div
                className="card-hero p-8 text-center rounded-2xl text-[13px]"
                style={{
                  border: '1px solid rgba(0,200,83,0.2)',
                  color: 'rgba(255,255,255,0.2)',
                  boxShadow: '0 1px 0 rgba(0,200,83,0.3) inset, 0 30px 80px rgba(0,0,0,0.5)',
                }}
              >
                Sem contas pendentes!
              </div>
            ) : (
              sortedReminders.slice(0, 3).map(rem => {
                const today = new Date();
                const dueDate = parseDate(rem.dataVencimento);
                const isLate = dueDate < today.setHours(0, 0, 0, 0);
                const val = rem.valor
                  ? parseFloat(rem.valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                  : 'R$ --';

                return (
                  <div
                    key={rem.id}
                    className="flex items-center justify-between p-4 rounded-2xl transition-all duration-300"
                    style={{
                      background: isLate
                        ? 'rgba(239,68,68,0.07)'
                        : 'rgba(255,255,255,0.03)',
                      border: isLate
                        ? '1px solid rgba(239,68,68,0.25)'
                        : '1px solid rgba(255,255,255,0.06)',
                      backdropFilter: 'blur(20px)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.01)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{
                          background: isLate ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.05)',
                          border: isLate ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(255,255,255,0.08)',
                          color: isLate ? '#ef4444' : 'rgba(255,255,255,0.4)',
                        }}
                      >
                        <Clock size={16} />
                      </div>
                      <div>
                        <p
                          className="text-white text-xs font-semibold"
                          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                        >
                          {rem.descricao}
                        </p>
                        <p
                          className="text-[10px] mt-0.5"
                          style={{ color: isLate ? '#ef4444' : 'rgba(255,255,255,0.3)' }}
                        >
                          {isLate ? '⚠ Venceu: ' : 'Vence: '}
                          {formatDate(rem.dataVencimento)}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1.5">
                      <MonoValue className="text-white text-xs font-semibold">{val}</MonoValue>
                      <button
                        onClick={() => onPayReminder(rem.id)}
                        className="w-7 h-7 rounded-xl flex items-center justify-center transition-all duration-200"
                        style={{
                          background: '#00C853',
                          boxShadow: '0 2px 8px rgba(0,200,83,0.4)',
                        }}
                        title="Marcar como pago"
                        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.12)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                      >
                        <Check size={12} strokeWidth={3} color="#021a0b" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
