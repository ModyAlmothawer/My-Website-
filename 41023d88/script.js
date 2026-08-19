// ضع رابط بث m3u8 الخاص بـ ON SPORT هنا
const STREAM_URL = "https://fastly.live.brightcove.com/6384149663112/us-east-1/6416013238001/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0IjoieWN3Ymx1LmVncmVzcy5zenkzeHgiLCJhY2NvdW50X2lkIjoiNjQxNjAxMzIzODAwMSIsImVobiI6ImZhc3RseS5saXZlLmJyaWdodGNvdmUuY29tIiwiaXNzIjoiYmxpdmUtcGxheWJhY2stc291cmNlLWFwaSIsInN1YiI6InBhdGhtYXB0b2tlbiIsImF1ZCI6WyI2NDE2MDEzMjM4MDAxIl0sImp0aSI6IjYzODQxNDk2NjMxMTIifQ.0yJpNEV0ZSId11mURgeaOhXZvov07Uj-VI_0qt0LLSQ/playlist-hls.m3u8"; 

const video = document.getElementById('videoPlayer');
const iframe = document.getElementById('iframePlayer');
const qualitySelect = document.getElementById('qualitySelect');
const reloadBtn = document.getElementById('reloadBtn');
let hls;

// 1. تهيئة البث وتخفيف التقطيع (Buffer Tuning)
function initPlayer() {
    if (STREAM_URL.endsWith('.m3u8') && Hls.isSupported()) {
        hls = new Hls({
            maxBufferLength: 30,         // تخزين 30 ثانية لتفادي التقطيع
            maxMaxBufferLength: 60,
            maxBufferSize: 60 * 1024 * 1024,
            liveSyncDurationCount: 3,    // استقرار البث المباشر
            liveMaxLatencyDurationCount: 10,
            enableWorker: true
        });

        hls.loadSource(STREAM_URL);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            // جلب مستويات الجودة المتاحة تلقائياً
            qualitySelect.innerHTML = '<option value="auto">أعلى جودة تلقائياً (Auto VIP)</option>';
            data.levels.forEach((level, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.text = `${level.height}p (VIP Direct)`;
                qualitySelect.appendChild(option);
            });
            video.play().catch(() => {});
        });

        // التعامل مع استعادة الاتصال تلقائياً عند انقطاع الشبكة
        hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.fatal) {
                switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        hls.startLoad();
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        hls.recoverMediaError();
                        break;
                    default:
                        initPlayer();
                        break;
                }
            }
        });

    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // دعم متصفحات Safari
        video.src = STREAM_URL;
        video.play().catch(() => {});
    } else {
        // في حال كان اللينك إطار iframe خارجي عادي
        video.style.display = 'none';
        iframe.style.display = 'block';
    }
}

// تغيير الجودة يدوياً
qualitySelect.addEventListener('change', (e) => {
    if (!hls) return;
    const val = e.target.value;
    if (val === 'auto') {
        hls.currentLevel = -1; // نظام التكيف الأوتوماتيكي بأعلى جودة
    } else {
        hls.currentLevel = parseInt(val);
    }
});

// 2. كشف قوة اتصال شبكة المستخدم لحظياً (Network Information API & Ping)
function monitorNetwork() {
    const signalBars = document.getElementById('signalBars');
    const netStatus = document.getElementById('netStatus');
    const netSpeed = document.getElementById('netSpeed');
    const pingStatus = document.getElementById('pingStatus');

    function updateConnectionInfo() {
        if (navigator.connection) {
            const conn = navigator.connection;
            const downlink = conn.downlink || 0; // السرعة بـ Mbps
            netSpeed.textContent = `${downlink} Mbps`;

            signalBars.className = 'signal-bars';
            
            if (downlink >= 5) {
                signalBars.classList.add('excellent');
                netStatus.textContent = 'الاتصال ممتاز';
            } else if (downlink >= 2) {
                signalBars.classList.add('good');
                netStatus.textContent = 'الاتصال متوسط';
            } else {
                signalBars.classList.add('weak');
                netStatus.textContent = 'الاتصال ضعيف (قد يحدث تقطيع)';
            }
        } else {
            netStatus.textContent = 'متصل بالشبكة';
        }
    }

    // قياس الـ Ping التقريبي
    function measurePing() {
        const startTime = performance.now();
        fetch('https://www.google.com/favicon.ico', { mode: 'no-cors', cache: 'no-store' })
            .then(() => {
                const latency = Math.round(performance.now() - startTime);
                pingStatus.textContent = `Ping: ${latency} ms`;
            })
            .catch(() => {
                pingStatus.textContent = `Ping: -- ms`;
            });
    }

    updateConnectionInfo();
    measurePing();

    if (navigator.connection) {
        navigator.connection.addEventListener('change', updateConnectionInfo);
    }
    setInterval(measurePing, 5000);
}

// 3. إعادة تحميل البث بنقرة زر
reloadBtn.addEventListener('click', () => {
    if (hls) {
        hls.startLoad();
    } else {
        iframe.src = iframe.src;
    }
});

// تشغيل عند فتح الصفحة
window.addEventListener('DOMContentLoaded', () => {
    initPlayer();
    monitorNetwork();
});
