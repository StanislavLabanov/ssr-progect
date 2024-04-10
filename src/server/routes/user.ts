import { CreateUserSchema } from "@/shared/api";
import { prisma } from "../db";
import { router, procedure } from "../trpc";

export const userRouter = router({
   create: procedure
      .input(CreateUserSchema)
      .mutation(({ input }) => {
         return prisma.user.create({
            data: {
               name: input.name,
               email: input.email,
               password: input.password
            },
         });
      }),
})