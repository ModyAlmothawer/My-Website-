// =========================================================================
// 🔴 هــــام جـــداً: أضف رابط البث الخاص بك بين القوسين "" في الأسفل
// =========================================================================
// يمكنك وضع رابط .m3u8 أو رابط صفحة/إطار iframe خارجي
let STREAM_URL = "https://fastly.live.brightcove.com/6384149663112/us-east-1/6416013238001/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0IjoieWN3Ymx1LmVncmVzcy5zenkzeHgiLCJhY2NvdW50X2lkIjoiNjQxNjAxMzIzODAwMSIsImVobiI6ImZhc3RseS5saXZlLmJyaWdodGNvdmUuY29tIiwiaXNzIjoiYmxpdmUtcGxheWJhY2stc291cmNlLWFwaSIsInN1YiI6InBhdGhtYXB0b2tlbiIsImF1ZCI6WyI2NDE2MDEzMjM4MDAxIl0sImp0aSI6IjYzODQxNDk2NjMxMTIifQ.0yJpNEV0ZSId11mURgeaOhXZvov07Uj-VI_0qt0LLSQ/playlist-hls.m3u8"; 
// =========================================================================

const video = document.getElementById('videoPlayer');
const iframe = document.getElementById('iframePlayer');
const qualitySelect = document.getElementById('qualitySelect');
const reloadBtn = document.getElementById('reloadBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const playOverlay = document.getElementById('playOverlay');
const startPlayBtn = document.getElementById('startPlayBtn');
const customUrlInput = document.getElementById('customUrlInput');
const changeUrlBtn = document.getElementById('changeUrlBtn');

let hls = null;

// تعبئة حقل النص بالرابط الحالي
if (customUrlInput) customUrlInput.value = STREAM_URL;

// 1. دالة تشغيل السيرفر والبث
function loadStream(url) {
    if (!url) return;
    STREAM_URL = url.trim();

    // إخفاء أي مشغل قديم
    video.style.display = 'block';
    iframe.style.display = 'none';
    
    // تنظيف أي جلسة hls سابقة
    if (hls) {
        hls.destroy();
        hls = null;
    }

    const isM3U8 = STREAM_URL.includes('.m3u8') || STREAM_URL.includes('m3u8');
    const isHlsSupported = typeof Hls !== 'undefined' && Hls.isSupported();

    if (isM3U8 && isHlsSupported) {
        hls = new Hls({
            maxBufferLength: 30,
            maxMaxBufferLength: 60,
            maxBufferSize: 60 * 1024 * 1024,
            liveSyncDurationCount: 3,
            enableWorker: true
        });

        hls.loadSource(STREAM_URL);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            qualitySelect.innerHTML = '<option value="auto">تلقائي (Auto VIP)</option>';
            data.levels.forEach((level, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.text = level.height ? `${level.height}p` : `جودة ${index + 1}`;
                qualitySelect.appendChild(option);
            });

            // محاولة التشغيل
            attemptPlay();
        });

        hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.fatal) {
                switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        console.log("Network error, retrying...");
                        hls.startLoad();
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        console.log("Media error, recovering...");
                        hls.recoverMediaError();
                        break;
                    default:
                        console.log("Fatal error, switching to iframe fallback...");
                        switchToIframe();
                        break;
                }
            }
        });

    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // متصفح Safari
        video.src = STREAM_URL;
        attemptPlay();
    } else {
        // إذا لم يكن m3u8 أو فشل المشغل المباشر، تحويل لـ iframe
        switchToIframe();
    }
}

// دالة التحويل إلى Iframe للروابط الخارجية
function switchToIframe() {
    video.style.display = 'none';
    iframe.style.display = 'block';
    iframe.src = STREAM_URL;
    playOverlay.classList.add('hidden');
}

// دالة محاولة التشغيل وتجاوز قيود المتصفح (Autoplay)
function attemptPlay() {
    video.play().then(() => {
        // تم التشغيل بنجاح، إخفاء زر التغطية
        playOverlay.classList.add('hidden');
    }).catch(error => {
        console.log("Autoplay blocked, user interaction required:", error);
        // إظهار زر الضغط يدوي لبدء الفيديو والصوت
        playOverlay.classList.remove('hidden');
    });
}

// عند الضغط على زر التشغيل الأكبر
startPlayBtn.addEventListener('click', () => {
    video.muted = false; // تفعيل الصوت
    video.play().then(() => {
        playOverlay.classList.add('hidden');
    }).catch(err => {
        console.error(err);
    });
});

// تغيير الجودة يدويًا
qualitySelect.addEventListener('change', (e) => {
    if (!hls) return;
    const val = e.target.value;
    hls.currentLevel = (val === 'auto') ? -1 : parseInt(val);
});

// زر إعادة تحديث البث
reloadBtn.addEventListener('click', () => {
    loadStream(STREAM_URL);
});

// زر الشاشة الكاملة
fullscreenBtn.addEventListener('click', () => {
    const playerWrapper = document.getElementById('playerWrapper');
    if (playerWrapper.requestFullscreen) {
        playerWrapper.requestFullscreen();
    } else if (playerWrapper.webkitRequestFullscreen) {
        playerWrapper.webkitRequestFullscreen();
    } else if (video.requestFullscreen) {
        video.requestFullscreen();
    }
});

// زر تغيير الرابط يدويًا من واجهة الصفحة
changeUrlBtn.addEventListener('click', () => {
    const newUrl = customUrlInput.value.trim();
    if (newUrl) {
        loadStream(newUrl);
    }
});

// 2. كشف الـ Ping والشبكة
function monitorNetwork() {
    const signalBars = document.getElementById('signalBars');
    const netStatus = document.getElementById('netStatus');
    const netSpeed = document.getElementById('netSpeed');
    const pingStatus = document.getElementById('pingStatus');

    function updateConnectionInfo() {
        if (navigator.connection) {
            const conn = navigator.connection;
            const downlink = conn.downlink || 0;
            if (netSpeed) netSpeed.textContent = `${downlink} Mbps`;

            if (signalBars) {
                signalBars.className = 'signal-bars';
                if (downlink >= 5) {
                    signalBars.classList.add('excellent');
                    if (netStatus) netStatus.textContent = 'الاتصال ممتاز';
                } else if (downlink >= 2) {
                    signalBars.classList.add('good');
                    if (netStatus) netStatus.textContent = 'الاتصال متوسط';
                } else {
                    signalBars.classList.add('weak');
                    if (netStatus) netStatus.textContent = 'الاتصال ضعيف';
                }
            }
        } else {
            if (netStatus) netStatus.textContent = 'متصل بالشبكة';
        }
    }

    function measurePing() {
        const startTime = performance.now();
        fetch('https://www.google.com/favicon.ico', { mode: 'no-cors', cache: 'no-store' })
            .then(() => {
                const latency = Math.round(performance.now() - startTime);
                if (pingStatus) pingStatus.textContent = `Ping: ${latency} ms`;
            })
            .catch(() => {
                if (pingStatus) pingStatus.textContent = `Ping: -- ms`;
            });
    }

    updateConnectionInfo();
    measurePing();

    if (navigator.connection) {
        navigator.connection.addEventListener('change', updateConnectionInfo);
    }
    setInterval(measurePing, 6000);
}

// التشغيل الابتدائي عند فتح الصفحة
window.addEventListener('DOMContentLoaded', () => {
    loadStream(STREAM_URL);
    monitorNetwork();
});
