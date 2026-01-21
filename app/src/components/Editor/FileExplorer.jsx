import { X, FolderPlus, Plus } from "lucide-react";
import { useEffect, useRef } from "react";
import { useFileManagerWatcher } from "@/hooks/useFileManager"
import { initPreviewRefs } from "@/hooks/refs";

export function FileExplorer() {
  const imageListRef=useRef(null)
  const btnCloseImagesRef=useRef(null)
  const imageExplorerRef=useRef(null)
  const btnCreateFolderRef=useRef(null)
  const btnUploadImagesRef=useRef(null)
  const imageFilesInputRef=useRef(null)
  const rootDropZoneRef=useRef(null)
  useFileManagerWatcher()

  useEffect(() => {
    if (imageListRef.current && btnCloseImagesRef.current && imageExplorerRef.current && btnCreateFolderRef.current && btnUploadImagesRef.current && imageFilesInputRef.current && rootDropZoneRef.current) {
      initPreviewRefs({
        imageList: imageListRef.current,
        btnCloseImages: btnCloseImagesRef.current,
        imageExplorer: imageExplorerRef.current,
        btnCreateFolder: btnCreateFolderRef.current,
        btnUploadImages: btnUploadImagesRef.current,
        imageFilesInput: imageFilesInputRef.current,
        rootDropZone: rootDropZoneRef.current
      })
    }
  }, [])

  return (
    <div ref={imageExplorerRef} className="absolute left-0 top-0 bottom-0 w-72 bg-white border-r border-slate-200 shadow-xl z-20 flex flex-col transition-transform duration-300 transform" style={{ display: "none" }}>
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <h3 className="font-bold text-sm uppercase tracking-wider text-slate-500">Explorer</h3>
        <button ref={(btnCloseImagesRef)} className="p-1 hover:bg-slate-200 rounded-md"><X size={18} /></button>
      </div>
      <div className="p-3 grid grid-cols-2 gap-2">
        <button ref={btnCreateFolderRef} className="flex items-center justify-center gap-2 text-xs font-medium p-2 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:text-blue-600 transition-all">
          <FolderPlus size={14} /> Folder
        </button>
        <button ref={btnUploadImagesRef} className="flex items-center justify-center gap-2 text-xs font-medium p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
          <Plus size={14} /> File
        </button>
      </div>
      <input ref={imageFilesInputRef} type="file" className="hidden" multiple />
      <div ref={rootDropZoneRef} className="mx-3 p-2 text-xs font-semibold bg-slate-100 rounded text-slate-600 mb-2">🏠 Root Project</div>
      <ul ref={imageListRef} className="flex-1 overflow-y-auto px-2 space-y-1"></ul>
    </div>
  );
}