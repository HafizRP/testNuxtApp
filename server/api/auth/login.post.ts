import * as jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import * as argon from "argon2";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const body: LoginDTO = await readBody(event);

    const user = await prisma.user.findFirst({
      where: { email: body.email },
      include: {
        role: true,
      },
    });

    if (!user)
      throw createError({ statusCode: 400, message: "Invalid Credentials" });

    const password = await argon.verify(user.password, body.password);

    if (!password)
      throw createError({ statusCode: 400, message: "Invalid Credentials" });

    const token = await jwt.sign({ email: user.email }, "secret", {
      expiresIn: "1h",
    });

    console.log(token);

    // setCookie(event, "token", token);

    return user;
  } catch (error) {
    throw error;
  }
});

class LoginDTO {
  email!: string;
  password!: string;
}
