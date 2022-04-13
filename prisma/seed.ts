import { PrismaClient } from '@prisma/client';
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();



async function main(username:string, password:string) {
  await prisma.user.create({
    data: {
      username: username,
      password: password,
      role: "ADMIN",
      isActive: "ACTIVE",
    },
  });
}

const username = "admin";
const password = bcrypt.hashSync("admin", 10);

main(username, password)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
