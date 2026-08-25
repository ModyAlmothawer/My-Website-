import React from 'react';
import { Play, Flame, Trophy, Calendar, CheckCircle, Dumbbell, Award, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PlayerDashboard() {
  // Demo Player State
  const player = {
    name: "أحمد علي",
    level: "متوسط (Intermediate)",
    streak: 7,
    completedWorkouts: 18,
    weeklyProgress: 80
  };

  const todaysWorkout = {
    title: "الملاكمة والقوة - الجلسة التكتيكية",
    duration: "45 دقيقة",
    exercisesCount: 5,
    category: "Boxing & Strength"
  };

  return (
    <div className="min-h-screen bg-brand-pitch text-white flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-brand-dark border-l border-brand-border p-6 hidden md:flex flex-col justify-between">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center font-black">B</div>
            <div>
              <span className="font-extrabold text-white block text-sm">BOYKA ACADEMY</span>
              <span className="text-[10px] text-brand-muted">منصة المتدرب</span>
            </div>
          </div>

          <nav className="space-y-2 text-sm font-bold">
            <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-brand-red text-white">
              <Dumbbell className="w-5 h-5" />
              الرئيسية
            </Link>
            <Link to="/dashboard/workout/today" className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-muted hover:bg-brand-card hover:text-white transition-colors">
              <Play className="w-5 h-5" />
              تدريب اليوم
            </Link>
            <Link to="/dashboard/programs" className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-muted hover:bg-brand-card hover:text-white transition-colors">
              <Calendar className="w-5 h-5" />
              برامجي
            </Link>
            <Link to="/dashboard/progress" className="flex items-center gap-3 px-4 py-3 rounded-xl text-brand-muted hover:bg-brand-card hover:text-white transition-colors">
              <Trophy className="w-5 h-5" />
              إنجازاتي والتقدم
            </Link>
          </nav>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-brand-border text-xs space-y-2">
          <p className="text-brand-muted">الكابتن المباشر:</p>
          <p className="font-bold text-white">سالم دياب (Coach Salem)</p>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-brand-border">
          <div>
            <h1 className="text-2xl md:text-3xl font-black">مرحبًا، {player.name} 👋</h1>
            <p className="text-sm text-brand-muted mt-1">جاهز لجلسة اليوم؟ استمر في الحفاظ على قوتك وسلسلة التمارين!</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="bg-brand-card px-4 py-2.5 rounded-xl border border-brand-border flex items-center gap-3">
              <Flame className="w-6 h-6 text-brand-amber animate-pulse" />
              <div>
                <span className="text-xs text-brand-muted block">Training Streak</span>
                <span className="text-sm font-black text-white">{player.streak} أيام متتالية</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-panel p-6 rounded-2xl border border-brand-border space-y-2">
            <span className="text-xs text-brand-muted font-bold">المستوى الحالي</span>
            <h3 className="text-xl font-extrabold text-white">{player.level}</h3>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-brand-border space-y-2">
            <span className="text-xs text-brand-muted font-bold">التمارين المكتملة</span>
            <h3 className="text-xl font-extrabold text-brand-red">{player.completedWorkouts} تمريناً</h3>
          </div>
          <div className="glass-panel p-6 rounded-2xl border border-brand-border space-y-2">
            <span className="text-xs text-brand-muted font-bold">إنجاز الأسبوع</span>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-extrabold text-brand-amber">{player.weeklyProgress}%</h3>
            </div>
            <div className="w-full bg-brand-border h-2 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-brand-red to-brand-amber h-full rounded-full" style={{ width: `${player.weeklyProgress}%` }} />
            </div>
          </div>
        </div>

        {/* Today's Workout Card */}
        <div className="glass-panel glass-panel-hover p-8 rounded-3xl border border-brand-red/40 bg-gradient-to-br from-brand-card to-brand-pitch relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/20 text-brand-red text-xs font-black">
              🏋️ تدريب اليوم الموصى به
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-black text-white">{todaysWorkout.title}</h2>
              <p className="text-sm text-brand-muted mt-2">
                يتضمن: إحماء، مهارات الملاكمة الأساسية، وتقوية القوة البدنية بالوزن.
              </p>
            </div>

            <div className="flex items-center gap-6 text-xs text-brand-muted">
              <span>المدة: {todaysWorkout.duration}</span>
              <span>عدد التمارين: {todaysWorkout.exercisesCount} تمارين</span>
            </div>

            <Link
              to="/dashboard/workout/today"
              className="inline-flex items-center gap-3 px-8 py-3.5 rounded-xl bg-brand-red hover:bg-brand-redHover text-white font-extrabold text-sm shadow-glow-red transition-all"
            >
              ابدأ التمرين الآن
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </main>
    </div>
  );
}
