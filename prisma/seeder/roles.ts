import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("-- Running roles seeder....");

  const roles = await prisma.role.count();

  if (roles !== 0) {
    console.log("- Deleting all available roles");
    await prisma.role.deleteMany();
  }

  await prisma.role.createMany({
    data: [
      {
        roleName: "Admin",
      },
      {
        roleName: "SuperAdmin",
      },
      {
        roleName: "User",
      },
    ],
  });

  console.log("- Role seeder was successful ");
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
