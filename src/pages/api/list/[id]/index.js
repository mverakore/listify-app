import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req, res) {
  const listId = parseInt(req.query.id)

  if (req.method === 'GET') {
    const list = await prisma.list.findUnique({
      where: { id: listId },
      include: { tasks: true },
    })
    if (!list) {
      res.status(404).json({ message: 'List not found' })
    } else {
      res.status(200).json(list)
    }

    
  } else if (req.method === 'PATCH') {
    const { name } = req.body
    try {
      const updatedList = await prisma.list.update({
        where: { id: listId },
        data: {
          name,
        },
      })
      res.status(200).json(updatedList)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Unable to update list' })
    }
  } else if (req.method === 'DELETE') {
    try {
      const tasks = await prisma.task.deleteMany({
        where: { listId },
      })
      const deletedList = await prisma.list.delete({
        where: { id: listId },
      })
      res.status(200).json(deletedList)
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Unable to delete list' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'PATCH', 'DELETE'])
    res.status(405).end('Method Not Allowed')
  }
}
