import React, { useState } from 'react';
import { X, Plus, Bell, PiggyBank, Edit2, Calendar, Check, Trash2 } from 'lucide-react';
import InputGroup from '../components/ui/InputGroup';
import PrimaryButton from '../components/ui/PrimaryButton';
import PortalModal from '../components/ui/PortalModal';
import { formatDate, parseDate } from '../utils/formatters';

const Planning = ({ goals, reminders, onAddGoal, onDeleteGoal, onDepositToGoal, onEditGoal, onAddReminder, onDeleteReminder, showAlert }) => {
   const [isCreatingGoal, setIsCreatingGoal] = useState(false);
   const [newGoal, setNewGoal] = useState({ description: '', total: '', current: '0' });
   const [depositModal, setDepositModal] = useState({ isOpen: false, goalId: null });
   const [depositValue, setDepositValue] = useState('');
   const [editModal, setEditModal] = useState({ isOpen: false, goal: null });
   const [activeTab, setActiveTab] = useState('goals'); 
   const [isCreatingReminder, setIsCreatingReminder] = useState(false);
   const [newReminder, setNewReminder] = useState({ descricao: '', dataVencimento: '', valor: '' });

   const handleCreateGoal = () => { if(!newGoal.description || !newGoal.total) return; onAddGoal(newGoal); setNewGoal({ description: '', total: '', current: '0' }); setIsCreatingGoal(false); };
   const confirmDeposit = () => { if(!depositValue || parseFloat(depositValue) <= 0) return; onDepositToGoal(depositModal.goalId, depositValue); setDepositModal({ isOpen: false, goalId: null }); setDepositValue(''); };
   const handleSaveEdit = () => { if (!editModal.goal.descricao || !editModal.goal.valorMeta) return; onEditGoal(editModal.goal); setEditModal({ isOpen: false, goal: null }); };
   const handleDeleteFromModal = () => { showAlert('Excluir Meta?', `Tem certeza que deseja excluir a meta "${editModal.goal.descricao}"?`, 'confirm', () => { onDeleteGoal(editModal.goal.id); setEditModal({ isOpen: false, goal: null }); }); };

   const handleCreateReminder = () => {
       if(!newReminder.descricao || !newReminder.dataVencimento || !newReminder.valor) return;
       onAddReminder(newReminder);
       setNewReminder({ descricao: '', dataVencimento: '', valor: '' });
       setIsCreatingReminder(false);
   };

   return (
      <div className="px-6 md:px-0 pt-8 md:pt-0 pb-24 md:pb-0 h-full overflow-y-auto relative">
         <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
             <h2 className="text-2xl md:text-3xl font-bold text-white">Planejamento</h2>
             <div className="flex bg-[#1E1E1E] p-1 rounded-xl">
                 <button onClick={() => setActiveTab('goals')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'goals' ? 'bg-cashGreen text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>Metas</button>
                 <button onClick={() => setActiveTab('reminders')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'reminders' ? 'bg-cashGreen text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}>Contas a Pagar</button>
             </div>
             {activeTab === 'goals' ? (
                 <PrimaryButton label={isCreatingGoal ? "Cancelar" : "Nova Meta"} icon={isCreatingGoal ? <X size={18}/> : <Plus size={18}/>} onClick={() => setIsCreatingGoal(!isCreatingGoal)} fullWidth={false}/>
             ) : (
                 <PrimaryButton label={isCreatingReminder ? "Cancelar" : "Novo Lembrete"} icon={isCreatingReminder ? <X size={18}/> : <Bell size={18}/>} onClick={() => setIsCreatingReminder(!isCreatingReminder)} fullWidth={false}/>
             )}
         </div>

         <PortalModal isOpen={depositModal.isOpen}>
            <div className="bg-[#1E1E1E] p-6 rounded-2xl w-full max-w-sm border border-gray-700">
                <h3 className="text-white font-bold text-lg mb-4">Guardar dinheiro</h3>
                <InputGroup placeholder="Valor (ex: 50.00)" type="number" darkTheme value={depositValue} onChange={(e) => setDepositValue(e.target.value)} />
                <div className="flex gap-3 mt-4">
                    <button onClick={() => setDepositModal({ isOpen: false, goalId: null })} className="flex-1 py-3 rounded-full text-gray-400 font-bold hover:bg-gray-800">Cancelar</button>
                    <button onClick={confirmDeposit} className="flex-1 py-3 rounded-full bg-cashGreen text-black font-bold hover:bg-green-400">Confirmar</button>
                </div>
            </div>
         </PortalModal>

         <PortalModal isOpen={editModal.isOpen && editModal.goal}>
            <div className="bg-[#1E1E1E] p-6 rounded-2xl w-full max-w-sm border border-gray-700">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-bold text-lg">Editar Meta</h3>
                    <button onClick={() => setEditModal({ isOpen: false, goal: null })} className="text-gray-400 hover:text-white"><X size={20} /></button>
                </div>
                <InputGroup label="Nome da Meta" darkTheme value={editModal.goal?.descricao || ''} onChange={(e) => setEditModal({...editModal, goal: { ...editModal.goal, descricao: e.target.value }})} />
                <InputGroup label="Valor Total (R$)" type="number" darkTheme value={editModal.goal?.valorMeta || ''} onChange={(e) => setEditModal({...editModal, goal: { ...editModal.goal, valorMeta: e.target.value }})} />
                <div className="flex flex-col gap-3 mt-6">
                    <PrimaryButton label="Salvar Alterações" onClick={handleSaveEdit} />
                    <button onClick={handleDeleteFromModal} className="w-full py-3 rounded-full bg-red-500/10 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 border border-red-500/30"><Trash2 size={18} /> Excluir Meta</button>
                </div>
            </div>
         </PortalModal>

         {activeTab === 'goals' && (
             <div className="animate-in fade-in slide-in-from-bottom-4">
                 {isCreatingGoal && (
                    <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 mb-8 max-w-2xl animate-in slide-in-from-top-8 fade-in"><h3 className="text-white font-bold mb-4">Definir nova meta</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><div className="md:col-span-2"><InputGroup label="Nome da Meta" placeholder="Ex: Computador Novo" darkTheme value={newGoal.description} onChange={e => setNewGoal({...newGoal, description: e.target.value})} /></div><InputGroup label="Valor Total (R$)" placeholder="Ex: 5000" type="number" darkTheme value={newGoal.total} onChange={e => setNewGoal({...newGoal, total: e.target.value})} /><InputGroup label="Valor Inicial (R$)" placeholder="Ex: 0" type="number" darkTheme value={newGoal.current} onChange={e => setNewGoal({...newGoal, current: e.target.value})} /></div><div className="mt-4 flex justify-end"><div className="w-full md:w-auto"><PrimaryButton label="Salvar Meta" onClick={handleCreateGoal} fullWidth={false} /></div></div></div>
                 )}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {goals.length === 0 && !isCreatingGoal && <div className="col-span-full text-center py-20 text-gray-600 border-2 border-dashed border-gray-800 rounded-2xl animate-in fade-in">Você ainda não criou nenhuma meta.</div>}
                    {goals.map((goal, idx) => {
                       const current = parseFloat(goal.valorAtual || 0);
                       const total = parseFloat(goal.valorMeta || 1);
                       const percent = Math.min((current / total) * 100, 100);
                       return (
                          <div key={goal.id} className="bg-[#1E1E1E] p-5 rounded-2xl border border-gray-800 relative group hover:border-cashGreen/50 transition-all hover:scale-[1.02] animate-in slide-in-from-bottom-4 fade-in" style={{ animationDelay: `${idx * 100}ms` }}>
                             <div className="flex justify-between mb-2 items-start"><span className="text-white font-bold text-lg">{goal.descricao}</span><div className="flex gap-2"><button onClick={() => setDepositModal({ isOpen: true, goalId: goal.id })} className="text-cashGreen bg-cashGreen/10 p-2 rounded-lg hover:bg-cashGreen hover:text-black transition-colors" title="Guardar dinheiro"><PiggyBank size={18}/></button><button onClick={() => setEditModal({ isOpen: true, goal: goal })} className="text-gray-400 bg-gray-800 p-2 rounded-lg hover:bg-gray-700 hover:text-white transition-colors" title="Editar Meta"><Edit2 size={18} /></button></div></div>
                             <div className="flex justify-between mb-3 text-sm text-gray-400 font-medium"><span>{percent.toFixed(0)}%</span><span>R$ {current} / R$ {total}</span></div>
                             <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-cashGreen transition-all duration-1000 ease-out" style={{ width: `${percent}%` }}></div></div>
                          </div>
                       );
                    })}
                 </div>
             </div>
         )}

         {activeTab === 'reminders' && (
             <div className="animate-in fade-in slide-in-from-bottom-4">
                 {isCreatingReminder && (
                    <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800 mb-8 max-w-2xl animate-in slide-in-from-top-8 fade-in">
                        <h3 className="text-white font-bold mb-4">Novo Lembrete de Conta</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2"><InputGroup label="Descrição da Conta" placeholder="Ex: Conta de Luz, Internet..." darkTheme value={newReminder.descricao} onChange={e => setNewReminder({...newReminder, descricao: e.target.value})} /></div>
                            <InputGroup label="Valor (R$)" type="number" darkTheme value={newReminder.valor} onChange={e => setNewReminder({...newReminder, valor: e.target.value})} />
                            <InputGroup label="Data de Vencimento" type="date" darkTheme value={newReminder.dataVencimento} onChange={e => setNewReminder({...newReminder, dataVencimento: e.target.value})} />
                        </div>
                        <div className="mt-4 flex justify-end"><div className="w-full md:w-auto"><PrimaryButton label="Salvar Lembrete" onClick={handleCreateReminder} fullWidth={false} /></div></div>
                    </div>
                 )}
                 <div className="grid grid-cols-1 gap-3">
                    {reminders.length === 0 && !isCreatingReminder && <div className="col-span-full text-center py-20 text-gray-600 border-2 border-dashed border-gray-800 rounded-2xl animate-in fade-in">Nenhuma conta a pagar registrada.</div>}
                    {reminders.map((rem, idx) => {
                       const today = new Date();
                       const dueDate = parseDate(rem.dataVencimento);
                       const isLate = dueDate < today.setHours(0,0,0,0);
                       const val = rem.valor ? parseFloat(rem.valor).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) : 'R$ --';
                       return (
                          <div key={rem.id} className={`flex justify-between items-center p-4 rounded-xl border transition-all hover:scale-[1.01] animate-in slide-in-from-bottom-4 fade-in ${isLate ? 'bg-red-500/10 border-red-500/50' : 'bg-[#1E1E1E] border-gray-800'}`} style={{ animationDelay: `${idx * 50}ms` }}>
                             <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isLate ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-400'}`}><Calendar size={20} /></div>
                                <div><p className="text-white text-sm font-bold">{rem.descricao}</p><p className={`${isLate ? 'text-red-400 font-bold' : 'text-gray-500'} text-xs`}>Vence em: {formatDate(rem.dataVencimento)} {isLate && "(Atrasado!)"}</p></div>
                             </div>
                             <div className="flex items-center gap-4">
                                <span className="text-white text-sm font-bold">{val}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => onDeleteReminder(rem.id)} className="p-2 text-black bg-cashGreen hover:bg-green-400 rounded-lg transition-all font-bold flex items-center gap-1 shadow-md" title="Pagar Conta"><Check size={16} strokeWidth={3}/></button>
                                </div>
                             </div>
                          </div>
                       );
                    })}
                 </div>
             </div>
         )}
      </div>
   );
};

export default Planning;