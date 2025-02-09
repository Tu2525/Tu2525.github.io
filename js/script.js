document.addEventListener('DOMContentLoaded', () => {
    // ======================
    // Mobile Menu Functionality
    // ======================
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    let lastScroll = 0;

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        // Close menu on scroll
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            if (Math.abs(currentScroll - lastScroll) > 50) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
            lastScroll = currentScroll;
        });

        // Close menu on click outside
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    }

    // ======================
    // Project Filtering
    // ======================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length && projectCards.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active state from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.style.transform = 'scale(1)';
                });

                // Set active state on clicked button
                button.classList.add('active');
                button.style.transform = 'scale(1.05)';

                // Get filter value
                const filter = button.dataset.filter?.toLowerCase() || 'all';

                // Filter projects
                projectCards.forEach(card => {
                    const categories = card.dataset.category 
                        ? card.dataset.category.toLowerCase().split(/\s*,\s*/)
                        : [];

                    const shouldShow = filter === 'all' || categories.includes(filter);

                    // Animation handling
                    card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.style.display = shouldShow ? 'grid' : 'none';
                        if (shouldShow) {
                            requestAnimationFrame(() => {
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            });
                        }
                    }, 300);
                });
            });
        });
    }

    // ======================
    // Smooth Scroll
    // ======================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ======================
    // Active Section Detection
    // ======================
    const sections = document.querySelectorAll('section');
    const navLinksAll = document.querySelectorAll('.nav-links a');
    
    if (sections.length && navLinksAll.length) {
        window.addEventListener('scroll', () => {
            const fromTop = window.scrollY + 100;
            const nav = document.querySelector('nav');

            // Sticky navigation effect
            if (nav) {
                nav.style.background = window.scrollY > 100 
                    ? 'var(--nav-bg-scroll)' 
                    : 'var(--nav-bg)';
                nav.style.backdropFilter = window.scrollY > 100 ? 'blur(5px)' : 'none';
                nav.style.boxShadow = window.scrollY > 100 
                    ? '0 2px 15px rgba(0,0,0,0.1)' 
                    : 'none';
            }

            // Active link detection
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const id = section.getAttribute('id');

                if (fromTop >= sectionTop && fromTop < sectionTop + sectionHeight) {
                    navLinksAll.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
    }

    // ======================
    // Dark Mode Toggle
    // ======================
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const body = document.body;

    if (darkModeToggle && body) {
        // Initialize theme
        const currentTheme = localStorage.getItem('theme') || 'light';
        body.setAttribute('data-theme', currentTheme);
        darkModeToggle.innerHTML = currentTheme === 'dark' 
            ? '<i class="fas fa-sun"></i>' 
            : '<i class="fas fa-moon"></i>';

        // Toggle handler
        darkModeToggle.addEventListener('click', () => {
            const root = document.documentElement;
            root.classList.add('theme-transition');
            
            setTimeout(() => {
                const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
                
                // Update theme
                body.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                // Update icon
                darkModeToggle.innerHTML = newTheme === 'dark' 
                    ? '<i class="fas fa-sun"></i>' 
                    : '<i class="fas fa-moon"></i>';
            }, 10);

            setTimeout(() => {
                root.classList.remove('theme-transition');
            }, 310);
        });
    }
});