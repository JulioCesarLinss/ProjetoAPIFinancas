import React, { useState, useEffect } from 'react';
import api from './services/api';
import Auth from './pages/Auth';
import Admin from './pages/Admin';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Planning from './pages/Planning';
import Profile from './pages/Profile';
import Sidebar from './components/layout/Sidebar';
import BottomNav from './components/layout/BottomNav';
import SystemPopup from './components/ui/SystemPopup';

function App() {
  const [user, setUser] = useState(() => { 
      const saved = localStorage.getItem('cashplus_user'); 
      return saved ? JSON.parse(saved) : null; 
  });
  
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState([]);
  const [goals, setGoals] = useState([]);
  const [reminders, setReminders] = useState([]); 
  const [userCategories, setUserCategories] = useState([]); 
  const [popupConfig, setPopupConfig] = useState({ isOpen: false, type: 'success', title: '', message: '', onConfirm: null });

  const showAlert = (title, message, type = 'success', onConfirm = null) => { setPopupConfig({ isOpen: true, title, message, type, onConfirm }); };
  const closeAlert = () => { setPopupConfig({ ...popupConfig, isOpen: false }); };

  useEffect(() => { 
      if(user) localStorage.setItem('cashplus_user', JSON.stringify(user)); 
      else localStorage.removeItem('cashplus_user');
  }, [user]);

  const fetchUserData = async () => {
      if (!user || !user.id || user.role === 'ADMIN') return;
      try {
          const resTrans = await api.get(`/transactions?userId=${user.id}`);
          setTransactions(resTrans.data);
          const resGoals = await api.get(`/goals?userId=${user.id}`);
          setGoals(resGoals.data);
          const resReminders = await api.get(`/reminders?userId=${user.id}`);
          setReminders(resReminders.data);
          const resCats = await api.get(`/categorias?userId=${user.id}`);
          setUserCategories(resCats.data);
      } catch (err) {
          console.error("Erro ao buscar dados do usuário:", err);
      }
  };

  useEffect(() => {
      fetchUserData();
  }, [user]);

  const handleLogout = () => { 
      setUser(null); 
      setTransactions([]); 
      setGoals([]); 
      setReminders([]);
      setUserCategories([]);
  };

  /* --- Handlers de Transações --- */
  const handleAddTransaction = async (t) => {
        try {
            // REMOVIDO: categoriaId: 1 fixo. 
            // O objeto 't' já contém { descricao, valor, tipo, nomeCategoria } vindos do formulário.
            const res = await api.post('/transactions', { 
                ...t, 
                userId: user.id 
            });
            setTransactions([...transactions, res.data]);
            showAlert('Sucesso', 'Transação registrada!', 'success');
        } catch (error) { 
            console.error(error);
            showAlert('Erro', 'Não foi possível salvar a transação.', 'error'); 
        }
    };

  const handleDeleteTransaction = async (id) => {
      try {
          await api.delete(`/transactions/${id}`);
          setTransactions(transactions.filter(t => t.id !== id));
      } catch (error) { showAlert('Erro', 'Falha ao deletar transação.', 'error'); }
  };

  /* --- Handlers de Metas e Lembretes --- */
  const handleAddGoal = async (g) => {
      try {
          const res = await api.post('/goals', { userId: user.id, descricao: g.description, valorMeta: g.total, valorAtual: g.current, dataAlvo: new Date().toISOString().split('T')[0] });
          setGoals([...goals, res.data]);
      } catch (error) { showAlert('Erro', 'Falha ao criar meta.', 'error'); }
  };

  const handleDeleteGoal = async (id) => {
      try { await api.delete(`/goals/${id}`); setGoals(goals.filter(g => g.id !== id)); } catch (error) { showAlert('Erro', 'Falha ao deletar meta.', 'error'); }
  };

  const handleEditGoal = async (updatedGoal) => {
      try { await api.put(`/goals/${updatedGoal.id}`, updatedGoal); setGoals(goals.map(g => g.id === updatedGoal.id ? updatedGoal : g)); } catch (error) { showAlert('Erro', 'Falha ao atualizar meta.', 'error'); }
  };

  const handleDepositToGoal = async (goalId, amount) => {
     const targetGoal = goals.find(g => g.id === goalId);
     if(!targetGoal) return;
     const newVal = parseFloat(targetGoal.valorAtual || 0) + parseFloat(amount);
     try {
         const updated = { ...targetGoal, valorAtual: newVal };
         await api.put(`/goals/${goalId}`, updated);
         setGoals(goals.map(g => g.id === goalId ? updated : g));
         await handleAddTransaction({ descricao: `Guardado: ${targetGoal.descricao}`, valor: amount, tipo: 'expense', nomeCategoria: 'Metas' });
     } catch (err) { showAlert('Erro', 'Falha ao processar depósito.', 'error'); }
  };

  const handleAddReminder = async (r) => {
    try {
        const res = await api.post('/reminders', { userId: user.id, ...r });
        setReminders([...reminders, res.data]);
        showAlert('Sucesso', 'Lembrete criado!', 'success');
    } catch (error) { showAlert('Erro', 'Falha ao criar lembrete.', 'error'); }
  };

  const handleDeleteReminder = async (id) => {
    try {
        await api.delete(`/reminders/${id}`);
        setReminders(reminders.filter(r => r.id !== id));
        showAlert('Sucesso', 'Conta paga!', 'success');
    } catch (error) { showAlert('Erro', 'Falha ao pagar conta.', 'error'); }
  };

  /* --- Handlers de Categorias --- */
  const handleAddCategory = async (name) => {
      try {
          const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
          const res = await api.post('/categorias', { nome: name, tipo: 'despesa', userId: user.id, cor: randomColor });
          setUserCategories([...userCategories, res.data]);
          showAlert('Sucesso', 'Categoria criada!', 'success');
      } catch (err) { showAlert('Erro', 'Falha ao criar categoria.', 'error'); }
  };

  const handleDeleteCategory = async (id) => {
      try {
          await api.delete(`/categorias/${id}`);
          setUserCategories(userCategories.filter(cat => cat.id !== id));
          showAlert('Sucesso', 'Categoria removida.', 'success');
      } catch (err) { showAlert('Erro', 'Falha ao remover categoria.', 'error'); }
  };

  if (!user) return <Auth onLogin={setUser} />;
  if (user.role === 'ADMIN') return <Admin onLogout={handleLogout} />;

  const renderContent = () => {
    switch(activeTab) {
        case 'dashboard': return <Dashboard user={user} transactions={transactions} userCategories={userCategories} reminders={reminders} onPayReminder={handleDeleteReminder} />;
        case 'transacoes': return <Transactions transactions={transactions} onAddTransaction={handleAddTransaction} onDeleteTransaction={handleDeleteTransaction} userCategories={userCategories} onAddCategory={handleAddCategory} onDeleteCategory={handleDeleteCategory} />;
        case 'planejamento': return <Planning goals={goals} reminders={reminders} onAddGoal={handleAddGoal} onDeleteGoal={handleDeleteGoal} onDepositToGoal={handleDepositToGoal} onEditGoal={handleEditGoal} onAddReminder={handleAddReminder} onDeleteReminder={handleDeleteReminder} showAlert={showAlert} />;
        case 'perfil': return <Profile user={user} onUpdateUser={setUser} showAlert={showAlert} />;
        default: return <Dashboard user={user} transactions={transactions} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white font-sans flex">
      <SystemPopup isOpen={popupConfig.isOpen} onClose={closeAlert} type={popupConfig.type} title={popupConfig.title} message={popupConfig.message} onConfirm={popupConfig.onConfirm} />
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} user={user} transactions={transactions} />
      <main className="flex-1 md:ml-64 h-screen overflow-y-auto bg-gradient-app">
         <div className="max-w-7xl mx-auto md:p-10">
            <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-8 duration-500 ease-out">{renderContent()}</div>
         </div>
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;