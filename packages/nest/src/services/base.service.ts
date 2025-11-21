import { Injectable } from "@nestjs/common";

@Injectable()
export class BaseService<ModelRepo> {
    constructor(private readonly repo: ModelRepo) {}

    async findAll({
        where,
        select,
        include,
        orderBy,
        skip,
        take,
    }: {
        where?: any;
        select?: any;
        include?: any;
        orderBy?: { createdAt: "desc" | "asc" };
        skip?: number;
        take?: number;
    }) {
        try {
            const query: any = {};

            if (where) query.where = where;
            if (select) query.select = select;
            if (include) query.include = include;
            if (orderBy) query.orderBy = orderBy;
            if (skip !== undefined) query.skip = Number(skip);
            if (take !== undefined) query.take = Number(take);

            return await (this.repo as any).findMany(query);
        } catch (error) {
            console.error("Error in findAll:", error);
            return [];
        }
    }

    async findOne({
        where,
        select,
        include,
    }: {
        where: any;
        select?: any;
        include?: any;
    }) {
        try {
            const query: any = { where };

            if (select) {
                query.select = select;
            } else if (include) {
                query.include = include;
            }

            return await (this.repo as any).findFirst(query);
        } catch (error) {
            console.error("Error in findOne:", error);
            return null;
        }
    }

    async create(data: any) {
        try {
            return await (this.repo as any).create({
                data,
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async createMany(data: []) {
        try {
            return await (this.repo as any).createMany({
                data,
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async upsert(where: any, data: any) {
        try {
            return await (this.repo as any).upsert({
                where,
                update: data,
                create: data,
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async updateById(id: number, data: any) {
        try {
            return await (this.repo as any).update({
                where: { id },
                data,
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async update(where: any, data: any) {
        try {
            return await (this.repo as any).updateManyAndReturn({
                where,
                data,
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async delete(where: any) {
        try {
            return await (this.repo as any).deleteMany({
                where,
            });
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
