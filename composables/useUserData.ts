import { User, Role } from "@prisma/client";

export default function () {
  return useState("user_info") as Ref<
    User & {
      role: Role;
    }
  >;
}
