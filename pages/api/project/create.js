import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
    const analyzers = req.body["analyzers"]
    for (let index = 0; index < analyzers.length; index++) {
        analyzers[index] = Number(analyzers[index]);
    }
    console.log(analyzers)
    const test = [1,2]
  
    const project = await prisma.project.create({
        data: {
            name: req.body["name"],
            userId: 1,
            analyzers: {
                connect: analyzers.map(c => ({ id: c })) || [],
            }
        }
    })

    res.json(project);
}
