import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export const useTypstCollaboration = (docId, initialContent) => {
  const [content, setContent] = useState(initialContent);
  const socketRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const socket = io('http://localhost:3001', {
      transports: ['websocket'],
    });
    
    socketRef.current = socket;

    socket.on('connect', () => {
      socket.emit('join-document', docId);
    });

    socket.on('content-updated', (newContent) => {
      setContent(newContent);
    });

    return () => {
      if (socket) {
        socket.off('content-updated');
        socket.disconnect();
        socketRef.current = null;
      }
    };
  }, [docId]);

  const updateContent = (newContent) => {
    setContent(newContent);
    
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit('update-content', { 
        docId: docId, 
        content: newContent 
      });
    }
  };

  return { content, updateContent };
};