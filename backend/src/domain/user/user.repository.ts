import { User, Prisma } from '@prisma/client';

/*
* We define the contract using Prisma's generate types
* to keep the generic parameters we set in the AbstractBase.
*/ 
export interface UserRepository {
    findById(id: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>; // Business-specific.
    findMany(where?: Prisma.UserWhereInput): Promise<User[]>;
    create(data: Prisma.UserCreateInput): Promise<User>;
    update(id: string, data: Prisma.UserUpdateInput): Promise<User>;
    delete(id: string): Promise<User>;
}
