// will try to static server these then use ES6 import/export
// import { formatMB, formatUptime, getUsageLevel, createElement, setText } from "./helper.js";
// import { fetchSystemInfo, fetchMemory } from "./fetchers.js";
// import { initializeTheme } from "./theme.js";
// import { initializeNavigation } from "./navigation.js";

const renderMemory = function (mem) {
    const bar = document.querySelector("#ram-bar");
    bar.style.width = `${mem.RAMload}%`;
    bar.className = `progress-fill ${getUsageLevel(mem.RAMload)}`;
    setText("#ram-percent", `${mem.RAMload}%`);
    setText("#ram-used", `${formatMB(mem.usedRAM)} (${mem.usedRAM} MB)`);
    setText("#ram-avail", `${formatMB(mem.availableRAM)} (${mem.availableRAM} MB)`);
    setText("#ram-total", `${formatMB(mem.totalRAM)} (${mem.totalRAM} MB)`);
};

const renderIdentity = function (info) {
    setText("#host-user", `${info.host}@${info.username}`);
    setText("#locale-badge", info.locale);
    setText("#uptime-value", formatUptime(info.uptime));
};

const renderCpu = function (info) {
    setText("#cpu-name", info.cpu);
    setText("#cpu-arch", info.cpu_architecture);
};

const renderOperatingSystem = function (info) {
    const osVersion = info.OS_Version || info.OSVersion || info.OS_ReleaseId || `Build ${info.OS_BuildNumber}`;
    setText("#os-name", info.OSProductName);
    setText("#os-version-badge", osVersion);
    setText("#os-build-detail", `OS Build ${info.OS_BuildNumber}`);
};

const renderGpus = function (info) {
    const gpuList = document.querySelector("#gpu-list");
    gpuList.innerHTML = "";

    info.Graphics.forEach(function (gpu) {
        const item = createElement("div", "list-item");
        const main = createElement("div", "item-main");
        const title = createElement("span", "item-title", gpu.GPU_Name);
        const badge = createElement("span", "badge", `${formatMB(gpu.GPU_VRAM)} VRAM`);
        main.appendChild(title);
        item.appendChild(main);
        item.appendChild(badge);
        gpuList.appendChild(item);
    });
};

const renderDisplays = function (info) {
    const displayList = document.querySelector("#display-list");
    displayList.innerHTML = "";

    info.display.forEach(function (display, index) {
        const item = createElement("div", "list-item");
        const main = createElement("div", "item-main");
        const title = createElement("span", "item-title", `Display ${index + 1}`);
        const sub = createElement("span", "item-sub mono", `${display.width} × ${display.height}`);
        const badge = createElement("span", "badge", `${display.refreshRate} Hz`);
        main.appendChild(title);
        main.appendChild(sub);
        item.appendChild(main);
        item.appendChild(badge);
        displayList.appendChild(item);
    });
};

const renderDisks = function (info) {
    const diskList = document.querySelector("#disk-list");
    diskList.innerHTML = "";

    info.disks.forEach(function (disk) {
        let usedPercent = 0;

        if (disk.totalSpace > 0) {
            usedPercent = Math.round((disk.usedSpace / disk.totalSpace) * 100);
        }

        let volumeLabel = disk.volumeLabel;

        if (volumeLabel === "No Label") {
            volumeLabel = "Local Disk";
        }

        const card = createElement("div", "disk-item");
        const top = createElement("div", "disk-top");
        const name = createElement("span", "disk-name", `${disk.diskLetter} (${volumeLabel})`);
        const fileSystem = createElement("span", "badge", disk.fileSystemName);

        top.appendChild(name);
        top.appendChild(fileSystem);

        const track = createElement("div", "progress-track");
        const fill = createElement("div", `progress-fill ${getUsageLevel(usedPercent)}`);
        fill.style.width = `${usedPercent}%`;
        track.appendChild(fill);

        const meta = createElement("div", "disk-meta");
        const usedText = createElement("span", "", `${formatMB(disk.usedSpace)} / ${formatMB(disk.totalSpace)}`);
        const freeText = createElement("span", "", `${formatMB(disk.freeSpace)} free`);

        meta.appendChild(usedText);
        meta.appendChild(freeText);

        card.appendChild(top);
        card.appendChild(track);
        card.appendChild(meta);
        diskList.appendChild(card);
    });
};

const renderNetwork = function (info) {
    const networkList = document.querySelector("#network-list");
    networkList.innerHTML = "";

    info.network.forEach(function (adapter) {
        const item = createElement("div", "list-item");
        const main = createElement("div", "item-main");
        const title = createElement("span", "item-title", adapter.networkAdapterName);
        const sub = createElement("span", "item-sub", adapter.networkAdapterDesc);

        main.appendChild(title);
        main.appendChild(sub);
        item.appendChild(main);
        networkList.appendChild(item);
    });
};

const renderSystemInfo = function (info) {
    renderIdentity(info);
    renderCpu(info);
    renderOperatingSystem(info);
    renderGpus(info);
    renderDisplays(info);
    renderDisks(info);
    renderNetwork(info);
};

/* ---------- Fetch + render ---------- */

const refreshSystemInfo = async function () {
    try {
        const info = await fetchSystemInfo();

        if (!info) {
            return;
        }

        renderSystemInfo(info);
    } catch (err) {
        console.log("Failed to fetch system info:", err);
    }
};

const refreshMemory = async function () {
    try {
        const mem = await fetchMemory();
        if (!mem) return;
        renderMemory(mem);
    } catch (err) {
        console.log("Failed to fetch memory information:", err);
    }
};

/* Startup */
window.addEventListener("DOMContentLoaded", async function () {
    initializeTheme();
    initializeNavigation();
    await refreshSystemInfo();
    await refreshMemory();

    setInterval(refreshMemory, 1000);

    const refreshBtn = document.querySelector("#refresh-btn");
    const refreshIcon = document.querySelector(".refresh-icon");

    refreshBtn.addEventListener("click", async function () {
        rotateStuff(refreshIcon);
        await refreshSystemInfo();
        await refreshMemory();
    });
});
