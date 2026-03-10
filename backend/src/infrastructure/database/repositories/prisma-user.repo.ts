import { PrismaClient, User, Prisma } from "@prisma/client";
import { AbstractBaseRepository } from "src/domain/repositories/base.repository.js";
import { UserRepository } from "src/domain/repositories/user.repository.js";

export class PrismaUserRepository 
    extends AbstractBaseRepository<
    User, 
    Prisma.UserCreateInput,
    Prisma.UserUpdateInput,
    Prisma.UserWhereUniqueInput,
    Prisma.UserWhereInput
    >
    implements UserRepository
{

    constructor(prisma: PrismaClient) {
        super(prisma.user);
    }

    // Only UNIQUE to Users.
    async findByEmail(email: string): Promise<User | null> {
        return this.modelDelegate.findUnique({
            where: { email }
        });
    }
    
}
