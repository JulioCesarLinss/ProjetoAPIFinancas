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
  const [popupConfig, setPopupConfig] = useState({
    isOpen: false, type: 'success', title: '', message: '', onConfirm: null,
  });

  const showAlert = (title, message, type = 'success', onConfirm = null) =>
    setPopupConfig({ isOpen: true, title, message, type, onConfirm });

  const closeAlert = () =>
    setPopupConfig(prev => ({ ...prev, isOpen: false }));

  useEffect(() => {
    if (user) localStorage.setItem('cashplus_user', JSON.stringify(user));
    else localStorage.removeItem('cashplus_user');
  }, [user]);

  const fetchUserData = async () => {
    if (!user || !user.id || user.role === 'ADMIN') return;
    try {
      const [resTrans, resGoals, resReminders, resCats] = await Promise.all([
        api.get(`/transactions?userId=${user.id}`),
        api.get(`/goals?userId=${user.id}`),
        api.get(`/reminders?userId=${user.id}`),
        api.get(`/categorias?userId=${user.id}`),
      ]);
      setTransactions(resTrans.data);
      setGoals(resGoals.data);
      setReminders(resReminders.data);
      setUserCategories(resCats.data);
    } catch (err) {
      console.error('Erro ao buscar dados do usuário:', err);
    }
  };

  useEffect(() => { fetchUserData(); }, [user]);

  const handleLogout = () => {
    setUser(null);
    setTransactions([]);
    setGoals([]);
    setReminders([]);
    setUserCategories([]);
  };

  /* ── Transactions ─────────────────────────────────────────── */
  const handleAddTransaction = async (t) => {
    try {
      const res = await api.post('/transactions', { ...t, userId: user.id });
      setTransactions(prev => [...prev, res.data]);
      showAlert('Sucesso', 'Transação registrada!', 'success');
    } catch {
      showAlert('Erro', 'Não foi possível salvar a transação.', 'error');
    }
  };

  const handleDeleteTransaction = async (id) => {
    try {
      await api.delete(`/transactions/${id}`);
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch {
      showAlert('Erro', 'Falha ao deletar transação.', 'error');
    }
  };

  /* ── Goals ────────────────────────────────────────────────── */
  const handleAddGoal = async (g) => {
    try {
      const res = await api.post('/goals', {
        userId: user.id, descricao: g.description, valorMeta: g.total,
        valorAtual: g.current, dataAlvo: new Date().toISOString().split('T')[0],
      });
      setGoals(prev => [...prev, res.data]);
    } catch { showAlert('Erro', 'Falha ao criar meta.', 'error'); }
  };

  const handleDeleteGoal = async (id) => {
    try {
      await api.delete(`/goals/${id}`);
      setGoals(prev => prev.filter(g => g.id !== id));
    } catch { showAlert('Erro', 'Falha ao deletar meta.', 'error'); }
  };

  const handleEditGoal = async (updatedGoal) => {
    try {
      await api.put(`/goals/${updatedGoal.id}`, updatedGoal);
      setGoals(prev => prev.map(g => g.id === updatedGoal.id ? updatedGoal : g));
    } catch { showAlert('Erro', 'Falha ao atualizar meta.', 'error'); }
  };

  const handleDepositToGoal = async (goalId, amount) => {
    const targetGoal = goals.find(g => g.id === goalId);
    if (!targetGoal) return;
    const newVal = parseFloat(targetGoal.valorAtual || 0) + parseFloat(amount);
    try {
      const updated = { ...targetGoal, valorAtual: newVal };
      await api.put(`/goals/${goalId}`, updated);
      setGoals(prev => prev.map(g => g.id === goalId ? updated : g));
      await handleAddTransaction({
        descricao: `Guardado: ${targetGoal.descricao}`, valor: amount,
        tipo: 'expense', nomeCategoria: 'Metas',
      });
    } catch { showAlert('Erro', 'Falha ao processar depósito.', 'error'); }
  };

  /* ── Reminders ────────────────────────────────────────────── */
  const handleAddReminder = async (r) => {
    try {
      const res = await api.post('/reminders', { userId: user.id, ...r });
      setReminders(prev => [...prev, res.data]);
      showAlert('Sucesso', 'Lembrete criado!', 'success');
    } catch { showAlert('Erro', 'Falha ao criar lembrete.', 'error'); }
  };

  const handleDeleteReminder = async (id) => {
    try {
      await api.delete(`/reminders/${id}`);
      setReminders(prev => prev.filter(r => r.id !== id));
      showAlert('Sucesso', 'Conta paga!', 'success');
    } catch { showAlert('Erro', 'Falha ao pagar conta.', 'error'); }
  };

  /* ── Categories ───────────────────────────────────────────── */
  const handleAddCategory = async (name) => {
    try {
      const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
      const res = await api.post('/categorias', {
        nome: name, tipo: 'despesa', userId: user.id, cor: randomColor,
      });
      setUserCategories(prev => [...prev, res.data]);
      showAlert('Sucesso', 'Categoria criada!', 'success');
    } catch { showAlert('Erro', 'Falha ao criar categoria.', 'error'); }
  };

  const handleDeleteCategory = async (id) => {
    try {
      await api.delete(`/categorias/${id}`);
      setUserCategories(prev => prev.filter(cat => cat.id !== id));
      showAlert('Sucesso', 'Categoria removida.', 'success');
    } catch { showAlert('Erro', 'Falha ao remover categoria.', 'error'); }
  };

  /* ── Route guards ─────────────────────────────────────────── */
  if (!user) return <Auth onLogin={setUser} />;
  if (user.role === 'ADMIN') return <Admin onLogout={handleLogout} />;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':    return <Dashboard user={user} transactions={transactions} userCategories={userCategories} reminders={reminders} onPayReminder={handleDeleteReminder} />;
      case 'transacoes':   return <Transactions transactions={transactions} onAddTransaction={handleAddTransaction} onDeleteTransaction={handleDeleteTransaction} userCategories={userCategories} onAddCategory={handleAddCategory} onDeleteCategory={handleDeleteCategory} />;
      case 'planejamento': return <Planning goals={goals} reminders={reminders} onAddGoal={handleAddGoal} onDeleteGoal={handleDeleteGoal} onDepositToGoal={handleDepositToGoal} onEditGoal={handleEditGoal} onAddReminder={handleAddReminder} onDeleteReminder={handleDeleteReminder} showAlert={showAlert} />;
      case 'perfil':       return <Profile user={user} onUpdateUser={setUser} showAlert={showAlert} />;
      default:             return <Dashboard user={user} transactions={transactions} />;
    }
  };

  return (
    <div
      className="min-h-screen w-full text-white flex"
      style={{ background: '#060808', fontFamily: "'Space Grotesk', sans-serif" }}
    >
      {/* Aurora background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 70% 50% at 15% 0%, rgba(0,200,83,0.13) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 85% 100%, rgba(0,200,83,0.08) 0%, transparent 50%)
          `,
          zIndex: 0,
        }}
      />

      <SystemPopup
        isOpen={popupConfig.isOpen}
        onClose={closeAlert}
        type={popupConfig.type}
        title={popupConfig.title}
        message={popupConfig.message}
        onConfirm={popupConfig.onConfirm}
      />

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={handleLogout}
        user={user}
        transactions={transactions}
      />

      <main
        className="flex-1 md:ml-64 min-h-screen overflow-y-auto relative"
        style={{ zIndex: 1 }}
      >
        <div className="max-w-5xl mx-auto md:p-10">
          <div
            key={activeTab}
            className="animate-in fade-in slide-in-from-bottom-8 duration-500"
          >
            {renderContent()}
          </div>
        </div>
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
