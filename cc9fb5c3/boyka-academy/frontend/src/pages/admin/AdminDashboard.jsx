import React from 'react';
import { Users, BookOpen, Dumbbell, Calendar, Bell, Plus, Shield, TrendingUp, Search } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: "إجمالي اللاعبين", value: "142", icon: Users, color: "text-brand-red" },
    { label: "اللاعبين النشطين", value: "98", icon: TrendingUp, color: "text-brand-amber" },
    { label: "البرامج التدريبية", value: "8", icon: BookOpen, color: "text-blue-500" },
    { label: "التمارين المكتملة", value: "1,240", icon: Dumbbell, color: "text-green-500" },
  ];

  const recentPlayers = [
    { name: "محمد أحمد", program: "Martial Arts Fundamentals", level: "Beginner", status: "نشط" },
    { name: "عمر خالد", program: "Boxing Basics", level: "Intermediate", status: "نشط" },
    { name: "يوسف حسن", program: "Strength Training", level: "Advanced", status: "غير نشط" },
  ];

  return (
    <div className="min-h-screen bg-brand-pitch text-white flex">
      {/* Admin Sidebar */}
      <aside className="w-64 bg-brand-dark border-l border-brand-border p-6 hidden md:flex flex-col justify-between">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center font-black">SD</div>
            <div>
              <span className="font-extrabold text-white block text-sm">COACH DASHBOARD</span>
              <span className="text-[10px] text-brand-red font-bold">الكابتن سالم دياب</span>
            </div>
          </div>

          <nav className="space-y-2 text-sm font-bold">
            <a href="#overview" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-red text-white">
              <Shield className="w-5 h-5" />
              الرئيسية
            </a>
            <a href="#players" className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-muted hover:bg-brand-card hover:text-white transition-colors">
              <Users className="w-5 h-5" />
              إدارة اللاعبين
            </a>
            <a href="#programs" className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-muted hover:bg-brand-card hover:text-white transition-colors">
              <BookOpen className="w-5 h-5" />
              البرامج والدروس
            </a>
            <a href="#workout-builder" className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-muted hover:bg-brand-card hover:text-white transition-colors">
              <Dumbbell className="w-5 h-5" />
              منشئ التمارين
            </a>
            <a href="#announcements" className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-muted hover:bg-brand-card hover:text-white transition-colors">
              <Bell className="w-5 h-5" />
              الإعلانات والتنبيهات
            </a>
          </nav>
        </div>
      </aside>

      {/* Admin Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto space-y-8">
        
        {/* Top Control Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black">لوحة التحكم الإستراتيجية</h1>
            <p className="text-xs text-brand-muted mt-1">مرحباً بك كابتن سالم. إليك نظرة عامة على أداء المتدربين اليوم.</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-brand-red hover:bg-brand-redHover text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-glow-red">
              <Plus className="w-4 h-4" />
              إضافة برنامج جديد
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="glass-panel p-6 rounded-2xl border border-brand-border space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-brand-muted font-bold">{item.label}</span>
                  <Icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <h3 className="text-3xl font-black text-white">{item.value}</h3>
              </div>
            );
          })}
        </div>

        {/* Player Management Table Preview */}
        <div className="glass-panel rounded-2xl border border-brand-border overflow-hidden">
          <div className="p-6 border-b border-brand-border flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-white">اللاعبون المسجلون مؤخراً</h2>
            <div className="relative">
              <Search className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                type="text"
                placeholder="بحث عن لاعب..."
                className="bg-brand-card border border-brand-border text-xs text-white pl-4 pr-9 py-2 rounded-xl focus:outline-none focus:border-brand-red"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-brand-card/50 text-brand-muted uppercase font-bold border-b border-brand-border">
                <tr>
                  <th className="p-4">اللاعب</th>
                  <th className="p-4">البرنامج الحالي</th>
                  <th className="p-4">المستوى</th>
                  <th className="p-4">الحالة</th>
                  <th className="p-4">الإجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-brand-border/40">
                {recentPlayers.map((player, idx) => (
                  <tr key={idx} className="hover:bg-brand-card/30 transition-colors">
                    <td className="p-4 font-bold text-white">{player.name}</td>
                    <td className="p-4 text-brand-muted">{player.program}</td>
                    <td className="p-4 text-white">{player.level}</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        player.status === 'نشط' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {player.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <button className="text-brand-red font-bold hover:underline">عرض الملف</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
