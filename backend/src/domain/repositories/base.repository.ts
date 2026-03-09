//  This defines the shape that any Prisma model delegate must follow.
export interface BaseDelegate<T, CreateInput, UpdateInput, WhereInput>{
    findUnique(args: { where: { id: string } }): Promise<T | null>;
    findMany(args?: { where?: WhereInput; take?: number; skip?: number }): Promise<T[]>;
    create(args: { data: CreateInput }): Promise<T>;
    update(args: {where: { id: string }; data: UpdateInput }): Promise<T>
    delete(args: {where: {id: string } }): Promise<T>;
}

export abstract class AbstractBaseRepository<T, CreateInput, UpdateInput, WhereInput> {

    constructor(
        protected modelDelegate: BaseDelegate<T, CreateInput, UpdateInput, WhereInput>
    ) {}

    async findById(id: string): Promise<T | null> {
        return this.modelDelegate.findUnique( { where: { id } } );
    }

    async findMany(where?: WhereInput): Promise<T[]> {
        return this.modelDelegate.findMany( { where } );
    }

    async create(data: CreateInput): Promise<T> {
        return this.modelDelegate.create( {data} );
    }

    async update(id: string, data: UpdateInput): Promise<T> {
        return this.modelDelegate.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<T> {
        return this.modelDelegate.delete({ where: { id } });
    }
}
