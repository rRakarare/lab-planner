import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
    const width = Number(req.body["width"]);
    const height = Number(req.body["height"]);
    const depth = Number(req.body["depth"]);
    const client = Number(req.body["client"]);
    
  
    const analyzer = await prisma.analyzer.create({
        data: {
            name: req.body["name"],
            width: width,
            height: height,
            depth: depth,
            clientId: client
        }
    })

    res.json(analyzer);
}