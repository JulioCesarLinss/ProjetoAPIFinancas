import React from 'react';
import PortalModal from './PortalModal';
import { AlertCircle, CheckCircle, HelpCircle } from 'lucide-react';

const SystemPopup = ({ isOpen, onClose, type = 'success', title, message, onConfirm }) => {
  const isError   = type === 'error';
  const isConfirm = type === 'confirm';

  const accentColor  = isError ? '#ef4444' : isConfirm ? '#f59e0b' : '#00C853';
  const accentBg     = isError ? 'rgba(239,68,68,0.1)' : isConfirm ? 'rgba(245,158,11,0.1)' : 'rgba(0,200,83,0.1)';
  const accentBorder = isError ? 'rgba(239,68,68,0.2)' : isConfirm ? 'rgba(245,158,11,0.2)' : 'rgba(0,200,83,0.2)';
  const btnBg        = isError ? '#ef4444' : isConfirm ? '#f59e0b' : '#00C853';
  const btnColor     = isConfirm ? '#021a0b' : isError ? '#fff' : '#021a0b';

  return (
    <PortalModal isOpen={isOpen}>
      <div
        className="w-full max-w-xs flex flex-col items-center text-center p-7 rounded-3xl animate-in zoom-in-95 slide-in-from-bottom-4 duration-300"
        style={{
          background: 'linear-gradient(145deg, rgba(18,24,20,0.97) 0%, rgba(10,14,11,0.99) 100%)',
          backdropFilter: 'blur(48px) saturate(200%)',
          WebkitBackdropFilter: 'blur(48px) saturate(200%)',
          border: `1px solid ${accentBorder}`,
          boxShadow: `0 2px 0 ${accentBorder} inset, 0 1px 0 rgba(255,255,255,0.05) inset, 0 40px 120px rgba(0,0,0,0.7), 0 0 60px ${accentBg}`,
        }}
      >
        {/* Top shimmer line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-px rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`, opacity: 0.8 }}
        />

        {/* Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
          style={{
            background: accentBg,
            border: `1px solid ${accentBorder}`,
            boxShadow: `0 0 30px ${accentBg}`,
          }}
        >
          {isError
            ? <AlertCircle size={30} color={accentColor} />
            : isConfirm
            ? <HelpCircle size={30} color={accentColor} />
            : <CheckCircle size={30} color={accentColor} />
          }
        </div>

        {/* Text */}
        <h3
          className="text-white text-xl font-bold mb-2"
          style={{ fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}
        >
          {title}
        </h3>
        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: 'rgba(255,255,255,0.45)', fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {message}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 w-full">
          {isConfirm && (
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-2xl text-sm font-semibold transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                color: 'rgba(255,255,255,0.6)',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
            >
              Cancelar
            </button>
          )}
          <button
            onClick={() => { if (onConfirm) onConfirm(); onClose(); }}
            className="flex-1 py-3 rounded-2xl text-sm font-bold transition-all duration-200 active:scale-95"
            style={{
              background: btnBg,
              color: btnColor,
              fontFamily: "'Space Grotesk', sans-serif",
              letterSpacing: '0.01em',
              boxShadow: `0 4px 20px ${accentBg}, 0 1px 0 rgba(255,255,255,0.2) inset`,
            }}
            onMouseEnter={e => { e.currentTarget.style.filter = 'brightness(1.1)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.filter = 'brightness(1)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {isConfirm ? 'Confirmar' : 'Entendido'}
          </button>
        </div>
      </div>
    </PortalModal>
  );
};

export default SystemPopup;
