export let zoom = 1;
const zoomStep = 0.1;

export function initZoom(btnZoomIn, btnZoomOut, page, zoomLevelDisplay) {
    updateZoom(page, zoomLevelDisplay);

    btnZoomIn.onclick = () => {
        zoom += zoomStep;
        updateZoom(page, zoomLevelDisplay);
    };

    btnZoomOut.onclick = () => {
        zoom = Math.max(0.1, zoom - zoomStep);
        updateZoom(page, zoomLevelDisplay);
    };
}

function updateZoom(page, zoomLevelDisplay) {
    if (page && zoomLevelDisplay) {
        page.style.transform = `scale(${zoom})`;
        page.style.transformOrigin = 'top center';
        zoomLevelDisplay.innerText = `${Math.round(zoom * 100)}%`;
    }
}