import { prisma } from "~/db.server";

export async function getPostListItems() {
  // return prisma.post.findMany();
  return prisma.post.findMany({ select: { title: true, slug: true } });
}
