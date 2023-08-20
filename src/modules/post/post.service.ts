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

const getAllPost = async (options: any) => {
  const { sortBy, sortOrder, searchTerm, page, limit } = options;
  const skip = parseInt(limit) * parseInt(page) - parseInt(limit);
  const take = parseInt(limit);

  // with transaction
  return await prisma.$transaction(async (tx) => {
    const result = await tx.post.findMany({
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

    const total = await tx.post.count();
    return {
      data: result,
      total,
    };
  });

  // without transaction
  // const result = await prisma.post.findMany({
  //   skip,
  //   take,
  //   include: {
  //     authod: true,
  //     category: true,
  //   },
  //   orderBy:
  //     sortBy && sortOrder
  //       ? {
  //           [sortBy]: sortOrder,
  //         }
  //       : { createAt: "desc" },
  //   where: {
  //     OR: [
  //       {
  //         title: {
  //           contains: searchTerm,
  //           mode: "insensitive",
  //         },
  //       },
  //       {
  //         authod: {
  //           name: {
  //             contains: searchTerm,
  //             mode: "insensitive",
  //           },
  //         },
  //       },
  //     ],
  //   },
  // });

  // const total = await prisma.post.count()
  // return {
  //   data: result,
  //   total
  // };
};

const updatePost = async (
  id: number,
  payload: Partial<Post>
): Promise<Post | number> => {
  // const result = await prisma.post.update({
  //   where: {
  //     id,
  //   },
  //   data: payload,
  // });

  // raw query
  const result = await prisma.$executeRaw`
    update posts set title = ${payload.title} where id = ${id}
  `;

  return result;
};

const deletePost = async (id: number): Promise<Post> => {
  const result = await prisma.post.delete({
    where: {
      id,
    },
  });

  return result;
};

const learnAggregatedAndGrouping = async () => {
  // aggregation
  // const result = await prisma.post.aggregate({
  //   _avg: {
  //     authodId: true,
  //     categoryId: true,
  //   },
  //   _count: {
  //     authodId: true
  //   },
  //   _sum: {
  //     authodId: true
  //   }
  // })

  // grouping
  const result = await prisma.post.groupBy({
    by: ["title"],
    _count: {
      title: true,
    },
  });
  return result;
};

export const PostService = {
  insertIntoDb,
  getAllPost,
  updatePost,
  deletePost,
  learnAggregatedAndGrouping,
};
