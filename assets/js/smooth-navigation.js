/**
 * Smooth Navigation Handler for Machawi Restaurant
 * Handles smooth scrolling between sections
 */

class SmoothNavigation {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupActiveNavigation();
        this.setupMobileMenu();
    }

    setupSmoothScrolling() {
        // Add smooth scrolling to all anchor links
        document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
            anchor.addEventListener("click", (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute("href");
                if (!targetId || targetId === "#" || targetId.length <= 1) return;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector(".header")?.offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });
                    
                    // Close mobile menu if open
                    this.closeMobileMenu();
                }
            });
        });
    }

    setupActiveNavigation() {
        const sections = document.querySelectorAll("section[id]");
        const navLinks = document.querySelectorAll(".navbar-link");
        
        if (sections.length === 0 || navLinks.length === 0) return;

        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -80% 0px",
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const activeId = entry.target.id;
                    
                    // Remove active class from all nav links
                    navLinks.forEach(link => {
                        link.classList.remove("active");
                    });
                    
                    // Add active class to current sections nav link
                    const activeLink = document.querySelector(`.navbar-link[href="#${activeId}"]`);
                    if (activeLink) {
                        activeLink.classList.add("active");
                    }
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    setupMobileMenu() {
        const navToggleBtns = document.querySelectorAll('[data-nav-toggler]');
        const navbar = document.querySelector('.navbar');
        const overlay = document.querySelector('[data-overlay]');
        const navLinks = document.querySelectorAll('.navbar-link');
        let lastToggleBtn = null;

        if (navToggleBtns.length === 0 || !navbar) return;

        const setExpanded = (expanded) => {
            navToggleBtns.forEach(btn => btn.setAttribute('aria-expanded', expanded ? 'true' : 'false'));
        };

        const focusableSelectors = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
        const trapFocus = (e) => {
            if (!navbar.classList.contains('active')) return;
            if (e.key !== 'Tab') return;
            const focusable = navbar.querySelectorAll(focusableSelectors);
            if (focusable.length === 0) return;
            const firstEl = focusable[0];
            const lastEl = focusable[focusable.length - 1];
            const current = document.activeElement;
            if (e.shiftKey) {
                if (current === firstEl) {
                    e.preventDefault();
                    lastEl.focus();
                }
            } else {
                if (current === lastEl) {
                    e.preventDefault();
                    firstEl.focus();
                }
            }
        };

        const openMenu = (btn) => {
            lastToggleBtn = btn || lastToggleBtn;
            navbar.classList.add('active');
            if (overlay) overlay.classList.add('active');
            setExpanded(true);
            // Move focus inside the menu
            const firstFocusable = navbar.querySelector(focusableSelectors);
            if (firstFocusable) firstFocusable.focus();
            document.addEventListener('keydown', trapFocus);
        };

        const closeMenu = () => {
            navbar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
            setExpanded(false);
            document.removeEventListener('keydown', trapFocus);
            // Restore focus to the last toggle that opened the menu
            if (lastToggleBtn) {
                try { lastToggleBtn.focus(); } catch (_) {}
            }
        };

        // Attach togglers (both open and close buttons)
        navToggleBtns.forEach(btn => {
            // Ensure ARIA controls is set
            if (!btn.getAttribute('aria-controls')) {
                btn.setAttribute('aria-controls', 'primary-nav');
            }
            btn.addEventListener('click', () => {
                const isOpen = navbar.classList.contains('active');
                if (isOpen) {
                    closeMenu();
                } else {
                    openMenu(btn);
                }
                btn.classList.toggle('active');
            });
        });

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            const anyToggleContains = Array.from(navToggleBtns).some(btn => btn.contains(e.target));
            if (!navbar.contains(e.target) && !anyToggleContains) {
                closeMenu();
            }
        });
    }

    closeMobileMenu() {
        const navbar = document.querySelector('.navbar');
        const overlay = document.querySelector('[data-overlay]');
        const navToggleBtns = document.querySelectorAll('[data-nav-toggler]');
        if (navbar) navbar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        navToggleBtns.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
        });
        document.removeEventListener('keydown', () => {});
    }

    // Utility method to scroll to specific section
    scrollToSection(sectionId) {
        if (!sectionId) return;
            const targetElement = document.querySelector(`#${sectionId}`);
        if (targetElement) {
            const headerHeight = document.querySelector(".header")?.offsetHeight || 80;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
    }
}

// Initialize smooth navigation when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new SmoothNavigation();
});

// Add CSS for active navigation states
const style = document.createElement("style");
style.textContent = `
    .navbar-link.active {
        color: var(--gold-crayola) !important;
        font-weight: 600;
    }
    
    .navbar-link {
        transition: color 0.3s ease;
    }
    
    .navbar-link:hover {
        color: var(--gold-crayola);
    }
    
    /* Smooth scroll behavior for the entire page */
    html {
        scroll-behavior: smooth;
    }
    
    /* Enhanced mobile menu animations */
    .navbar {
        transition: all 0.3s ease;
    }
    
    .navbar.active {
        transform: translateX(0);
    }
    
    @media (max-width: 991px) {
        .navbar {
            transform: translateX(-100%);
        }
    }
`;
document.head.appendChild(style);
