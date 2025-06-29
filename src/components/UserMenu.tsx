import React, { useState } from 'react';
import { User, LogOut, BookOpen, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface UserMenuProps {
  onViewReadings: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ onViewReadings }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-purple-200 hover:bg-white transition-all duration-200"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-slate-700 font-medium hidden sm:block">
          {user.email?.split('@')[0]}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-lg border border-slate-200 py-2 z-50">
          <button
            onClick={() => {
              onViewReadings();
              setIsOpen(false);
            }}
            className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center transition-colors"
          >
            <BookOpen className="w-4 h-4 mr-3 text-purple-400" />
            My Readings
          </button>
          <hr className="my-2 border-slate-200" />
          <button
            onClick={handleSignOut}
            className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3 text-red-400" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};