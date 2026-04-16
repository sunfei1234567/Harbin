document.addEventListener('DOMContentLoaded', function() {
    // 导航点交互
    const navDots = document.querySelectorAll('.nav-dot');
    const sections = document.querySelectorAll('.fullscreen-section');
    
    // 点击导航点滚动到对应区域
    navDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // 滚动时更新导航点状态
    function updateActiveNav() {
        const scrollY = window.scrollY;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop - window.innerHeight / 2;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navDots.forEach(dot => dot.classList.remove('active'));
                if (navDots[index]) {
                    navDots[index].classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // 建筑卡片横向滚动 - 鼠标滚轮支持
    const archScrollContainer = document.querySelector('.arch-scroll-container');
    if (archScrollContainer) {
        archScrollContainer.addEventListener('wheel', function(e) {
            if (e.deltaY !== 0) {
                e.preventDefault();
                this.scrollLeft += e.deltaY;
            }
        });
    }

    // 图片堆叠视差效果
    const imageStack = document.querySelector('.image-stack');
    if (imageStack) {
        const cards = imageStack.querySelectorAll('.img-card');
        
        imageStack.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            
            cards.forEach((card, index) => {
                const depth = (index + 1) * 10;
                const moveX = x * depth;
                const moveY = y * depth;
                card.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
        
        imageStack.addEventListener('mouseleave', function() {
            cards.forEach(card => {
                card.style.transform = '';
            });
        });
    }

    // 四季节点动画
    const seasonNodes = document.querySelectorAll('.season-node');
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px'
    };

    const seasonObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = entry.target.style.transform.replace('scale(0.8)', 'scale(1)');
            }
        });
    }, observerOptions);

    seasonNodes.forEach(node => {
        node.style.opacity = '0.5';
        node.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        seasonObserver.observe(node);
    });

    // 美食项目悬停效果
    const foodItems = document.querySelectorAll('.food-item');
    foodItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        item.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // 探索链接点击提示
    const exploreLinks = document.querySelectorAll('.explore-link');
    exploreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                // 可以在这里添加更多交互，比如打开模态框
                console.log('探索更多功能即将开放');
            }
        });
    });

    // 页面加载动画
    const introContent = document.querySelector('.intro-content');
    if (introContent) {
        introContent.style.opacity = '0';
        introContent.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            introContent.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            introContent.style.opacity = '1';
            introContent.style.transform = 'translateY(0)';
        }, 300);
    }

    // 滚动显示动画
    const revealElements = document.querySelectorAll('.winter-text, .winter-visual, .arch-header, .food-header');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        revealObserver.observe(el);
    });

    // 温度显示动态更新（模拟）
    const tempDisplay = document.querySelector('.temp-display span');
    if (tempDisplay) {
        const temps = ['-18°C', '-20°C', '-15°C', '-22°C'];
        let tempIndex = 0;
        
        setInterval(() => {
            tempIndex = (tempIndex + 1) % temps.length;
            tempDisplay.style.opacity = '0';
            setTimeout(() => {
                tempDisplay.textContent = temps[tempIndex];
                tempDisplay.style.opacity = '1';
            }, 300);
        }, 5000);
    }

    // 四季图片点击放大预览
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.querySelector('.modal-overlay');

    function openModal(imgSrc, caption) {
        if (modalImage && imageModal) {
            modalImage.src = imgSrc;
            if (modalCaption) {
                modalCaption.textContent = caption;
            }
            imageModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeModalFunc() {
        if (imageModal) {
            imageModal.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => {
                if (modalImage) modalImage.src = '';
            }, 300);
        }
    }

    seasonNodes.forEach(node => {
        node.addEventListener('click', function() {
            const imgSrc = this.getAttribute('data-img');
            const seasonName = this.querySelector('.season-name')?.textContent || '';
            const seasonDesc = this.querySelector('.season-desc')?.textContent || '';
            const caption = seasonName + ' · ' + seasonDesc;
            if (imgSrc) {
                openModal(imgSrc, caption);
            }
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModalFunc);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeModalFunc);
    }

    // ESC键关闭弹框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && imageModal && imageModal.classList.contains('active')) {
            closeModalFunc();
        }
    });

    // 键盘导航支持
    document.addEventListener('keydown', function(e) {
        const currentSection = document.querySelector('.nav-dot.active');
        if (!currentSection) return;
        
        const currentIndex = Array.from(navDots).indexOf(currentSection);
        let targetIndex = currentIndex;
        
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
            targetIndex = Math.min(currentIndex + 1, navDots.length - 1);
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
            targetIndex = Math.max(currentIndex - 1, 0);
        }
        
        if (targetIndex !== currentIndex) {
            e.preventDefault();
            navDots[targetIndex].click();
        }
    });

    // 触摸设备优化
    if ('ontouchstart' in window) {
        document.body.classList.add('touch-device');
        
        // 建筑卡片触摸滑动
        let touchStartX = 0;
        let touchEndX = 0;
        
        if (archScrollContainer) {
            archScrollContainer.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, { passive: true });
            
            archScrollContainer.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > 50) {
                    this.scrollLeft += diff > 0 ? 300 : -300;
                }
            }, { passive: true });
        }
    }

    console.log('哈尔滨城市宣传网站已加载完成');
});
