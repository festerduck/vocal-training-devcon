'use server'
import {  getServerSession } from "next-auth"
import prisma from "./prisma";

export async function getCurrentUser() {
  const session = await getServerSession();
  
  if (!session?.user?.email) {
    return null;
  }

  const user = await prisma.user.findFirst({
    where: {
      // Adjust this based on your auth setup
      email: session.user.email,
    },
    include: {
      instructor: true,
      student: true,
    },
  });

  return user;
}
