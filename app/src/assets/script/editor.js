import { fetchSvg, exportPdf, exportSvg } from './api.js';
import { debounce } from './utils.js';

export let fileTree = { type: "folder", name: "root", children: {} };
export let currentFolderPath = "root";

// ---------- Editor elements ----------
let editor;
const page = document.getElementById("page");
export let currentProjectId;
export const uploadedImages = {};

// ---------- Formatting functions ----------


// ---------- Main compile function ----------


// ---------- File operations ----------


// ---------- Event listeners ----------
export function initEditorListeners(monaco, projectId, fileTreeLoad, btnBold, btnItalic, btnUnderline, btnSave, btnOpen, fileInput, btnExportPdf, btnExportSvg) {
    currentProjectId = projectId
    fileTree=fileTreeLoad
    editor = monaco
}



// Open a local file



// -------- Change pages size --------
const separator = document.getElementById('separator');
const container = separator.parentElement;

let isDragging = false;

separator.addEventListener('mousedown', (e) => {
    isDragging = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none'; 
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const containerRect = container.getBoundingClientRect();
    const relativeX = e.clientX - containerRect.left;

    const containerWidth = containerRect.width;
    let percentage = (relativeX / containerWidth) * 100;

    const editorSide = container.firstElementChild;
    
    editorSide.style.flex = `0 0 ${percentage}%`;
});

document.addEventListener('mouseup', () => {
    if (isDragging) {
        isDragging = false;
        document.body.style.cursor = 'default';
        document.body.style.userSelect = 'auto';
    }
});

