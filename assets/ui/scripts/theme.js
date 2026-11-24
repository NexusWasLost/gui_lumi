const setTheme = function (theme) {
    const themeButton = document.querySelector("#theme-toggle");
    const themeIcon = themeButton.querySelector(".theme-icon");
    const themeLabel = themeButton.querySelector(".theme-label");

    document.documentElement.setAttribute("data-theme", theme);

    if (theme === "dark") {
        themeIcon.className = "theme-icon ri-lightbulb-fill";
        themeLabel.textContent = "Switch to Light Mode";
        themeButton.setAttribute("aria-label", "Switch to light mode");
        return;
    }

    themeIcon.className = "theme-icon ri-moon-fill";
    themeLabel.textContent = "Switch to Dark Mode";
    themeButton.setAttribute("aria-label", "Switch to dark mode");
};

const initializeTheme = function () {
    const themeButton = document.querySelector("#theme-toggle");

    themeButton.addEventListener("click", function () {
        const currentTheme = document.documentElement.getAttribute("data-theme");

        if (currentTheme === "dark") {
            setTheme("light");
            return;
        }

        setTheme("dark");
    });
};
