const fetchSystemInfo = async function () {
    if (typeof window.getSystemInfo !== "function") {
        console.log("getSystemInfo is not available");
        return null;
    }

    return await window.getSystemInfo();
};

const fetchMemory = async function () {
    if (typeof window.getSystemMem !== "function") {
        console.log("getSystemMem is not available");
        return null;
    }

    const memory = await window.getSystemMem();

    if (typeof memory === "string") {
        return JSON.parse(memory);
    }

    return memory;
};
