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
      setTermsText(typeof res.data === 'string' ? res.data : 'Erro ao carregar texto.');
      setShowTermsModal(true);
    } catch {
      setTermsText('Não foi possível carregar os termos.');
      setShowTermsModal(true);
    }
  };

  const handleAuth = async () => {
    try {
      if (isRegister) {
        if (!acceptedTerms) { alert('Aceite os Termos de Uso para continuar.'); return; }
        if (authData.password !== authData.confirmPassword) { alert('As senhas não coincidem!'); return; }
        const res = await api.post('/users/register', {
          name: authData.name,
          email: authData.email,
          senha: authData.password,
          telefone: authData.phone,
          role: 'USER',
        });
        onLogin(res.data);
      } else {
        const res = await api.post('/users/login', { email: authData.email, senha: authData.password });
        onLogin(res.data);
      }
    } catch (error) {
      alert('Erro: ' + (error.response?.data || 'Erro de conexão'));
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-6 overflow-hidden relative"
      style={{ background: '#060808' }}
    >
      {/* Aurora layers */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 70% 50% at 15% 0%, rgba(0,200,83,0.16) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 85% 100%, rgba(0,200,83,0.1) 0%, transparent 50%)
          `,
        }}
      />

      {/* Terms modal */}
      <PortalModal isOpen={showTermsModal}>
        <div
          className="w-full max-w-lg max-h-[80vh] flex flex-col p-6 rounded-3xl animate-in zoom-in-95"
          style={{
            background: 'linear-gradient(145deg, rgba(14,20,16,0.97) 0%, rgba(8,12,10,0.99) 100%)',
            backdropFilter: 'blur(48px)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 2px 0 rgba(255,255,255,0.05) inset, 0 40px 120px rgba(0,0,0,0.7)',
          }}
        >
          <div className="flex justify-between items-center mb-4 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <h3
              className="text-white font-bold text-lg flex items-center gap-2"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              <FileText size={20} style={{ color: '#00C853' }} />
              Termos de Uso
            </h3>
            <button
              onClick={() => setShowTermsModal(false)}
              className="p-1.5 rounded-xl transition-colors"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; e.currentTarget.style.background = 'transparent'; }}
            >
              <X size={18} />
            </button>
          </div>
          <div
            className="flex-1 overflow-y-auto custom-scrollbar text-sm leading-relaxed whitespace-pre-line pr-2"
            style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {termsText || 'Carregando...'}
          </div>
          <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <button
              onClick={() => { setAcceptedTerms(true); setShowTermsModal(false); }}
              className="w-full py-3 rounded-2xl font-bold text-sm transition-all duration-200 btn-liquid"
            >
              Li e Concordo
            </button>
          </div>
        </div>
      </PortalModal>

      {/* Main card */}
      <div
        className="w-full max-w-sm animate-in zoom-in-95 fade-in duration-700"
        style={{ position: 'relative', zIndex: 1 }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src={logoImg}
            alt="Cash+"
            className="w-64 h-auto object-contain"
            style={{ filter: 'drop-shadow(0 0 30px rgba(0,200,83,0.25))' }}
          />
        </div>

        <div
          className="p-7 rounded-3xl"
          style={{
            background: 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
            backdropFilter: 'blur(40px) saturate(160%)',
            WebkitBackdropFilter: 'blur(40px) saturate(160%)',
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 2px 0 rgba(255,255,255,0.06) inset, 0 -1px 0 rgba(0,0,0,0.3) inset, 0 40px 100px rgba(0,0,0,0.6)',
          }}
        >
          {/* Top shimmer */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,200,83,0.5), transparent)' }}
          />

          <h2
            className="text-white text-xl font-bold mb-5 text-center"
            style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}
          >
            {isRegister ? 'Criar conta' : 'Entrar'}
          </h2>

          <form onSubmit={e => { e.preventDefault(); handleAuth(); }} className="flex flex-col">
            {isRegister && (
              <InputGroup
                label="Nome completo"
                placeholder="Seu nome"
                darkTheme
                value={authData.name}
                onChange={e => setAuthData({ ...authData, name: e.target.value })}
              />
            )}
            <InputGroup
              label="Email"
              placeholder="email@exemplo.com"
              type="email"
              darkTheme
              value={authData.email}
              onChange={e => setAuthData({ ...authData, email: e.target.value })}
            />
            <InputGroup
              label="Senha"
              placeholder="••••••••"
              isPassword
              darkTheme
              value={authData.password}
              onChange={e => setAuthData({ ...authData, password: e.target.value })}
            />

            {isRegister && (
              <>
                <InputGroup
                  label="Confirmar senha"
                  placeholder="••••••••"
                  isPassword
                  darkTheme
                  value={authData.confirmPassword}
                  onChange={e => setAuthData({ ...authData, confirmPassword: e.target.value })}
                />
                <InputGroup
                  label="Telefone"
                  placeholder="11 99999-9999"
                  type="tel"
                  maxLength={11}
                  darkTheme
                  value={authData.phone}
                  onChange={e => setAuthData({ ...authData, phone: e.target.value })}
                />

                <div className="flex items-center gap-2.5 mb-4 mt-1">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={acceptedTerms}
                      onChange={e => setAcceptedTerms(e.target.checked)}
                      className="w-4 h-4 cursor-pointer rounded"
                      style={{ accentColor: '#00C853' }}
                    />
                  </div>
                  <label
                    htmlFor="terms"
                    className="text-xs cursor-pointer select-none"
                    style={{ color: 'rgba(255,255,255,0.35)', fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    Li e aceito os{' '}
                    <button
                      type="button"
                      onClick={fetchTerms}
                      className="font-semibold hover:underline transition-colors"
                      style={{ color: '#00C853' }}
                    >
                      Termos de Uso
                    </button>
                  </label>
                </div>
              </>
            )}

            <div className="flex flex-col gap-3 mt-1">
              <PrimaryButton
                label={isRegister ? 'Criar conta' : 'Entrar'}
                icon={isRegister ? <UserPlus size={18} /> : <ArrowRight size={18} />}
                type="submit"
              />
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-sm font-medium py-2 transition-colors"
                style={{
                  color: 'rgba(255,255,255,0.35)',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#00C853'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)'; }}
              >
                {isRegister
                  ? 'Já tem uma conta? Faça login'
                  : 'Não tem conta? Cadastre-se'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
