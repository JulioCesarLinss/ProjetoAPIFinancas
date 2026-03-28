import React, { useState } from 'react';
import { Plus, X, ArrowLeftRight, Trash2 } from 'lucide-react';
import InputGroup from '../components/ui/InputGroup';
import PrimaryButton from '../components/ui/PrimaryButton';
import { DEFAULT_CATEGORIES, getColorByName } from '../utils/constants';
import { formatDate } from '../utils/formatters';

const MonoValue = ({ children, className = '' }) => (
  <span className={className} style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}>
    {children}
  </span>
);

const Transactions = ({ transactions, onAddTransaction, onDeleteTransaction, userCategories, onAddCategory, onDeleteCategory }) => {
  const [showForm, setShowForm] = useState(false);
  const [showCatForm, setShowCatForm] = useState(false);
  const [newTrans, setNewTrans] = useState({ name: '', value: '', type: 'expense', category: 'Outros' });
  const [newCatName, setNewCatName] = useState('');

  const allCategories = [...DEFAULT_CATEGORIES, ...userCategories];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTrans.name || !newTrans.value) return;
    onAddTransaction({
      descricao: newTrans.name,
      valor: newTrans.value,
      tipo: newTrans.type,
      nomeCategoria: newTrans.category,
    });
    setNewTrans({ name: '', value: '', type: 'expense', category: 'Outros' });
    setShowForm(false);
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (newCatName) { onAddCategory(newCatName); setNewCatName(''); setShowCatForm(false); }
  };

  return (
    <div className="h-full flex flex-col pt-6 md:pt-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-5 md:px-0">
        <h2
          className="text-2xl md:text-3xl font-bold text-white"
          style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}
        >
          Transações
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-sm transition-all duration-200 active:scale-95"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            ...(showForm
              ? {
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.6)',
                }
              : {
                  background: '#00C853',
                  color: '#021a0b',
                  boxShadow: '0 4px 16px rgba(0,200,83,0.35)',
                }),
          }}
          onMouseEnter={e => { if (!showForm) e.currentTarget.style.filter = 'brightness(1.1)'; }}
          onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)'; }}
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          <span className="hidden md:inline">{showForm ? 'Cancelar' : 'Nova Transação'}</span>
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="px-5 md:px-0 mb-6 animate-in slide-in-from-top-10 fade-in duration-300">
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-3xl max-w-2xl"
            style={{
              background: 'rgba(255,255,255,0.03)',
              backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,0.07)',
              boxShadow: '0 1px 0 rgba(255,255,255,0.05) inset',
            }}
          >
            <h3
              className="text-white font-bold mb-5 text-sm uppercase tracking-widest"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: 'rgba(255,255,255,0.5)' }}
            >
              Nova movimentação
            </h3>

            {/* Type toggle */}
            <div
              className="flex gap-2 mb-5 p-1 rounded-2xl"
              style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.05)' }}
            >
              {[
                { type: 'expense', label: 'Despesa', activeColor: '#ef4444', activeBg: 'rgba(239,68,68,0.15)' },
                { type: 'income',  label: 'Receita',  activeColor: '#00C853', activeBg: 'rgba(0,200,83,0.15)'  },
              ].map(opt => {
                const isActive = newTrans.type === opt.type;
                return (
                  <button
                    key={opt.type}
                    type="button"
                    onClick={() => setNewTrans({ ...newTrans, type: opt.type })}
                    className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: isActive ? opt.activeColor : 'rgba(255,255,255,0.3)',
                      background: isActive ? opt.activeBg : 'transparent',
                      border: isActive ? `1px solid ${opt.activeColor}33` : '1px solid transparent',
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputGroup darkTheme placeholder="Descrição (ex: Mercado)" value={newTrans.name} onChange={e => setNewTrans({ ...newTrans, name: e.target.value })} />
              <InputGroup darkTheme placeholder="Valor (ex: 150.00)" type="number" value={newTrans.value} onChange={e => setNewTrans({ ...newTrans, value: e.target.value })} />

              {newTrans.type === 'expense' && (
                <div className="md:col-span-2 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <label
                      className="text-[11px] font-semibold uppercase tracking-widest"
                      style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Space Grotesk', sans-serif" }}
                    >
                      Categoria
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowCatForm(!showCatForm)}
                      className="text-xs font-semibold flex items-center gap-1 transition-colors"
                      style={{ color: '#00C853' }}
                    >
                      <Plus size={11} /> Nova categoria
                    </button>
                  </div>

                  {showCatForm && (
                    <div className="flex gap-2 mb-3 animate-in slide-in-from-top-2">
                      <input
                        type="text"
                        placeholder="Nome da nova categoria"
                        className="flex-1 rounded-xl px-3 py-2 text-xs outline-none transition-all"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.08)',
                          color: '#e8ede9',
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                        value={newCatName}
                        onChange={e => setNewCatName(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={handleCreateCategory}
                        className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
                        style={{
                          background: '#00C853',
                          color: '#021a0b',
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                      >
                        Salvar
                      </button>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2 py-2 max-h-32 overflow-y-auto custom-scrollbar">
                    {allCategories.map(cat => {
                      const isCustom = !!cat.id;
                      const catColor = cat.cor || cat.color || getColorByName(cat.nome);
                      const isSelected = newTrans.category === cat.nome;
                      return (
                        <div key={cat.nome || cat.id} className="relative group">
                          <button
                            type="button"
                            onClick={() => setNewTrans({ ...newTrans, category: cat.nome })}
                            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200"
                            style={{
                              background: isSelected ? catColor : 'rgba(255,255,255,0.04)',
                              color: isSelected ? '#021a0b' : 'rgba(255,255,255,0.45)',
                              border: isSelected ? 'none' : `1px solid rgba(255,255,255,0.07)`,
                              boxShadow: isSelected ? `0 2px 10px ${catColor}55` : 'none',
                              fontFamily: "'Space Grotesk', sans-serif",
                            }}
                          >
                            {cat.nome}
                          </button>
                          {isCustom && (
                            <button
                              type="button"
                              onClick={e => { e.stopPropagation(); onDeleteCategory(cat.id); }}
                              className="absolute -top-1.5 -right-1.5 z-10 w-4 h-4 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all"
                              style={{ background: '#ef4444', fontSize: 8 }}
                            >
                              <X size={9} strokeWidth={3} />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-5 md:w-48">
              <PrimaryButton label="Confirmar" onClick={handleSubmit} />
            </div>
          </form>
        </div>
      )}

      {/* List */}
      <div className="flex-1 overflow-y-auto px-5 md:px-0 pb-28 md:pb-4 custom-scrollbar">
        <div className="flex flex-col gap-3">
          {transactions.length === 0 && (
            <div
              className="flex flex-col items-center justify-center mt-20 animate-in fade-in duration-700"
              style={{ color: 'rgba(255,255,255,0.15)' }}
            >
              <div
                className="w-16 h-16 rounded-3xl flex items-center justify-center mb-4"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
              >
                <ArrowLeftRight size={26} style={{ opacity: 0.4 }} />
              </div>
              <p className="text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                Nenhuma transação ainda.
              </p>
            </div>
          )}

          {transactions.map((t, idx) => (
            <div
              key={t.id}
              className="flex items-center justify-between p-4 rounded-2xl transition-all duration-250 group animate-in slide-in-from-bottom-4 fade-in"
              style={{
                animationDelay: `${idx * 40}ms`,
                background: 'rgba(255,255,255,0.025)',
                border: '1px solid rgba(255,255,255,0.06)',
                backdropFilter: 'blur(12px)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.transform = 'translateX(2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.025)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <div className="flex items-center gap-3">
                {/* Color bar */}
                <div
                  className="w-1 h-9 rounded-full flex-shrink-0"
                  style={{ background: t.tipo === 'income' ? '#00C853' : '#ef4444' }}
                />
                <div>
                  <p
                    className="text-white text-sm font-semibold"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {t.descricao}
                  </p>
                  <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.25)' }}>
                    {formatDate(t.data)}
                    {t.tipo === 'expense' && ` · ${t.nomeCategoria || 'Outros'}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MonoValue
                  className={`text-sm font-semibold ${t.tipo === 'income' ? 'text-green-400' : 'text-white/80'}`}
                >
                  {t.tipo === 'expense' ? '−' : '+'} R$ {parseFloat(t.valor).toFixed(2)}
                </MonoValue>
                <button
                  onClick={() => onDeleteTransaction(t.id)}
                  className="p-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200"
                  style={{ color: 'rgba(239,68,68,0.5)', background: 'rgba(239,68,68,0.08)' }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#ef4444'; e.currentTarget.style.background = 'rgba(239,68,68,0.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(239,68,68,0.5)'; e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
