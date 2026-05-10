import { Application, User, ApplicationStatusEvent, ApplicationStatus, Job } from "@prisma/client";

export type ApplicationWithRelations = Application & {
    user: User;
    job: Job;
    statusHistory: ApplicationStatusEvent[];
}

  export type ApplicationStatusCount = {
      status: ApplicationStatus;
      _count: {
          id: number;
      };
  }
