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
  return await prisma.$transaction(async(tx)=>{
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
  
    const total = await tx.post.count()
    return {
      data: result,
      total
    };
  })

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

export const PostService = {
  insertIntoDb,
  getAllPost,
};
