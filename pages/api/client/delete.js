import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const data = req.body

  await prisma.client.delete({
    where: data
  })

  res.json();
}
