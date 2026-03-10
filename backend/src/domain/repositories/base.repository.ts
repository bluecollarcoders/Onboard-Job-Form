//  This defines the shape that any Prisma model delegate must follow.
export interface BaseDelegate<T, CreateInput, UpdateInput, UniqueInput, WhereInput>{
    findUnique(args: { where: UniqueInput }): Promise<T | null>;
    findMany(args?: { where?: WhereInput; take?: number; skip?: number }): Promise<T[]>;
    create(args: { data: CreateInput }): Promise<T>;
    update(args: {where: UniqueInput; data: UpdateInput }): Promise<T>
    delete(args: {where: UniqueInput }): Promise<T>;
}

export abstract class AbstractBaseRepository<T, CreateInput,UpdateInput, UniqueInput extends { id?: string }, WhereInput> {

    constructor(
        protected modelDelegate: BaseDelegate<T, CreateInput, UpdateInput, UniqueInput, WhereInput>
    ) {}

    async findById(id: string): Promise<T | null> {
        return this.modelDelegate.findUnique( { where: { id } as UniqueInput } );
    }

    async findMany(where?: WhereInput): Promise<T[]> {
        return this.modelDelegate.findMany( { where } );
    }

    async create(data: CreateInput): Promise<T> {
        return this.modelDelegate.create( {data} );
    }

    async update(id: string, data: UpdateInput): Promise<T> {
        return this.modelDelegate.update({
            where: { id } as UniqueInput,
            data,
        });
    }

    async delete(id: string): Promise<T> {
        return this.modelDelegate.delete({ where: { id } as UniqueInput });
    }
    
}
