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
            <article class="post-card reveal tone-${article.color || "teal"}">
                <a class="post-image" href="${resolveHref(article.href)}">
                    <span>${article.tag}</span>
                    <strong>${article.title}</strong>
                    <em>${article.date}</em>
                </a>
                <div class="post-content">
                    <span class="post-tag">${article.tag}</span>
                    <h2><a href="${resolveHref(article.href)}">${article.title}</a></h2>
                    <p class="excerpt">${article.summary}</p>
                    <dl class="article-brief">
                        <div>
                            <dt>问题</dt>
                            <dd>${article.question || "从一个具体问题开始，整理方法和结论。"}</dd>
                        </div>
                        <div>
                            <dt>方法</dt>
                            <dd>${article.method || "结构化拆解、证据整理、复盘表达"}</dd>
                        </div>
                    </dl>
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
            const filter = target.dataset.filter;
            const articles = filter ? data.articles.filter((article) => article.tag === filter) : data.articles;
            target.innerHTML = articles.slice(0, limit).map(createArticleCard).join("");
        });
    }

    function renderCollections() {
        document.querySelectorAll("[data-render='collections']").forEach((target) => {
            target.innerHTML = (data.collections || []).map((collection) => `
                <article class="collection-card reveal tone-${collection.palette}">
                    <p class="kicker">${collection.kicker}</p>
                    <h3>${collection.title}</h3>
                    <p>${collection.summary}</p>
                    <div class="collection-links">
                        ${collection.articles.map((title) => {
                            const article = data.articles.find((item) => item.title === title);
                            return article ? `<a href="${resolveHref(article.href)}">${article.title}</a>` : "";
                        }).join("")}
                    </div>
                </article>
            `).join("");
        });
    }

    function renderRoutes() {
        document.querySelectorAll("[data-render='routes']").forEach((target) => {
            target.innerHTML = (data.routes || []).map((route) => `
                <a class="route-card reveal" href="${resolveHref(route.href)}">
                    <h3>${route.title}</h3>
                    <p>${route.summary}</p>
                </a>
            `).join("");
        });
    }

    function renderLanes() {
        document.querySelectorAll("[data-render='lanes']").forEach((target) => {
            target.innerHTML = (data.lanes || []).map((lane) => `
                <article class="lane-card reveal">
                    <span>${lane.marker}</span>
                    <h3>${lane.title}</h3>
                    <p>${lane.summary}</p>
                    <ul>
                        ${lane.items.map((item) => `<li>${item}</li>`).join("")}
                    </ul>
                </article>
            `).join("");
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

        // JS 就绪后先隐藏，再交给 IntersectionObserver 逐个显现。
        // 若 JS 未运行或环境不支持 IO，元素保持默认可见，避免内容丢失。
        if (!("IntersectionObserver" in window)) {
            revealItems.forEach((item) => item.classList.add("is-visible"));
            return;
        }

        revealItems.forEach((item) => item.classList.add("is-hidden"));

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

    function setupSpotlight() {
        const spotlight = document.querySelector(".site-spotlight");
        if (!spotlight) {
            return;
        }

        window.addEventListener("pointermove", (event) => {
            spotlight.style.setProperty("--spotlight-x", `${event.clientX}px`);
            spotlight.style.setProperty("--spotlight-y", `${event.clientY}px`);
        });
    }

    function setupScrollProgress() {
        if (!document.querySelector(".scroll-progress")) {
            const progress = document.createElement("div");
            progress.className = "scroll-progress";
            document.body.appendChild(progress);
        }

        function updateProgress() {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
            document.documentElement.style.setProperty("--scroll-progress", `${Math.min(100, Math.max(0, progress))}%`);
        }

        updateProgress();
        window.addEventListener("scroll", updateProgress, { passive: true });
        window.addEventListener("resize", updateProgress);
    }

    // 有机 blob 路径：用三次贝塞尔模拟不规则圆
    function blobPath(ctx, cx, cy, r, wobble) {
        const seed = (cx * 13 + cy * 7) % 10;
        const r1 = r * (1 + wobble * Math.sin(seed * 0.9 + 0.4));
        const r2 = r * (1 + wobble * Math.cos(seed * 1.1 + 1.2));
        const r3 = r * (1 + wobble * Math.sin(seed * 0.7 + 2.1));
        const r4 = r * (1 + wobble * Math.cos(seed * 1.3 + 3.3));
        ctx.beginPath();
        ctx.moveTo(cx + r1, cy);
        ctx.bezierCurveTo(cx + r1, cy - r2 * 0.7, cx + r2 * 0.7, cy - r2, cx, cy - r2);
        ctx.bezierCurveTo(cx - r2 * 0.7, cy - r2, cx - r3, cy - r3 * 0.7, cx - r3, cy);
        ctx.bezierCurveTo(cx - r3, cy + r3 * 0.7, cx - r4 * 0.7, cy + r4, cx, cy + r4);
        ctx.bezierCurveTo(cx + r4 * 0.7, cy + r4, cx + r1, cy + r1 * 0.7, cx + r1, cy);
        ctx.closePath();
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

        const pulse = 1 + Math.sin(Date.now() / 1200) * 0.06;
        ctx.lineWidth = 1.4 * pulse;
        data.graph.links.forEach(([sourceId, targetId]) => {
            const source = nodeById.get(sourceId);
            const target = nodeById.get(targetId);
            if (!source || !target) {
                return;
            }

            // 柔和曲线连线
            const mx = (source.px + target.px) / 2 + (target.py - source.py) * 0.12;
            const my = (source.py + target.py) / 2 - (target.px - source.px) * 0.12;
            const gradient = ctx.createLinearGradient(source.px, source.py, target.px, target.py);
            gradient.addColorStop(0, colors.primary);
            gradient.addColorStop(1, colors.accent);
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = 0.5;
            ctx.beginPath();
            ctx.moveTo(source.px, source.py);
            ctx.quadraticCurveTo(mx, my, target.px, target.py);
            ctx.stroke();
        });

        ctx.globalAlpha = 1;
        nodes.forEach((node) => {
            const radius = (node.group === "core" ? 34 : 24) * pulse;
            const fill = node.group === "skill" ? colors.accent : node.group === "resource" ? colors.warm : colors.primary;

            // 柔和光晕
            blobPath(ctx, node.px, node.py, radius + 10, 0.08);
            ctx.fillStyle = fill;
            ctx.globalAlpha = 0.14;
            ctx.fill();

            // 有机主体
            ctx.globalAlpha = 1;
            blobPath(ctx, node.px, node.py, radius, 0.12);
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
        if (!document.getElementById("knowledgeGraph")) {
            return;
        }

        let frameId = 0;
        let running = false;
        function loop() {
            running = true;
            drawGraph();
            frameId = window.requestAnimationFrame(loop);
        }

        loop();
        window.addEventListener("resize", drawGraph);
        window.addEventListener("themechange", drawGraph);
        document.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                window.cancelAnimationFrame(frameId);
                running = false;
            } else {
                if (!running) {
                    loop();
                }
            }
        });
    }

    function init() {
        renderArticles();
        renderCollections();
        renderRoutes();
        renderLanes();
        renderProjects();
        setupProjectFilters();
        setupReveal();
        setupSpotlight();
        setupScrollProgress();
        setupGraph();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
