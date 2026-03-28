import React, { useState } from 'react';
import api from '../services/api';
import logoImg from '../assets/logo.png';
import InputGroup from '../components/ui/InputGroup';
import PrimaryButton from '../components/ui/PrimaryButton';
import PortalModal from '../components/ui/PortalModal';
import { UserPlus, ArrowRight, FileText, X } from 'lucide-react';

const Auth = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [authData, setAuthData] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '' });
  
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [termsText, setTermsText] = useState('');

  const fetchTerms = async () => {
      try {
          const res = await api.get('/terms-of-use');
          setTermsText(typeof res.data === 'string' ? res.data : "Erro ao carregar texto.");
          setShowTermsModal(true);
      } catch (error) {
          console.error("Erro ao buscar termos", error);
          setTermsText("Não foi possível carregar os termos do servidor. Verifique sua conexão.");
          setShowTermsModal(true);
      }
  };

  const handleAuth = async () => {
     try {
       if (isRegister) {
         // Validação dos Termos
         if (!acceptedTerms) {
             alert('Atenção: Você precisa ler e aceitar os Termos de Uso para criar uma conta.');
             return;
         }
         if (authData.password !== authData.confirmPassword) { 
             alert('As senhas não coincidem!'); 
             return; 
         }
         
         const res = await api.post('/users/register', {
            name: authData.name,
            email: authData.email,
            senha: authData.password,
            telefone: authData.phone, 
            role: "USER"
         });
         onLogin(res.data);
       } else {
         const res = await api.post('/users/login', {
            email: authData.email,
            senha: authData.password
         });
         onLogin(res.data);
       }
     } catch (error) {
         console.error("Erro auth:", error);
         alert('Erro de autenticação: ' + (error.response?.data || "Erro de conexão"));
     }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-app flex items-center justify-center p-6 overflow-hidden">
        
        <PortalModal isOpen={showTermsModal}>
            <div className="bg-[#1E1E1E] border border-gray-700 p-6 rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col relative animate-in zoom-in-95">
                <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-4">
                    <h3 className="text-white font-bold text-xl flex items-center gap-2">
                        <FileText size={24} className="text-cashGreen"/> Termos de Uso
                    </h3>
                    <button onClick={() => setShowTermsModal(false)} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar text-gray-300 text-sm leading-relaxed whitespace-pre-line pr-2">
                    {termsText || "Carregando termos..."}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-700">
                    <button onClick={() => { setAcceptedTerms(true); setShowTermsModal(false); }} className="w-full py-3 bg-cashGreen text-black font-bold rounded-xl hover:bg-green-400 transition-all">
                        Li e Concordo
                    </button>
                </div>
            </div>
        </PortalModal>

        <div className="w-full max-w-md transition-all duration-500">
           <div className="flex justify-center mb-4">
                <img src={logoImg} alt="Logo" className="w-72 h-auto object-contain drop-shadow-lg" />
           </div>
           <form onSubmit={(e) => { e.preventDefault(); handleAuth(); }} className="flex flex-col px-4">
               <h2 className="text-white text-2xl font-bold mb-4 text-center">{isRegister ? 'Crie sua conta' : 'Acesse sua conta'}</h2>
               {isRegister && <InputGroup label="Nome Completo" placeholder="Seu nome" value={authData.name} onChange={(e) => setAuthData({...authData, name: e.target.value})} />}
               <InputGroup label="Email" placeholder="Insira seu email" type="email" value={authData.email} onChange={(e) => setAuthData({...authData, email: e.target.value})} />
               <InputGroup label="Senha" placeholder="********" isPassword value={authData.password} onChange={(e) => setAuthData({...authData, password: e.target.value})} />
               {isRegister && (
                   <>
                    <InputGroup label="Confirmar Senha" placeholder="********" isPassword value={authData.confirmPassword} onChange={(e) => setAuthData({...authData, confirmPassword: e.target.value})} />
                    <InputGroup label="Telefone" placeholder="Insira seu telefone" type="tel" maxLength={11} value={authData.phone} onChange={(e) => setAuthData({...authData, phone: e.target.value})} />
                    
                    {/* Checkbox dos Termos */}
                    <div className="flex items-center gap-2 mt-1 mb-3">
                        <input 
                            type="checkbox" 
                            id="terms" 
                            checked={acceptedTerms} 
                            onChange={(e) => setAcceptedTerms(e.target.checked)} 
                            className="w-4 h-4 accent-cashGreen cursor-pointer"
                        />
                        <label htmlFor="terms" className="text-xs text-gray-400 cursor-pointer select-none">
                            Li e aceito os <button type="button" onClick={fetchTerms} className="text-cashGreen font-bold hover:underline">Termos de Uso</button>
                        </label>
                    </div>
                   </>
               )}
               <div className="flex flex-col gap-4 mt-2">
                   <PrimaryButton label={isRegister ? "Cadastrar" : "Entrar"} icon={isRegister ? <UserPlus size={20} /> : <ArrowRight size={20} />} type="submit" />
                   <button type="button" onClick={() => setIsRegister(!isRegister)} className="text-cashGreen font-bold text-sm hover:text-green-400 transition-colors mt-2">{isRegister ? "Já tem uma conta? Faça login" : "Não tem conta? Cadastre-se"}</button>
               </div>
           </form>
        </div>
    </div>
  );
};

export default Auth;