import { PrismaClient } from '@prisma/client'
import { authOptions } from "../auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const prismaUser = await prisma.user.findUnique({
    where: { email: session.user.email },
  })

  if (!prismaUser) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  if (req.method === 'POST') {
    const { name } = req.body
    const list = await prisma.list.create({
      data: {
        name,
        userId: prismaUser.id,
      },
    })
    res.status(200).json(list)
  } else if (req.method === 'GET') {
    try {
      const lists = await prisma.list.findMany({
        where: { userId: prismaUser.id }
      })
      res.status(200).json(lists)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Unable to get lists' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end('Method Not Allowed')
  }
}
