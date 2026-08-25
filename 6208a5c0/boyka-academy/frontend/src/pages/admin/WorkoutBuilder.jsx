import React, { useState } from 'react';
import { Plus, Trash2, Dumbbell, Save, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WorkoutBuilder() {
  const [workoutTitle, setWorkoutTitle] = useState('');
  const [category, setCategory] = useState('martial_arts');
  const [exercises, setExercises] = useState([
    { id: Date.now(), name: '', sets: 3, reps: '10-12', restSeconds: 60 }
  ]);

  const addExerciseRow = () => {
    setExercises([
      ...exercises,
      { id: Date.now(), name: '', sets: 3, reps: '12', restSeconds: 60 }
    ]);
  };

  const removeExerciseRow = (id) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const handleExerciseChange = (id, field, value) => {
    setExercises(exercises.map(ex => ex.id === id ? { ...ex, [field]: value } : ex));
  };

  const handleSaveWorkout = (e) => {
    e.preventDefault();
    console.log("Workout Created by Coach:", { workoutTitle, category, exercises });
    alert("تم حفظ برنامج التمرين بنجاح وترشيحه للاعبين!");
  };

  return (
    <div className="min-h-screen bg-brand-pitch text-white p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      
      <div className="flex items-center justify-between">
        <Link to="/admin" className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-white">
          <ChevronRight className="w-4 h-4" /> العودة للوحة التحكم
        </Link>
        <span className="text-xs font-bold text-brand-red bg-brand-red/10 px-3 py-1 rounded-full">
          Coach Salem Diab Tools
        </span>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-black">منشئ التمارين (Workout Builder)</h1>
          <p className="text-xs text-brand-muted mt-1">صمم الجلسة التدريبية، حدد الجولات والتكرارات وأوقات الراحة.</p>
        </div>

        <button 
          onClick={handleSaveWorkout}
          className="flex items-center gap-2 bg-brand-red hover:bg-brand-redHover text-white px-6 py-3 rounded-xl font-bold text-sm shadow-glow-red transition-all"
        >
          <Save className="w-4 h-4" />
          حفظ التمرين
        </button>
      </div>

      {/* Header Form */}
      <div className="glass-panel p-6 rounded-2xl border border-brand-border grid md:grid-cols-2 gap-6">
        <div>
          <label className="text-xs font-bold text-brand-muted block mb-2">عنوان التمرين</label>
          <input 
            type="text" 
            placeholder="مثال: القوة الانفجارية وسرعة اللكم"
            value={workoutTitle}
            onChange={(e) => setWorkoutTitle(e.target.value)}
            className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-brand-muted block mb-2">التصنيف التدريبي</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-brand-card border border-brand-border rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-red"
          >
            <option value="martial_arts">الفنون القتالية (Martial Arts)</option>
            <option value="boxing">الملاكمة والكيك بوكسينج (Boxing)</option>
            <option value="strength">تمارين القوة والأوزان (Strength)</option>
            <option value="fitness">اللياقة البدنية (Fitness)</option>
          </select>
        </div>
      </div>

      {/* Exercise Rows Builder */}
      <div className="glass-panel p-6 rounded-2xl border border-brand-border space-y-4">
        <div className="flex justify-between items-center pb-4 border-b border-brand-border">
          <h3 className="font-extrabold text-white">تفاصيل الحركات والتمارين</h3>
          <button 
            type="button"
            onClick={addExerciseRow}
            className="flex items-center gap-2 bg-brand-card hover:bg-brand-border text-white text-xs font-bold px-4 py-2 rounded-xl border border-brand-border"
          >
            <Plus className="w-4 h-4 text-brand-red" /> إضافة تمرين
          </button>
        </div>

        <div className="space-y-3">
          {exercises.map((ex, index) => (
            <div key={ex.id} className="grid grid-cols-12 gap-3 items-center bg-brand-card/40 p-4 rounded-xl border border-brand-border/60">
              <div className="col-span-1 text-center font-extrabold text-brand-red text-sm">
                #{index + 1}
              </div>

              <div className="col-span-11 sm:col-span-4">
                <input 
                  type="text" 
                  placeholder="اسم التمرين"
                  value={ex.name}
                  onChange={(e) => handleExerciseChange(ex.id, 'name', e.target.value)}
                  className="w-full bg-brand-pitch border border-brand-border rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-red"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <input 
                  type="number" 
                  placeholder="المجموعات"
                  value={ex.sets}
                  onChange={(e) => handleExerciseChange(ex.id, 'sets', e.target.value)}
                  className="w-full bg-brand-pitch border border-brand-border rounded-lg px-3 py-2 text-xs text-white text-center focus:outline-none"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <input 
                  type="text" 
                  placeholder="التكرارات"
                  value={ex.reps}
                  onChange={(e) => handleExerciseChange(ex.id, 'reps', e.target.value)}
                  className="w-full bg-brand-pitch border border-brand-border rounded-lg px-3 py-2 text-xs text-white text-center focus:outline-none"
                />
              </div>

              <div className="col-span-3 sm:col-span-2">
                <input 
                  type="number" 
                  placeholder="راحة (ثانية)"
                  value={ex.restSeconds}
                  onChange={(e) => handleExerciseChange(ex.id, 'restSeconds', e.target.value)}
                  className="w-full bg-brand-pitch border border-brand-border rounded-lg px-3 py-2 text-xs text-white text-center focus:outline-none"
                />
              </div>

              <div className="col-span-1 text-center">
                <button 
                  onClick={() => removeExerciseRow(ex.id)}
                  className="p-2 text-brand-muted hover:text-brand-red transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
