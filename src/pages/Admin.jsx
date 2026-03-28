import React, { useState, useEffect } from 'react';
import { User, LogOut } from 'lucide-react';
import api from '../services/api';

const Admin = ({ onLogout }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/users')
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erro:', error);
        setUsers([]);
        setLoading(false);
      });
  }, []);

  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.role === 'USER').length; 

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-10 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-600/20 rounded-xl text-blue-500"><User size={32} /></div>
              <div>
                <h1 className="text-3xl font-bold">Painel Administrativo</h1>
                <p className="text-gray-400">Gerenciamento do Sistema</p>
              </div>
           </div>
           <button onClick={onLogout} className="flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all font-bold">
             <LogOut size={20} /> Sair
           </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
           <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800">
              <p className="text-gray-400 mb-2">Total de Usuários</p>
              <h2 className="text-4xl font-bold">
                {loading ? <span className="text-gray-600 text-2xl">Carregando...</span> : totalUsers}
              </h2>
           </div>
           <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800">
              <p className="text-gray-400 mb-2">Usuários Ativos (Users)</p>
              <h2 className="text-4xl font-bold text-cashGreen">
                {loading ? <span className="text-gray-600 text-2xl">...</span> : activeUsers}
              </h2>
           </div>
           <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-gray-800">
              <p className="text-gray-400 mb-2">Status do Sistema</p>
              <h2 className="text-4xl font-bold text-blue-400">Online</h2>
           </div>
        </div>

        <div className="bg-[#1E1E1E] rounded-2xl border border-gray-800 overflow-hidden">
           <div className="p-6 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-xl font-bold">Usuários Cadastrados</h3>
              <span className="text-xs text-gray-500">Atualizado em tempo real</span>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead className="bg-[#151515] text-gray-400 uppercase text-xs">
                    <tr>
                       <th className="px-6 py-4">ID</th>
                       <th className="px-6 py-4">Nome</th>
                       <th className="px-6 py-4">Email</th>
                       <th className="px-6 py-4">Perfil</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-800">
                    {loading ? (
                       <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">Carregando dados...</td></tr>
                    ) : users.length === 0 ? (
                       <tr><td colSpan="4" className="px-6 py-8 text-center text-gray-500">Nenhum usuário encontrado na base de dados.</td></tr>
                    ) : (
                       users.map((u) => (
                          <tr key={u.id} className="hover:bg-white/5 transition-colors">
                             <td className="px-6 py-4 font-mono text-gray-500">#{u.id}</td>
                             <td className="px-6 py-4 font-bold">{u.name || "Sem Nome"}</td>
                             <td className="px-6 py-4 text-gray-300">{u.email}</td>
                             <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${u.role === 'ADMIN' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                                   {u.role || "USER"}
                                </span>
                             </td>
                          </tr>
                       ))
                    )}
                 </tbody>
              </table>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;