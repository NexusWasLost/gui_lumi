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
        console.log("Memory is string");
        return JSON.parse(memory);
    }

    return memory;
};

const fetchUptime = async function(){
    if(typeof window.getSystemUptime !== "function"){
        console.log("getSystemUptime is not available");
        return null;
    }

    const uptime = await window.getSystemUptime();
    if(typeof uptime === "string")
        return JSON.parse(uptime);

    return uptime;
}
