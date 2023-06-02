import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body: User = await readBody(event);
    const user = await prisma.user.findFirst({ where: { email: body.email } });

    if (user)
      throw createError({
        statusCode: 400,
        statusMessage: "Email has been used!",
      });

    await prisma.user.create({ data: body });

    return sendRedirect(event, "/users", 302);
  } catch (error) {
    throw error;
  }
});
