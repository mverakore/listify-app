import { PrismaClient } from '@prisma/client'
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from "next-auth/next"


const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  
  const listId = parseInt(req.query.id);

  if (req.method === 'POST') {
    const { desc } = req.body;

    const list = await prisma.list.findUnique({
      where: {
        id: listId,
      },
    });

    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    
    const task = await prisma.task.create({
      data: {
        desc,
        list: {
          connect: {
            id: listId,
          },
        },
      },
    });
    
    await prisma.list.update({
      where: {
        id: listId,
      },
      data: {
        taskCount: {
          increment: 1,
        },
      },
    });

    return res.status(201).json(task);
  } else if (req.method === 'GET') {
    try {
      const lists = await prisma.list.findMany({
        where: {
          id: listId,
        },
        include: {
          tasks: true,
        },
      });
      res.status(200).json(lists);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Unable to get lists' });
    }
  } 
  else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end('Method Not Allowed');
  }
}
