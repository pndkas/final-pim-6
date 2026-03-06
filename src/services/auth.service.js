import { prisma } from "../config/prismaClient.js";

// DOC
export async function findDocByUser(username) {
  const userDoctor = await prisma.doctor.findFirst({
    where: { username: username },
  });
  return userDoctor;
}

export async function createDocByUser(username, hashPassword, specialization) {
  const newUserDoctor = await prisma.doctor.create({
    data: {
      username,
      password: hashPassword,
      specialization,
    },
  });
  return newUserDoctor;
}

// USER
export async function findUserByUser(username) {
  const user = await prisma.user.findFirst({
    where: { username: username },
  });
  return user;
}

export async function createUserByUser(username, hashPassword) {
  const newUser = await prisma.user.create({
    data: {
      username,
      password: hashPassword,
    },
  });
  return newUser;
}
