import React from 'react';
import PortalModal from './PortalModal';
import { AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

const SystemPopup = ({ isOpen, onClose, type = 'success', title, message, onConfirm }) => {
  return (
    <PortalModal isOpen={isOpen}>
      <div className={`bg-[#1E1E1E] border ${type === 'error' ? 'border-red-500/50' : 'border-cashGreen/50'} p-6 rounded-2xl w-full max-w-xs flex flex-col items-center text-center shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300`}>
        <div className={`w-16 h-16 ${type === 'error' ? 'bg-red-500/10 text-red-500' : 'bg-cashGreen/10 text-cashGreen'} rounded-full flex items-center justify-center mb-4`}>
            {type === 'error' ? <AlertCircle size={32} /> : type === 'confirm' ? <HelpCircle size={32} className="text-yellow-500" /> : <CheckCircle size={32} />}
        </div>
        <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">{message}</p>
        <div className="flex gap-3 w-full">
          {type === 'confirm' && <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-gray-700 text-white font-bold hover:bg-gray-600">Cancelar</button>}
          <button onClick={() => { if (onConfirm) onConfirm(); onClose(); }} className={`flex-1 py-3 rounded-xl font-bold shadow-lg active:scale-95 ${type === 'error' ? 'bg-red-500 text-white' : type === 'confirm' ? 'bg-yellow-500 text-black' : 'bg-cashGreen text-black'}`}>{type === 'confirm' ? 'Sim, confirmar' : 'Entendido'}</button>
        </div>
      </div>
    </PortalModal>
  );
};

export default SystemPopup;