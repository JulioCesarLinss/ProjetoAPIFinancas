import React from 'react';
import { DEFAULT_CATEGORIES, getColorByName } from '../../utils/constants';
import { parseDate } from '../../utils/formatters';

const ExpensePieChart = ({ transactions, period, userCategories }) => {
  const filteredTransactions = transactions.filter(t => {
    if (t.tipo !== 'expense' && t.tipo !== 'despesa') return false; 
    const tDate = parseDate(t.data);
    const now = new Date();
    if (period === 'semana') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(now.getDate() - 7);
      return tDate >= oneWeekAgo && tDate <= now;
    } else if (period === 'mes') return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
    else if (period === 'ano') return tDate.getFullYear() === now.getFullYear();
    return true;
  });

  const totalsByCategory = {};
  let totalExpense = 0;
  filteredTransactions.forEach(t => {
    const cat = t.nomeCategoria || 'Outros';
    const val = parseFloat(t.valor);
    totalsByCategory[cat] = (totalsByCategory[cat] || 0) + val;
    totalExpense += val;
  });

  let gradientString = totalExpense === 0 ? '#2C2C2C 0deg 360deg' : '';
  let currentDeg = 0;
  const legendData = [];
  const allCats = [...DEFAULT_CATEGORIES, ...userCategories];

  if (totalExpense > 0) {
    Object.keys(totalsByCategory).forEach((catName) => {
      const percent = totalsByCategory[catName] / totalExpense;
      const deg = percent * 360;
      const foundCat = allCats.find(c => c.nome === catName);
      const color = foundCat ? (foundCat.cor || foundCat.color) : getColorByName(catName);
      gradientString += `${color} ${currentDeg}deg ${currentDeg + deg}deg, `;
      currentDeg += deg;
      legendData.push({ label: catName, value: totalsByCategory[catName], color: color, percent: (percent * 100).toFixed(0) });
    });
    gradientString = gradientString.slice(0, -2);
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-center w-full h-full gap-6 md:gap-12 animate-in fade-in duration-700">
      <div className="relative w-40 h-40 md:w-44 md:h-44 rounded-full shadow-2xl flex-shrink-0 chart-sliver-ring" style={{ background: `conic-gradient(${gradientString})` }}>
         <div className="absolute inset-4 bg-[#1E1E1E] rounded-full flex items-center justify-center flex-col z-10">
            <span className="text-gray-400 text-[10px]">Total Gastos</span>
            <span className="text-white font-bold text-sm md:text-base">
              {totalExpense.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
         </div>
      </div>
      <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar min-w-[140px]">
        {legendData.length === 0 && <p className="text-gray-500 text-xs text-center">Sem gastos neste período.</p>}
        {legendData.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between gap-4 text-xs md:text-sm animate-in slide-in-from-right-4 fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div><span className="text-gray-300 truncate max-w-[80px]">{item.label}</span></div>
             <div className="flex gap-2"><span className="text-white font-bold">R$ {item.value}</span><span className="text-gray-500 w-7 text-right">{item.percent}%</span></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensePieChart;