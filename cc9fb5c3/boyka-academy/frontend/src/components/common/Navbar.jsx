import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, UserCheck, Flame } from 'lucide-react';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const token = localStorage.getItem('boyka_token');
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-brand-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-brand-red to-black rounded-xl flex items-center justify-center border border-brand-red/40 group-hover:scale-105 transition-transform shadow-glow-red">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-wider text-white block leading-none">BOYKA</span>
              <span className="text-[10px] font-bold text-brand-red tracking-widest uppercase">Sports Academy</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-semibold text-sm">
            <Link to="/" className="text-white hover:text-brand-red transition-colors">الرئيسية</Link>
            <a href="#about" className="text-brand-muted hover:text-white transition-colors">عن الأكاديمية</a>
            <a href="#coach" className="text-brand-muted hover:text-white transition-colors">الكابتن سالم</a>
            <a href="#programs" className="text-brand-muted hover:text-white transition-colors">البرامج التدريبية</a>
            <a href="#achievements" className="text-brand-muted hover:text-white transition-colors">الإنجازات</a>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {token ? (
              <button 
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2 bg-brand-card hover:bg-brand-border text-white px-5 py-2.5 rounded-xl border border-brand-border text-sm font-bold transition-all"
              >
                <UserCheck className="w-4 h-4 text-brand-red" />
                لوحة التحكم
              </button>
            ) : (
              <>
                <Link to="/login" className="text-white hover:text-brand-red text-sm font-bold px-4 py-2 transition-colors">
                  تسجيل الدخول
                </Link>
                <Link 
                  to="/register" 
                  className="flex items-center gap-2 bg-gradient-to-r from-brand-red to-brand-amber hover:opacity-90 text-white px-6 py-2.5 rounded-xl text-sm font-extrabold shadow-glow-red transition-all transform active:scale-95"
                >
                  <Flame className="w-4 h-4" />
                  ابدأ التدريب
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-lg bg-brand-card text-white border border-brand-border"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-brand-dark border-b border-brand-border px-4 pt-4 pb-6 space-y-3">
          <Link to="/" className="block text-white font-bold py-2">الرئيسية</Link>
          <a href="#about" className="block text-brand-muted py-2">عن الأكاديمية</a>
          <a href="#coach" className="block text-brand-muted py-2">الكابتن سالم</a>
          <a href="#programs" className="block text-brand-muted py-2">البرامج التدريبية</a>
          <div className="pt-4 border-t border-brand-border flex flex-col gap-2">
            <Link to="/login" className="w-full text-center py-2.5 rounded-xl bg-brand-card text-white font-bold">تسجيل الدخول</Link>
            <Link to="/register" className="w-full text-center py-2.5 rounded-xl bg-brand-red text-white font-bold">ابدأ التدريب الآن</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
