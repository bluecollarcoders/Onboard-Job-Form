import { PrismaClient, User, Prisma } from "@prisma/client";
import { AbstractBaseRepository, BaseDelegate } from "@domain/repositories/base.repository.js";
import { UserRepository } from "@domain/repositories/user.repository.js";

export class PrismaUserRepository 
    extends AbstractBaseRepository<
    User, 
    Prisma.UserCreateInput,
    Prisma.UserUpdateInput,
    Prisma.UserWhereUniqueInput,
    Prisma.UserWhereInput,
    Prisma.UserFindUniqueArgs
    
    >
    implements UserRepository
{

    constructor(prisma: PrismaClient) {
        super(prisma.user as unknown as BaseDelegate<
        User,
        Prisma.UserCreateInput,
        Prisma.UserUpdateInput,
        Prisma.UserWhereUniqueInput,
        Prisma.UserWhereInput,
        Prisma.UserFindUniqueArgs
        >);
    }

    // Only UNIQUE to Users.
    async findByEmail(email: string): Promise<User | null> {
        return this.modelDelegate.findUnique({
            where: { email }
        });
    }
    
}
