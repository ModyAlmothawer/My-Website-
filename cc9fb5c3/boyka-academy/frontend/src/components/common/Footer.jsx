import React from 'react';
import { Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-brand-border/60 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-right">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center font-bold">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-lg font-black text-white block leading-none">BOYKA SPORTS ACADEMY</span>
              <span className="text-xs text-brand-muted">Coach Salem Diab</span>
            </div>
          </div>

          <p className="text-xs text-brand-muted">
            جميع الحقوق محفوظة © {new Date().getFullYear()} أكاديمية بويكا الرياضية - الكابتن سالم دياب.
          </p>
        </div>
      </div>
    </footer>
  );
}
