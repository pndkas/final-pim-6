import { prisma } from "../config/prismaClient.js";

export const editDoc = async (newUsername, hashPassword, id) => {
  const result = await prisma.doctor.update({
    where: { id },
    data: { username: newUsername, password: hashPassword },
  });
  return result;
};

export const editUser = async (newUsername, hashPassword, id) => {
  const result = await prisma.user.update({
    where: { id },
    data: { username: newUsername, password: hashPassword },
  });
  return result;
};
