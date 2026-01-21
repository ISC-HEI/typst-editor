export function debounce(func, delay = 1000) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

export function downloadBlob(blob, filename) {
    if (!blob || !filename) return;
    
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(link.href);
}

export function formatDateNow() {
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, "0");
    return `${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}_` +
           `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
}
