'use server'

import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
const { randomBytes } = require('node:crypto');

export async function getUserProjects() {
    const session = await auth()
    if (!session?.user?.id) throw new Error("No authorization")

    return await prisma.project.findMany({
        where: { userId: parseInt(session.user.id) },
        orderBy: { id: 'desc' }
    })
}

export async function createProject(formData: FormData) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("No authorization")

    const title = formData.get("title") as string
    if (!title) return

    await prisma.project.create({
        data: {
            title: title,
            userId: parseInt(session.user.id),
            fileTree: {},
        }
    })

    revalidatePath("/")
}

export async function deleteProject(formData: FormData) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("No authorization")

    const projectId = formData.get("id") as string
    
    if (!projectId) return

    await prisma.project.delete({
        where: {
            id: parseInt(projectId),
            userId: parseInt(session.user.id)
        }
    })

    revalidatePath("/")
}

export async function saveProjectData(projectId: number, content: string, fileTree: any) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Non autorisé")

    await prisma.project.update({
        where: { 
            id: projectId,
            userId: parseInt(session.user.id) 
        },
        data: {
            content: content,
            fileTree: fileTree
        }
    })
    revalidatePath("/")
}
                    
export async function loadProject(id: number, code?: string) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Non autorisé")

    const project = await getProjectById(id, session.user.id, code)
    return project
}

async function getProjectById(projectId: number, userId: string, code?: string) {
    const project = await prisma.project.findUnique({
        where: { id: projectId }
    })

    if (!project) return null;

    if (code && project.shareCode === code) {
        return project;
    }
    
    if (project.userId === parseInt(userId)) {
        return project;
    }

    return null;
}

export async function getShareCode(projectId: number) {
    const session = await auth()
    if (!session?.user?.id) throw new Error("Non autorisé")

    const project = await getProjectById(projectId, session.user.id)

    if (!project) throw new Error("No project find")

    if (project.shareCode) {
        return project.shareCode
    } else {
        const code = generateRandomString(10)
        await prisma.project.update({
        where: { id: projectId },
        data: { shareCode: code }
        })
        return code
    }
}

function generateRandomString(length: number) {
  const bytesNeeded = Math.ceil(length * 3 / 4);
  return randomBytes(bytesNeeded)
    .toString('base64')
    .slice(0, length)
    .replace(/[/+]/g, '_');
}