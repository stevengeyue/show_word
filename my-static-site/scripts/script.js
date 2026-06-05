(function () {
    const data = window.siteData || { articles: [], projects: [], graph: { nodes: [], links: [] } };

    function resolveHref(href) {
        const inArticle = location.pathname.includes("/articles/");
        if (!inArticle) {
            return href;
        }

        if (href.startsWith("articles/")) {
            return `../${href}`;
        }

        if (href.startsWith("../projects/")) {
            return `../../projects/${href.slice("../projects/".length)}`;
        }

        return href;
    }

    function createArticleCard(article) {
        return `
            <article class="post-card reveal">
                <a class="post-image" href="${resolveHref(article.href)}">
                    <img src="${resolveHref(article.image)}" alt="${article.title}">
                </a>
                <div class="post-content">
                    <span class="post-tag">${article.tag}</span>
                    <h2><a href="${resolveHref(article.href)}">${article.title}</a></h2>
                    <p class="excerpt">${article.summary}</p>
                    <div class="post-meta">
                        <span>${article.date}</span>
                        <span>${article.readTime}</span>
                    </div>
                </div>
            </article>
        `;
    }

    function renderArticles() {
        document.querySelectorAll("[data-render='articles']").forEach((target) => {
            const limit = Number(target.dataset.limit || data.articles.length);
            target.innerHTML = data.articles.slice(0, limit).map(createArticleCard).join("");
        });
    }

    function createProjectCard(project) {
        return `
            <article class="project-card reveal" data-category="${project.category}">
                <div class="project-content">
                    <div class="project-icon">${project.type.slice(0, 1)}</div>
                    <h3>${project.title}</h3>
                    <p class="project-desc">${project.summary}</p>
                    <div class="project-meta">
                        <span class="file-type">${project.type}</span>
                        <span>${project.category.toUpperCase()}</span>
                    </div>
                    <div class="project-actions">
                        <a class="view-btn" href="${resolveHref(project.href)}" target="_blank" rel="noopener">预览</a>
                        <a class="download-btn" href="${resolveHref(project.href)}" download>下载</a>
                    </div>
                </div>
            </article>
        `;
    }

    function renderProjects() {
        document.querySelectorAll("[data-render='projects']").forEach((target) => {
            const category = target.dataset.category;
            const projects = category ? data.projects.filter((project) => project.category === category) : data.projects;
            target.innerHTML = projects.map(createProjectCard).join("");
        });
    }

    function setupProjectFilters() {
        const buttons = document.querySelectorAll(".category-btn[data-category]");
        if (!buttons.length) {
            return;
        }

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const category = button.dataset.category;
                buttons.forEach((item) => item.classList.toggle("active", item === button));
                document.querySelectorAll(".project-card[data-category]").forEach((card) => {
                    card.hidden = category !== "all" && card.dataset.category !== category;
                });
            });
        });
    }

    function setupReveal() {
        const revealItems = document.querySelectorAll(".reveal");
        if (!revealItems.length) {
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });

        revealItems.forEach((item) => observer.observe(item));
    }

    function drawGraph() {
        const canvas = document.getElementById("knowledgeGraph");
        if (!canvas || !data.graph) {
            return;
        }

        const ctx = canvas.getContext("2d");
        const stage = canvas.parentElement;
        const ratio = Math.max(1, window.devicePixelRatio || 1);
        const rect = stage.getBoundingClientRect();
        canvas.width = rect.width * ratio;
        canvas.height = rect.height * ratio;
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        const styles = getComputedStyle(document.body);
        const colors = {
            text: styles.getPropertyValue("--text").trim(),
            muted: styles.getPropertyValue("--muted").trim(),
            line: styles.getPropertyValue("--line").trim(),
            primary: styles.getPropertyValue("--primary").trim(),
            accent: styles.getPropertyValue("--accent").trim(),
            warm: styles.getPropertyValue("--warm").trim(),
            surface: styles.getPropertyValue("--surface").trim()
        };

        const width = rect.width;
        const height = rect.height;
        ctx.clearRect(0, 0, width, height);

        const nodes = data.graph.nodes.map((node) => ({
            ...node,
            px: node.x * width,
            py: node.y * height
        }));

        const nodeById = new Map(nodes.map((node) => [node.id, node]));

        ctx.lineWidth = 1.4;
        data.graph.links.forEach(([sourceId, targetId]) => {
            const source = nodeById.get(sourceId);
            const target = nodeById.get(targetId);
            if (!source || !target) {
                return;
            }

            const gradient = ctx.createLinearGradient(source.px, source.py, target.px, target.py);
            gradient.addColorStop(0, colors.primary);
            gradient.addColorStop(1, colors.accent);
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = 0.52;
            ctx.beginPath();
            ctx.moveTo(source.px, source.py);
            ctx.lineTo(target.px, target.py);
            ctx.stroke();
        });

        ctx.globalAlpha = 1;
        nodes.forEach((node) => {
            const radius = node.group === "core" ? 34 : 24;
            const fill = node.group === "skill" ? colors.accent : node.group === "resource" ? colors.warm : colors.primary;

            ctx.beginPath();
            ctx.arc(node.px, node.py, radius + 8, 0, Math.PI * 2);
            ctx.fillStyle = fill;
            ctx.globalAlpha = 0.16;
            ctx.fill();

            ctx.globalAlpha = 1;
            ctx.beginPath();
            ctx.arc(node.px, node.py, radius, 0, Math.PI * 2);
            ctx.fillStyle = colors.surface;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = fill;
            ctx.stroke();

            ctx.fillStyle = colors.text;
            ctx.font = "700 13px Segoe UI, Microsoft YaHei, sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(node.label, node.px, node.py);
        });
    }

    function setupGraph() {
        drawGraph();
        window.addEventListener("resize", drawGraph);
        window.addEventListener("themechange", drawGraph);
    }

    function init() {
        renderArticles();
        renderProjects();
        setupProjectFilters();
        setupReveal();
        setupGraph();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
