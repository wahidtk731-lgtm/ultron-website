// Ultron Assistant Website Interactive JavaScript Engine

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
            mobileBtn.textContent = navLinks.classList.contains('mobile-active') ? '✕' : '☰';
        });
        // Close on nav link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                mobileBtn.textContent = '☰';
            });
        });
    }

    // 2. Terms and Conditions Modal Controls
    const termsModal = document.getElementById('termsModal');
    const openTermsBtns = document.querySelectorAll('.open-terms-modal');
    const closeTermsBtn = document.getElementById('closeTermsModal');

    function openModal() {
        if (termsModal) {
            termsModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModal() {
        if (termsModal) {
            termsModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    openTermsBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal();
    }));

    if (closeTermsBtn) {
        closeTermsBtn.addEventListener('click', closeModal);
    }

    if (termsModal) {
        termsModal.addEventListener('click', (e) => {
            if (e.target === termsModal) closeModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && termsModal && termsModal.classList.contains('active')) {
            closeModal();
        }
    });

    // 3. SHA-256 Checksum Copy Button
    const copyBtn = document.getElementById('copyChecksumBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const hash = document.getElementById('checksumHash').textContent.trim();
            navigator.clipboard.writeText(hash).then(() => {
                const origText = copyBtn.textContent;
                copyBtn.textContent = '✓ Copied!';
                copyBtn.style.background = '#10b981';
                copyBtn.style.color = '#fff';
                setTimeout(() => {
                    copyBtn.textContent = origText;
                    copyBtn.style.background = '';
                    copyBtn.style.color = '';
                }, 2000);
            }).catch(() => {
                alert('Checksum: ' + hash);
            });
        });
    }

    // 4. Command Playground & Simulation Engine
    const commandPills = document.querySelectorAll('.command-pill');
    const simInput = document.getElementById('simInput');
    const simRunBtn = document.getElementById('simRunBtn');
    const simOutput = document.getElementById('simOutput');
    const filterBtns = document.querySelectorAll('.cmd-filter-btn');

    // Filter pills by category
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-category');

            commandPills.forEach(pill => {
                if (category === 'all' || pill.getAttribute('data-cat') === category) {
                    pill.style.display = 'flex';
                } else {
                    pill.style.display = 'none';
                }
            });
        });
    });

    // Pill click fills input and runs
    commandPills.forEach(pill => {
        pill.addEventListener('click', () => {
            const cmd = pill.getAttribute('data-cmd');
            if (simInput) {
                simInput.value = cmd;
                runSimulation(cmd);
            }
        });
    });

    if (simRunBtn && simInput) {
        simRunBtn.addEventListener('click', () => {
            if (simInput.value.trim()) {
                runSimulation(simInput.value.trim());
            }
        });
        simInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && simInput.value.trim()) {
                runSimulation(simInput.value.trim());
            }
        });
    }

    // Client-side parser mirroring UltronIntentEngine
    function parseUltronCommand(rawText) {
        const text = rawText.toLowerCase().trim()
            .replace(/^(hey|ok|hi|hello)?\s*(ultron|jarvis|assistant)[,\s]*/i, '')
            .trim();

        // Split by conjunctions: "and", "then", "after that"
        const parts = text.split(/\s+(?:and(?:\s+then)?|then|after\s+that)\s+/i)
            .map(s => s.trim())
            .filter(s => s.length > 0);

        return parts.map(part => classifySingleCommand(part));
    }

    function classifySingleCommand(cmd) {
        if (/^(turn\s+on|enable)\s+(wifi|wi-fi)/i.test(cmd)) {
            return { action: 'wifi_on', desc: 'Enabling device Wi-Fi interface via WifiManager' };
        }
        if (/^(turn\s+off|disable)\s+(wifi|wi-fi)/i.test(cmd)) {
            return { action: 'wifi_off', desc: 'Disabling device Wi-Fi interface via WifiManager' };
        }
        if (/^(turn\s+on|enable)\s+bluetooth/i.test(cmd)) {
            return { action: 'bluetooth_on', desc: 'Enabling Bluetooth hardware via BluetoothAdapter' };
        }
        if (/^(turn\s+off|disable)\s+bluetooth/i.test(cmd)) {
            return { action: 'bluetooth_off', desc: 'Disabling Bluetooth hardware via BluetoothAdapter' };
        }
        if (/clear\s+(all\s+)?notifications/i.test(cmd)) {
            return { action: 'clear_notifications', desc: 'Cancelling all notifications via UltronNotificationService' };
        }
        if (/(open|show|expand)\s+(status\s+bar|notification)/i.test(cmd)) {
            return { action: 'status_bar', desc: 'Expanding notification shade via StatusBarManager' };
        }
        if (/(open|show)\s+quick\s+settings/i.test(cmd)) {
            return { action: 'quick_settings', desc: 'Triggering Quick Settings drop-down panel' };
        }
        if (/(switch\s+to|open)\s+(recent|last)\s+app/i.test(cmd)) {
            return { action: 'recent_apps', desc: 'Resolving most recent task from package history' };
        }
        if (/(what\s+time|current\s+time|tell\s+time)/i.test(cmd)) {
            return { action: 'query_time', desc: 'Reporting current system clock time with voice synthesis' };
        }
        if (/^(search|google)\s+(?:for\s+)?(.*)/i.test(cmd)) {
            const m = cmd.match(/^(?:search|google)\s+(?:for\s+)?(.*)/i);
            const query = m ? m[1] : '';
            return { action: 'search_web', desc: `Launching default web browser with query "${query}"` };
        }
        if (/^(?:take\s+a?\s*note|write\s+note|create\s+note)\s+(.*)/i.test(cmd)) {
            const m = cmd.match(/^(?:take\s+a?\s*note|write\s+note|create\s+note)\s+(.*)/i);
            const note = m ? m[1] : '';
            return { action: 'write_file', desc: `Saving persistent note to /storage/emulated/0/Project/notes: "${note}"` };
        }
        if (/open\s+(?:instagram\s+)?reels/i.test(cmd)) {
            return { action: 'app_section', desc: 'Routing deep link: instagram://reels (Direct to Reels view)' };
        }
        if (/open\s+(?:youtube\s+)?shorts/i.test(cmd)) {
            return { action: 'app_section', desc: 'Routing deep link: vnd.youtube:shorts (Direct to Shorts player)' };
        }
        if (/^(?:open|launch|start)\s+(.*)/i.test(cmd)) {
            const m = cmd.match(/^(?:open|launch|start)\s+(.*)/i);
            const app = m ? m[1] : '';
            return { action: 'open_app', desc: `Scanning PackageManager for "${app}" & launching main Activity` };
        }
        return { action: 'smart_fallback', desc: `Executing assistant intent: "${cmd}"` };
    }

    function runSimulation(text) {
        if (!simOutput) return;
        simOutput.innerHTML = `<div style="color: var(--accent-cyan); margin-bottom: 8px;">Parsing: "${text}"...</div>`;

        const actions = parseUltronCommand(text);
        let html = `<div style="color: #64748b; margin-bottom: 6px;">[IntentEngine] Identified ${actions.length} autonomous sequential step(s):</div>`;

        actions.forEach((act, idx) => {
            html += `
                <div class="exec-step" style="animation: fadeIn 0.3s ease forwards; animation-delay: ${idx * 0.25}s; opacity: 0;">
                    ✓ <strong>Step ${idx + 1}:</strong> <span style="color: #00e5ff;">[${act.action}]</span> ${act.desc}
                </div>
            `;
        });

        if (actions.length > 1) {
            html += `<div style="color: #a78bfa; margin-top: 8px; font-size: 0.8rem;">⚡ Multi-Action Chaining: Step delay 1.3s for graceful multitasking handoff.</div>`;
        }

        setTimeout(() => {
            simOutput.innerHTML = html;
        }, 150);
    }
});
