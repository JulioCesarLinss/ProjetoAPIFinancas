import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Camera, Trash2, Check } from 'lucide-react';
import UserAvatar from '../components/ui/UserAvatar';
import InputGroup from '../components/ui/InputGroup';
import PrimaryButton from '../components/ui/PrimaryButton';

const Profile = ({ user, onUpdateUser, showAlert }) => {
  const [formData, setFormData] = useState(user);
  const fileInputRef = useRef(null);
  
  const handleFileChange = (event) => { 
      const file = event.target.files[0]; 
      if (file) { 
          const reader = new FileReader(); 
          reader.onloadend = () => setFormData({ ...formData, avatar: reader.result }); 
          reader.readAsDataURL(file); 
      } 
  };
  
  const handleRemovePhoto = () => {
      setFormData({ ...formData, avatar: "" }); 
  };
  
  const handleSave = async (e) => { 
      e.preventDefault(); 
      try {
          const response = await axios.put(`http://localhost:8080/api/users/${user.id}`, formData);
          onUpdateUser(response.data);
          localStorage.setItem('cashplus_user', JSON.stringify(response.data));
          showAlert('Sucesso!', 'Seu perfil foi atualizado e salvo.', 'success');
      } catch (error) {
          console.error("Erro ao atualizar perfil:", error);
          showAlert('Erro', 'Não foi possível salvar as alterações.', 'error');
      }
  };

  return (
    <div className="px-6 md:px-0 pt-10 md:pt-0 pb-24 md:pb-0 max-w-2xl mx-auto md:mx-0">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Configurações de Perfil</h2>
      <div className="bg-[#1E1E1E] p-8 rounded-2xl border border-gray-800 animate-in fade-in zoom-in-95 duration-500">
         <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
            <div className="relative group"><UserAvatar user={formData} size="w-32 h-32" textSize="text-4xl" /><button onClick={() => fileInputRef.current.click()} className="absolute bottom-0 right-0 bg-cashGreen text-black p-2 rounded-full border-4 border-[#1E1E1E] hover:bg-green-400 transition-colors"><Camera size={20} /></button><input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" /></div>
            <div className="text-center md:text-left flex-1"><h3 className="text-white font-bold text-xl">{formData.name || "Usuário"}</h3><p className="text-gray-500 mb-4">{formData.email}</p>{formData.avatar && <button type="button" onClick={handleRemovePhoto} className="text-red-400 text-xs font-bold hover:underline flex items-center gap-1 mx-auto md:mx-0 cursor-pointer"><Trash2 size={12} /> Remover foto</button>}</div>
         </div>
         <form className="flex flex-col gap-4" onSubmit={handleSave}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputGroup label="Nome Completo" placeholder="Seu nome" darkTheme value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <InputGroup label="Email" placeholder="email@exemplo.com" type="email" darkTheme value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <InputGroup label="Telefone" placeholder="11999999999" type="tel" maxLength={11} darkTheme value={formData.telefone} onChange={e => setFormData({...formData, telefone: e.target.value})} />
            </div>
            <div className="mt-4 md:w-1/3"><PrimaryButton label="Salvar Alterações" icon={<Check size={18} />} type="submit" /></div>
         </form>
      </div>
    </div>
  );
};

export default Profile;
