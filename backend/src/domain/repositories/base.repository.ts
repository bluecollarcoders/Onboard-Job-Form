//  This defines the shape that any Prisma model delegate must follow.

export interface CountArgs<WhereInput> {
    where?: WhereInput;
}

export interface BaseDelegate<
    T, 
    CreateInput, 
    UpdateInput, 
    UniqueInput, 
    WhereInput, 
    FindUniqueArgs extends { where: UniqueInput }
    > {
    findUnique(args: FindUniqueArgs): Promise<T | null>;
    findMany(args?: { where?: WhereInput; take?: number; skip?: number }): Promise<T[]>;
    create(args: { data: CreateInput }): Promise<T>;
    update(args: {where: UniqueInput; data: UpdateInput }): Promise<T>
    delete(args: {where: UniqueInput }): Promise<T>;
}

export interface CountDelegate<WhereInput> {
    count(args?: CountArgs<WhereInput>): Promise<number>;
}

export abstract class AbstractBaseRepository<
    T,
    CreateInput,
    UpdateInput, 
    UniqueInput extends { id?: string },
    WhereInput, 
    FindUniqueArgs extends { where: UniqueInput }
    > {

    constructor(
        protected modelDelegate: BaseDelegate<T, CreateInput, UpdateInput, UniqueInput, WhereInput, FindUniqueArgs>& CountDelegate<WhereInput>
    ) {}

    async findById(id: string): Promise<T | null> {
        return this.modelDelegate.findUnique( { where: { id } as UniqueInput, } as FindUniqueArgs );
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
    
    async count(where?: WhereInput): Promise<number> {
        return this.modelDelegate.count({ where });
    }
}
