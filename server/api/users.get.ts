import { PrismaClient } from "@prisma/client";
import "#supabase/server";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const user = await prisma.user.findMany();
  return user;
});
