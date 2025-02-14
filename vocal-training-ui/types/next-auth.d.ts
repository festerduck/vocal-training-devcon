import "next-auth";
import { Role } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: Role;
      student?: {
        studentId: string;
      } | null;
      instructor?: {
        instructorId: string;
      } | null;
    }
  }
} 