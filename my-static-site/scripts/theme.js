// 主题切换功能
const themeToggle = document.getElementById('themeToggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// 初始化主题状态
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemDark = prefersDarkScheme.matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
}

// 主题切换事件
themeToggle.addEventListener('click', () => {
    const isDarkMode = !document.body.classList.contains('dark-mode');
    document.body.classList.toggle('dark-mode', isDarkMode);
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
});

// 监听系统主题变化
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        document.body.classList.toggle('dark-mode', e.matches);
    }
});

// 初始化
initTheme();
