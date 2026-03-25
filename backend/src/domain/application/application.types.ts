import { Application, User, ApplicationStatusEvent } from "@prisma/client";

export type ApplicationWithRelations = Application & {
    user: User;
    statusHistory: ApplicationStatusEvent[];
}
