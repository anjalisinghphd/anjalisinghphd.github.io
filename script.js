// ─── Scroll to top on every page load ─────────────────────────────────────────
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// ─── Navbar reference (used for active-link highlighting) ─────────────────────
const navbar = document.getElementById('navbar');

// ─── Mobile hamburger (shows nav-links as overlay on small screens) ────────────
const hamburger = document.querySelector('.nav-hamburger');
const navLinks  = document.querySelector('.nav-links');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        const isOpen = navLinks.style.display === 'flex';
        navLinks.style.display = isOpen ? 'none' : 'flex';

        if (!isOpen) {
            navLinks.style.cssText = `
                display: flex;
                flex-direction: column;
                position: fixed;
                top: 0; left: 0; right: 0; bottom: 0;
                background: var(--dark);
                justify-content: center;
                align-items: center;
                gap: 32px;
                z-index: 199;
            `;

            navLinks.querySelectorAll('a').forEach(a => {
                a.style.cssText = 'font-size: 16px; color: var(--light); letter-spacing: 0.12em;';
            });
        } else {
            navLinks.removeAttribute('style');
            navLinks.querySelectorAll('a').forEach(a => a.removeAttribute('style'));
        }
    });

    // Close mobile menu when a link is clicked
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.removeAttribute('style');
            navLinks.querySelectorAll('a').forEach(a => a.removeAttribute('style'));
        });
    });
}

// ─── Scroll-reveal for project cards ──────────────────────────────────────────
const cards = document.querySelectorAll('[data-aos]');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
    }
);

cards.forEach(card => revealObserver.observe(card));

// ─── Project page: scroll fade-in for sections ────────────────────────────────
const fadeEls = document.querySelectorAll(
    '.project-page .project-page-hook, .project-page .project-page-visual, .project-page .project-section, .project-page .sub-project'
);

if (fadeEls.length) {
    const fadeObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    entry.target.style.transitionDelay = `${i * 0.04}s`;
                    entry.target.classList.add('visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach(el => fadeObserver.observe(el));
}

// ─── Project page: stepper node activation on scroll ──────────────────────────
const methodSteps = document.querySelectorAll('.project-page .method-step');

if (methodSteps.length) {
    const stepObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    stepObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.4 }
    );
    methodSteps.forEach(step => stepObserver.observe(step));
}

// ─── Smooth active-link highlighting in nav ────────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navAnchors.forEach(a => {
                    a.style.color = '';
                    if (a.getAttribute('href') === `#${id}`) {
                        a.style.color = 'var(--accent)';
                    }
                });
            }
        });
    },
    {
        threshold: 0.4,
    }
);

sections.forEach(s => sectionObserver.observe(s));
