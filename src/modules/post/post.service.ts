import { Post, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const insertIntoDb = async (data: Post): Promise<Post> => {
  const result = await prisma.post.create({
    data,
    include: {
      authod: true,
      category: true,
    },
  });
  return result;
};

const getAllPost = async (options: any): Promise<Post[]> => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;
  const skip = parseInt(limit) * parseInt(page) - parseInt(limit);
  const take = parseInt(limit);

  const result = await prisma.post.findMany({
    skip,
    take,
    include: {
      authod: true,
      category: true,
    },
    orderBy:
      sortBy && sortOrder
        ? {
            [sortBy]: sortOrder,
          }
        : { createAt: "desc" },
    where: {
      OR: [
        {
          title: {
            contains: searchTerm,
            mode: "insensitive",
          },
        },
        {
          authod: {
            name: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        },
      ],
    },
  });
  return result;
};

export const PostService = {
  insertIntoDb,
  getAllPost,
};
