window.siteData = {
    articles: [
        {
            title: "改进蚱蜢算法与经济调度",
            tag: "智能优化",
            date: "2025-01-15",
            readTime: "20分钟",
            href: "articles/grasshopper_algorithm.html",
            image: "../projects/picture/蚂蚱算法信息图.png",
            summary: "用混合蚱蜢算法、动态惩罚策略和算子融合处理多区域经济调度问题。"
        },
        {
            title: "短时交通流量预测研究",
            tag: "数据科学",
            date: "2025-01-15",
            readTime: "15分钟",
            href: "articles/traffic_flow_prediction.html",
            image: "../projects/picture/短时交通流量预测信息图.png",
            summary: "梳理统计模型、机器学习和时空图卷积在智能交通预测中的应用。"
        },
        {
            title: "参与生产实践，赋能数字化转型",
            tag: "工程实践",
            date: "2025-01-20",
            readTime: "15分钟",
            href: "articles/engineering_practice.html",
            image: "../projects/picture/实习信息图.png",
            summary: "从工业现场、边缘计算和数字化转型视角复盘工程实践经验。"
        },
        {
            title: "作业管理系统开发实践",
            tag: "全栈开发",
            date: "2025-01-16",
            readTime: "25分钟",
            href: "articles/homework_management_system.html",
            image: "../projects/picture/作业管理系统.png",
            summary: "基于 FastAPI、Vue 与 MySQL 的教学业务系统设计、建模和实现记录。"
        }
    ],
    projects: [
        {
            title: "短时交通流量预测",
            type: "PDF",
            category: "pdf",
            href: "../projects/pdf/短时交通流量预测.pdf",
            summary: "城市交通预测研究报告，覆盖模型分类、指标评估与实验设计。"
        },
        {
            title: "多元线性回归",
            type: "PDF",
            category: "pdf",
            href: "../projects/pdf/多元线性回归.pdf",
            summary: "统计建模课程报告，记录回归分析流程和结果解释。"
        },
        {
            title: "数学建模 A 题",
            type: "PDF",
            category: "pdf",
            href: "../projects/pdf/A题.pdf",
            summary: "数学建模问题求解文档，保留完整分析和建模过程。"
        },
        {
            title: "作业管理系统截图",
            type: "Image",
            category: "image",
            href: "../projects/picture/作业管理系统.png",
            summary: "全栈作业管理系统界面展示，关联系统设计文章。"
        },
        {
            title: "改进蚱蜢算法报告",
            type: "DOCX",
            category: "doc",
            href: "../projects/word/基于改进蚱蜢算法解决多区域经济调度问题.docx",
            summary: "算法设计、实验验证和多区域经济调度结论的完整文档。"
        },
        {
            title: "Python 程序设计报告",
            type: "DOCX",
            category: "doc",
            href: "../projects/word/Python程序设计报告.docx",
            summary: "Python 课程实践报告，记录程序设计过程和实验结果。"
        },
        {
            title: "数据分析实验报告",
            type: "DOCX",
            category: "doc",
            href: "../projects/word/数据分析实验实践课报告.docx",
            summary: "数据分析实践课报告，聚焦数据处理和结果表达。"
        },
        {
            title: "Web 应用开发实践报告",
            type: "DOC",
            category: "doc",
            href: "../projects/word/web应用开发实践报告.doc",
            summary: "Web 应用开发课程实践文档。"
        }
    ],
    graph: {
        nodes: [
            { id: "blog", label: "博客", group: "core", x: 0.5, y: 0.5 },
            { id: "optimization", label: "智能优化", group: "article", x: 0.28, y: 0.28 },
            { id: "traffic", label: "交通预测", group: "article", x: 0.72, y: 0.25 },
            { id: "fullstack", label: "全栈系统", group: "article", x: 0.78, y: 0.66 },
            { id: "practice", label: "工程实践", group: "article", x: 0.31, y: 0.72 },
            { id: "python", label: "Python", group: "skill", x: 0.13, y: 0.49 },
            { id: "vue", label: "Vue", group: "skill", x: 0.9, y: 0.48 },
            { id: "data", label: "数据建模", group: "skill", x: 0.53, y: 0.13 },
            { id: "resource", label: "资料库", group: "resource", x: 0.52, y: 0.87 }
        ],
        links: [
            ["blog", "optimization"],
            ["blog", "traffic"],
            ["blog", "fullstack"],
            ["blog", "practice"],
            ["optimization", "python"],
            ["optimization", "data"],
            ["traffic", "data"],
            ["traffic", "python"],
            ["fullstack", "vue"],
            ["fullstack", "python"],
            ["practice", "resource"],
            ["resource", "optimization"],
            ["resource", "traffic"],
            ["resource", "fullstack"]
        ]
    }
};
