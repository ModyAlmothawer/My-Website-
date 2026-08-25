import React, { useState, useEffect } from 'react';
import { Play, Check, RotateCcw, ChevronRight, Shield, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TodaysWorkout() {
  const [exercises, setExercises] = useState([
    { id: 1, name: "إحماء قتالي وحركة قدمين", sets: 3, reps: "3 دقائق", rest: 45, completed: false },
    { id: 2, name: "لكمات مستقيمة (Jab - Cross) على الكيس", sets: 4, reps: "20 تكرار", rest: 60, completed: false },
    { id: 3, name: "تمرين ضغط انفجاري (Push-ups)", sets: 4, reps: "15 تكرار", rest: 60, completed: false },
    { id: 4, name: "تمريرات قرفصاء مع وزن (Goblet Squat)", sets: 3, reps: "12 تكرار", rest: 90, completed: false },
    { id: 5, name: "الإطالة والتهدئة (Cooldown)", sets: 1, reps: "5 دقائق", rest: 0, completed: false },
  ]);

  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    } else if (timer === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const toggleComplete = (index) => {
    const updated = [...exercises];
    updated[index].completed = !updated[index].completed;
    setExercises(updated);

    // Auto trigger rest timer
    if (updated[index].completed && updated[index].rest > 0) {
      setTimer(updated[index].rest);
      setIsTimerRunning(true);
    }
  };

  const activeEx = exercises[activeExerciseIndex];

  return (
    <div className="min-h-screen bg-brand-pitch text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-white">
            <ChevronRight className="w-4 h-4" /> العودة للوحة التحكم
          </Link>
          <span className="text-xs font-bold px-3 py-1 bg-brand-red/20 text-brand-red rounded-full">
            🥊 جلسة قتالية وقوة
          </span>
        </div>

        {/* Rest Timer Widget */}
        {timer > 0 && (
          <div className="glass-panel p-4 rounded-2xl border border-brand-amber/50 flex items-center justify-between bg-brand-amber/10">
            <div className="flex items-center gap-3">
              <Flame className="w-6 h-6 text-brand-amber animate-bounce" />
              <div>
                <span className="text-xs text-brand-muted block">وقت الراحة المتبقي</span>
                <span className="text-xl font-black text-white">{timer} ثانية</span>
              </div>
            </div>
            <button 
              onClick={() => setIsTimerRunning(!isTimerRunning)} 
              className="px-4 py-2 bg-brand-card rounded-xl text-xs font-bold border border-brand-border"
            >
              {isTimerRunning ? 'إيقاف مؤقت' : 'استئناف'}
            </button>
          </div>
        )}

        {/* Current Active Exercise Focus */}
        <div className="glass-panel p-8 rounded-3xl border border-brand-red/40 relative space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="text-xs text-brand-muted font-bold block">التمرين الحالي {activeExerciseIndex + 1} من {exercises.length}</span>
              <h2 className="text-2xl md:text-3xl font-black mt-1 text-white">{activeEx.name}</h2>
            </div>
            <button
              onClick={() => toggleComplete(activeExerciseIndex)}
              className={`p-4 rounded-2xl border transition-all ${
                activeEx.completed 
                  ? 'bg-green-500 text-white border-green-500' 
                  : 'bg-brand-card border-brand-border text-brand-muted hover:border-brand-red'
              }`}
            >
              <Check className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-brand-border/60">
            <div className="bg-brand-card p-4 rounded-xl border border-brand-border text-center">
              <span className="text-xs text-brand-muted block">المجموعات</span>
              <span className="text-lg font-black text-white">{activeEx.sets} Sets</span>
            </div>
            <div className="bg-brand-card p-4 rounded-xl border border-brand-border text-center">
              <span className="text-xs text-brand-muted block">التكرارات / الوقت</span>
              <span className="text-lg font-black text-white">{activeEx.reps}</span>
            </div>
            <div className="bg-brand-card p-4 rounded-xl border border-brand-border text-center">
              <span className="text-xs text-brand-muted block">الراحة بعد التمرين</span>
              <span className="text-lg font-black text-brand-amber">{activeEx.rest} ثانية</span>
            </div>
          </div>
        </div>

        {/* Workout List Tracker */}
        <div className="glass-panel p-6 rounded-2xl border border-brand-border space-y-4">
          <h3 className="font-extrabold text-lg text-white">قائمة تمارين اليوم</h3>
          
          <div className="space-y-3">
            {exercises.map((ex, index) => (
              <div
                key={ex.id}
                onClick={() => setActiveExerciseIndex(index)}
                className={`p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                  activeExerciseIndex === index 
                    ? 'border-brand-red bg-brand-card' 
                    : 'border-brand-border/60 bg-brand-pitch hover:border-brand-border'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                    ex.completed ? 'bg-green-500 text-white' : 'bg-brand-border text-brand-muted'
                  }`}>
                    {ex.completed ? <Check className="w-4 h-4" /> : index + 1}
                  </div>
                  <div>
                    <h4 className={`font-bold text-sm ${ex.completed ? 'line-through text-brand-muted' : 'text-white'}`}>
                      {ex.name}
                    </h4>
                    <span className="text-xs text-brand-muted">{ex.sets} المجموعات | {ex.reps}</span>
                  </div>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); toggleComplete(index); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                    ex.completed ? 'bg-green-500/20 text-green-500' : 'bg-brand-card text-brand-muted hover:text-white'
                  }`}
                >
                  {ex.completed ? 'مكتمل' : 'تحديد كمكتمل'}
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
