import { loadProject } from "@/app/dashboard/actions"
import Editor from "../components/Editor"
import { redirect } from "next/navigation";

type FileTree = {
  type: "folder" | "file";
  name: string;
  children: Record<string, FileTree>;
};

export default async function Page({ searchParams, }: { searchParams: Promise<{ projectId?: string }> }) {
  const { projectId } = await searchParams;

  function normalizeFileTree(value: any): FileTree {
    if (
      value &&
      typeof value === "object" &&
      value.type &&
      value.name &&
      typeof value.children === "object"
    ) {
      return {
        type: value.type === "file" ? "file" : "folder",
        name: String(value.name),
        children: value.children ?? {},
      };
    }

    return { type: "folder", name: "root", children: {} };
  }


  let projectData: {
    id: number;
    title: string;
    content: string;
    fileTree: FileTree;
  } = {
    id: -1,
    title: "",
    content: "",
    fileTree: { type: "folder", name: "root", children: {} },
  };

  if (projectId) {
    const project = await loadProject(parseInt(projectId));

    if (project) {
      projectData = {
        id: project.id,
        title: project.title,
        content: project.content || "",
        fileTree: normalizeFileTree(project.fileTree),
      };
    } else {
      redirect("/dashboard");
    }
  } else {
    redirect("/dashboard");
  }
  console.log(projectData)
  return (
    <Editor
      projectId={projectData.id}
      title={projectData.title}
      content={projectData.content}
      fileTree={projectData.fileTree}
    />
  );
}
