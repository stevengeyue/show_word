// 移动菜单交互
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // 点击菜单链接关闭菜单
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// 主题切换逻辑已移至theme.js

// 可折叠侧边栏
document.querySelectorAll('.toc-header').forEach(header => {
    header.addEventListener('click', () => {
        header.parentElement.classList.toggle('toc-collapsed');
        localStorage.setItem('tocCollapsed', header.parentElement.classList.contains('toc-collapsed'));
    });

    // 初始化状态
    if (localStorage.getItem('tocCollapsed') === 'true') {
        header.parentElement.classList.add('toc-collapsed');
    }
});

// 图片懒加载
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const lazyLoad = (target) => {
        const io = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            });
        });

        io.observe(target);
    };

    lazyImages.forEach(lazyLoad);
});
