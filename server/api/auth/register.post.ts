import { PrismaClient } from "@prisma/client";
import * as argon from "argon2";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { password: hash, ...body }: RegisterDTO = await readBody(event);
  const password = await argon.hash(hash);
  const user = await prisma.user.findFirst({
    where: { email: body.email },
  });

  if (user != null)
    throw createError({ statusCode: 400, message: "Email already used!" });

  const newUser = await prisma.user.create({ data: { ...body, password } });

  return { statusCode: 200, message: "User Created", newUser };
});

class RegisterDTO {
  username!: string;
  password!: string;
  email!: string;
}
