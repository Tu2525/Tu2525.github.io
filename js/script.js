document.addEventListener('DOMContentLoaded', () => {
    // Enhanced Project Filtering with Multi-Category Support
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Button active state management
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.style.transform = 'scale(1)';
            });
            button.classList.add('active');
            button.style.transform = 'scale(1.05)';

            // Get filter value
            const filter = button.dataset.filter.toLowerCase();

            // Filter projects
            projectCards.forEach(card => {
                const rawCategories = card.dataset.category || '';
                const categories = rawCategories
                    .split(/\s*,\s*/)
                    .map(cat => cat.trim().toLowerCase());

                const shouldShow = filter === 'all' || categories.includes(filter);

                // Smooth transition effects
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

    // Smooth Scroll Implementation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) return;

            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Active Section Detection
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        const fromTop = window.scrollY + 100;

        // Sticky navigation effect
        nav.style.background = window.scrollY > 100 
            ? 'var(--nav-bg-scroll)' 
            : 'var(--nav-bg)';
        nav.style.backdropFilter = window.scrollY > 100 ? 'blur(5px)' : 'none';
        nav.style.boxShadow = window.scrollY > 100 
            ? '0 2px 15px rgba(0,0,0,0.1)' 
            : 'none';

        // Active link highlighting
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`nav a[href="#${id}"]`);

            if (fromTop >= sectionTop && fromTop < sectionTop + sectionHeight) {
                link?.classList.add('active');
            } else {
                link?.classList.remove('active');
            }
        });
    });

    // Synchronized Dark Mode Toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const root = document.documentElement;

    // Initial theme setup
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.setAttribute('data-theme', currentTheme);
    darkModeToggle.querySelector('i').className = currentTheme === 'dark' 
        ? 'fas fa-sun' 
        : 'fas fa-moon';

    // Theme toggle handler
    darkModeToggle.addEventListener('click', () => {
        // Disable transitions during switch
        root.classList.add('theme-transition');
        
        setTimeout(() => {
            const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            
            // Update theme
            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            // Update icon
            darkModeToggle.querySelector('i').className = newTheme === 'dark' 
                ? 'fas fa-sun' 
                : 'fas fa-moon';
        }, 10);

        // Re-enable transitions after switch
        setTimeout(() => {
            root.classList.remove('theme-transition');
        }, 310);
    });
});