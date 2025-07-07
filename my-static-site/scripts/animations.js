// 粒子系统
document.addEventListener('DOMContentLoaded', () => {
    // 创建画布
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // 粒子类
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `rgba(74, 109, 229, ${Math.random() * 0.5 + 0.1})`;
            this.life = Math.random() * 100 + 50;
        }
        
        update(mouseX, mouseY) {
            // 向鼠标移动
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                this.speedX = dx * 0.02;
                this.speedY = dy * 0.02;
            }
            
            this.x += this.speedX;
            this.y += this.speedY;
            
            // 边界检查
            if (this.x < 0 || this.x > canvas.width) {
                this.speedX *= -1;
            }
            if (this.y < 0 || this.y > canvas.height) {
                this.speedY *= -1;
            }
            
            this.life--;
            if (this.life <= 0) {
                this.reset();
            }
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.life = Math.random() * 100 + 50;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // 初始化粒子
    const particles = [];
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // 鼠标位置
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;
    
    // 鼠标移动事件
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // 窗口大小调整
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // 动画循环
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update(mouseX, mouseY);
            particles[i].draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();

    // 卡片悬停动画
    const cards = document.querySelectorAll('.post-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});
