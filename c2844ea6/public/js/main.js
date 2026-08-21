// ===== تسجيل الدخول والاشتراك =====
document.addEventListener('DOMContentLoaded', function () {
  // تسجيل الدخول
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          alert('تم تسجيل الدخول بنجاح');
          window.location.reload();
        } else {
          alert(data.message || 'خطأ في تسجيل الدخول');
        }
      } catch (err) {
        alert('حدث خطأ في الاتصال');
      }
    });
  }

  // الاشتراك
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('regName').value;
      const email = document.getElementById('regEmail').value;
      const password = document.getElementById('regPassword').value;
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          alert('تم إنشاء الحساب بنجاح');
          window.location.reload();
        } else {
          alert(data.message || 'خطأ في التسجيل');
        }
      } catch (err) {
        alert('حدث خطأ في الاتصال');
      }
    });
  }

  // تسجيل الخروج
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.reload();
    });
  }

  // ===== إنشاء صفحة إهداء =====
  const createForm = document.getElementById('createForm');
  if (createForm) {
    createForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      if (!token) {
        alert('يجب تسجيل الدخول أولاً');
        return;
      }
      const name = document.getElementById('name').value;
      const message = document.getElementById('message').value;
      const birthDate = document.getElementById('birthDate').value;
      const deathDate = document.getElementById('deathDate').value;
      const pageColor = document.getElementById('pageColor').value;
      const customDua = document.getElementById('customDua').value;

      try {
        const res = await fetch('/api/memorial/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ name, message, birthDate, deathDate, pageColor, customDua }),
        });
        const data = await res.json();
        if (res.ok) {
          document.getElementById('createResult').innerHTML = `
            <div class="alert alert-success">تم الإنشاء! <a href="${data.url}" target="_blank">زيارة الصفحة</a></div>
          `;
        } else {
          alert(data.message || 'فشل الإنشاء');
        }
      } catch (err) {
        alert('خطأ في الاتصال');
      }
    });
  }

  // ===== تفاعل صفحة الإهداء =====
  // العدادات
  const incrementBtns = document.querySelectorAll('.increment-btn');
  incrementBtns.forEach(btn => {
    btn.addEventListener('click', async function () {
      const dhikr = this.dataset.dhikr;
      const counterSpan = document.getElementById(`counter-${dhikr.replace(/\s/g,'')}`);
      if (!counterSpan) return;
      try {
        const res = await fetch('/api/memorial/counter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pageId, dhikr }),
        });
        const data = await res.json();
        if (data.success) {
          counterSpan.textContent = data.newCount;
        }
      } catch (err) {
        console.error(err);
      }
    });
  });

  const resetBtns = document.querySelectorAll('.reset-btn');
  resetBtns.forEach(btn => {
    btn.addEventListener('click', async function () {
      const dhikr = this.dataset.dhikr;
      const counterSpan = document.getElementById(`counter-${dhikr.replace(/\s/g,'')}`);
      if (!counterSpan) return;
      if (!confirm('إعادة تعيين العداد؟')) return;
      try {
        const res = await fetch('/api/memorial/reset-counter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pageId, dhikr }),
        });
        const data = await res.json();
        if (data.success) {
          counterSpan.textContent = '0';
        }
      } catch (err) {
        console.error(err);
      }
    });
  });

  // حجز جزء من القرآن
  const juzItems = document.querySelectorAll('.juz-item');
  let selectedJuz = null;
  juzItems.forEach(item => {
    item.addEventListener('click', function () {
      const reserved = this.dataset.reserved === 'true';
      if (reserved) {
        alert('هذا الجزء محجوز بالفعل');
        return;
      }
      selectedJuz = this.dataset.juz;
      document.getElementById('reserveModal').style.display = 'block';
    });
  });

  document.getElementById('confirmReserve')?.addEventListener('click', async function () {
    const visitorName = document.getElementById('visitorName').value || 'زائر';
    if (!selectedJuz) return;
    try {
      const res = await fetch('/api/memorial/reserve-juz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageId, juzNumber: selectedJuz, visitorName }),
      });
      const data = await res.json();
      if (data.success) {
        alert('تم حجز الجزء بنجاح');
        window.location.reload();
      } else {
        alert(data.message || 'فشل الحجز');
      }
    } catch (err) {
      alert('خطأ في الاتصال');
    }
  });

  // إضافة دعاء
  const prayerForm = document.getElementById('prayerForm');
  if (prayerForm) {
    prayerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const visitorName = document.getElementById('prayerVisitorName').value || 'زائر';
      const text = document.getElementById('prayerText').value;
      if (!text.trim()) return alert('الرجاء كتابة دعاء');
      try {
        const res = await fetch('/api/memorial/add-prayer', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pageId, visitorName, text }),
        });
        const data = await res.json();
        if (data.success) {
          alert('تم إضافة الدعاء');
          window.location.reload();
        } else {
          alert(data.message || 'فشل');
        }
      } catch (err) {
        alert('خطأ في الاتصال');
      }
    });
  }

  // ===== لوحة المستخدم (تحديث الصفحة) =====
  const updateForm = document.getElementById('updateForm');
  if (updateForm) {
    updateForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      if (!token) return alert('يرجى تسجيل الدخول');
      const name = document.getElementById('editName').value;
      const message = document.getElementById('editMessage').value;
      const birthDate = document.getElementById('editBirth').value;
      const deathDate = document.getElementById('editDeath').value;
      const pageColor = document.getElementById('editColor').value;
      const customDua = document.getElementById('editDua').value;
      try {
        const res = await fetch('/api/memorial/update', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({ name, message, birthDate, deathDate, pageColor, customDua }),
        });
        const data = await res.json();
        if (data.success) {
          alert('تم التحديث بنجاح');
        } else {
          alert(data.message || 'فشل التحديث');
        }
      } catch (err) {
        alert('خطأ في الاتصال');
      }
    });
  }

  // رفع صورة
  const uploadForm = document.getElementById('uploadImageForm');
  if (uploadForm) {
    uploadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const token = localStorage.getItem('token');
      if (!token) return alert('يرجى تسجيل الدخول');
      const fileInput = document.getElementById('imageFile');
      if (!fileInput.files.length) return alert('اختر صورة');
      const formData = new FormData();
      formData.append('image', fileInput.files[0]);
      try {
        const res = await fetch('/api/memorial/upload-image', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });
        const data = await res.json();
        if (data.success) {
          alert('تم رفع الصورة بنجاح');
          window.location.reload();
        } else {
          alert(data.message || 'فشل الرفع');
        }
      } catch (err) {
        alert('خطأ في الاتصال');
      }
    });
  }
});