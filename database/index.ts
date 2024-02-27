import { PrismaClient } from "@prisma/client"

const db = new PrismaClient()

async function dbRequest(action: (prisma: typeof db) => Promise<unknown | null>) {
    try {
        await db.$connect()
        return await action(db)
    } catch (err) {
        console.error("🚀 ~ dbRequest:", err)
        return null
    } finally {
        await db.$disconnect()
    }
}

export default dbRequest