import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const taskId = parseInt(req.query.taskId);

  if (req.method === 'GET') {
      try {
        const task = await prisma.task.findUnique({
          where: {
            taskId,
          },
        });
        if (!task) {
          return res.status(404).json({ message: 'Task not found' });
        }
        return res.status(200).json(task);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to get task' });
      }
    }
   else if (req.method === 'PATCH') {
      const { desc: updatedDesc, completed: updatedCompleted } = req.body;

      try {
        const task = await prisma.task.update({
          where: {
            taskId,
          },
          data: {
            desc: updatedDesc,
            completed: updatedCompleted,
          },
        });
        return res.status(200).json(task);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to update task' });
      }
    }
    else if (req.method === 'DELETE') {
      try {
        const task = await prisma.task.delete({
          where: {
          taskId,
          },
        });
        await prisma.list.update({
          where: {
            id: task.listId,
          },
          data: {
            taskCount: {
              decrement: 1,
            },
          },
        });
        return res.status(200).json(task);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Unable to delete task' });
      }
    }
  else {
      res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
      return res.status(405).end('Method Not Allowed');
  }
}
