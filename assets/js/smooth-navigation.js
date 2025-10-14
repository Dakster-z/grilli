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
        const navToggleBtn = document.querySelector("[data-nav-toggler]");
        const navbar = document.querySelector(".navbar");
        const navLinks = document.querySelectorAll(".navbar-link");
        
        if (!navToggleBtn || !navbar) return;

        // Toggle mobile menu
        navToggleBtn.addEventListener("click", () => {
            navbar.classList.toggle("active");
            navToggleBtn.classList.toggle("active");
        });

        // Close menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                this.closeMobileMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (e) => {
            if (!navbar.contains(e.target) && !navToggleBtn.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    closeMobileMenu() {
        const navbar = document.querySelector(".navbar");
        const navToggleBtn = document.querySelector("[data-nav-toggler]");
        
        if (navbar && navToggleBtn) {
            navbar.classList.remove("active");
            navToggleBtn.classList.remove("active");
        }
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
