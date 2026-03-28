import React, { useState } from 'react';
import { TrendingUp, TrendingDown, Clock, Check } from 'lucide-react';
import ExpensePieChart from '../components/charts/ExpensePieChart';
import UserAvatar from '../components/ui/UserAvatar';
import { formatDate, parseDate } from '../utils/formatters';

const Dashboard = ({ user, transactions, userCategories, reminders = [], onPayReminder }) => {
  const [chartPeriod, setChartPeriod] = useState('mes');
  const income = transactions.filter(t => t.tipo === 'income').reduce((acc, curr) => acc + parseFloat(curr.valor), 0);
  const expense = transactions.filter(t => t.tipo === 'expense').reduce((acc, curr) => acc + parseFloat(curr.valor), 0);
  const balance = income - expense;

  const sortedReminders = [...reminders].sort((a, b) => parseDate(a.dataVencimento) - parseDate(b.dataVencimento));

  return (
    <div className="pb-24 md:pb-0">
      <div className="md:hidden card-gradient-animate p-6 rounded-b-3xl shadow-lg mb-6 animate-in slide-in-from-top-10 duration-500">
         <div className="flex items-center gap-3 mb-6"><UserAvatar user={user} size="w-12 h-12" textSize="text-lg" /><div><p className="text-gray-400 text-[10px]">Olá,</p><p className="text-white text-sm font-bold">{user.name}</p></div></div>
         <div className="text-center mb-6"><p className="text-gray-400 text-xs mb-1">Saldo geral</p><h2 className="text-3xl font-bold text-white">{balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2></div>
      </div>
      
      <div className="hidden md:flex justify-between items-end mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
        <div><h1 className="text-3xl font-bold text-white mb-1">Visão Geral</h1><p className="text-gray-400 text-sm">Bem-vindo de volta, {user.name}!</p></div>
        <div className="flex items-center gap-3 bg-[#1E1E1E] px-4 py-2 rounded-full border border-gray-800"><UserAvatar user={user} size="w-8 h-8" showBorder={false} /><span className="text-white text-sm font-medium pr-2">{user.email}</span></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-0">
        <div className="hidden md:flex flex-col justify-between card-gradient-animate p-6 rounded-2xl border border-gray-800 shadow-lg col-span-3 lg:col-span-1 h-64 relative overflow-hidden animate-in zoom-in-95 duration-500 delay-100">
           <div className="relative z-10"><p className="text-gray-400 text-sm mb-1">Saldo Disponível</p><h2 className="text-4xl font-bold text-white">{balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2></div>
           <div className="flex gap-3 relative z-10">
              <div className="flex items-center gap-2 text-green-400 text-xs font-bold bg-black/30 px-3 py-1 rounded-lg"><TrendingUp size={14}/> {income.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
              <div className="flex items-center gap-2 text-red-400 text-xs font-bold bg-black/30 px-3 py-1 rounded-lg"><TrendingDown size={14}/> {expense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</div>
           </div>
        </div>

        <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 md:col-span-2 h-auto md:h-64 flex flex-col animate-in zoom-in-95 duration-500 delay-200">
          <div className="flex justify-between items-center mb-2"><span className="text-white font-bold">Resumo de Gastos</span><div className="flex bg-[#0a0a0a] rounded-lg p-1">{['semana', 'mes', 'ano'].map((period) => (<button key={period} onClick={() => setChartPeriod(period)} className={`px-3 py-1 text-[10px] uppercase font-bold rounded-md transition-all duration-300 ${chartPeriod === period ? 'bg-cashGreen text-black shadow-md' : 'text-gray-500 hover:text-white'}`}>{period}</button>))}</div></div>
          <div className="flex-1 w-full flex items-center justify-center"><ExpensePieChart transactions={transactions} period={chartPeriod} userCategories={userCategories} /></div>
        </div>

        <div className="col-span-1 md:col-span-2 animate-in slide-in-from-bottom-8 duration-500 delay-300">
           <h3 className="text-gray-400 text-sm mb-4 px-1">Últimas movimentações</h3>
           <div className="grid grid-cols-1 gap-4">
              {transactions.length === 0 ? <div className="p-8 text-center border border-dashed border-gray-700 rounded-2xl text-gray-500">Nenhuma movimentação registrada.</div> : 
                transactions.slice(0, 4).map((t) => (
                  <div key={t.id} className="bg-[#1E1E1E] p-4 rounded-2xl flex items-center justify-between border border-gray-800 hover:border-gray-600 transition-all hover:scale-[1.02] cursor-default">
                    <div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${t.tipo === 'expense' ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>{t.tipo === 'expense' ? <TrendingDown size={18}/> : <TrendingUp size={18}/>}</div><div><p className="text-white text-sm font-bold">{t.descricao}</p><p className="text-gray-500 text-[10px]">{t.nomeCategoria || 'Geral'} • {formatDate(t.data)}</p></div></div>
                    <span className={`text-sm font-bold ${t.tipo === 'expense' ? 'text-white' : 'text-cashGreen'}`}>{t.tipo === 'expense' ? '- ' : '+ '}R$ {parseFloat(t.valor).toFixed(2)}</span>
                  </div>
                ))}
           </div>
        </div>

        <div className="col-span-1 animate-in slide-in-from-bottom-8 duration-500 delay-400">
           <h3 className="text-gray-400 text-sm mb-4 px-1">Contas Próximas</h3>
           <div className="flex flex-col gap-3">
              {sortedReminders.length === 0 ? (
                <div className="p-6 text-center border border-dashed border-gray-700 rounded-2xl text-gray-500 text-xs">
                    Sem contas pendentes!
                </div>
              ) : (
                sortedReminders.slice(0, 3).map((rem) => {
                    const today = new Date();
                    const dueDate = parseDate(rem.dataVencimento);
                    const isLate = dueDate < today.setHours(0,0,0,0);
                    const val = rem.valor ? parseFloat(rem.valor).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) : 'R$ --';
                    return (
                        <div key={rem.id} className={`p-4 rounded-2xl border flex items-center justify-between gap-2 transition-all hover:scale-[1.02] ${isLate ? 'bg-red-500/10 border-red-500/40' : 'bg-[#1E1E1E] border-gray-800'}`}>
                            <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isLate ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-400'}`}>
                                    <Clock size={18} />
                                </div>
                                <div>
                                    <p className="text-white text-xs font-bold">{rem.descricao}</p>
                                    <p className={`${isLate ? 'text-red-400' : 'text-gray-500'} text-[10px]`}>
                                        {isLate ? 'Venceu: ' : 'Vence: '} {formatDate(rem.dataVencimento)}
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-white text-xs font-bold mb-1">{val}</span>
                                <button onClick={() => onPayReminder(rem.id)} className="bg-cashGreen text-black p-1 rounded-full hover:scale-110 transition-transform" title="Pagar Conta">
                                    <Check size={12} strokeWidth={3} />
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