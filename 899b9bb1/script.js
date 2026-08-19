// ضع رابط بث m3u8 الخاص بـ ON SPORT هنا
const STREAM_URL = "https://fastly.live.brightcove.com/6384149663112/us-east-1/6416013238001/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJob3N0IjoieWN3Ymx1LmVncmVzcy5zenkzeHgiLCJhY2NvdW50X2lkIjoiNjQxNjAxMzIzODAwMSIsImVobiI6ImZhc3RseS5saXZlLmJyaWdodGNvdmUuY29tIiwiaXNzIjoiYmxpdmUtcGxheWJhY2stc291cmNlLWFwaSIsInN1YiI6InBhdGhtYXB0b2tlbiIsImF1ZCI6WyI2NDE2MDEzMjM4MDAxIl0sImp0aSI6IjYzODQxNDk2NjMxMTIifQ.0yJpNEV0ZSId11mURgeaOhXZvov07Uj-VI_0qt0LLSQ/playlist-hls.m3u8"; 

const video = document.getElementById('videoPlayer');
const iframe = document.getElementById('iframePlayer');
const qualitySelect = document.getElementById('qualitySelect');
const reloadBtn = document.getElementById('reloadBtn');
let hls;

// 1. تهيئة البث وتخفيف التقطيع
function initPlayer() {
    // التأكد من أن المكتبة تم تحميلها وأن الرابط يحتوي على m3u8
    const isM3U8 = STREAM_URL.toLowerCase().includes('.m3u8');
    const isHlsSupported = typeof Hls !== 'undefined' && Hls.isSupported();

    if (isM3U8 && isHlsSupported) {
        if (hls) hls.destroy();

        hls = new Hls({
            maxBufferLength: 30,
            maxMaxBufferLength: 60,
            maxBufferSize: 60 * 1024 * 1024,
            liveSyncDurationCount: 3,
            liveMaxLatencyDurationCount: 10,
            enableWorker: true
        });

        hls.loadSource(STREAM_URL);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
            qualitySelect.innerHTML = '<option value="auto">أعلى جودة تلقائياً (Auto VIP)</option>';
            data.levels.forEach((level, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.text = `${level.height || 'SD'}p (VIP Direct)`;
                qualitySelect.appendChild(option);
            });

            // التشغيل مكتوم أولاً لتجاوز حظر المتصفح للـ Autoplay
            video.muted = true;
            video.play().catch(err => console.log("Autoplay blocked:", err));
        });

        hls.on(Hls.Events.ERROR, function (event, data) {
            if (data.fatal) {
                switch (data.type) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        console.warn("خطأ شبكة، جاري إعادة المحاولة...");
                        hls.startLoad();
                        break;
                    case Hls.ErrorTypes.MEDIA_ERROR:
                        console.warn("خطأ وسائط، جاري الاستعادة...");
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
        video.muted = true;
        video.play().catch(() => {});
    } else {
        // التحويل إلى iframe إذا لم يكن امتداد m3u8
        video.style.display = 'none';
        iframe.style.display = 'block';
        if (iframe.src !== STREAM_URL) {
            iframe.src = STREAM_URL;
        }
    }
}

// تغيير الجودة يدوياً
qualitySelect.addEventListener('change', (e) => {
    if (!hls) return;
    const val = e.target.value;
    hls.currentLevel = (val === 'auto') ? -1 : parseInt(val);
});

// 2. كشف قوة اتصال شبكة المستخدم
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
                    if (netStatus) netStatus.textContent = 'الاتصال ضعيف (قد يحدث تقطيع)';
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
    setInterval(measurePing, 5000);
}

// 3. إعادة تحميل البث
reloadBtn.addEventListener('click', () => {
    if (hls) {
        hls.loadSource(STREAM_URL);
        hls.startLoad();
    } else {
        iframe.src = iframe.src;
    }
});

// التشغيل عند فتح الصفحة
window.addEventListener('DOMContentLoaded', () => {
    initPlayer();
    monitorNetwork();
});
