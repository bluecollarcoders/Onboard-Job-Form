import { Application, User, ApplicationStatusEvent, ApplicationStatus } from "@prisma/client";

export type ApplicationWithRelations = Application & {
    user: User;
    statusHistory: ApplicationStatusEvent[];
}

  export type ApplicationStatusCount = {
      status: ApplicationStatus;
      _count: {
          id: number;
      };
  }
