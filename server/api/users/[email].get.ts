import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { email }: any = event.context.params;
  const user = await prisma.user.findFirst({ where: { email } });

  return { ...user, params: event.context.params };
});
