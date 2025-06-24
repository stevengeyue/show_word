console.log('网站已加载');

// 模拟projects目录中的文件数据
const projectsFiles = [
    'pdf/短时交通流量预测.pdf',
    'pdf/多元线性回归.pdf',
    'pdf/A题.pdf',
    'picture/',
    'word/基于改进蚱蜢算法解决多区域经济调度问题.docx',
    'word/实践报告.doc',
    'word/数据分析实验实践课报告.docx',
    'word/数学模型报告.docx',
    'word/Python程序设计报告.docx',
    'word/python作业.doc',
    'word/web应用开发实践报告.doc'
];

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM已加载完成');
    
    // 获取标题元素并添加点击事件
    const title = document.querySelector('h1');
    if (title) {
        title.addEventListener('click', function() {
            alert('您点击了标题！');
        });
    }

    // 显示文件列表
    const filesList = document.getElementById('files');
    projectsFiles.forEach(file => {
        const li = document.createElement('li');
        li.textContent = file;
        li.style.cursor = 'pointer';
        
        // 标记文件夹
        if (file.endsWith('/')) {
            li.setAttribute('data-folder', 'true');
            li.addEventListener('click', (e) => {
                e.stopPropagation();
                const folderPath = `d:/03-档案文件/show_word/projects/${file}`;
                try {
                    // 尝试打开文件夹
                    window.open(`file:///${folderPath.replace(/\\/g, '/')}`, '_blank');
                } catch (e) {
                    alert(`浏览器无法直接打开文件夹，请手动访问:\n${folderPath}\n或在文件资源管理器中打开`);
                }
            });
        } else {
            li.addEventListener('click', () => {
                const fullPath = `d:/03-档案文件/show_word/projects/${file}`;
                try {
                    window.open(`file:///${fullPath.replace(/\\/g, '/')}`, '_blank');
                } catch (e) {
                    alert(`无法直接打开文件，请手动访问:\n${fullPath}`);
                }
            });
        }
        filesList.appendChild(li);
    });
});
