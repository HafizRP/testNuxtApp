import { PrismaClient } from "@prisma/client";
import * as argon from "argon2";
const prisma = new PrismaClient();

async function main() {
  console.log("-- Running user seeder...");

  const user = await prisma.user.count();

  // Delete all available user if there is
  if (user != 0) {
    await prisma.user.deleteMany();
    console.log("- Deleting available users...");
  }

  // Create default user
  await prisma.user.createMany({
    data: [
      {
        email: "admin@gmail.com",
        username: "Admin",
        password: await argon.hash("useradmin"),
        roleId: (
          await prisma.role.findFirst({
            where: {
              roleName: "Admin",
            },
          })
        )?.id as number,
      },
      {
        email: "worker@gmail.com",
        username: "Worker",
        password: await argon.hash("userworker"),
        roleId: (
          await prisma.role.findFirst({
            where: {
              roleName: "Admin",
            },
          })
        )?.id as number,
      },
    ],
  });

  console.log("- User seeder was successfull");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
