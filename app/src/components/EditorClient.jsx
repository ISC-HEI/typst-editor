"use client";

import dynamic from 'next/dynamic';

const Editor = dynamic(() => import("./Editor"), { 
  ssr: false,
  loading: () => <div style={{ height: "100vh", background: "#f5f5f5", display: 'flex', justifyContent: "center", alignItems: "center", fontSize: 25 }}>The editor is loading...</div>
});

export default function EditorClient(props) {
  return <Editor {...props} />;
}