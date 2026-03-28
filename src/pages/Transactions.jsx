import React, { useState } from 'react';
import { Plus, X, ArrowLeftRight, Trash2 } from 'lucide-react';
import InputGroup from '../components/ui/InputGroup';
import PrimaryButton from '../components/ui/PrimaryButton';
import { DEFAULT_CATEGORIES, getColorByName } from '../utils/constants';
import { formatDate } from '../utils/formatters';

const Transactions = ({ transactions, onAddTransaction, onDeleteTransaction, userCategories, onAddCategory, onDeleteCategory }) => {
  const [showForm, setShowForm] = useState(false);
  const [showCatForm, setShowCatForm] = useState(false);
  const [newTrans, setNewTrans] = useState({ name: '', value: '', type: 'expense', category: 'Outros' });
  const [newCatName, setNewCatName] = useState('');

  const allCategories = [...DEFAULT_CATEGORIES, ...userCategories];

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newTrans.name || !newTrans.value) return;
    onAddTransaction({ 
        descricao: newTrans.name, 
        valor: newTrans.value, 
        tipo: newTrans.type, 
        nomeCategoria: newTrans.category 
    });
    setNewTrans({ name: '', value: '', type: 'expense', category: 'Outros' });
    setShowForm(false);
  };

  const handleCreateCategory = (e) => {
      e.preventDefault();
      if(newCatName) {
          onAddCategory(newCatName);
          setNewCatName('');
          setShowCatForm(false);
      }
  }

  return (
    <div className="h-full flex flex-col">
       <div className="flex items-center justify-between mb-6 px-6 md:px-0 pt-6 md:pt-0">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Todas as Transações</h2>
          <button onClick={() => setShowForm(!showForm)} className="bg-cashGreen hover:bg-green-400 text-black px-4 py-2 rounded-full flex items-center gap-2 font-bold text-sm transition-all hover:scale-105 active:scale-95">
            {showForm ? <X size={18}/> : <Plus size={18}/>}<span className="hidden md:inline">{showForm ? 'Cancelar' : 'Nova Transação'}</span>
          </button>
       </div>
       {showForm && (
         <div className="px-6 md:px-0 mb-6 animate-in slide-in-from-top-10 fade-in duration-300">
           <form onSubmit={handleSubmit} className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-700 max-w-2xl">
              <h3 className="text-white font-bold mb-4">Adicionar Movimentação</h3>
              <div className="flex gap-2 mb-4">
                <button type="button" onClick={() => setNewTrans({...newTrans, type: 'expense'})} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${newTrans.type === 'expense' ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-400'}`}>Despesa</button>
                <button type="button" onClick={() => setNewTrans({...newTrans, type: 'income'})} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${newTrans.type === 'income' ? 'bg-green-500 text-white' : 'bg-gray-800 text-gray-400'}`}>Receita</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup darkTheme placeholder="Descrição (ex: Mercado)" value={newTrans.name} onChange={e => setNewTrans({...newTrans, name: e.target.value})} />
                <InputGroup darkTheme placeholder="Valor (ex: 150.00)" type="number" value={newTrans.value} onChange={e => setNewTrans({...newTrans, value: e.target.value})} />
                
                {newTrans.type === 'expense' && (
                  <div className="md:col-span-2 flex flex-col gap-2 animate-in fade-in duration-300">
                       <div className="flex justify-between items-center">
                          <label className="text-gray-300 font-bold text-xs ml-1">Categoria</label>
                          <button type="button" onClick={() => setShowCatForm(!showCatForm)} className="text-cashGreen text-xs font-bold hover:underline flex items-center gap-1"><Plus size={12}/> Nova Categoria</button>
                       </div>
                       
                       {showCatForm && (
                           <div className="flex gap-2 mb-2 animate-in slide-in-from-top-2">
                               <input type="text" placeholder="Nome da nova categoria" className="flex-1 bg-[#2C2C2C] text-white rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-cashGreen" value={newCatName} onChange={e => setNewCatName(e.target.value)} />
                               <button type="button" onClick={handleCreateCategory} className="bg-cashGreen text-black px-3 py-2 rounded-lg text-xs font-bold hover:bg-green-400">Salvar</button>
                           </div>
                       )}

                       <div className="flex flex-wrap gap-3 p-2 max-h-32 overflow-y-auto custom-scrollbar">
                          {allCategories.map(cat => {
                             const isCustom = !!cat.id;
                             const catColor = cat.cor || cat.color || getColorByName(cat.nome);
                             return (
                               <div key={cat.nome || cat.id} className="relative group">
                                  <button type="button" onClick={() => setNewTrans({...newTrans, category: cat.nome})} className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${newTrans.category === cat.nome ? 'border-transparent text-black' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`} style={{ backgroundColor: newTrans.category === cat.nome ? catColor : 'transparent' }}>{cat.nome}</button>
                                  {isCustom && (
                                      <button type="button" onClick={(e) => { e.stopPropagation(); onDeleteCategory(cat.id); }} className="absolute -top-2 -right-2 z-10 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] opacity-0 group-hover:opacity-100 transition-all shadow-md hover:scale-110">
                                          <X size={12} strokeWidth={3} />
                                      </button>
                                  )}
                               </div>
                             );
                          })}
                       </div>
                  </div>
                )}
                <div className="mt-4 md:col-span-2"><PrimaryButton label="Confirmar" onClick={handleSubmit} /></div>
              </div>
           </form>
         </div>
       )}
       <div className="flex-1 overflow-y-auto px-6 md:px-0 pb-24 md:pb-0">
          <div className="grid grid-cols-1 gap-3">
             {transactions.length === 0 && <div className="flex flex-col items-center justify-center mt-20 text-gray-600 animate-in fade-in duration-700"><div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 opacity-50"><ArrowLeftRight size={30} /></div><p>Nenhuma transação encontrada.</p></div>}
             {transactions.map((t, idx) => (
                <div key={t.id} className="flex justify-between items-center p-4 bg-[#1E1E1E] hover:bg-[#252525] rounded-xl border border-gray-800 transition-all hover:scale-[1.01] animate-in slide-in-from-bottom-4 fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                   <div className="flex items-center gap-4"><div className={`w-2 h-10 rounded-full ${t.tipo === 'income' ? 'bg-cashGreen' : 'bg-red-500'}`}></div><div><p className="text-white text-sm font-bold">{t.descricao}</p><p className="text-gray-500 text-xs">{formatDate(t.data)} {t.tipo === 'expense' && `• ${t.nomeCategoria || 'Outros'}`}</p></div></div>
                   <div className="flex items-center gap-4"><span className={`font-bold text-sm ${t.tipo === 'income' ? 'text-cashGreen' : 'text-white'}`}>{t.tipo === 'expense' ? '-' : '+'} R$ {parseFloat(t.valor).toFixed(2)}</span><button onClick={() => onDeleteTransaction(t.id)} className="p-2 text-gray-600 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all"><Trash2 size={18}/></button></div>
                </div>
             ))}
          </div>
       </div>
    </div>
  );
};

export default Transactions;