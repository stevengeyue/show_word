(function () {
    const storageKey = "theme";
    const media = window.matchMedia("(prefers-color-scheme: dark)");

    function applyTheme(theme) {
        const useDark = theme === "dark" || (!theme && media.matches);
        document.body.classList.toggle("dark-mode", useDark);
        document.documentElement.classList.toggle("dark-mode", useDark);
    }

    function initTheme() {
        applyTheme(localStorage.getItem(storageKey));

        document.querySelectorAll("#themeToggle, .theme-toggle, .theme-switch").forEach((toggle) => {
            toggle.setAttribute("role", "button");
            toggle.setAttribute("aria-label", "切换明暗主题");
            toggle.addEventListener("click", (event) => {
                event.preventDefault();
                const nextTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
                localStorage.setItem(storageKey, nextTheme);
                applyTheme(nextTheme);
                window.dispatchEvent(new CustomEvent("themechange"));
            });
        });

        media.addEventListener("change", () => {
            if (!localStorage.getItem(storageKey)) {
                applyTheme(null);
                window.dispatchEvent(new CustomEvent("themechange"));
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initTheme);
    } else {
        initTheme();
    }
})();
