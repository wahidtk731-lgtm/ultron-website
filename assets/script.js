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

        // Close mobile drawer on nav link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('mobile-active');
                mobileBtn.textContent = '☰';
            });
        });
    }

    // 2. Terms and Privacy Modal Controls
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
    const checksumHash = document.getElementById('checksumHash');
    if (copyBtn && checksumHash) {
        function showCopied() {
            const origText = copyBtn.textContent;
            copyBtn.textContent = '✓ Copied!';
            copyBtn.style.background = '#10b981';
            copyBtn.style.color = '#fff';
            setTimeout(() => {
                copyBtn.textContent = origText;
                copyBtn.style.background = '';
                copyBtn.style.color = '';
            }, 2000);
        }

        function fallbackCopy(text) {
            try {
                const ta = document.createElement('textarea');
                ta.value = text;
                ta.style.position = 'fixed';
                ta.style.left = '-9999px';
                document.body.appendChild(ta);
                ta.focus();
                ta.select();
                const successful = document.execCommand('copy');
                document.body.removeChild(ta);
                if (successful) {
                    showCopied();
                } else {
                    prompt('Copy SHA-256 checksum:', text);
                }
            } catch (err) {
                prompt('Copy SHA-256 checksum:', text);
            }
        }

        copyBtn.addEventListener('click', () => {
            const hash = checksumHash.textContent.trim();
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(hash).then(showCopied).catch(() => {
                    fallbackCopy(hash);
                });
            } else {
                fallbackCopy(hash);
            }
        });
    }

    // 4. Subtle Navbar Scroll Glass Elevation
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.style.background = 'rgba(7, 9, 14, 0.92)';
                header.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.7)';
            } else {
                header.style.background = 'rgba(7, 9, 14, 0.78)';
                header.style.boxShadow = 'none';
            }
        });
    }
});
