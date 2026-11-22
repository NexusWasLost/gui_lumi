const initializeNavigation = function () {
    const navigationItems = document.querySelectorAll(".nav-item");
    const panels = document.querySelectorAll(".section-panel");
    const pageTitle = document.querySelector("#page-title");

    navigationItems.forEach(function (item) {
        item.addEventListener("click", function () {
            const view = item.dataset.view;

            document.body.dataset.activeView = view;

            panels.forEach(function (panel) {
                panel.hidden = view !== "all" && panel.dataset.view !== view;
            });

            navigationItems.forEach(function (navItem) {
                navItem.classList.remove("active");
                navItem.removeAttribute("aria-current");
            });

            item.classList.add("active");
            item.setAttribute("aria-current", "page");

            pageTitle.textContent = item.dataset.title;
        });
    });
};
