/**
 * 简历 Web 页面 — 交互脚本
 * 左侧边栏导航 + 移动端菜单
 * 黎耀棠 · AI 解决方案架构师
 */

document.addEventListener('DOMContentLoaded', () => {
    initSidebarActiveLink();
    initMobileMenu();
    initScrollReveal();
    initBrandClick();
});

/* ---------- 侧边栏链接高亮当前 section ---------- */
function initSidebarActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');

    function updateActiveLink() {
        let currentId = '';
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentId = section.getAttribute('id');
            }
        });

        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentId) {
                link.classList.add('active');
            }
        });

        // 如果滚到最顶部，去掉所有高亮
        if (window.scrollY < 100) {
            sidebarLinks.forEach(l => l.classList.remove('active'));
        }
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    });

    updateActiveLink();
}

/* ---------- 移动端菜单 ---------- */
function initMobileMenu() {
    const sidebar = document.getElementById('sidebar');
    const menuBtn = document.getElementById('mobileMenuBtn');

    // 创建遮罩层
    const overlay = document.createElement('div');
    overlay.className = 'sidebar-overlay';
    document.body.appendChild(overlay);

    function openMenu() {
        sidebar.classList.add('open');
        overlay.classList.add('show');
        menuBtn.classList.add('open');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
        menuBtn.classList.remove('open');
        document.body.style.overflow = '';
    }

    menuBtn.addEventListener('click', () => {
        if (sidebar.classList.contains('open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    // 点击遮罩关闭
    overlay.addEventListener('click', closeMenu);

    // 点击侧边栏链接后关闭菜单
    sidebar.querySelectorAll('.sidebar-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                closeMenu();
            }
        });
    });

    // 窗口大小变化时，如果从移动端切到桌面端，关闭菜单
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900 && sidebar.classList.contains('open')) {
            closeMenu();
        }
    });
}

/* ---------- 品牌名点击回到顶部 ---------- */
function initBrandClick() {
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // 侧边栏中的名字
    const sidebarName = document.querySelector('.sidebar-name');
    if (sidebarName) {
        sidebarName.addEventListener('click', scrollToTop);
    }

    // 移动端横条中的名字
    const mobileName = document.querySelector('.mobile-name');
    if (mobileName) {
        mobileName.addEventListener('click', scrollToTop);
    }
}

/* ---------- 滚动渐入动画 ---------- */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll(
        '.highlight-card, .timeline-card, .project-card, .skill-category, .stat-card'
    );

    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `opacity 0.5s ease ${index * 0.04}s, transform 0.5s ease ${index * 0.04}s`;
        observer.observe(el);
    });
}
