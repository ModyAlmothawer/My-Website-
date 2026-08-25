import React from 'react';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { Shield, Zap, Target, Award, Play, ChevronLeft, CheckCircle2, Users, Flame, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const programsDemo = [
    {
      id: 'martial-arts',
      title: 'الفنون القتالية المتكاملة',
      engTitle: 'Martial Arts Fundamentals',
      desc: 'تدريب احترافي في الدفاع عن النفس، القتال التكتيكي، وزيادة سرعة البديهة والتركيز.',
      level: 'جميع المستويات',
      duration: '8 أسابيع',
      icon: Shield,
      color: 'from-red-600 to-black'
    },
    {
      id: 'boxing-kickboxing',
      title: 'الملاكمة والكيك بوكسينج',
      engTitle: 'Boxing / Kickboxing',
      desc: 'تطوير قوة اللكمات، التوافق العضلي العصبي، وحرق الدهون العالي مع الكابتن سالم.',
      level: 'متوسط - متقدم',
      duration: '6 أسابيع',
      icon: Flame,
      color: 'from-orange-600 to-black'
    },
    {
      id: 'strength-weights',
      title: 'القوة وتمارين الأوزان',
      engTitle: 'Strength & Weights',
      desc: 'بناء الكتلة العضلية، زيادة التحمل، وتطبيق أساليب الرفعات القوية بأسلوب علمي.',
      level: 'مبتدئ - متوسط',
      duration: '12 أسبوع',
      icon: Dumbbell,
      color: 'from-zinc-700 to-black'
    },
    {
      id: 'fitness-conditioning',
      title: 'اللياقة البدنية والتحمل',
      engTitle: 'Fitness & Conditioning',
      desc: 'برامج رفع اللياقة القلبية التنفسية (Cardio)، رفع المهارات الحركية والتحمل العالي.',
      level: 'جميع المستويات',
      duration: '4 أسابيع',
      icon: Zap,
      color: 'from-amber-600 to-black'
    }
  ];

  return (
    <div className="min-h-screen bg-brand-pitch text-white selection:bg-brand-red">
      <Navbar />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-red/15 blur-[140px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-right">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-red/10 border border-brand-red/30 text-brand-red text-xs font-black tracking-wide">
                <Flame className="w-4 h-4 animate-pulse" />
                <span>منصة التدريب الرسمية - الكابتن سالم دياب</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black leading-tight tracking-tight">
                ابنِ قوتك. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-red via-brand-amber to-white">
                  طوّر مهاراتك.
                </span> <br />
                اصنع نسختك الأقوى.
              </h1>

              <p className="text-lg sm:text-xl text-brand-muted max-w-2xl leading-relaxed">
                منصة أكاديمية بويكا الرياضية مع الكابتن سالم دياب لتطوير القوة واللياقة والمهارات القتالية من خلال برامج تدريبية منظمة ومتابعة مستمرة.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-red to-brand-amber text-white font-extrabold text-lg shadow-glow-red hover:scale-105 transition-all text-center"
                >
                  ابدأ التدريب الآن
                </Link>
                <a
                  href="#programs"
                  className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel hover:bg-brand-border/60 text-white font-bold text-lg border border-brand-border transition-all flex items-center justify-center gap-2"
                >
                  اكتشف البرامج
                  <ChevronLeft className="w-5 h-5" />
                </a>
              </div>

              {/* Metrics Header */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-brand-border/60 max-w-lg mx-auto lg:mx-0">
                <div>
                  <h4 className="text-2xl font-black text-white">+500</h4>
                  <p className="text-xs text-brand-muted">متدرب ملتحق</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-brand-red">+10</h4>
                  <p className="text-xs text-brand-muted">سنوات خبرة</p>
                </div>
                <div>
                  <h4 className="text-2xl font-black text-brand-amber">99%</h4>
                  <p className="text-xs text-brand-muted">نسبة الالتزام</p>
                </div>
              </div>
            </div>

            {/* Hero Image Section */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Visual Image Container */}
                <div className="relative rounded-3xl overflow-hidden border-2 border-brand-border shadow-2xl bg-brand-card">
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-pitch via-transparent to-transparent z-10" />
                  
                  {/* Coach Image Container */}
                  <img
                    src="/assets/images/coach/salem-hero.jpg"
                    alt="Coach Salem Diab - الكابتن سالم دياب"
                    className="w-full h-[500px] object-cover object-top filter contrast-125 grayscale-[20%]"
                    onError={(e) => {
                      // Placeholder if image does not exist yet
                      e.target.src = 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000&auto=format&fit=crop';
                    }}
                  />

                  <div className="absolute bottom-6 right-6 left-6 z-20 glass-panel p-4 rounded-2xl border border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center font-bold text-white">
                        SD
                      </div>
                      <div>
                        <h3 className="font-extrabold text-white">الكابتن سالم دياب</h3>
                        <p className="text-xs text-brand-muted">Coach Salem Diab - مدرب الفنون القتالية واللياقة</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- COACH SECTION --- */}
      <section id="coach" className="py-20 bg-brand-dark border-y border-brand-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-brand-border glass-panel p-2">
                <img
                  src="/assets/images/coach/salem-about.jpg"
                  alt="Coach Salem Diab"
                  className="w-full h-[420px] object-cover rounded-xl"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000&auto=format&fit=crop';
                  }}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-block px-3 py-1 rounded-md bg-brand-red/10 text-brand-red text-xs font-bold">
                عن المدرب
              </div>
              <h2 className="text-3xl sm:text-4xl font-black">
                تعرف على الكابتن <span className="text-brand-red">سالم دياب</span>
              </h2>
              <p className="text-brand-muted leading-relaxed">
                مدرب متخصص في إعداد الأبطال وتطوير المهارات القتالية البدنية. يعتمد الكابتن سالم على دمج أساليب الفنون القتالية الشاملة مع التخطيط العلمي لتمارين القوة والتحمل لضمان وصول المتدرب لأقصى إمكانياته.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 pt-2">
                {[
                  'تدريب الفنون القتالية والملاكمة',
                  'برامج زيادة القوة وتحمل الأوزان',
                  'رفع اللياقة والتخسيس العلمي',
                  'خطط تدريبية شخصية ومتابعة'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0" />
                    <span className="text-sm font-semibold">{item}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- PROGRAMS SECTION --- */}
      <section id="programs" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black">
              البرامج <span className="text-brand-red">التدريبية</span>
            </h2>
            <p className="text-brand-muted">
              اختر المسار التدريبي المناسب لأهدافك البدنية والقتالية مع الكابتن سالم دياب
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {programsDemo.map((prog) => {
              const IconComp = prog.icon;
              return (
                <div 
                  key={prog.id} 
                  className="glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group"
                >
                  <div className="space-y-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-brand-red/30 to-brand-card flex items-center justify-center border border-brand-red/30 text-brand-red group-hover:scale-110 transition-transform">
                      <IconComp className="w-7 h-7" />
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-brand-amber tracking-widest uppercase block mb-1">
                        {prog.engTitle}
                      </span>
                      <h3 className="text-xl font-extrabold text-white">{prog.title}</h3>
                    </div>

                    <p className="text-xs text-brand-muted leading-relaxed">
                      {prog.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-6 border-t border-brand-border/50 flex items-center justify-between text-xs text-brand-muted">
                    <span>المستوى: {prog.level}</span>
                    <span className="font-bold text-white">{prog.duration}</span>
                  </div>

                  <Link
                    to="/programs"
                    className="mt-4 w-full py-2.5 rounded-lg bg-brand-card hover:bg-brand-red text-white text-xs font-bold border border-brand-border hover:border-brand-red transition-all text-center block"
                  >
                    عرض البرنامج
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
