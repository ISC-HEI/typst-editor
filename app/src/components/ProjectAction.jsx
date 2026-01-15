"use client"

import { useState, useRef, useEffect } from "react"
import { deleteProject, getShareCode } from "../app/dashboard/actions"

export function ProjectActions({ projectId }) {
  const [isOpen, setIsOpen] = useState(false)
  
  const menuRef = useRef(null) 

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleShare = async (e) => {
    e.preventDefault()
    const code = await getShareCode(projectId)
    const url = `${window.location.origin}/?projectId=${projectId}&code=${code}`
    navigator.clipboard.writeText(url)
    setIsOpen(false)
    alert("Link copied !")
  }

  return (
    <div className="relative" ref={menuRef}>
      <button 
        type="button"
        onClick={(e) => {
          e.preventDefault()
          setIsOpen(!isOpen)
        }}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors font-bold text-gray-500"
      >
        •••
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-xl z-50 py-1 border-gray-100">
          <button
            type="button"
            onClick={handleShare}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
          >
            Partager
          </button>
          
          <form action={deleteProject}>
            <input type="hidden" name="id" value={projectId} />
            <button
              type="submit"
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
            >
              Supprimer
            </button>
          </form>
        </div>
      )}
    </div>
  )
}