import { ArrowDownToLine, FolderOpen, Bold, Italic, Underline, Folders } from "lucide-react";
import { useEditorWatcher } from "@/hooks/useEditor"
import { useEffect, useRef } from "react";
import { initPreviewRefs } from "@/hooks/refs";

export function Toolbar() {
  const btnSaveRef=useRef(null)
  const btnOpenRef=useRef(null)
  const btnBRef=useRef(null)
  const btnIRef=useRef(null)
  const btnURef=useRef(null)

  const fileInputOpenRef=useRef(null)
  const btnShowImagesRef=useRef(null)
  useEditorWatcher();

  useEffect(() => {
    if (btnSaveRef.current && btnOpenRef.current && btnBRef.current && btnIRef.current && btnURef.current && fileInputOpenRef.current && btnShowImagesRef.current && btnShowImagesRef.current) {
      initPreviewRefs({
        btnSave: btnSaveRef.current,
        btnOpen: btnOpenRef.current,
        btnBold: btnBRef.current,
        btnItalic: btnIRef.current,
        btnUnderline: btnURef.current,

        fileInputOpen: fileInputOpenRef.current,
        btnShowImages: btnShowImagesRef.current
      });
    }
  }, []);

  return (
    <nav className="w-14 border-r border-slate-200 flex flex-col items-center py-4 gap-4 shrink-0 bg-slate-50/50">
      <div className="flex flex-col gap-2">
        <button ref={btnSaveRef} className="p-2.5 rounded-xl hover:bg-white hover:shadow-sm hover:text-blue-600 transition-all text-slate-500" title="Save">
          <ArrowDownToLine size={20} />
        </button>
        <button ref={(btnOpenRef)} className="p-2.5 rounded-xl hover:bg-white hover:shadow-sm hover:text-blue-600 transition-all text-slate-500" title="Open">
          <FolderOpen size={20} />
        </button>
        <input ref={fileInputOpenRef} type="file" className="hidden" />
      </div>
  
      <div className="w-8 h-[1px] bg-slate-200" />
  
      <div className="flex flex-col gap-2">
        <button ref={btnBRef} className="p-2.5 rounded-xl hover:bg-white hover:shadow-sm text-slate-500" title="Bold"><Bold size={18} /></button>
        <button ref={btnIRef} className="p-2.5 rounded-xl hover:bg-white hover:shadow-sm text-slate-500" title="Italic"><Italic size={18} /></button>
        <button ref={btnURef} className="p-2.5 rounded-xl hover:bg-white hover:shadow-sm text-slate-500" title="Underline"><Underline size={18} /></button>
      </div>
  
      <div className="w-8 h-[1px] bg-slate-200" />
  
      <button ref={btnShowImagesRef} className="p-2.5 rounded-xl hover:bg-white hover:shadow-sm hover:text-blue-600 transition-all text-slate-500" title="Files Explorer">
        <Folders size={20} />
      </button>
    </nav>
  );
} 