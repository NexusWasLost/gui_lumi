const formatMB = function (mb) {
    if (mb >= 1024) {
        const gb = (mb / 1024).toFixed(1);
        return `${gb} GB`;
    }

    return `${mb} MB`;
};

const formatUptime = function (totalSeconds) {
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const parts = [];

    if (days > 0) parts.push(`${days}d`);
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);

    parts.push(`${seconds}s`);
    return parts.join(" ");
};

const getUsageLevel = function (percent) {
    if (percent >= 90) return "level-danger";
    if (percent >= 75) return "level-warn";
    return "level-ok";
};

const createElement = function (tag, className, textContent) {
    const element = document.createElement(tag);
    if (className) element.className = className;

    if (textContent !== undefined)
        element.textContent = textContent;

    return element;
};

const setText = function (selector, text) {
    document.querySelector(selector).textContent = text;
};

//used for rotating stuff (current being used mainly for rotating the refresh icon)
const rotateStuff = function(stuff){
    stuff.classList.remove("rotateable");
    stuff.style.transform = "rotate(0deg)";
    stuff.offsetWidth; //force re rotation
    stuff.classList.add("rotateable");
    stuff.style.transform = "rotate(360deg)";
}
