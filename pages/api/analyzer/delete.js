import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const data = req.body

  await prisma.analyzer.delete({
    where: data
  })

  res.json();
}